import React, { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { useRef } from "react";
import { clearErrors, getAllusers } from "../../reducers/allUsersReducer";
import UserCard from "../user/UserCard";
import {
  resetDelete,
  clearDelErrors,
  deleteUser,
  changeRole,
} from "../../reducers/editUserReducer";

function AllUsers() {
  const dispatch = useDispatch();
  const { users, error, loading, filteredUsers } = useSelector(
    (state) => state.allUsers
  );
  const {
    error: deleteError,
    success,
    message,
  } = useSelector((state) => state.editUser);

  const menuRef = useRef();
  const [page, setpage] = useState(1);
  const [filter, setFilter] = useState(["", ""]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  // const [year, setyear] = useState(0);

  const nextButtonHandler = () => {
    if (filteredUsers > 15 * page) {
      setpage(page + 1);
    }
  };
  const backButtonhandler = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const filterFormHandler = (e) => {
    e.preventDefault();
    document.querySelector("#filterMenu").classList.add("hidden");
    setFilter([name, email]);
    const payload = {
      // page,
      name: filter[0],
      email: filter[1],
      page: page,
    };
    dispatch(getAllusers(payload));
  };

  const toggleFilterMenu = () => {
    document.querySelector("#filterMenu")?.classList.toggle("hidden");
  };

  const changeRoleFunc = (id, role) => {
    dispatch(changeRole({id,role}))
    
  };

  const deleteUserFunc = (id) => {
    dispatch(deleteUser(id));
  };

  const [isAlertDisplay, setisAlertDisplay] = useState(false);
  const [alertMessage, setalertMessage] = useState("Error Occured !!");
  const [alertType, setalertType] = useState("error");
  const fireAlert = (type, message) => {
    setalertType(type);
    setalertMessage(message);
    setisAlertDisplay(true);

    setTimeout(() => {
      setisAlertDisplay(false);
    }, 3000);
  };

  useEffect(() => {
    const payload = {
      // page,
      name: filter[0],
      email: filter[1],
      page: page,
    };

    if (success) {
      fireAlert("success", message);
      dispatch(resetDelete());
    }
    if (error) {
      fireAlert();
      dispatch(clearErrors());
    }
    if (deleteError) {
      fireAlert("error", deleteError);

      dispatch(clearDelErrors());
    }

    dispatch(getAllusers(payload));
  }, [dispatch, page, filter, error, deleteError, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
        <>
          {isAlertDisplay && (
            <div className="alert absolute w-full ">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alertType}>{alertMessage}</Alert>
                isAlertDisplaynam
              </Stack>
            </div>
          )}
          <div className="buttonForFIlter lg:hidden text-center mt-4 text-white">
            <button
              onClick={toggleFilterMenu}
              className="bg-gray-700 py-2 px-4 rounded-lg"
            >
              Filters
            </button>
          </div>
          <form
            onSubmit={filterFormHandler}
            ref={menuRef}
            className="filterusers hidden lg:flex  items-start    justify-between  p-2 text-white bg-gray-700"
          >
            <div className="name m-2 items-center flex space-x-2">
              <label htmlFor="nameFilter">Name :</label>
              <input
                type="text"
                id="nameFilter"
                value={name}
                onChange={(e) => setname(e.currentTarget.value)}
                placeholder="Search by name"
                className="rounded-sm text-black outline-none p-2"
              />
            </div>

            <div className="email m-2 items-center flex space-x-2">
              <label htmlFor="emailFilter">email :</label>
              <input
                type="text"
                id="emailFilter"
                onChange={(e) => setemail(e.currentTarget.value)}
                value={email}
                placeholder="Search by email"
                className="rounded-sm text-black outline-none p-2"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 py-2 px-4 mr-3 rounded-md "
            >
              Search
            </button>
          </form>
          <div
            id="filterMenu"
            className="  filterBox hidden  mx-auto  justify-evenly lg:hidden h-[60vmax] flex-col items-center w-[70vmax] max-w-full bg-gray-700 "
          >
            <form
              onSubmit={filterFormHandler}
              ref={menuRef}
              className="filterusers  flex-col space-y-4  items-start    justify-between  p-2 text-white bg-gray-700"
            >
              <div className="name m-2 items-center flex space-x-2">
                <div className="w-[20%]">
                  <label htmlFor="dateFilter">name :</label>
                </div>
                <input
                  type="text"
                  id="nameFilter"
                  value={name}
                  onChange={(e) => setname(e.currentTarget.value)}
                  placeholder="Search by name"
                  className="rounded-sm w-[80%] text-black outline-none p-2"
                />
              </div>

              <div className="email m-2 items-center flex space-x-2">
                <div className="w-[20%]">
                  <label htmlFor="dateFilter">email :</label>
                </div>

                <input
                  type="text"
                  id="emailFilter"
                  onChange={(e) => setemail(e.currentTarget.value)}
                  value={email}
                  placeholder="Search by email"
                  className="rounded-sm w-[80%] text-black outline-none p-2"
                />
              </div>

              <div className="submitBTn w-fit  mx-auto">
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-8  rounded-md "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="userslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[95%]">
            <div className="users min-w-[700px] w-full ">
              <div
                className="journalHeadings w-full flex"
                style={{ backgroundColor: "#DAEFF1" }}
              >
                <div className="serialNoHeadings w-[5%]  font-semibold border-b-2 p-2 flex-shrink-0 border-r-2 border-gray-200">
                  Sr.
                </div>
                <div className="nameHeading w-[20%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                  Name
                </div>
                <div className="emailHeading w-[40%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                  Email
                </div>
                <div className="roleHeading w-[10%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                  Role
                </div>
                <div className="changeRole w-[15%] font-semibold border-b-2 p-2   border-gray-200">
                  Change Role
                </div>
                <div className="deleteUser w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                  Delete
                </div>
              </div>
              <p className="flex justify-center items-center font-bold text-xl">
                No Journal Found
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {isAlertDisplay && (
            <div className="alert fixed bottom-0 z-10 w-full  ">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alertType} className="z-10">
                  {alertMessage}
                </Alert>
              </Stack>
            </div>
          )}
          <div className="relative">
            <div className="buttonForFIlter lg:hidden text-center mt-4 text-white">
              <button
                onClick={toggleFilterMenu}
                className="bg-gray-700 py-2 px-4 rounded-lg"
              >
                Filters
              </button>
            </div>

            <div
              id="filterMenu"
              className="  filterBox hidden  mx-auto  justify-evenly lg:hidden h-[60vmax] flex-col items-center w-[70vmax] max-w-full bg-gray-700 "
            >
              <form
                onSubmit={filterFormHandler}
                ref={menuRef}
                className="filterusers  flex-col space-y-4  items-start    justify-between  p-2 text-white bg-gray-700"
              >
                <div className="name m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Name :</label>
                  </div>
                  <input
                    type="text"
                    id="nameFilter"
                    value={name}
                    onChange={(e) => setname(e.currentTarget.value)}
                    placeholder="Search by name"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="email m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">email :</label>
                  </div>

                  <input
                    type="text"
                    id="emailFilter"
                    onChange={(e) => setemail(e.currentTarget.value)}
                    value={email}
                    placeholder="Search by email"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="submitBTn w-fit  mx-auto">
                  <button
                    type="submit"
                    className="bg-green-500 py-2 px-8  rounded-md "
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <form
              onSubmit={filterFormHandler}
              ref={menuRef}
              className="filterusers hidden lg:flex  items-start    justify-between  p-2 text-white bg-gray-700"
            >
              <div className="name m-2 items-center flex space-x-2">
                <label htmlFor="nameFilter">name :</label>
                <input
                  type="text"
                  id="nameFilter"
                  value={name}
                  onChange={(e) => setname(e.currentTarget.value)}
                  placeholder="Search by name"
                  className="rounded-sm text-black outline-none p-2"
                />
              </div>

              <div className="email m-2 items-center flex space-x-2">
                <label htmlFor="emailFilter">email :</label>
                <input
                  type="text"
                  id="emailFilter"
                  onChange={(e) => setemail(e.currentTarget.value)}
                  value={email}
                  placeholder="Search by email"
                  className="rounded-sm text-black outline-none p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 py-2 px-4 mr-3 rounded-md "
              >
                Search
              </button>
            </form>

            <div className="userslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[95%]">
              <div className="users min-w-[700px] w-full ">
                <div
                  className="journalHeadings w-full flex"
                  style={{ backgroundColor: "#DAEFF1" }}
                >
                  <div className="serialNoHeadings w-[5%]  font-semibold border-b-2 p-2 flex-shrink-0 border-r-2 border-gray-200">
                    Sr.
                  </div>
                  <div className="nameHeading w-[20%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                    Name
                  </div>
                  <div className="emailHeading w-[40%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                    Email
                  </div>
                  <div className="roleHeading w-[10%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                    Role
                  </div>
                  <div className="changeRole w-[15%] font-semibold border-b-2 p-2   border-gray-200">
                    Change Role
                  </div>
                  <div className="deleteUser w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                    Delete
                  </div>
                </div>

                {users?.map((user, sr) => {
                  return (
                    <UserCard
                      key={user._id}
                      user={user}
                      deleteUser={deleteUserFunc}
                      changeRole={changeRoleFunc}
                      sr={page !== 1 ? sr + 1 + (page - 1) * 15 : sr + 1}
                    />
                  );
                })}
              </div>
            </div>

            <div className="pagination mx-auto flex mb-14 w-[95%] justify-center space-x-6 h-12 bg-black text-white ">
              <button onClick={backButtonhandler} className="back">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button onClick={nextButtonHandler} className="next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllUsers;
