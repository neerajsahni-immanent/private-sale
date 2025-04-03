import { useState } from "react";
import { CustomButton, FormInput } from "../common/CustomInput";
import CustomModal from "../Modal/Modal";
import * as Yup from "yup";
import { notifyError } from "../Toast/Toast";

const DepositModal = ({ isOpen, closeModal, setIsConfirmModalOpen, setDepositDetails }) => {
    const [amount, setAmount] = useState("");
    const [depositType, setDepositType] = useState(""); // Fiat or Crypto
    const [currency, setCurrency] = useState(""); // USD, ETH, BNB
    const [errors, setErrors] = useState({});

    // Currency options based on deposit type
    const currencyOptions = {
        fiat: ["USD"],
        crypto: ["ETH", "BNB","HAQQ"],
        coins:['USDT-BNB','USDC-BNB','USDT-ETH','USDC-ETH']
    };

    // Minimum deposit limits
    const minDepositLimits = {
        USD: 5000,  // Minimum 5,000 USD for Fiat
        ETH: 0.0001,   // Minimum 0.1 ETH for Crypto
        BNB: 0.5,   // Minimum 0.5 BNB for Crypto
        HAQQ:10,
        'USDT-BNB':10,
        'USDC-BNB':10,
        'USDT-ETH':10,
        'USDC-ETH':10
    };

    const maxDepositLimit = 100000; // Maximum limit (common for all)

    // Validate based on dynamic currency
    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .typeError("Amount must be a number")
            .min(minDepositLimits[currency] || 1, `Minimum deposit is ${minDepositLimits[currency] || 1}`)
            .max(maxDepositLimit, `Maximum deposit is ${maxDepositLimit}`)
            .required("Amount is required"),
        depositType: Yup.string()
            .oneOf(["fiat", "crypto",'coins'], "Invalid deposit type")
            .required("Deposit type is required"),
        currency: Yup.string()
            .oneOf([...currencyOptions.fiat, ...currencyOptions.crypto, ...currencyOptions.coins], "Invalid currency")
            .required("Currency is required"),
    });

    const handleDeposit = async () => {
        try {
            setErrors({});
            
            await validationSchema.validate({ amount, depositType, currency }, { abortEarly: false });

            setDepositDetails({
                type: depositType,
                currencyCode: currency,
                amount,
                chain: depositType === "crypto" ? "ETH" : depositType ==='fiat' ? "Fiat" :'USDT',
            });

            setIsConfirmModalOpen(true);
            closeModal();
        } catch (err) {
            const newErrors = err.inner.reduce((acc, error) => ({ ...acc, [error.path]: error.message }), {});
            setErrors(newErrors);
            notifyError("Please fill all fields correctly");
        }
    };

    return (
        <CustomModal isOpen={isOpen} closeModal={closeModal}>
            <div className="fund_ing">
                <h2>Enter amount to fund</h2>
                <div className="min-max">
                    <span>Min: {currency ? `${minDepositLimits[currency]} ${currency}` : "Select a currency"}</span>
                    <span>Max: {maxDepositLimit} USD</span>
                </div>

                {/* Deposit Type Selection */}
                <h2>Select Deposit Type</h2>
                <select className="form-control" onChange={(e) => {
                    setDepositType(e.target.value);
                    setCurrency(""); // Reset currency selection when type changes
                }}>
                    <option value="">Select</option>
                    <option value="fiat">Fiat Currency</option>
                    <option value="crypto">(Native) ETH, BNB, HAQQ</option>
                    <option value='coins'>(ERC-20 Token) USDT, USDC</option>
                </select>
                {errors.depositType && <span className="error_message">*{errors.depositType}</span>}

                {/* Currency Selection */}
                <h2>Select Currency</h2>
                <select className="form-control" value={currency} onChange={(e) => setCurrency(e.target.value)} disabled={!depositType}>
                    <option value="">Select</option>
                    {depositType && currencyOptions[depositType].map((curr) => (
                        <option key={curr} value={curr}>{curr}</option>
                    ))}
                </select>
                {errors.currency && <span className="error_message">*{errors.currency}</span>}

                {/* Amount Input */}
                <FormInput
                    Ftype="number"
                    onChange={(e) => setAmount(e.target.value)}
                    FName="Amount"
                    placeholder="Enter deposit amount"
                />
                {errors.amount && <span className="error_message">*{errors.amount}</span>}

                {/* Proceed Button */}
                <CustomButton
                    BtnName="Proceed"
                    onClick={handleDeposit}
                    disabled={!amount || !depositType || !currency}
                />
            </div>
        </CustomModal>
    );
};

export default DepositModal;
