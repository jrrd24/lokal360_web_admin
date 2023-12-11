import React from "react";
import { Box, Stack } from "@mui/material";
import StatisticBox from "../../../../components/StatisticBox";
import theme from "../../../../Theme";

function StatisticsBoxes({ data }) {
  return (
    <Box sx={{ ...classes.main }}>
      <Stack spacing={1} direction={"row"} sx={{ ...classes.stackContainer }}>
        {/*Statistics Box Container */}
        <Box sx={{ ...classes.statisticsBoxContainer }}>
          <StatisticBox
            name={"Total Users"}
            amt={data?.userCount?.total_count || 0}
            type={"User"}
          />
          <StatisticBox
            name={"Total Shoppers"}
            amt={data?.shopperCount?.total_count || 0}
            type={"Shopper"}
          />
          <StatisticBox
            name={"Total Merchants"}
            amt={data?.shopOwnerCount?.total_count || 0}
            type={"Merchant"}
          />
          <StatisticBox
            name={"Total Employees"}
            amt={data?.employeeCount?.total_count || 0}
            type={"Employee"}
          />
        </Box>
      </Stack>
    </Box>
  );
}

const classes = {
  main: {
    maxWidth: "1400px",
    ...theme.components.box.mainContent,
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  stackContainer: {
    "@media (max-width: 1189px)": {
      ...theme.components.box.mainContent,
    },
    "@media (max-width: 900px)": {
      gap: "0px",
      minWidth: "100%",
    },
  },

  statisticsBoxContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexWrap: "wrap",
    order: 1,
    alignItems: "center",

    "@media (max-width: 1189px)": {
      order: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    "@media (max-width: 1200px)": {
      px: 2,
      height: "150px",
      overflow: "auto",
      flexDirection: "column",
      width: "100%",
    },
  },
};
export default StatisticsBoxes;
