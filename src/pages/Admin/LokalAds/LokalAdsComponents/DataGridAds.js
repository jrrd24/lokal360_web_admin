import React, { useState } from "react";
import { IconButton, Avatar, Button, Typography, Box } from "@mui/material";
import theme from "../../../../Theme";
import { Delete } from "@mui/icons-material";
import AdsStatus from "../../../../components/ShopOnly/StatusAndTags/AdsStatus";
import CustomDataGrid from "../../../../components/CustomDataGrid";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { BASE_URL } from "../../../../api/Api";
import Zoom from "react-medium-image-zoom";
import AdApprovalDialog from "../LokalAdsDialog/AdApprovalDialog";

function DataGridAds({ showAlert }) {
  const [openRejectScreen, setOpenRejectScreen] = useState(false);
  const [adID, setAdID] = useState(0);

  const handleOpenReject = (id) => {
    setAdID(id);
    setOpenRejectScreen(true);
  };
  const handleCloseReject = () => {
    setOpenRejectScreen(false);
  };

  //API CALL GET ALL SITEWIDE ADS
  const { useCustomQuery, useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: lokalAdsData, isLoading } = useCustomQuery(
    "getAllAds",
    () =>
      axiosPrivate
        .get(`/api/admin_get/all_sitewide_ads/`)
        .then((res) => res.data),
    { enabled: true }
  );

  const { mutate } = useCustomMutate(
    "resolveAdApproval",
    async (data) => {
      await axiosPrivate.patch(
        `api/ad/approval/?lokalAdsID=${data.lokalAdsID}`,
        data
      );
    },
    ["getAllAds"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onSuccess: () => {
        handleCloseReject();
        showAlert("success", `Ad Resolution Applied Successfully`);
      },
    }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  lokalAdsData.forEach((row) => {
    row.action = [row.lokalAdsID, row.status];
  });

  const HandleApprove = (lokalAdsID) => {
    const requestData = {
      status: "Approved",
      message: null,
      lokalAdsID: lokalAdsID,
    };
    mutate(requestData);
  };

  const HandleReject = (lokalAdsID, message) => {
    const requestData = {
      status: "Rejected",
      message: message,
      lokalAdsID: lokalAdsID,
    };
    mutate(requestData);
  };

  // Define data grid columns
  const columns = [
    {
      field: "lokalAdsID",
      headerName: "ID",
      hideable: false,
      width: 80,
      filterable: true,
    },
    {
      field: "ad_image",
      headerName: "Image",
      width: 120,
      disableExport: true,
      renderCell: (params) => {
        const img = `${BASE_URL}/${params.value}`;
        let statusComponent;
        statusComponent = (
          <Zoom>
            <Avatar
              src={
                params.value
                  ? img
                  : require("../../../../assets/placeholder.png")
              }
              sx={{
                backgroundColor: "#FFF",
                width: 100,
                height: 45,
                border: "solid",
                borderColor: "transparent",
                borderRadius: 2,
              }}
            />
          </Zoom>
        );

        return statusComponent;
      },
    },
    {
      field: "ad_name",
      headerName: "Name",
      width: 180,
      filterable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      filterable: true,
      renderCell: (params) => {
        const status = params.value;
        let statusComponent;
        statusComponent = <AdsStatus status={status} />;

        return statusComponent;
      },
    },
    {
      field: "shop_name",
      headerName: "Shop Name",
      filterable: true,
      width: 140,
    },

    {
      field: "start_date",
      headerName: "Campaign Start",
      filterable: false,
      width: 140,
    },
    {
      field: "end_date",
      headerName: "Campaign End",
      filterable: false,
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      hideable: false,
      disableExport: true,
      renderCell: (params) => {
        let statusComponent;
        const renderButton = params.row.index !== 0;

        statusComponent = (
          <div>
            {params.row.status === "Pending Approval" ? (
              <Box
                sx={{ display: "flex", gap: "8px", justifyContent: "center" }}
              >
                <ButtonApprove
                  onClickAction={() => HandleApprove(params.row.lokalAdsID)}
                />

                <ButtonReject
                  onClickAction={() => handleOpenReject(params.row.lokalAdsID)}
                />
              </Box>
            ) : (
              <IconButton onClick={() => {}}>
                <Delete sx={{ color: `${theme.palette.danger.main}` }} />
              </IconButton>
            )}
          </div>
        );
        return renderButton ? statusComponent : params;
      },
    },
  ];

  return (
    <div>
      <CustomDataGrid
        data={lokalAdsData}
        columns={columns}
        rowID={"lokalAdsID"}
        autoHeight
        disableDensity
      />

      <AdApprovalDialog
        open={openRejectScreen}
        handleCloseReject={handleCloseReject}
        HandleReject={HandleReject}
        id={adID}
      />
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

export default DataGridAds;
