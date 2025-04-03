'use client'
import { LableTextComponent } from "@/components/common/CustomInput";
import LaunchPadHeader from "@/components/common/LaunchPadHeader";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns-tz";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("@/components/DetailPageComponent/CountdownTimer"), { ssr: false });

export default function DashboardPage() {
  const statsDetail = {
    totalUser: 100,
    joinedUser: 50,
    notJoinedUser: 30,
    invitedUser: 20,
    invitationPending: 10
  }
  const userDeposit = [
    {
      _id: '123456789',
      createdAt: '2023-10-01T12:00:00Z',
      amount: '150,000 USDT',
      tokenPrice: 'N/A',
      tokenDiscount: 'N/A'
    },
    {
      _id: '987654321',
      createdAt: '2023-10-02T12:00:00Z',
      amount: '200,000 USDT',
      tokenPrice: 'N/A',
      tokenDiscount: 'N/A'
    }
  ];
  return (
    <>
      <LaunchPadHeader>

        <div className="dashboard_wrapper" style={{ background: '#1B1B1B' }}>
          <Container maxWidth="lg">
            <div className="mt-10 header_gap ">
              {/* <div className="project_page_grd"> */}
              <div className="DashHeading" style={{ marginTop: '72px', display: 'flex' }}>
                <div>
                  <h2>Hi User,</h2>
                  <p>Welcome to Sphera Dashboard</p>
                </div>

                <CountdownTimer targetDate={'2025-05-16'} />
              </div>
              <div className="AdminCardDiv">
                <LableTextComponent
                  Head2={"Total Users"}
                  Head={statsDetail?.totalUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Joined "}
                  Head={statsDetail?.joinedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Pending Login"}
                  Head={statsDetail?.notJoinedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Invited"}
                  Head={statsDetail?.invitedUser}
                  icons="fa-solid fa-wallet"
                />
                <LableTextComponent
                  Head2={"Invitation Pending"}
                  Head={statsDetail?.invitationPending}
                  icons="fa-solid fa-wallet"
                />
              </div>

            </div>
            {/* </div> */}
            <section className="launchpad_table">
                 <Container maxWidth="xlg">
                   <h2>User Deposit History</h2>
                   <TableContainer component={Paper} className="table_bdr custom_tab">
                     <Table className="userTable" sx={{ minWidth: 650 }} aria-label="simple table">
                       <TableHead>
                         <TableRow className="th_row">
                           
                           <TableCell style={{ fontWeight: 700 }}>Transaction number </TableCell>
                           <TableCell style={{ fontWeight: 700 }}>Date</TableCell>
                           <TableCell style={{ fontWeight: 700 }}>Funding Amount</TableCell>
                           <TableCell style={{ fontWeight: 700 }}>Token Price</TableCell>
                           <TableCell style={{ fontWeight: 700 }}>Token Discount</TableCell>             
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {userDeposit.map((item, index) => (
                           <TableRow key={index}>
                             <TableCell className="">  {item?._id ? item?._id : '876ss'} </TableCell>
                             <TableCell className="">  {item?.createdAt ? format(new Date(item?.createdAt), "PP")  : '876'} </TableCell>
                             <TableCell className="">{item?.amount ? item?.amount : '150,000 USDT'}</TableCell>
                             <TableCell className="">{item?.tokenPrice ? item?.tokenPrice : 'N/A'}</TableCell>
                             <TableCell className="">{item?.tokenDiscount ? item?.tokenDiscount :'N/A'}</TableCell>       
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
