import React from "react";
import { Avatar, IconButton, Box } from "@mui/material";
import { Info } from "@mui/icons-material";
import CustomDataGrid from "../../../../components/CustomDataGrid";
import { BASE_URL } from "../../../../api/Api";
import ShopStatus from "../../../../components/ShopOnly/StatusAndTags/ShopStatus";

function ShopGrid({ data, isPending }) {
  const handleClick = (event) => {};

  // Define data grid columns
  const columns = [
    {
      field: "shop_name",
      headerName: "Shop Name",
      width: 200,
    },

    {
      field: "profile_pic",
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
      field: "owner_name",
      headerName: "Shop Owner",
      width: 200,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const Status = params.value;
        let statusComponent;
        if (
          Status === "Approved" ||
          Status === "Pending Approval" ||
          Status === "Rejected"
        ) {
          statusComponent = <ShopStatus status={Status} />;
        } else {
          statusComponent = <ShopStatus status={"N/A"} />;
        }

        return statusComponent;
      },
    },

    {
      field: "shopRegistrationID",
      headerName: "Action",
      width: 60,
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
              onClick={handleClick}
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
    <CustomDataGrid
      data={data}
      columns={columns}
      rowID={"shopRegistrationID"}
      rowsPerPage={isPending ? 5 : 10}
    />
  );
}

export default ShopGrid;
