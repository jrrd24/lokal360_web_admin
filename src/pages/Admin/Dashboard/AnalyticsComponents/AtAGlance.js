import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import AtAGlanceBox from "../../../../components/AtAGlanceBox";
import theme from "../../../../Theme";

function AtAGlance({ data }) {
  return (
    <Stack spacing={3} direction={"column"} sx={{ ...classes.main }}>
      {/*Section Name */}
      <Typography variant="sectionTitle" sx={{ textAlign: "left" }}>
        Lokal 360 At A Glance
      </Typography>

      <Stack spacing={2} direction={"row"} sx={{ ...classes.stackContainer }}>
        <Box sx={{ ...classes.glanceBoxContainer }}>
          <AtAGlanceBox
            name={"Pending Ban Reports"}
            amt={data?.banReportCount}
          />
          <AtAGlanceBox
            name={"Shop Approval Requests"}
            amt={data?.shopApprovalCount}
          />
          <AtAGlanceBox
            name={"Sitewide Ad Approval"}
            amt={data?.sitewideAdCount}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

const classes = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
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

  glanceBoxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "290px",
    px: 2,
    "@media (max-width: 1200px)": {
      overflow: "auto",
      width: "100%",
      gap: "16px",
    },
  },
};

export default AtAGlance;
