import React from "react";
import ShopGrid from "./ShopGrid";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";

function PendingShops() {
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: requestData, isLoading } = useCustomQuery(
    "getAllShopRequests",
    () =>
      axiosPrivate
        .get(`/api/register_shop/all_registration`)
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
          <Typography variant="sectionTitle">Shop Approval Requests</Typography>
        </Box>
        <ShopGrid data={requestData} isPending />
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

export default PendingShops;
