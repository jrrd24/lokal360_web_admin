import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../Theme";
import { ColorLens } from "@mui/icons-material";

function  StatusUser({ status }) {
  const [colorType, setColorType] = useState("");

  useEffect(() => {
    if (status === "Banned") {
      setColorType("danger");
    } else if (status === "Regular") {
      setColorType("success");
    } else {
      setColorType("text");
    }
  }, [status]);

  const color = colorType ? theme.palette[colorType].main : "inherit";
 
  return (
    <Box
      sx={{
        minWidth: 100,
        p: 0.5,
       
        borderRadius: 5,
      }}
    >
      <Typography variant="status" color={color}>
        {status}
      </Typography>
    </Box>
  );
}

export default StatusUser;
