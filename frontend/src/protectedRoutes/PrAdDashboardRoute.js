import React from "react";
import Dashboard from "../components/admin/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllJournals from "../components/admin/AllJournals.js"
import AllUsers from "../components/admin/AllUsers.js"

function PrAdDashboardRoute() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading == false) {
    if (isAuthenticated === false) {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }

    if (user.role !== "admin") {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="users" element={<AllUsers />} />

          <Route path="/" element={<AllJournals />} />
          
        </Route>
      </Routes>
    );
  }
}

export default PrAdDashboardRoute;
