import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";
import { CustomInput } from "../../../../components/FormComponents/CustomInput";
import ShopStatus from "../../../../components/ShopOnly/StatusAndTags/ShopStatus";
import { useForm } from "react-hook-form";

function AdApprovalDialog({
  open,
  handleCloseReject,
  isSmScreen,
  id,
  HandleReject,
}) {
  const { control, handleSubmit } = useForm();

  return (
    <div>
      <Dialog
        fullScreen={isSmScreen}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleCloseReject}
        hideBackdrop={true}
        TransitionComponent={Zoom}
        sx={{ backgroundColor: "#ECECECBF" }}
      >
        <div>
          <DialogTitle
            minHeight={70}
            sx={{ ...theme.components.dialog.dialogTitle }}
          >
            <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
              {/* Dialog Title*/}
              <Typography variant="sectionTitle">Reject Sitewide Ad</Typography>

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
            <form
              onSubmit={handleSubmit((formData) =>
                HandleReject(id, formData.message)
              )}
            >
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
                    message="Confirm Ad Rejection"
                  />
                </Stack>
              </Stack>
            </form>
          </DialogContent>
        </div>
      </Dialog>
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

export default AdApprovalDialog;
