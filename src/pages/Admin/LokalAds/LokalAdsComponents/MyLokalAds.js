import React from "react";
import DataGridAds from "./DataGridAds";
import theme from "../../../../Theme";
import ButtonAdd from "../../../../components/Buttons/ButtonAdd";
import NewAdvertismentDialog from "./NewAdvertismentDialog/NewAdvertismentDialog";
import { Box, Stack, Typography } from "@mui/material";

function MyLokalAds({ showAlert }) {
  // Handle Open Dialog Box (AddProduct)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} direction={"column"}>
          {/*Section Name */}
          <Box direction={"row"} sx={{ ...classes.sectionName }}>
            <Typography variant="sectionTitle">All Sitewide Ads</Typography>
            <ButtonAdd label={"New LokalAd"} onClickAction={handleOpen} />

            {/*TODO: Add onClick for Button */}
          </Box>
          <DataGridAds showAlert={showAlert} />
        </Stack>
      </Box>

      {/*New Promo Dialog Box */}
      <NewAdvertismentDialog open={open} handleClose={handleClose} />
    </div>
  );
}

const classes = {
  sectionName: {
    ...theme.components.box.sectionName,
    "@media (max-width: 415px)": {
      gap: "6px",
    },
  },
};
export default MyLokalAds;
