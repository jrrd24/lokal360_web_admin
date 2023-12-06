import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";

const Profile = React.memo(() => {
  //Set Page Title
  useEffect(() => {
    document.title = "Profile | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <AdminSidebar component={() => <ProfileContent />} />;
});

export default Profile;
