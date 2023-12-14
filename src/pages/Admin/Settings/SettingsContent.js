import React from "react";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import PageInfoComponent from "../../../components/PageInfoAndTime/PageInfoComponent";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

function SettingsContent() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      <PageInfoComponent
        PageName={"Settings"}
        Subtitle={"View Admin Settings"}
      />

      <Button onClick={handleLogOut}>LogOut</Button>
    </Box>
  );
}

export default SettingsContent;
