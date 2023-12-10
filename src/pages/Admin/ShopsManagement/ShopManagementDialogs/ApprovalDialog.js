import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Stack,
  Typography,
  Zoom as ZoomTransition,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../../Theme";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import {
  CustomInput,
  ReadOnlyCustomInput,
} from "../../../../components/FormComponents/CustomInput";
import { Phone } from "@mui/icons-material";
import { ProductsCategory } from "../../../../utils/MapSelectMenuItems";
import { ReadOnlyPhoneNumberPicker } from "../../../../components/FormComponents/CustomPhoneNumberPicker";
import { BASE_URL } from "../../../../api/Api";
import ShopStatus from "../../../../components/ShopOnly/StatusAndTags/ShopStatus";
import Zoom from "react-medium-image-zoom";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

function ApprovalDialog({ open, handleClose, isSmScreen, id, showAlert }) {
  const [openRejectScreen, setOpenRejectScreen] = useState(false);

  //HOOK CALLS
  const { control, handleSubmit } = useForm();
  const { useCustomQuery, useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  //API CALL GET REQUEST DETAILS
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

  const { mutate } = useCustomMutate(
    "resolveApprovalRequest",
    async (data) => {
      const response = await axiosPrivate.patch(
        `/api/register_shop/review_registration/?shopRegistrationID=${id}`,
        data
      );

      return data;
    },
    ["getRequestDetails", "getAllShopRequests"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onSuccess: (mutateData) => {
        console.log("Mutation Successful", mutateData);

        const emailData = {
          status: mutateData.status,
          message: mutateData.message,
          email: data.User.email,
          name: `${data.User.first_name} ${data.User.last_name}`,
          shop_name: data.shop_name,
        };
        console.log("SED", emailData);
        sendEmail(emailData);

        showAlert(
          "success",
          `Shop Approval Resolution Sent To ${data?.User.email}`
        );
      },
    }
  );

  //FOR EMAIL SENDING
  const sendEmail = async (emailData) => {
    console.log("SEED", emailData);
    try {
      const templateParams = {
        to_email: emailData.email,
        message: emailData.message,
        shop_name: emailData.shop_name,
        name: emailData.name,
        status: emailData.status,
      };

      const result = await emailjs.send(
        "service_7sac6iv",
        "template_7qiqyoc",
        templateParams,
        "oWuY4Bn8vofzuYpuS"
      );
      console.log("RESULT", result.text);
    } catch (error) {
      console.error("Error sending email", error);
      showAlert("error", `Error Sending Email to ${data?.User.email}`);
    }
  };

  const labels = {
    attachment_DTI_CBNR: "DTI Certificate of Business Name Registration",
    attachment_DTI_other: "Other DTI Form",
    attachment_BIR_COR: "BIR Certificate of Registration",
    attachment_valid_id_front: "Valid Government Issued ID (Front)",
    attachment_valid_id_back: "Valid Government Issued ID (Back)",
    attachment_products_list: "Store Products / Menu",
  };

  const handleOpenReject = () => {
    setOpenRejectScreen(true);
  };
  const handleCloseReject = () => {
    setOpenRejectScreen(false);
  };

  const handleReject = (dataSubmit) => {
    const requestData = {
      status: "Rejected",
      message: dataSubmit.message,
    };
    console.log("ACCEPT REQ", requestData);
    mutate(requestData);
    handleCloseReject();
  };

  const handleApprove = () => {
    const requestData = {
      status: "Approved",
      message: "Welcome to Lokal 360",
    };

    console.log("ACCEPT REQ", requestData);
    mutate(requestData);
    handleClose();
  };

  const productsCategory = ProductsCategory();

  return (
    <div>
      {!openRejectScreen ? (
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
                    {data?.status === "Pending Approval" ? (
                      <ButtonReject onClickAction={handleOpenReject} />
                    ) : (
                      ""
                    )}
                    {data?.status === "Pending Approval" ? (
                      <ButtonApprove onClickAction={handleApprove} />
                    ) : (
                      ""
                    )}

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
                      <Typography variant="sectionTitleSmall">
                        Status
                      </Typography>
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
                      <Typography variant="sectionTitleSmall">
                        Attachments
                      </Typography>
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
                                  <Zoom>
                                    <div style={{ minWidth: "100%" }}>
                                      <img
                                        src={`${BASE_URL}/${value}`}
                                        alt={key}
                                        style={{ maxWidth: "100%" }}
                                      />
                                    </div>
                                  </Zoom>
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
                  <ButtonReject onClickAction={handleOpenReject} />
                  <ButtonApprove onClickAction={handleApprove} />
                </DialogActions>
              </Box>
            </div>
          )}
        </Dialog>
      ) : (
        <Dialog
          fullScreen={isSmScreen}
          fullWidth={true}
          maxWidth={"md"}
          open={openRejectScreen}
          onClose={handleCloseReject}
          hideBackdrop={true}
          TransitionComponent={Fade}
          sx={{ backgroundColor: "#ECECECBF" }}
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
                    Reject Shop Approval Request
                  </Typography>

                  {/*  Buttons */}
                  <DialogActions
                    sx={{
                      gap: "16px",
                      display: { xs: "none", sm: "none", md: "block" },
                    }}
                  >
                    <ButtonCloseDialog handleClose={handleCloseReject} />
                  </DialogActions>
                </Box>
              </DialogTitle>

              {/* Dialog Content */}
              <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
                <form onSubmit={handleSubmit(handleReject)}>
                  {/*Main*/}
                  <Stack spacing={2} sx={{ width: "600px", py: 5 }}>
                    <Stack spacing={5}>
                      <Stack spacing={3}>
                        {/*Status */}
                        <Stack spacing={1}>
                          <Typography variant="sectionTitleSmall">
                            Pending Status
                          </Typography>
                          <Box sx={{ maxWidth: 100, textAlign: "center" }}>
                            <ShopStatus status="Rejected" />
                          </Box>
                        </Stack>

                        {/*Message*/}

                        <CustomInput
                          control={control}
                          name="message"
                          label="Reason For Rejection"
                          width="100%"
                          multiline
                          rules={{
                            required: "Reason For Rejection Is Required",
                            maxLength: {
                              value: 500,
                              message: "Max Length of 500 Characters",
                            },
                          }}
                        />
                      </Stack>

                      <ButtonReject
                        type="submit"
                        variant="contained"
                        message="Confirm Shop Approval Rejection"
                      />
                    </Stack>
                  </Stack>
                </form>
              </DialogContent>
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
}

function ButtonReject({
  onClickAction,
  type,
  variant = "outlined",
  message = "Reject",
}) {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClickAction}
      sx={{
        borderRadius: 2,
        px: 2,
        ml: "auto",
      }}
      color="danger"
    >
      {
        <Typography
          variant="seeAll"
          sx={{
            color: variant === "outlined" ? theme.palette.danger.main : "white",
            fontSize: 14,
          }}
        >
          {message}
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
