import React, { useEffect, useState } from "react";
import theme from "../../../Theme";
import { Box, Typography } from "@mui/material";

function ShopStatus({ status }) {
  const [colorType, setColorType] = useState("");

  useEffect(() => {
    if (status === "Approved") {
      setColorType("success");
    } else if (status === "Rejected") {
      setColorType("danger");
    } else if (status === "Pending Approval") {
      setColorType("orange");
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
        {status === "Pending Approval" ? "Pending" : status}
      </Typography>
    </Box>
  );
}

export default ShopStatus;
