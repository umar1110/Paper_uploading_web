import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../layout/Loader";

function MyJournalsCard({
  journal,
  sr,
  loadingTrue,
  loadingFalse,
  successFalse,
  successTrue,
}) {
  const navigate = useNavigate();

  const resubmitRef = useRef(null);
  const onUploadFileHandler = () => {
    // console.log("Asdsssssssas")
    resubmitRef.current.click();
  };

  const submitFileHandler = (e) => {
    const formData = new FormData();
    formData.append("journal", e.target.files[0]);
    console.log("file");
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    loadingTrue();
    axios
      .put(`/api/v1/journal/resubmit/${journal._id}`, formData, config)
      .then((data) => {
        loadingFalse();

        // fireAlert("success", "Status Changes Successfully ");
        console.log("success");
        successTrue();
      })
      .catch((error) => {
        // fireAlert("error", error.message);
        loadingFalse();
        console.log("Failed");
        successFalse();
      });
  };

  return (
    <>
      <div
        className="journalHeadings w-full flex"
        style={{ backgroundColor: sr % 2 !== 0 ? "white" : "#EDF7F8" }}
      >
        <div className="serialNoHeadings w-[5%] border-r-2 border-gray-200 p-2">
          {sr}
        </div>
        <div
          onClick={() => navigate(`/mypaper/${journal._id}`)}
          className="titleHeading hover:underline cursor-pointer w-[40%] p-2 border-r-2 border-gray-200"
        >
          {journal.title}
        </div>
        <div
          className={`authorHeading w-[30%] p-2 border-r-2 font-bold border-gray-200 ${
            journal.status == "Published"
              ? "text-green-800"
              : journal.status == "Under Review"
              ? "text-yellow-400"
              : journal.status == "Submitted"
              ? "text-gray-600"
              : "text-red-900 "
          }`}
        >
          {journal.status === "Resubmit"
            ? `${journal.status}(Download first and Then Resubmit)`
            : journal.status}
        </div>
        <div className="actions w-[15%] p-2 border-r-2 border-gray-200">
          {journal.date.substring(0, 10)}
        </div>
        <div className="downloadLink flex px-7 justify-between w-[10%] p-2  border-gray-200">
          <a className="downloadPdf w-1/2 " href={journal.pdf.url}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
          {journal.status === "Resubmit" && (
            <div
              className="UploadPdf cursor-pointer "
              onClick={onUploadFileHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-upload"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </div>
          )}
        </div>
        <input
          className="hidden"
          type="file"
          name="resubmitFIle"
          ref={resubmitRef}
          id="resubmitFIle"
          onChange={submitFileHandler}
        />
      </div>
    </>
  );
}

export default MyJournalsCard;
