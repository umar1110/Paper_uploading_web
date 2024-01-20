import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
 
  useEffect(() => {
  
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="routers w-full">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="journals w-1/2 bg-green-500 py-4 font-semibold text-white text-xl"
          >
            Journals
          </button>
          <button
            onClick={() => navigate("/admin/dashboard/users")}
            className="users w-1/2 bg-red-400 py-4 font-semibold text-white text-xl"
          >
            Users
          </button>
        </div>

        <Outlet />

      </div>
    </>
  );
}

export default Dashboard;
