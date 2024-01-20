import React from "react";
import MyJournals from "../components/journals/MyJournals";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrMyJournals() {

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
        <Route path="/" element={<MyJournals/>} />
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

export default PrMyJournals;
