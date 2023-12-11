import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../Theme";
import { Block, Business, Campaign } from "@mui/icons-material";
import NumberFormat from "../utils/NumberFormat";
import { useNavigate } from "react-router-dom";

function AtAGlanceBox({ name, amt }) {
  const [colorType, setColorType] = useState("");
  const [icon, setIcon] = useState(null);
  const [link, setLink] = useState("/");
  const iconHW = 40;
  const navigate = useNavigate();

  const color = colorType ? theme.palette[colorType].main : "inherit";
  const bgColor = color + "40";

  useEffect(() => {
    if (name === "Pending Ban Reports") {
      setColorType("shopOwner");
      setIcon(<Block sx={{ height: iconHW, width: iconHW }} />);
      setLink("/admin/reports");
    } else if (name === "Shop Approval Requests") {
      setColorType("primary");
      setIcon(<Business sx={{ height: iconHW, width: iconHW }} />);
      setLink("/admin/shop_management");
    } else if (name === "Sitewide Ad Approval") {
      setColorType("shopper");
      setIcon(<Campaign sx={{ height: iconHW, width: iconHW }} />);
      setLink("/admin/lokal_ads");
    } else {
      setColorType("text");
    }
  }, [name]);

  return (
    <ButtonBase
      onClick={() => navigate(link)}
      sx={{
        ...theme.components.box.sectionContainer,
        width: 175,
        height: 250,
        px: 2,
        py: 1,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px Solid ${color}`,
        color: color,
        transition: "background-color 0.5s ease",
        "&:hover": {
          backgroundColor: bgColor,
        },
      }}
    >
      <Stack spacing={1} width={"100%"}>
        {icon && <Box sx={{ color: color }}>{icon}</Box>}

        <Stack spacing={2}>
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
            <NumberFormat value={amt} />
          </Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
}

export default AtAGlanceBox;
