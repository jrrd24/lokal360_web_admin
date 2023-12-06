import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../Theme";

function CustomerStatus({ status }) {
  const [colorType, setColorType] = useState("");

  useEffect(() => {
    if (status === "Shopper") {
      setColorType("success");
    } else if (status === "Merchant") {
      setColorType("danger");
    } else if (status === "Employee") {
      setColorType("warning");
    } else if (status === "N/A") {
      setColorType("primary");
    } else {
      setColorType("text");
    }
  }, [status]);

  const color = colorType ? theme.palette[colorType].main : "inherit";
  const bgColor = color + "40"

  return (
    <Box
      sx={{
        minWidth: 100,
        p: 0.5,
        backgroundColor: bgColor,
        borderRadius: 5,
      }}
    >
      <Typography variant="status" color={color}>
        {status}
      </Typography>
    </Box>
  );
}

export default CustomerStatus;
