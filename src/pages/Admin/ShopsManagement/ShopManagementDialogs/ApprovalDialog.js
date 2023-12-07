import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import theme from "../../../../Theme";
import ButtonSave from "../../../../components/Buttons/ButtonSave";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { ReadOnlyCustomInput } from "../../../../components/FormComponents/CustomInput";
import { Phone } from "@mui/icons-material";
import { ProductsCategory } from "../../../../utils/MapSelectMenuItems";
import { ReadOnlyPhoneNumberPicker } from "../../../../components/FormComponents/CustomPhoneNumberPicker";
import { BASE_URL } from "../../../../api/Api";
import ShopStatus from "../../../../components/ShopOnly/StatusAndTags/ShopStatus";

function ApprovalDialog({ open, handleClose, isSmScreen, handleSave, id }) {
  //API CALL GET REQUEST DETAILS
  const { useCustomQuery, useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useCustomQuery(
    "getRequestDetails",
    () =>
      axiosPrivate
        .get(
          `/api/register_shop/registration_details/?shopRegistrationID=${id}`
        )
        .then((res) => res.data),
    {
      enabled: id !== null,
      queryKey: ["getRequestDetails", id],
    }
  );

  const labels = {
    attachment_DTI_CBNR: "DTI Certificate of Business Name Registration",
    attachment_DTI_other: "Other DTI Form",
    attachment_BIR_COR: "BIR Certificate of Registration",
    attachment_valid_id_front: "Valid Government Issued ID (Front)",
    attachment_valid_id_back: "Valid Government Issued ID (Back)",
    attachment_products_list: "Store Products / Menu",
  };

  const onSubmit = (data) => {
    console.log(data); // Form data
  };

  const productsCategory = ProductsCategory();

  return (
    <div>
      <Dialog
        fullScreen={isSmScreen}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        hideBackdrop={true}
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
                <Typography variant="sectionTitle">
                  Review Shop Approval Request
                </Typography>

                {/*  Buttons */}
                <DialogActions
                  sx={{
                    gap: "16px",
                    display: { xs: "none", sm: "none", md: "block" },
                  }}
                >
                  {data?.status === "Pending Approval" ? <ButtonReject /> : ""}
                  {data?.status === "Pending Approval" ? <ButtonApprove /> : ""}

                  <ButtonCloseDialog handleClose={handleClose} />
                </DialogActions>
              </Box>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
              {/*Main*/}
              <Stack spacing={2} sx={{ width: "600px", py: 5 }}>
                <Stack spacing={5}>
                  {/*Status */}
                  <Stack spacing={1}>
                    <Typography variant="sectionTitleSmall">Status</Typography>
                    <Box sx={{ maxWidth: 100, textAlign: "center" }}>
                      <ShopStatus status={data?.status} />
                    </Box>
                  </Stack>

                  <Divider />

                  {/*Owner Info */}
                  <Stack spacing={3}>
                    <Typography variant="sectionTitleSmall">
                      Owner Information
                    </Typography>

                    <Stack
                      direction={"row"}
                      spacing={3}
                      sx={{ minWidth: "100%" }}
                    >
                      <ReadOnlyCustomInput
                        name="firstName"
                        label="First Name"
                        defaultValue={data?.User.first_name}
                        width={"48%"}
                      />

                      <ReadOnlyCustomInput
                        name="lastName"
                        label="Last Name"
                        defaultValue={data?.User.last_name}
                        width={"48%"}
                      />
                    </Stack>

                    <Stack
                      direction={"row"}
                      spacing={3}
                      sx={{ minWidth: "100%" }}
                    >
                      <ReadOnlyCustomInput
                        name="email"
                        label="Email"
                        defaultValue={data?.User.email}
                        width={"48%"}
                      />

                      <ReadOnlyPhoneNumberPicker
                        label="Phone Number"
                        value={data?.User.mobile_num}
                        width="48%"
                        component={Phone}
                      />
                    </Stack>
                  </Stack>

                  <Divider />

                  {/*Shop Info */}
                  <Stack spacing={3}>
                    <Typography variant="sectionTitleSmall">
                      Shop Details
                    </Typography>

                    <ReadOnlyCustomInput
                      name="shopName"
                      label="Shop Name"
                      defaultValue={data?.shop_name}
                      width="100%"
                    />
                    <Stack
                      direction={"row"}
                      spacing={3}
                      sx={{ minWidth: "100%" }}
                    >
                      <ReadOnlyCustomInput
                        name="shopType"
                        label="Shop Type"
                        defaultValue={data?.shop_type}
                        width={"48%"}
                      />

                      <ReadOnlyCustomInput
                        name="productsCategory"
                        label="Products Category"
                        defaultValue={data?.categoryID}
                        select
                        selectMenuItems={productsCategory}
                        width="48%"
                      />
                    </Stack>
                  </Stack>

                  <Divider />
                  {/* Place to display images */}
                  <Stack spacing={3} sx={{ textAlign: "left" }}>
                    <Typography variant="sectionTitleSmall">Images</Typography>
                    {data &&
                      Object.entries(data).map(([key, value], index) => {
                        if (key.startsWith("attachment_")) {
                          const label = labels[key];
                          // Render each attachment
                          return (
                            <div key={index}>
                              <Typography variant="sectionTitleSmall">
                                {label}
                              </Typography>
                              {value && (
                                <div style={{ minWidth: "100%" }}>
                                  <img
                                    src={`${BASE_URL}/${value}`}
                                    alt={key}
                                    style={{ maxWidth: "100%" }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                  </Stack>
                </Stack>
              </Stack>
            </DialogContent>

            {/* Show Save Button at Bottom for small screens */}
            <Box sx={{ ...theme.components.dialog.saveButtonSmall }}>
              <DialogActions sx={{ py: 2, display: "flex" }}>
                <ButtonReject />
                <ButtonApprove />
              </DialogActions>
            </Box>
          </div>
        )}
      </Dialog>
    </div>
  );
}

function ButtonReject({ onClickAction }) {
  return (
    <Button
      variant="outlined"
      onClick={onClickAction}
      sx={{
        borderRadius: 2,
        width: 80,
        ml: "auto",
      }}
      color="danger"
    >
      {
        <Typography
          variant="seeAll"
          sx={{ color: theme.palette.danger.main, fontSize: 14 }}
        >
          Reject
        </Typography>
      }
    </Button>
  );
}

function ButtonApprove({ onClickAction, disable }) {
  return (
    <Button
      variant="contained"
      onClick={onClickAction}
      sx={{
        borderRadius: 2,
        width: 80,
        ml: "auto",
      }}
    >
      {
        <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 14 }}>
          Approve
        </Typography>
      }
    </Button>
  );
}

export default ApprovalDialog;
