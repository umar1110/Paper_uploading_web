import React from "react";

function UserCard({ user, sr, deleteUser, changeRole }) {
  return (
    <>
      <div
        className="journalHeadings w-full flex"
        style={{ backgroundColor: sr % 2 !== 0 ? "white" : "#EDF7F8" }}
      >
        <div className="serialNoHeadings w-[5%] border-r-2 border-gray-200 p-2">
          {sr}
        </div>
        <div className="nameHeading w-[20%] p-2 border-r-2 border-gray-200">
          {user.name}
        </div>
        <div className="emailHeading w-[40%] p-2 border-r-2 border-gray-200">
          {user.email}
        </div>
        <div
          className={`roleHeading w-[10%] p-2 border-r-2 border-gray-200 ${
            user.role === "admin" ? "text-green-700" : "text-red-500"
          }`}
        >
          {user.role}
        </div>

        <div className="changeRole  w-[15%] p-2  border-r-2 border-gray-200">
          <select
            onChange={(e) => changeRole(user._id, e.target.value)}
            name="roleChange"
            className="w-full outline-none p-2 rounded-sm"
            id="changeRole"
            value={user.role}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div
          className={`deleteUser  w-[10%] p-2 border-r-2 border-gray-200 flex justify-center text-red-600 `}
        >
          <svg
            onClick={() => {
              deleteUser(user._id);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2 cursor-pointer"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default UserCard;
