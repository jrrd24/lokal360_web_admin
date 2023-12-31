import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../Theme";


function  StatusUser({ status }) {
  const [colorType, setColorType] = useState("");

  useEffect(() => {
    if (status === "Banned") {
      setColorType("danger");
    } else if (status === "Temporary Ban") {
      setColorType("success");
    } else if (status === "Regular") {
      setColorType("success");
    } else if (status === "Warning Issued") {
      setColorType("warning");
      
    } else {
      setColorType("text");
    }
  }, [status]);

  const color = colorType ? theme.palette[colorType].main : "inherit";
  return (
    <Box
      sx={{
        minWidth: 120,
        border: "solid",
        borderWidth: 1,
        p: 0.5,
        borderColor: color,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="status" color={color}>
        {status}
      </Typography>
    </Box>
  );
}


export default StatusUser;