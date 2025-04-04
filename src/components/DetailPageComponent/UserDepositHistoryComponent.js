import { getDataAPI } from "@/utils/API_Instance";
import { FRONTEND_URL } from "@/utils/constants";
import { Container, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
// import { format } from "date-fns-tz";
import Image from "next/image";
import { useEffect, useState } from "react"

const UserDepositHistoryComponent =({userId})=>{
const [userDeposit, setUserDeposit]= useState([]);
useEffect(()=>{
    // if(userId){
        fetchUserDeposit()
    // }

},[])


const fetchUserDeposit = async()=>{
    try {
        const res = await getDataAPI(`user/get-user-deposit`);
        console.log(res);
        if(res.status === 200){
            setUserDeposit(res.data.userDeposits)
        }
    } catch (error) {
        console.log(error);
    }
}
    return (
        <section className="launchpad_table">
          <Container maxWidth="xlg">
            <h2>User Deposit History</h2>
            <TableContainer component={Paper} className="table_bdr custom_tab">
              <Table className="userTable" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="th_row">
                    
                    <TableCell style={{ fontWeight: 700 }}>Amount </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>Currency</TableCell>
                    <TableCell style={{ fontWeight: 700 }}>Allocated USDT</TableCell>
                    <TableCell style={{ fontWeight: 700 }}>Date</TableCell>



                  </TableRow>
                </TableHead>
                <TableBody>
                  {userDeposit.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="opea">  {item?.amount ? item?.amount : 'Opensea'} </TableCell>
                      <TableCell className="raise"><Image src={`${FRONTEND_URL}/currency.png`} alt="" width={14} height={14} />&nbsp;{item?.currency ? item?.currency : '150,000 USDT'}</TableCell>
                      <TableCell className="raise"><Image src={`${FRONTEND_URL}/currency.png`} alt="" width={14} height={14} />&nbsp;{item?.allocated ? item?.allocated : '500,000 USDT'}</TableCell>
                      <TableCell>{item?.createdAt ? 
                    //   format(new Date(item?.createdAt), "PP") 
                    item?.createdAt
                       : '876'}</TableCell>
                      

                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </Container>

        </section>
    )
}

export default UserDepositHistoryComponent