import React from "react";
import {
  Stack,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Box,
} from "@mui/material";
import { ReadOnlyCustomInput } from "../../../../../components/FormComponents/CustomInput";

function BasicShopInfo({
  shopName,
  category,
  type,
  description,
  deliver,
  pickup,
  sellsRawMaterials,
}) {
  return (
    <Stack spacing={3} width={"100%"}>
      {/*Section Name */}
      <Stack
        direction={"row"}
        sx={{ alignItems: "baseline", justifyContent: "space-between" }}
      >
        <Typography variant="sectionTitleSmall">
          Basic Shop Information
        </Typography>
      </Stack>

      {/*TextBoxes */}
      <Stack spacing={3}>
        {/*Shop Name */}
        <ReadOnlyCustomInput
          name="shopName"
          label="Shop Name"
          defaultValue={shopName}
          width="100%"
        />

        {/*Product Category and Shop Type */}
        <Stack direction={"row"} spacing={3}>
          {/*Product Category*/}
          <ReadOnlyCustomInput
            name="productsCategory"
            label="Products Category"
            defaultValue={category}
            width="48%"
          />

          {/*Shop Type */}

          <ReadOnlyCustomInput
            name="shopType"
            label="Shop Type"
            defaultValue={type}
            width="48%"
          />
        </Stack>

        {/*Shop Description */}
        <ReadOnlyCustomInput
          name="shopDescription"
          label="Shop Description"
          defaultValue={description}
          width="100%"
          multiline
        />

        <FormGroup
          sx={{
            pl: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel
              component="legend"
              sx={{ fontSize: "18px", fontWeight: 600, textAlign: "left" }}
            >
              Shipping Options
            </FormLabel>
            <FormControlLabel
              disabled
              control={<Switch checked={deliver || false} />}
              label="Delivery"
              name="delivery"
            />
            <FormControlLabel
              disabled
              control={<Switch checked={pickup || false} />}
              label="Pick-Up"
              name="pickUp"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel
              component="legend"
              sx={{ fontSize: "18px", fontWeight: 600, textAlign: "left" }}
            >
              Raw Materials
            </FormLabel>
            <FormControlLabel
              disabled
              control={<Switch checked={sellsRawMaterials || false} />}
              label="Sells Raw Materials"
              name="sellsRawMaterials"
            />
          </Box>
        </FormGroup>
      </Stack>
    </Stack>
  );
}

export default BasicShopInfo;
