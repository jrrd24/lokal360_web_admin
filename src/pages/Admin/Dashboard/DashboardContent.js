import React from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import StatisticsBoxes from "./AnalyticsComponents/StatisticsBoxes";
import theme from "../../../Theme";
import { LoadingCircle } from "../../../components/Loading/Loading";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UserPie from "./AnalyticsComponents/UserPie";
import AtAGlance from "./AnalyticsComponents/AtAGlance";
import CategoryChart from "./AnalyticsComponents/CategoryChart";


function DashboardContent() {
  //API CALL GET DASHBOARD CONTENT
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useCustomQuery(
    "getDashboard",
    () => axiosPrivate.get(`/api/admin_get/dashboard`).then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box sx={{ ...theme.components.box.pageContainer }}>
      <PageInfoComponent PageName={"Admin"} Subtitle={"Welcome, Admin"} />

      {/* Page Content */}
      <Box sx={{ ...theme.components.box.mainContent }}>
        {/* Statistics Boxes Section */}
        <StatisticsBoxes data={data?.userData} />

        <Box sx={{ ...classes.fullWidth }}>
          <Box sx={{ ...classes.glanceContainer }}>
            <AtAGlance data={data?.atAGlance} />
          </Box>

          <Box sx={{ ...classes.pieContainer }}>
            <UserPie rawData={data?.userData} />
          </Box>
        </Box>

        <Box sx={{ ...classes.fullWidth }}>
          <Box sx={{ ...classes.categoryChartContainer }}>
            <CategoryChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const classes = {
  fullWidth: {
    width: "100%",
    maxWidth: 1050,
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      gap: "16px",
    },
  },

  pieContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "350px",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  glanceContainer: {
    ...theme.components.box.sectionContainer,
    maxWidth: "650px",
    width: "100%",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  categoryChartContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "100%",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

export default DashboardContent;
