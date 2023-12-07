import React, { useState } from "react";
import { Box } from "@mui/material";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import theme from "../../../Theme";
import PendingShops from "./ShopsManagementComponent/PendingShops";
import AllShops from "./ShopsManagementComponent/AllShops";
import useAlert from "../../../hooks/useAlert";
import CustomAlert from "../../../components/CustomAlert";

function ShopsManagementContent() {
  const [open, setOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Handle Alert Click
  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  const handleSave = (severity, alertMsg) => {
    showAlert(severity, alertMsg);
  };

  return (
    <div>
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
              <PendingShops
                handleSave={handleSave}
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            </Box>
            {/*All Shops*/}
            <Box sx={{ ...classes.customersContainer }}>
              <AllShops />
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
