import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import AllShopsGrid from "./AllShopsGrid";

function AllShops() {
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: allShopData, isLoading } = useCustomQuery(
    "getAllShops",
    () =>
      axiosPrivate
        .get(`/api/admin_get/all_shops`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box sx={{ ...classes.main }}>
      <Stack spacing={2} direction={"column"}>
        {/*Section Name */}
        <Box direction={"row"} sx={{ ...classes.sectionName }}>
          <Typography variant="sectionTitle">All Shops</Typography>
        </Box>
        <AllShopsGrid data={allShopData} />
      </Stack>
    </Box>
  );
}

const classes = {
  main: {
    maxWidth: "750px",
    "@media (max-width: 1516px)": {
      justifyContent: "center",
      maxWidth: "100%",
    },
  },

  sectionName: {
    ...theme.components.box.sectionName,
    "@media (max-width: 415px)": {
      gap: "6px",
    },
  },
};

export default AllShops;
