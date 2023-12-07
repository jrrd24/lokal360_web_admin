import React from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import StatisticsBoxes from "./AnalyticsComponents/StatisticsBoxes";
import GraphSalesAnalytics from "./AnalyticsComponents/GraphSalesAnalytics";
import TopProducts from "./AnalyticsComponents/TopProducts";
import SoldPerCategory from "./AnalyticsComponents/SoldPerCategory";
import GraphProductStatus from "./AnalyticsComponents/GraphProductStatus";
import GraphShopTraffic from "./AnalyticsComponents/GraphShopTraffic";
import theme from "../../../Theme";
import DateRangePicker from "../../../components/Pickers/DateRangePicker";
import UnderContruction from "../../../components/Loading/UnderContruction";

function AnalyticsContent() {
  let underContruction = true;
  return (
    <Box sx={{ ...theme.components.box.pageContainer }}>
      <PageInfoComponent
        PageName={"Analytics"}
        Subtitle={"View Realtime Product and Shop Analytics"}
      />

      {/*Page Content */}
      {underContruction ? (
        <UnderContruction />
      ) : (
        <Box sx={{ ...theme.components.box.mainContent }}>
          {/*Statistics Boxes Section*/}
          <Box sx={{ ...classes.statisticsBoxContainer }}>
            <StatisticsBoxes />
          </Box>

          {/*Main Content*/}
          <Box sx={{ ...theme.components.box.mainContent, order: 2 }}>
            {/*Graphs (Left Side)*/}
            <Box sx={{ ...classes.leftContainer }}>
              {/*Product Sales Graph*/}
              <Box sx={{ ...theme.components.box.graphContainer }}>
                <GraphSalesAnalytics />
              </Box>

              {/*Product Sales Graph*/}
              <Box sx={{ ...theme.components.box.graphContainer }}>
                <GraphProductStatus />
              </Box>

              {/*Product Sales Graph*/}
              <Box sx={{ ...theme.components.box.graphContainer }}>
                <GraphShopTraffic />
              </Box>
            </Box>

            {/*Product Info (Right Side)*/}
            <Box sx={{ ...classes.rightContainer }}>
              {/*Date time */}
              <Box sx={{ ...classes.dateTimeContainer }}>
                <DateRangePicker />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const classes = {
  statisticsBoxContainer: {
    minWidth: "1120px",
    order: 1,
    "@media (max-width: 1516px)": {
      order: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  leftContainer: {
    ...theme.components.box.contentColumn,
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  rightContainer: {
    ...theme.components.box.contentColumn,
    "@media (max-width: 1516px)": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  dateTimeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexWrap: "wrap",
    "@media (max-width: 1189px)": {
      flexDirection: "row",
      gap: "16px",
      minWidth: "30%",
    },
  },

  topProducts: {
    ...theme.components.box.sectionContainer,
    maxWidth: "340px",
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "60%",
    },
    "@media (max-width: 1020px)": {
      minWidth: "100%",
    },
  },

  soldPerCategory: {
    ...theme.components.box.sectionContainer,
    maxWidth: "340px",
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};
export default AnalyticsContent;
