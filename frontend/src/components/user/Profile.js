import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { clearErrors, logoutUser } from "../../reducers/userReducer";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error, logoutSuccess } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, dispatch]);

  return (
    <Fragment>
      {loading == true ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title={`${user.name}'s Profile`} /> */}
          <div className="mt-24 bg-gray-500 my-6 profileContainer">
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Profession</h4>
                <p>{user?.profession}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link
                  className={`${user.role !== "admin" ? "hidden" : "block"}`}
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
                <Link to="/myjournals">My Journals</Link>
                <Link to="/password/update">Change Password</Link>
                <Link
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/");
                    
                  }}
                >
                  {" "}
                  Logout user
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
