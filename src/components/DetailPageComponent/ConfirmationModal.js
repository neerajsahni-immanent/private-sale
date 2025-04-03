import { FRONTEND_URL } from "@/utils/constants";
import { CustomButton } from "../common/CustomInput";
import CustomModal from "../Modal/Modal";
import Image from "next/image";

const ConfirmationModal = ({ isOpen, closeModal, depositToken, depositDetails  }) => {
    return (
        <CustomModal isOpen={isOpen} closeModal={closeModal}>
            <div className="fund_ing">
                <h2>Confirmation</h2>
                <div className="info">
                    <span>Network</span>
                    <span><Image src={`${FRONTEND_URL}/currency.png`} alt="USDT Icon" width={20} height={20}/>  {depositDetails?.currencyCode}</span>
                </div>
                <div className="info">
                    <span>Total Amount</span>
                    <span>{depositDetails?.amount} {depositDetails?.currencyCode}</span>
                </div>
                <CustomButton className="finish-btn" BtnName="Finish" onClick={depositToken} />
            </div>
        </CustomModal>
    );
};

export default ConfirmationModal;
