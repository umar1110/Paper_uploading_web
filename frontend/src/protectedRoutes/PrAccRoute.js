import React from "react";
import Profile from "../components/user/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrUpdateProtectedRoute() {

  const { loading, isAuthenticated } = useSelector((state) => state.user);


  if (loading == false) {  
    if (isAuthenticated === false) {
      return (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      );
    }


    return (
      <Routes>
        <Route path="/" element={<Profile/>} />
      </Routes>
    );
  }

  // return (
  //   <>
  //     <Routes>
  //       {isAuthenticated ? (
  //         <Route path="/" element={<Profile />} />
  //       ) : (
  //         <Route path="*" element={<Navigate to={"/login"} />} />
  //       )}
  //     </Routes>
  //   </>
  // );
}

export default PrUpdateProtectedRoute;
