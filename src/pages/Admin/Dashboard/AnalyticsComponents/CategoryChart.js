import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { BarChart } from "@mui/x-charts";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { axisClasses } from "@mui/x-charts";

function CategoryChart() {
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: categoryData, isLoading } = useCustomQuery(
    "getAllCategories",
    () =>
      axiosPrivate
        .get(`/api/admin_get/all_categories/`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  const chartSetting = {
    maxWidth: 1000,
    height: 350,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
      width: "100%",
    },
  };

  const xAxisConfig = {
    scaleType: "band",
    dataKey: "category_name",
  };

  const seriesConfig = [
    {
      dataKey: "count_product",
      label: "Number of Products",
    },
    {
      dataKey: "count_shop",
      label: "Number of Shops",
    },
  ];

  return (
    <Box sx={{ ...classes.main }}>
      {/* Section Name */}
      <Typography
        variant="sectionTitle"
        sx={{ textAlign: "left", width: "100%" }}
      >
        Categories
      </Typography>

      <Box sx={{ width: "100%", mt: -5 }}>
        <BarChart
          dataset={categoryData.categories}
          xAxis={[xAxisConfig]}
          series={seriesConfig}
          colors={[theme.palette.shopper.main, theme.palette.primary.main]}
          slotProps={{
            legend: { hidden: true },
          }}
          {...chartSetting}
        />
      </Box>
    </Box>
  );
}

const classes = {
  main: {
    ...theme.components.box.mainContent,
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    justifyContent: "left",
  },
};

export default CategoryChart;
