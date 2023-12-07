import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "../../../../css/Styles.module.css";
import CustomLink from "../../../../components/CustomLink";
import { Category } from "@mui/icons-material";
import MyPromos from "../../Category/PromosShopComponents/MyCategories";

function TopCategories() {
  return (
    <Box direction={"row"} sx={{ ...classes.sectionName }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
          gap: "18.8rem",
        }}
      >
        <Typography variant="sectionTitle">Top Categories</Typography>
        <Box className={`${styles.grow}`}>
          <CustomLink to="/admin/category"> {"See All"}</CustomLink>
        </Box>
      </Box>
      <MyPromos></MyPromos>
      {/*TODO: Add onClick for Button */}
    </Box>
  );
}
const classes = {};
export default TopCategories;
