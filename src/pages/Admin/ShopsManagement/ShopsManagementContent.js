import React from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import theme from "../../../Theme";
import PendingShops from "./ShopsManagementComponent/PendingShops";
import AllShops from "./ShopsManagementComponent/AllShops";

function ShopsManagementContent() {
  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      <PageInfoComponent
        PageName={"Shops Management"}
        Subtitle={"View and Manage Shop Approval Requests"}
      />
      {/*Main Content*/}
      <Box sx={{ ...theme.components.box.mainContent }}>
        {/*(Left Side)*/}
        <Box sx={{ ...classes.leftContainer }}>
          {/*Pending Shops*/}
          <Box sx={{ ...classes.customersContainer }}>
            <PendingShops />
          </Box>
          {/*All Shops*/}
          <Box sx={{ ...classes.customersContainer }}>
            <AllShops />
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

  customersContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "600px",
    "@media (max-width: 912px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};

export default ShopsManagementContent;
