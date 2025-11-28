import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Products from "../Product/Home";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check token on mount
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]); // ✅ Added dependency

  return (
    <Box>
      <Products />
    </Box>
    // <Box sx={{ p: 3 }}>
    //   <h2>Welcome to User Dashboard!</h2>
    //   <p>You have successfully logged in.</p>
    // </Box>
  );
};

export default Home;


// import { Box } from "@mui/system";
// import React, { useEffect } from "react";
// import Products from "../Product/Home";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/");
//     }
//   }, []);
//   return (
//     <Box>
//       <Products />
//     </Box>
//   );
// };

// export default Home;
