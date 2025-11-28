import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import AdminappBar from "../../Navbar/Admin";

// ✅ Custom Styled Cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// ✅ Alternate Row Colors
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Viewlearning() {
  const [data, setData] = useState([]);

  // ✅ Fetch student learning data
  const getData = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "learning");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching learning data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <AdminappBar />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h6"
          sx={{ textAlign: "left", fontWeight: "bold", mb: 2 }}
        >
          Student List
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Course Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((e, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">{e.name}</StyledTableCell>
                    <StyledTableCell align="center">{e.email}</StyledTableCell>
                    <StyledTableCell align="center">{e.status}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={4}>
                    No records found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}


// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import {Typography } from "@mui/material"; //button remove
// import { Box, Container } from "@mui/system";
// import axios from "axios";
// import { API_BASE_URL } from "../../../config";
// import { useNavigate } from "react-router-dom";
// import AdminappBar from "../../Navbar/Admin";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14
//   }
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0
//   }
// }));

// export default function Viewlearning() {
//   const [data, setdata] = useState([]);
//   const navigate = useNavigate();
//   function getData() {
//     axios.get(API_BASE_URL + "learning").then(res => {
//       setdata(res.data);
//     });
//   }
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Box>
//       <AdminappBar />

//       <Container sx={{ mt: 5 }}>
//         <Typography variant="h6" sx={{ textAlign: "left" }}>
//           Student List :
//         </Typography>
//         <br />
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="right">Id</StyledTableCell>
//                 <StyledTableCell align="right">Course Name</StyledTableCell>
//                 <StyledTableCell align="right">Email</StyledTableCell>
//                 <StyledTableCell align="right">Status</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((e, index) =>
//                 <StyledTableRow key={index}>
//                   <StyledTableCell component="th" scope="row" align="right">
//                     {index + 1}
//                   </StyledTableCell>
//                   <StyledTableCell component="th" scope="row" align="right">
//                     {e.name}
//                   </StyledTableCell>
//                   <StyledTableCell align="right">
//                     {e.email}
//                   </StyledTableCell>

//                   <StyledTableCell align="right">
//                     {e.status}
//                   </StyledTableCell>
//                 </StyledTableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </Box>
//   );
// }
