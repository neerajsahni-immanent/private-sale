import Image from "next/image";
import { GreenButton, BlueButton } from "../common/CustomInput";
import { FRONTEND_URL } from "@/utils/constants";

const ListingCardHeader = ({name, projectStatus, isRefundable}) => {
    return (
        <div class="project-header">
            
            <div className="card_det"><Image src={`${FRONTEND_URL}/deca4.png`} alt="Project Logo" class="project-logo" width={50} height={50} />
            <div>
            <h3>{name}</h3>
            <div className="card_btns">
            <GreenButton BtnName={projectStatus } />
            <BlueButton BtnName={isRefundable}/>
            </div>
            </div></div>
        </div>
    )
}

export default ListingCardHeader;