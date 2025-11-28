import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { coursename, cost } = location.state || {}; // ✅ safe fallback
  const date = new Date();
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <Stack
      sx={{
        background: "#fff",
        width: "fit-content",
        paddingBlock: "60px",
        paddingInline: "50px",
        margin: "auto",
      }}
      spacing={5}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: "40px" }} />
        <Typography variant="h5">ORDER RECEIPT</Typography>
      </Box>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ color: "black", textAlign: "left" }}>
          Course Name : {coursename || "N/A"}
        </Typography>
        <Typography variant="h6" sx={{ color: "black", textAlign: "left" }}>
          Cost : {cost || "N/A"}
        </Typography>
        <Typography variant="h6" sx={{ color: "black", textAlign: "left" }}>
          Date & Time : {formattedDate}
        </Typography>
        <Typography variant="h6" sx={{ color: "black", textAlign: "left" }}>
          Payment Status : Paid
        </Typography>
      </Stack>

      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Thank you for shopping with us!
      </Typography>

      <Box sx={{ margin: "auto", marginTop: "20px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px", // ✅ fixed
            width: "fit-content",
          }}
          onClick={() => navigate("/Mysubscription")}
        >
          VIEW SUBSCRIPTION
        </Button>
      </Box>
    </Stack>
  );
};

export default Receipt;
