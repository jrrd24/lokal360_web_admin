import React, { useState } from "react";
import { Avatar, IconButton, Typography, Box } from "@mui/material";
import { MoreVert, Shop } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { ChatBubble, ReportProblem } from "@mui/icons-material";
import StatusUser from "../../../../components/ShopOnly/StatusAndTags/StatusUser";
import ShopGrid from "./ShopGrid";
import shopRequestData from "../../../../data/shopRequesData";



// Styling for the custom menu
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function  ShopCustomer() {
  // State and event handlers for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define data grid columns
  const columns = [
   
    {
      field: "img",
      headerName: "Image",
      width: 80,
      disableExport: true,
      renderCell: (params) => {
        const img = params.value;
        let statusComponent;
        statusComponent = (
          <Avatar
            src={img}
            sx={{
              backgroundColor: "#FFF",
              width: 45,
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
      field: "username",
      headerName: "Username",
      width: 220,
    },
   
  
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const userType = params.value;
        let statusComponent;
        if (
          userType === "Regular" ||
          userType === "Banned"
        ) {
          statusComponent = <StatusUser status={userType} />;
        } else {
          statusComponent = <StatusUser status={"N/A"} />;
        }

        return statusComponent;
      },
      },

    {
      field: "",
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
              aria-label="Customer See More"
              id="see-more-button"
              aria-controls={open ? "customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            {/*Pop Up Menu */}
            <StyledMenu
              id="customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <ChatBubble />
                Chat
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ReportProblem />
                Report
              </MenuItem>
            </StyledMenu>
          </Box>
        );
        return statusComponent;
      },
    },
  ];

  return (
    <ShopGrid data={shopRequestData} columns={columns} rowID={"shopRegistrationID"} />
  );
}

export default ShopCustomer;