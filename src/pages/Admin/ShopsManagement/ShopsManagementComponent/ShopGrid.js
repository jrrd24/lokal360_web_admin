import React, { useState } from "react";
import { Avatar, IconButton, Typography, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import userData from "../../../../data/userData";
import CustomerStatus from "../../../../components/ShopOnly/StatusAndTags/CustomerStatus";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { ChatBubble, ReportProblem } from "@mui/icons-material";
import CustomDataGrid from "../../../../components/CustomDataGrid";
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

function  ShopGrid() {
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
      field: "first_name",
      headerName: "Shop Name",
      width: 220,
    },
   
    {
      field: "last_name",
      headerName: "Shop Owner",
      width: 215,
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
          Status === "Pending"  ||
          Status === "Rejected" 
        
        ) {
          statusComponent = <CustomerStatus status={Status} />;
        } else {
          statusComponent = <CustomerStatus status={"N/A"} />;
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
    <CustomDataGrid data={shopRequestData} columns={columns} rowID={"shopRegistrationID"} />
  );
}

export default ShopGrid;