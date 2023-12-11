import React from "react";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import { Box } from "@mui/material";
import theme from "../../../Theme";
import AdsStatus from "./LokalAdsComponents/AdsStatus";
import MyLokalAds from "./LokalAdsComponents/MyLokalAds";
import useAlert from "../../../hooks/useAlert";
import CustomAlert from "../../../components/CustomAlert";

function LokalAdsContent() {
  // Handle Alert Click
  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  return (
    <div>
      <Box sx={{ ...theme.components.box.pageContainer }}>
        <PageInfoComponent
          PageName={"Lokal Ads"}
          Subtitle={"Manage Sidewide Campaigns"}
        />
        {/*Main Content*/}
        <Box sx={{ ...theme.components.box.mainContent }}>
          {/*Ads Status / My Lokal Ads*/}
          <Box sx={{ ...classes.leftContainer }}>
            {/*Ads Status*/}
            <Box sx={{ ...classes.contentContainer }}>
              <AdsStatus />
            </Box>

            {/*My Lokal Ads*/}
            <Box sx={{ ...classes.contentContainer }}>
              <MyLokalAds showAlert={showAlert} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/*Display Alert */}
      <CustomAlert
        open={openAlert}
        setOpen={hideAlert}
        severity={severity}
        alertMsg={alertMsg}
      />
    </div>
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

  contentContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "1120px",
    "@media (max-width: 1516px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};
export default LokalAdsContent;
