import React, { useState } from "react";
import { IconButton, Typography, Box, Stack } from "@mui/material";
import theme from "../../../../Theme";
import { Edit, LocalShipping, Percent } from "@mui/icons-material";
import CustomDataGrid from "../../../../components/CustomDataGrid";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";

function DataGridCategories() {
  //API CALL GET ALL CATEGORIES
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: categoryData, isLoading } = useCustomQuery(
    "getAllCategories",
    () =>
      axiosPrivate
        .get(`/api/admin_get/all_categories/`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  // Define data grid columns
  const columns = [
    {
      field: "categoryID",
      headerName: "ID",
      hideable: false,
      width: 80,
    },

    {
      field: "category_name",
      headerName: "Category Name",
      width: 240,
    },

    {
      field: "count_product",
      headerName: "No. of Products",
      width: 200,
    },
    {
      field: "count_shop",
      headerName: "No. of Shops",
      width: 160,
    },
    // {
    //   field: "",
    //   headerName: "Action",
    //   width: 60,
    //   sortable: false,
    //   filterable: false,
    //   hideable: false,
    //   disableExport: true,
    //   renderCell: (params) => {
    //     let statusComponent;
    //     statusComponent = (
    //       <IconButton>
    //         <Edit sx={{ color: `${theme.palette.primary.main}` }} />
    //       </IconButton>
    //     );
    //     return statusComponent;
    //   },
    // },
  ];

  return (
    <CustomDataGrid
      data={categoryData.categories}
      columns={columns}
      rowID={"categoryID"}
    />
  );
}

export default DataGridCategories;
