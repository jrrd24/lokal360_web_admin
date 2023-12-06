import React from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import theme from "../../../Theme";
import MyPromos from "./PromosShopComponents/MyPromos";

function CategoryContent() {
  return (
    <Box sx={{ ...theme.components.box.pageContainer }}>
      <PageInfoComponent
        PageName={"Categories"}
        Subtitle={
          "View and Manage Lokal 360's Categories"
        }
      />

      {/*Main Content*/}
      <Box sx={{ ...theme.components.box.mainContent }}>
        {/*(Left Side)*/}
        <Box sx={{ ...classes.leftContainer }}>
          {/*My Customers*/}
          <Box sx={{ ...classes.customerContainer }}>
            <MyPromos />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const classes = {
  leftContainer: {
    ...theme.components.box.contentColumn,
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  customerContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "600px",
    order: 1,
    "@media (max-width: 912px)": {
      order: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};
export default CategoryContent;
