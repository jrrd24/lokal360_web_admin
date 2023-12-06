import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../../../../Theme";
import DisplayDateSelection from "../../../../components/DisplayDateSelection";
import CustomLineChart from "../../../../components/CustomLineChart";

const data = [
  {
    name: "Monday",
    Total_Sales: 4000,
    Products_Sold: 2400,
  },
  {
    name: "Tuesday",
    Total_Sales: 3000,
    Products_Sold: 1398,
  },
  {
    name: "Wednesday",
    Total_Sales: 2000,
    Products_Sold: 9800,
  },
  {
    name: "Thursday",
    Total_Sales: 2780,
    Products_Sold: 3908,
  },
  {
    name: "Friday",
    Total_Sales: 1890,
    Products_Sold: 4800,
  },
  {
    name: "Saturday",
    Total_Sales: 2390,
    Products_Sold: 3800,
  },
  {
    name: "Sunday",
    Total_Sales: 3490,
    Products_Sold: 4300,
  },
];

const lines = [
  { dataKey: "Total_Sales", stroke: "#6E5FDE" },
  { dataKey: "Products_Sold", stroke: "#F18701" },
];

function GraphSalesAnalytics() {
  return (
    <Stack spacing={3} direction={"column"} sx={{ ...classes.main }}>
      {/*Section Header */}
      <Stack spacing={2} direction={"row"} sx={{ ...classes.sectionHeader }}>
        {/*Section Name */}
        <Stack>
          <Typography variant="sectionTitle" sx={{ textAlign: "left" }}>
           User Activity&nbsp;-&nbsp;
            <Typography
              variant="inherit"
              component={"span"}
              sx={{
                color: `${theme.palette.text.sixty}`,
              }}
            >
             System Users Graph
            </Typography>
          </Typography>
        </Stack>

        {/*Date time */}
        <Box sx={{ ...classes.dateTimeContainer }}>
          <DisplayDateSelection />
        </Box>
      </Stack>

      {/*Section Content */}
      <Box sx={{ ...classes.sectionContent }}>
        {/*TODO: Add Graph Here */}
        {/*Graph */}
        <CustomLineChart
          data={data}
          lines={lines}
          downloadFileName={"Product_Sales_Graph.png"}
        />
      </Box>
    </Stack>
  );
}

const classes = {
  main: {
    "@media (max-width: 1516px)": {
      justifyContent: "center",
    },
  },
  sectionHeader: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    flexWrap: "wrap",
  },
  sectionContent: {
    maxWidth: "99%",
    height: "350px",
  },
};

export default GraphSalesAnalytics;
