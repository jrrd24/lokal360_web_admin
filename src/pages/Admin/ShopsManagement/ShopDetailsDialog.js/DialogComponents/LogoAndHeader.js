import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import styles from "../../../../../css/Styles.module.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function LogoAndHeader({ logo, header }) {
  return (
    <Stack spacing={3} width={"100%"}>
      {/*Section Name */}
      <Stack
        direction={"row"}
        sx={{ alignItems: "baseline", justifyContent: "space-between" }}
      >
        <Typography variant="sectionTitleSmall">Logo and Header</Typography>
      </Stack>

      {/*Shop Logo */}
      <Stack spacing={1}>
        <Typography variant="sectionSubtitle">Logo</Typography>
        <Box className={`${styles.grow}`}>
          <Zoom>
            <img
              src={
                logo ||
                require("../../../../../assets/product_placeholder_big.jpg")
              }
              alt="Shop logo"
              loading="eager"
              style={{ ...classes.image, height: 150, width: 150 }}
            />
          </Zoom>
        </Box>
      </Stack>

      {/*Shop Header */}
      <Stack spacing={1}>
        <Typography variant="sectionSubtitle">Header</Typography>
        <Box className={`${styles.grow}`}>
          <Zoom>
            <img
              src={header || require("../../../../../assets/placeholder.png")}
              alt="Shop Header"
              style={{ ...classes.image, height: 180, width: 320 }}
            />
          </Zoom>
        </Box>
      </Stack>
    </Stack>
  );
}

const classes = {
  image: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    border: "solid",
    borderColor: `#44444433`,
    borderWidth: 2,
    objectFit: "cover",
  },
};

export default LogoAndHeader;
