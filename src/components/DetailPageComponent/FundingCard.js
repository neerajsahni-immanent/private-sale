
import Image from "next/image";

// import { format } from "date-fns-tz";
import { formatNumber } from "@/utils/formatters";
import { FRONTEND_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
// import { getDataAPI } from "@/utils/API_Instance";
import { CustomButton } from "../common/CustomInput";
import dynamic from "next/dynamic";
import { getDataAPI } from "@/utils/API_Instance";
const CountdownTimer = dynamic(() => import("./CountdownTimer"), { ssr: false });

const FundingCard = ({ projectDetail, onOpenDeposit }) => {
  const [totalRaised, setTotalRaised] = useState({ amount: 1.68, percentage: 10, participants: 0 })

  useEffect(() => {
    fetchToatalUSDTRaised();
  }, [])
  const fetchToatalUSDTRaised = async () => {
    try {
        const res= await getDataAPI('project/get-total-usdt-deposited');
        console.log(res.data,'total usdt raised')
        if(res.status === 200){
          setTotalRaised(res.data)
        }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className="fund_card">
      <div className="fund_raise">
        <h5 className="">Targeted Raise<span><Image src={`${FRONTEND_URL}/currency.png`} alt="" width={16} height={16} />&nbsp; {formatNumber(projectDetail.funding.targetedRaise.amount)} {projectDetail.funding.targetedRaise.currency}</span></h5>
        <button className="ongoing">{projectDetail.funding.status}</button>
      </div>
      <div className="grey_box">
        <p>Network: <span className=""><Image src={`${FRONTEND_URL}/currency.png`} alt="" width={12} height={12} />&nbsp; Tether (USDT)</span></p>
        <p>Participants: <span className="">{totalRaised
          .participants} Participants</span></p>
        <p>Start Date: <span className="">{
          // format(new Date(projectDetail.funding.startDate), "PPP")
          projectDetail.funding.startDate
        }</span></p>
      </div>

      <div className="mt-6">
        <div class="progress">
          <div class="progress-bar" role="progressbar" aria-valuenow={totalRaised.percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${totalRaised.percentage}%` }}>
            <span>{totalRaised.percentage}%</span>
          </div>
        </div>


        <p><strong>Total Raised:</strong> <span className="">{formatNumber(totalRaised.amount)} {projectDetail.funding.totalRaised.currency}</span></p>
        <div className="">
          <div className="" style={{ width: "50%" }}></div>
        </div>
      </div>

      <CountdownTimer targetDate={projectDetail.funding.endDate} />

      <CustomButton BtnName={'Fund Project'} onClick={onOpenDeposit} />
    </div>
  );
};


export default FundingCard;