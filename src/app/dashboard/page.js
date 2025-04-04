'use client'
import { LableTextComponent } from "@/components/common/CustomInput";
import LaunchPadHeader from "@/components/common/LaunchPadHeader";
import { getDataAPI } from "@/utils/API_Instance";
import { formatedAddress } from "@/utils/formatters";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns-tz";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const CountdownTimer = dynamic(() => import("@/components/DetailPageComponent/CountdownTimer"), { ssr: false });

export default function DashboardPage() {

  const { address, isConnected} = useAccount();
  const [userDeposit, setUserDeposit] = useState([]);


  useEffect(() => {
    if (isConnected && address) {
      fetchUserDeposit()
    }
  }, [address, isConnected])

  const fetchUserDeposit = async () => {
    try {
      console.log("amit")
      const res = await getDataAPI(`user/get-user-deposit`);
      console.log(res);
      if (res.status === 200) {
        setUserDeposit(res.data.userDeposits)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const statsDetail = {
    totalUser: 0,
    joinedUser: 0,
    notJoinedUser: 0,
    invitedUser: 0,
    invitationPending: 0
  }
  return (
    <>
      <LaunchPadHeader>

        <div className="dashboard_wrapper" style={{ background: '#1B1B1B' }}>
          <Container maxWidth="lg">
            <div className="mt-10 header_gap ">
              {/* <div className="project_page_grd"> */}
              <div className="DashHeading" style={{ marginTop: '72px', display: 'flex', justifyContent: 'space-between' }}>
                <div >
                  {isConnected && <h2 style={{ color: '#bdbdbd' }}>Hi {formatedAddress(address)}</h2>}
                  <p style={{ color: '#bdbdbd' }}>Welcome to Private Sale Dashboard</p>
                </div>

                <CountdownTimer targetDate={'2025-05-16'} />
              </div>
              <div className="AdminCardDiv">
                <LableTextComponent
                  Head2={"Total Tokens Allocated- Sphera World"}
                  Head={statsDetail?.totalUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Token Value"}
                  Head={statsDetail?.joinedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"NFT Type"}
                  Head={statsDetail?.notJoinedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"NFT Level"}
                  Head={statsDetail?.invitedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Vesting"}
                  Head={statsDetail?.invitationPending}
                  icons="fa-solid fa-wallet"
                />
              </div>

            </div>
            {/* </div> */}
            <section className="launchpad_table">
              <Container maxWidth="xlg">
                <h2 style={{ color: '#FF7F2A' }}>Funding Transaction</h2>
                <TableContainer component={Paper} className="table_bdr custom_tab">
                  <Table className="userTable" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="th_row">
                        <TableCell style={{ fontWeight: 700 }}>Funded Amount</TableCell>
                        <TableCell style={{ fontWeight: 700 }}>Transaction Hash</TableCell>
                        <TableCell style={{ fontWeight: 700 }}>Date</TableCell>

                        <TableCell style={{ fontWeight: 700 }}>Token Price</TableCell>
                        <TableCell style={{ fontWeight: 700 }}>Token Discount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userDeposit.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="">{item?.amount ? item?.amount : '150,000 USDT'} {item?.currency}</TableCell>
                          <TableCell className="">  {item?.txHash ? formatedAddress(item?.txHash) : '--'} </TableCell>
                          <TableCell className="">  {item?.createdAt ? format(new Date(item?.createdAt), "PP") : '876'} </TableCell>

                          <TableCell className="">{item?.tokenPrice ? item?.tokenPrice : 'N/A'}</TableCell>
                          <TableCell className="">{item?.tokenDiscount ? item?.tokenDiscount : 'N/A'}</TableCell>
                        </TableRow>

                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Container>

            </section>
          </Container>
        </div>

      </LaunchPadHeader>
    </>
  )
}
