import React, { useEffect } from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import CategoryContent from "./CategoryContent";

function Category() {
  //Set Page Title
  useEffect(() => {
    document.title = "Categories | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <AdminSidebar component={CategoryContent} />;
}

export default Category;
