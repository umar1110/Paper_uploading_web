import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminJournalDetails from "../components/admin/AdminJournalDetails.js";

function PrAdminJournalDetails() {
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
        <Route path="/" element={<AdminJournalDetails />}>
         
          
        </Route>
      </Routes>
    );
  }
}

export default PrAdminJournalDetails;
