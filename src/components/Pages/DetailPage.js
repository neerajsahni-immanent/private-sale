'use client'
import FundingCard from "../DetailPageComponent/FundingCard";
import ProjectDescription from "../DetailPageComponent/ProjectDescription";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import DepositModal from "../DetailPageComponent/DepositModal";
import { useAccount, useConnect, useSendTransaction, useWriteContract } from "wagmi";
import { postDataAPI } from "@/utils/API_Instance";
import { useParams, useRouter } from "next/navigation";
import Web3 from 'web3';
import ConfirmationModal from "../DetailPageComponent/ConfirmationModal";
import CheckUserModalComponent from "../DetailPageComponent/CheckUserModalComponent";
import { injected } from 'wagmi/connectors'
import {  parseEther, parseUnits } from "viem";
import { notifyError } from "../Toast/Toast";
import { formatedAddress } from "@/utils/formatters";
import UserDepositHistoryComponent from "../DetailPageComponent/UserDepositHistoryComponent";
import LaunchPadHeader from "../common/LaunchPadHeader";


const CONTRACT_ABI = [
    {
      "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


export const CHAIN_CONSTANT = {
  "BNB": process.env.NEXT_PUBLIC_BNB_CHAIN_ID,
  "ETH": process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
  "HAQQ":process.env.NEXT_PUBLIC_HAQQ_CHAIN_ID
}

export const RPC ={
    54211:'https://rpc.eth.testedge2.haqq.network',
    11155111:'https://sepolia.infura.io',
    97:'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
}

const tokenAddresses = {
  BNB: {
    USDT: process.env.NEXT_PUBLIC_USDT_BNB,
    USDC: process.env.NEXT_PUBLIC_USDC_BNB,
  },
  ETH: {
    USDT: process.env.NEXT_PUBLIC_USDT_ETH,
    USDC: process.env.NEXT_PUBLIC_USDC_ETH
  }
};
const DetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, chainId, connector } = useAccount();

  console.log(isConnected && chainId, "chainid")



const [tokenAddress, setTokenAddress]= useState(process.env.NEXT_PUBLIC_USDT_BNB)
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { sendTransaction, isSuccess, error } = useSendTransaction()
//   const { auth } = useSelector((state) => state);
const auth ={};
  const pathname = useParams();
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [depositDetails, setDepositDetails] = useState({});
  const [checkUserModal, setCheckUserModal] = useState(false);


  useEffect(() => {
    if (!depositDetails?.currencyCode) {
      console.error("Invalid currency code");
      return;
    }

   

    let [tokenSymbol, chainSymbol] = depositDetails.currencyCode.split("-");
    const _tokenAddress = tokenAddresses[chainSymbol]?.[tokenSymbol];
    // const web3= new Web3(new Web3.providers.HttpProvider(RPC[CHAIN_CONSTANT[chainSymbol]]))
    const web3 = new Web3(RPC[CHAIN_CONSTANT[chainSymbol]])
    const fetchSigner = async () => {
      try {
        const signer = await fetchAccounts(web3);
        console.log(signer, 'signererrr', RPC[CHAIN_CONSTANT[chainSymbol]], web3);
      } catch (error) {
        console.error('Error fetching signer:', error);
      }
    };
  
    fetchSigner();
    if (!_tokenAddress) {
      console.error(`Token contract address not found for ${depositDetails.currencyCode}`);
      return;
    }

    setTokenAddress(_tokenAddress);
  }, [depositDetails]);

  const fetchAccounts = async(web3)=>{
      const signer= await web3.eth.getAccounts();
      return signer
  }
  const { writeContractAsync: transferToken } = useWriteContract({
    address: tokenAddress,  // using dynamic contract address here
    abi: CONTRACT_ABI,
    functionName: "transfer",
  });
console.log(auth);

const handleTransfer = async (adminWallet) => {
  if (!tokenAddress) {
    console.error("Token address not set yet");
    return;
  }

  try {
    console.log(`Processing ERC-20 Transfer: ${depositDetails.amount} ${depositDetails.currencyCode} to ${adminWallet} token Address ${tokenAddress} token instance ${transferToken}`);

    const tx = await transferToken({
      args: [
        adminWallet,
        parseUnits(depositDetails.amount, 6)
      ],
      from: address,
    });

    console.log("Transaction Sent:", tx);
    alert(`Transaction successful! Hash: ${tx.transactionHash}`);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
  const depositToken = async () => {
    try {
      if(!auth?.auth?.user?.role){
         notifyError('Login First for deposit fund!!')
         localStorage.setItem('redirectPage', 'project/67c6adbb529cd474d8a4a80b');
         router.push('/login')
         return
      }
      // return
      console.log(`Attempting to deposit ${depositDetails.amount} ${depositDetails.currencyCode.toUpperCase()}...`, depositDetails);

      // Validate deposit details
      if (!depositDetails?.amount || !depositDetails?.currencyCode) {
        alert("Invalid deposit details. Please enter a valid amount and currency.");
        return;
      }

      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
      }

      console.log(isConnected ,"isConnected" );

      if (!isConnected ) {
        alert("Wallet is not connected. Please connect your wallet.");
        await connect({ connector: injected() });
        return;
      }
      let userWalletAddress= auth?.auth?.user?.walletAddress
      if (userWalletAddress) {
        if (userWalletAddress !== address) {
          notifyError(`🛑 Wallet Mismatch Detected!
                          Please switch to your registered wallet: ${formatedAddress(userWalletAddress)}`);

          return
        }
      }

      const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS || '0xb1F86EDB5be7E8ff7474881C67A7078Abed00b0A';
      if (!adminWallet) {
        throw new Error("Admin wallet address is missing. Please check environment variables.");
      }


      // Handle Fiat Deposits via MoonPay
      if (depositDetails.type === "fiat") {
        console.log("Processing Fiat Deposit via MoonPay...");
        const response = await postDataAPI('/moon/generate-url', {
          currencyCode: depositDetails.currencyCode,
          baseCurrencyAmount: depositDetails.amount,
          baseCurrencyCode: depositDetails.chain,
        });

        if (response?.data?.url) {
          window.location.href = response.data.url;
        } else {
          throw new Error("Failed to generate MoonPay URL.");
        }
        return;
      }

      // Handle Crypto Deposits (ETH, BNB, MATIC)
      if (["ETH", "BNB","HAQQ"].includes(depositDetails.currencyCode.toUpperCase())) {
        console.log("Processing Crypto Deposit...");
     

        const tx = await sendTransaction({
         to: adminWallet,
         value: parseEther(depositDetails.amount.toString()),
         })
         // ✅ Wait for transaction confirmation
        console.log("Waiting for transaction confirmation...");
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        console.log("Transaction Sent:", tx);
        // alert(`Transaction successful! Hash: ${tx.transactionHash}`);
        setIsConfirmModalOpen(false);
        setIsOpen(false);
        await saveTransactions(tx)
        return;
      }

      // Handle ERC-20 Token Deposits
    //   const web3 = new Web3(window.ethereum);

    const RPC_URLS = {
        "ETH": "https://sepolia.infura.io",  // Sepolia Testnet
        "BNB": "https://data-seed-prebsc-1-s1.bnbchain.org:8545/",           // Binance Smart Testnet Chain (BSC)
        "HAQQ": "https://rpc.eth.testedge2.haqq.network/",             // Example for HAQQ (Fantom Opera)
        // Add more networks here as needed
    };
    let [tokenSymbol, chainSymbol] = depositDetails.currencyCode.split("-");
    const rpcUrl = RPC_URLS[chainSymbol];

    if (!rpcUrl) {
        console.error("Unsupported currency:", depositDetails.currencyCode);
        return;
    }

   

    //   let [tokenSymbol, chainSymbol] = depositDetails.currencyCode.split("-");
      const _tokenAddress = tokenAddresses[chainSymbol]?.[tokenSymbol];
      setTokenAddress(_tokenAddress)
      if (!_tokenAddress) {
        throw new Error(`Token contract address not found for ${depositDetails.currencyCode}`);
      }

      console.log(`Processing ERC-20 Transfer: ${depositDetails.amount} ${depositDetails.currencyCode} to ${adminWallet}`);

      // const tokenContract = new web3.eth.Contract(CONTRACT_ABI, tokenAddress);
      // const amountInWei = web3.utils.toWei(depositDetails.amount.toString(), "mwei"); // Assuming 6 decimals

      // const tx = await tokenContract.methods.transfer(adminWallet, amountInWei).send({ from: signer });
      // const tx = await transferToken({
      //   args: [
      //     adminWallet,
      //     parseUnits(depositDetails.amount,6)
      //   ],
      //   from: address,
      // })
      // console.log("Transaction Sent:", tx);
      handleTransfer(adminWallet);
    //   alert(`Transaction successful! Hash: ${tx.transactionHash}`);
    } catch (error) {
      console.error("Deposit Error:", error);
      alert(`Transaction failed: ${error.message || error}`);
    } finally {
      setIsConfirmModalOpen(false);
      setIsOpen(false);
    }
  };


  const deposit_Token = async () => {
    try {
      console.log(`Attempting to deposit ${depositDetails.amount} ${depositDetails.currencyCode.toUpperCase()}...`, depositDetails);

      // Validate deposit details
      if (!depositDetails?.amount || !depositDetails?.currencyCode) {
        alert("Invalid deposit details. Please enter a valid amount and currency.");
        return;
      }

      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask.");
        return;
      }

      if (!isConnected || !address) {
        alert("Wallet is not connected. Please connect your wallet.");
        connect({ connector: injected() });
        return;
      }

      const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS;
      if (!adminWallet) {
        throw new Error("Admin wallet address is missing. Please check environment variables.");
      }



      // Handle Fiat Deposits via MoonPay
      if (depositDetails.type === "fiat") {
        console.log("Processing Fiat Deposit via MoonPay...");
        const data = {
          currencyCode: depositDetails.currencyCode,
          baseCurrencyAmount: depositDetails.amount,
          baseCurrencyCode: depositDetails.chain,
        };

        const response = await postDataAPI('/moon/generate-url', data);

        if (response?.data?.url) {
          window.location.href = response.data.url;
          return;
        } else {
          throw new Error("Failed to generate MoonPay URL.");
        }
      }

      // 🔹 Handle Crypto Deposits (ETH, BNB, MATIC)
      if (depositDetails.currencyCode.toUpperCase() === "ETH" || depositDetails.currencyCode.toUpperCase() === "BNB") {
        console.log("Processing Crypto Deposit...");
        const tx = await sendTransaction({
          to: adminWallet,
          value: parseEther(depositDetails.amount.toString()),
        })

        console.log("Transaction Sent:", tx);
        alert(`Transaction successful! Hash: ${tx.hash}`);
        setIsConfirmModalOpen(false);
        setIsOpen(false);
        return;
      }

      const web3 = new Web3.providers.HttpProvider(CHAIN_CONSTANT[depositDetails.currencyCode]);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const signer = accounts[0];
      const CONTRACT_ABI = [
        {
          "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
          "name": "balanceOf",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
          ],
          "name": "transfer",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      // 🔹 Handle ERC-20 Tokens (USDT, USDC)
      const tokenAddresses = {
        BNB: {
          USDT: process.env.NEXT_PUBLIC_USDT_BNB || '0x6d71d56A1D53569d6B53a10b185f8eE9EF02d082', // Set in .env
          USDC: process.env.NEXT_PUBLIC_USDC_BNB, // Set in .env
        },
        ETH: {
          USDT: process.env.NEXT_PUBLIC_USDT_ETH,
          USDC: process.env.NEXT_PUBLIC_USDC_ETH
        }
      }
      let codeAndCurrency = depositDetails.currencyCode.split("-");

      const tokenAddress = tokenAddresses[codeAndCurrency[1]][codeAndCurrency[0]];
      console.log(tokenAddress, 'aaa');
      if (!tokenAddress) {
        throw new Error(`Token contract address not found for ${depositDetails.currencyCode}`);
      }

      console.log(`Processing ERC-20 Transfer: ${depositDetails.amount} ${depositDetails.currencyCode} to ${adminWallet}`);


      const amountInWei = web3.utils.toWei(depositDetails.amount.toString(), 'mwei'); // ✅ 6 decimals

      console.log("Contract ABI:", CONTRACT_ABI);
      console.log("Token Address:", tokenAddress);
      console.log("Deposit Details:", depositDetails);
      console.log("Admin Wallet:", process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS);

      console.log("Transaction Sent:", tx);
      alert(`Transaction successful! Hash: ${tx}`);

      setIsConfirmModalOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Deposit Error:", error);
      alert(`Transaction failed: ${error.message || error}`);
      setIsConfirmModalOpen(false);
    }
  };

  const projectDetail = {
    "project": {
      "name": "Biconomy",
      "status": {
        "live": 'Live',
        "refundable": 'Refundable'
      },
      "description": "Biconomy is a leading cryptocurrency exchange platform that enables users to buy, sell, and trade a wide array of digital assets. Established in October 2019, Biconomy has rapidly expanded its services to over 1 million users globally, offering access to more than 180 cryptocurrencies and over 200 spot trading pairs, including major coins like BTC, ETH, SOL, and more.",
      "features": [
        {
          "title": "User-Friendly Platform",
          "description": "Biconomy provides an intuitive and beginner-friendly interface, supporting basic crypto transactions, digital wallets, and various payment methods such as SEPA and SWIFT."
        },
        {
          "title": "Secure Transactions",
          "description": "Ensures high-level security with advanced encryption and multi-layer authentication."
        },
        {
          "title": "Fast Processing",
          "description": "Instant deposits and withdrawals with minimal fees."
        }
      ]
    },
    "funding": {
      "targetedRaise": {
        "amount": 160000000,
        "currency": "USDT"
      },
      "totalRaised": {
        "amount": 70000,
        "percentage": 50,
        "currency": 'USDT'
      },
      "network": "Tether (USDT)",
      "participants": 41,
      "startDate": "2025-03-16",
      "endDate": "2025-05-16",
      "status": "Ongoing",
      "countdown": {
        "days": 100,
        "hours": 23,
        "minutes": 49,
        "seconds": 3
      }
    },
    "cta": {
      "buttonText": "Fund Project",
      "buttonColor": "#FF7F2A"
    }
  }

  const openDepositModal = () => {
    let isRegister = localStorage.getItem('isRegister');
    if (!isRegister) {
      setCheckUserModal(true)
    } else {
      setIsOpen(true)
    }
  }


  const saveTransactions = async(txHash)=>{
    try {
      const res = await postDataAPI('/user/user-transactions', {amount: depositDetails.amount, address:address, currency:depositDetails.currencyCode, txHash })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <LaunchPadHeader>
        <Container maxWidth="lg">
          <div className="mt-10 header_gap ">
            <div className="project_page_grd">
              <ProjectDescription projectDetail={projectDetail} />
              <FundingCard projectDetail={projectDetail} onOpenDeposit={() => openDepositModal()} />
              <DepositModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(!isOpen)}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                setDepositDetails={setDepositDetails}
              />
              <ConfirmationModal
                isOpen={isConfirmModalOpen}
                closeModal={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
                depositToken={depositToken}
                depositDetails={depositDetails}
              />
              <CheckUserModalComponent
                isOpen={checkUserModal}
                closeModal={() => { setCheckUserModal(!checkUserModal); setIsOpen(true); }}
              />
            </div>
          </div>
        </Container>
        {auth?.auth?.user?.role && <UserDepositHistoryComponent userId={auth?.auth?.user?._id} />}
      </LaunchPadHeader>
    </>
  );
};

export default DetailPage;
