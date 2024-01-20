import React from "react";
import SubmitJournal from "../components/journals/SubmitJournal";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function PrSubmitJournal() {

  const { loading, isAuthenticated } = useSelector((state) => state.user);

console.log(loading,isAuthenticated)
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
        <Route path="/" element={<SubmitJournal/>} />
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

export default PrSubmitJournal;
