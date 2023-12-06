import React from "react";
import { Box, Stack } from "@mui/material";
import StatisticBox from "../../../../components/StatisticBox";
import theme from "../../../../Theme";

function StatisticsBoxes() {
  return (
    <Box sx={{ ...classes.main }}>
      <Stack spacing={1} direction={"row"} sx={{ ...classes.stackContainer }}>
        {/*Statistics Box Container */}
        <Box sx={{ ...classes.statisticsBoxContainer }}>
          <StatisticBox
            name={"Total Users"}
            amt={2995}
            prevAmt={2378}
           
          />
          <StatisticBox name={"Total Shoppers"} amt={422} prevAmt={390} />
          <StatisticBox name={"Total Merchants"} amt={265} prevAmt={255} />
          <StatisticBox name={"Banned Users"} amt={17} prevAmt={18} />
          <StatisticBox name={"Banned Shops"} amt={4280} prevAmt={4000} />
    
        </Box>
      </Stack>
    </Box>
  );
}

const classes = {
  main: {
    maxWidth: "1120px",
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
    "@media (max-width: 913px)": {
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
    "@media (max-width: 913px)": {
      px: 2,
      height: "150px",
      overflow: "auto",
      flexDirection: "column",
      width: "100%",
    },
  },
};
export default StatisticsBoxes;
