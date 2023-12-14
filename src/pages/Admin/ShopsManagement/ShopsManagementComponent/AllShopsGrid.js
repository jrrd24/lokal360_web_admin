import React, { useState } from "react";
import { Avatar, IconButton, Box, Typography } from "@mui/material";
import { Cancel, CheckCircle, Info } from "@mui/icons-material";
import CustomDataGrid from "../../../../components/CustomDataGrid";
import { BASE_URL } from "../../../../api/Api";
import ShopStatus from "../../../../components/ShopOnly/StatusAndTags/ShopStatus";
import theme from "../../../../Theme";
import ShopDetailsDialog from "../ShopDetailsDialog.js/ShopDetailsDialog";

function AllShopsGrid({ data }) {
  const [activeID, setActiveID] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (id) => {
    handleOpen();
    setActiveID(id);
  };

  // Define data grid columns
  const columns = [
    {
      field: "logo_img_link",
      headerName: "",
      minWidth: 80,
      disableExport: true,
      renderCell: (params) => {
        const img = `${BASE_URL}/${params.value}`;
        let statusComponent;
        statusComponent = (
          <Avatar
            src={img}
            sx={{
              backgroundColor: "#FFF",
              minWidth: 45,
              height: 45,
              border: "solid",
              borderColor: "transparent",
              borderRadius: 2,
            }}
          />
        );

        return statusComponent;
      },
    },

    {
      field: "shop_name",
      headerName: "Shop Name",
      width: 185,
    },

    {
      field: "owner_name",
      headerName: "Shop Owner",
      width: 185,
    },

    {
      field: "sells_raw_mats",
      headerName: "Raw Materials",
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      disableExport: true,
      renderCell: (params) => {
        const sellsRawMats = params.row.sells_raw_mats;
        let statusComponent;
        statusComponent = (
          <Typography>
            {sellsRawMats ? (
              <CheckCircle sx={{ color: `${theme.palette.success.main}` }} />
            ) : (
              <Cancel sx={{ color: `${theme.palette.danger.main}` }} />
            )}
          </Typography>
        );
        return statusComponent;
      },
    },

    {
      field: "is_360_partner",
      headerName: "360 Partner",
      minWidth: 110,
      align: "center",
      headerAlign: "center",
      disableExport: true,
      renderCell: (params) => {
        const partner = params.row.is_360_partner;
        let statusComponent;
        statusComponent = (
          <Typography>
            {partner ? (
              <CheckCircle sx={{ color: `${theme.palette.success.main}` }} />
            ) : (
              <Cancel sx={{ color: `${theme.palette.danger.main}` }} />
            )}
          </Typography>
        );
        return statusComponent;
      },
    },

    {
      field: "shopID",
      headerName: "Action",
      minWidth: 60,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      hideable: false,
      disableExport: true,
      renderCell: (params) => {
        let statusComponent;
        statusComponent = (
          <Box>
            <IconButton
              variant="contained"
              onClick={() => handleClick(params.row.shopID)}
              color="primary"
            >
              <Info />
            </IconButton>
          </Box>
        );
        return statusComponent;
      },
    },
  ];

  return (
    <div>
      <CustomDataGrid
        data={data}
        columns={columns}
        rowID={"shopID"}
        rowsPerPage={10}
      />

      <ShopDetailsDialog open={open} id={activeID} handleClose={handleClose} />
    </div>
  );
}

export default AllShopsGrid;
