// // src/components/home/Homepage.js
// import { Box } from "@mui/material";
// import React from "react";
// import Login from "../user/Login/Form";

// const Homepage = () => {
//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
//       <Login />
//     </Box>
//   );
// };

// export default Homepage;


import { Box } from "@mui/material";
import React from "react";
import Login from "../user/Login/Form";

const Homepage = () => {
  return (
     
    <Box sx={{ display: "inline", justifyContent: "center", mt: 5 }}>
      
      <Login />
     
    </Box>
  );
};

export default Homepage;
