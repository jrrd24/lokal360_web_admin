import React from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import StatisticsBoxes from "./AnalyticsComponents/StatisticsBoxes";
import theme from "../../../Theme";
import {Typography } from "@mui/material";
import ShopRequest from "./AnalyticsComponents/ShopRequest";
import PendingReports from "./AnalyticsComponents/PendingReports";
import TopCategories from "./AnalyticsComponents/TopCategories";
import LokalAdsRequest from "./AnalyticsComponents/LokalAdsRequest";


function DashboardContent() {
  return (
    <Box sx={{ ...theme.components.box.pageContainer }}>
      <PageInfoComponent PageName={"Admin"} Subtitle={"Welcome, Admin 1"} />

      {/* Page Content */}
      <Box sx={{ ...theme.components.box.mainContent, justifyContent: "start" }}>
        {/* Statistics Boxes Section */}
        <StatisticsBoxes />
        {/* Include the DataGridCustomers component here */}
        <Box direction={"row"} sx={{ ...classes.sectionName }}>
        </Box>

          <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <Box sx={{ ...classes.customersContainer }}>
            <ShopRequest/> 
          </Box>
          
          <Box sx={{ ...classes.customersContainer }}>
           <PendingReports/>
          </Box>

          <Box sx={{ ...classes.customersContainer }}>
           <TopCategories/>
          </Box>
          
          <Box sx={{ ...classes.customersContainer }}>
           <LokalAdsRequest/>
          </Box> </Box>        
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

export default DashboardContent;