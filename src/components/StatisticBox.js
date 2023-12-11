import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import theme from "../Theme";
import NumberFormat from "../utils/NumberFormat";
import { BadgeRounded, Group, ShoppingBag, Store } from "@mui/icons-material";

function StatisticBox({ name, amt, prevAmt, isMoney, type }) {
  const [colorType, setColorType] = useState("");
  const [icon, setIcon] = useState(null);
  const iconHW = 30;

  useEffect(() => {
    if (type === "User") {
      setColorType("primary");
      setIcon(<Group sx={{ height: iconHW, width: iconHW }} />);
    } else if (type === "Merchant") {
      setColorType("shopOwner");
      setIcon(<Store sx={{ height: iconHW, width: iconHW }} />);
    } else if (type === "Employee") {
      setColorType("shopEmployee");
      setIcon(<BadgeRounded sx={{ height: iconHW, width: iconHW }} />);
    } else if (type === "Shopper") {
      setColorType("shopper");
      setIcon(<ShoppingBag sx={{ height: iconHW, width: iconHW }} />);
    } else {
      setColorType("text");
    }
  }, [type]);

  const color = colorType ? theme.palette[colorType].main : "inherit";
  const bgColor = color + "40";
  return (
    <Box
      sx={{
        ...theme.components.box.sectionContainer,
        backgroundColor: bgColor,
        width: 250,
        minHeight: 110,
        px: 2,
        py: 1,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon && <Box sx={{ marginRight: 3, color: color }}>{icon}</Box>}

      <Stack spacing={1} width={"100%"}>
        <Stack spacing={-0.5}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: theme.palette.text.sixty,
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="sectionHeader"
            sx={{
              fontWeight: 700,
              fontSize: 30,
              color: color,
            }}
          >
            <NumberFormat value={amt} isPeso={isMoney} />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default StatisticBox;
