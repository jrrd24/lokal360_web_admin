import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/ForRoute/RequireAuth.js";
import RouterUnauthorized from "./pages/Error/RouterUnauthorized.js";
import PersistLogin from "./components/ForRoute/PersistLogin.js";
//Login Page
import Login from "./pages/login/Login.js";
//Profile Page
import Profile from "./pages/Profile/Profile.js";
//Error Page
import RouterError from "./pages/Error/RouterError.js";
//Admin Page
import Dashboard from "./pages/Admin/Dashboard/Dashboard.js";
import Analytics from "./pages/Admin/Analytics/Analytics.js";
import Reports from "./pages/Admin/Reports/Reports.js";
import Category from "./pages/Admin/Category/Category.js";
import ShopsManagement from "./pages/Admin/ShopsManagement/ShopsManagement.js";
import LokalAds from "./pages/Admin/LokalAds/LokalAds.js";
import Users from "./pages/Admin/Users/Users.js";
import Settings from "./pages/Admin/Settings/Settings.js";

function Router() {
  return (
    <Routes>
      {/*Login */}
      <Route path="/login" element={<Login />} />

      {/*Secured Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/profile/" element={<Profile />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/shop_management" element={<ShopsManagement />} />
          <Route path="/admin/lokal_ads" element={<LokalAds />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Route>

      {/*Display Unauthorized page  */}
      <Route path="/unauthorized" element={<RouterUnauthorized />} />
      {/*Display Error page if route does not exist */}
      <Route path="*" element={<RouterError />} />
    </Routes>
  );
}

export default Router;
