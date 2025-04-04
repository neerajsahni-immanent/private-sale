import { Container } from "@mui/material";
import CustomModal from "../Modal/Modal";
import { CustomButton } from "../common/CustomInput";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import Web3 from "web3";
import { parseUnits } from "viem";
import { useEffect } from "react";
const Token_Contract_Abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "version",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "_extraData",
          "type": "bytes"
        }
      ],
      "name": "approveAndCall",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_initialAmount",
          "type": "uint256"
        },
        {
          "name": "_tokenName",
          "type": "string"
        },
        {
          "name": "_decimalUnits",
          "type": "uint8"
        },
        {
          "name": "_tokenSymbol",
          "type": "string"
        }
      ],
      "type": "constructor"
    },
    {
      "payable": false,
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
  ]
const ERCTokenTransferComponent = ({ isOpen, closeModal, depositDetails }) => {
const {address , data:signer}= useAccount()
console.log(signer,'signer');

const { writeContract, isPending, isSuccess, data, error } = useWriteContract()

    const handleDeposit = async () => {
        try {
            if (!address) {
                alert('Connect wallet first!')
                return
              }
              const USDT_CONTRACT = process.env.NEXT_PUBLIC_USDT_BNB
              const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS

              const decimals = 6 // or fetch it dynamically if needed
              const amount = parseUnits(depositDetails.amount.toString(), decimals)
          
              writeContract({
                abi: Token_Contract_Abi,
                address: USDT_CONTRACT,
                functionName: 'transfer',
                args: [ADMIN_ADDRESS, amount],
              })

            // Perform the deposit logic here
            // For example, you can call an API to process the deposit
            console.log("Deposit details:", depositDetails);
            // Close the modal after processing
            // closeModal();      

        }
        catch (error) {
            console.error("Error during deposit:", error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
          console.log('Transaction success!', data)
        }
        if (error) {
          console.error('Transaction failed:', error)
        }
      }, [isSuccess, error, data])
    return (
        <CustomModal isOpen={isOpen} closeModal={closeModal}>
            <Container maxWidth="xlg">
                <div className="fund_ing">
                    <h2>ERC Token Transfer</h2>
                    <div className="erc-token-transfer-component">
                        <p>Details about the ERC token transfer.</p>
                    </div>
                    <div className="min-max">
                        <span>CHAIN:BNB</span>
                    </div>
                    <div className="min-max">
                        <span>TOKEN: USD</span>
                    </div>
                    <div className="min-max">
                        <span>Token Address: {process.env.NEXT_PUBLIC_USDT_BNB}</span>
                    </div>
                    <div className="min-max">
                        <span>Token Quantity: {depositDetails.amount}</span>
                    </div>
                    <div className="min-max">
                        <span>Admin Address : {process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS}</span>
                    </div>
                    <div className="min-max">
                        <span>From Address : {address}</span>
                    </div>

                     <CustomButton
                                        BtnName="Proceed"
                                        onClick={handleDeposit}
                                        
                                    />
                </div>


            </Container>
        </CustomModal>
    );
}
export default ERCTokenTransferComponent;