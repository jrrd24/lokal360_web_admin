import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Zoom as ZoomTransition,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../../api/Api";
import BasicShopInfo from "./DialogComponents/BasicShopInfo";
import ShopAddress from "./DialogComponents/ShopAddress";
import ContactInfo from "./DialogComponents/ContactInfo";
import OperatingHours from "./DialogComponents/OperatingHours";
import LogoAndHeader from "./DialogComponents/LogoAndHeader";
import SelectColor from "./DialogComponents/SelectColor";

function ShopDetailsDialog({ open, handleClose, id }) {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [openLocation, setOpenLocation] = React.useState(false);
  const handleOpenLocation = () => {
    setOpenLocation(true);
  };
  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, isError } = useCustomQuery(
    "getShopInfo",
    () =>
      axiosPrivate.get(`/api/shopInfo?shopID=${id}`).then((res) => res.data),
    { enabled: id !== null, queryKey: ["getShopInfo", id] }
  );

  const {
    shopID,
    shop_name,
    type,
    description,
    Category: { category_name } = {},
    shipping_deliver_enabled,
    shipping_pickup_enabled,
    address_municipality,
    address_province,
    address_postal_code,
    address_region,
    address_line_1,
    address_line_2,
    address_barangay,
    latitude,
    longitude,
    phone_number,
    website_link,
    is_open_mon,
    is_open_tues,
    is_open_wed,
    is_open_thurs,
    is_open_fri,
    is_open_sat,
    is_open_sun,
    time_close,
    time_open,
    logo_img_link,
    header_img_link,
    custom_color_hex,
    sells_raw_mats,
  } = data?.shopInfo || {};

  // images
  const logoPath = logo_img_link ? `${BASE_URL}/${logo_img_link}` : "";
  const headerPath = header_img_link ? `${BASE_URL}/${header_img_link}` : "";

  //for days open (operating hours)
  const days = [
    { name: "Mon", value: is_open_mon },
    { name: "Tue", value: is_open_tues },
    { name: "Wed", value: is_open_wed },
    { name: "Thu", value: is_open_thurs },
    { name: "Fri", value: is_open_fri },
    { name: "Sat", value: is_open_sat },
    { name: "Sun", value: is_open_sun },
  ];

  return (
    <Dialog
      fullScreen={isSmScreen}
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      hideBackdrop={true}
      TransitionComponent={ZoomTransition}
      sx={{ backgroundColor: "#ECECEC80" }}
    >
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <div>
          <DialogTitle
            minHeight={70}
            sx={{ ...theme.components.dialog.dialogTitle }}
          >
            <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
              {/* Dialog Title*/}
              <Typography variant="sectionTitle">Shop Details</Typography>

              {/*  Buttons */}
              <DialogActions sx={{ gap: "16px" }}>
                <ButtonCloseDialog handleClose={handleClose} />
              </DialogActions>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
            <Box sx={{ ...theme.components.box.mainContent }}>
              {/*Main Content*/}
              <Box sx={{ ...classes.main }}>
                {/*Basic Shop Info*/}
                <Box sx={{ ...classes.content }}>
                  <BasicShopInfo
                    shopName={shop_name}
                    category={category_name}
                    type={type}
                    description={description}
                    deliver={shipping_deliver_enabled}
                    pickup={shipping_pickup_enabled}
                    sellsRawMaterials={sells_raw_mats}
                  />
                  <Divider />
                </Box>

                {/*Address Info*/}
                <Box sx={{ ...classes.content }}>
                  <ShopAddress
                    open={openLocation}
                    handleOpen={handleOpenLocation}
                    handleClose={handleCloseLocation}
                    addressLine1={address_line_1}
                    addressLine2={address_line_2}
                    barangay={address_barangay}
                    municipality={address_municipality}
                    region={address_region}
                    postalCode={address_postal_code}
                    province={address_province}
                    latitude={latitude}
                    longitude={longitude}
                    shopName={shop_name}
                  />
                  <Divider />
                </Box>

                <Divider />

                {/*Contact Info*/}
                <Box sx={{ ...classes.content }}>
                  <ContactInfo phoneNum={phone_number} website={website_link} />
                  <Divider />
                </Box>

                {/*Operating hours*/}
                <Box sx={{ ...classes.content }}>
                  <OperatingHours
                    days={days}
                    timeOpen={time_open}
                    timeClose={time_close}
                  />
                  <Divider />
                </Box>

                {/*Logo and Header*/}
                <Box sx={{ ...classes.content }}>
                  <LogoAndHeader logo={logoPath} header={headerPath} />
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}

const classes = {
  main: {
    ...theme.components.box.contentColumn,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    pt: 5,
    pb: 10,
  },

  displayInfo: {
    minWidth: "600px",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },

  content: {
    minWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};

export default ShopDetailsDialog;
