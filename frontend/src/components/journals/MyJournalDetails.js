import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJournalDetails } from "../../reducers/journalDetails";
import Loader from "../layout/Loader";
import axios from "axios";
function MyJournalDetails() {
  const { id } = useParams();
  const [file, setfile] = useState("");
  const [resubmitLoading, setresubmitLoading] = useState(false);
  const [resubmitSuccess, setresubmitSuccess] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, journal } = useSelector(
    (state) => state.journalDetails
  );

  const submitFileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("journal", file);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    // loadingTrue();
    setresubmitLoading(true);
    axios
      .put(`/api/v1/journal/resubmit/${journal?._id}`, formData, config)
      .then((data) => {
        // loadingFalse();
        setresubmitLoading(false);
        setresubmitSuccess(true);
        // fireAlert("success", "Status Changes Successfully ");
        console.log("success");
        // successTrue();
      })
      .catch((error) => {
        // fireAlert("error", error.message);
        // loadingFalse();
        setresubmitSuccess(false);
        setresubmitLoading(false);

        console.log("Failed");
        // successFalse();
      });
  };

  useEffect(() => {
    dispatch(getJournalDetails(id));
  }, [error, dispatch, resubmitSuccess, id]);

  return (
    <>
      {loading || resubmitLoading ? (
        <Loader />
      ) : (
        <div className="journalDetials min-h-screen px-3 md:px-6">
          <div className="heading my-7">
            <h2 className="title text-center  font-bold text-2xl">
              {journal?.title}
            </h2>

            <p className="date text-center text-gray-500">
              ( {journal?.date.slice(0, 10)} )
            </p>
          </div>

          <div className="abstractDiv ">
            <p className="text-start font-bold mb-3 ">Abstract :</p>
            <p className="abstract ">{journal?.description}</p>
          </div>

          <div className="author text-end mr-4 mt-10  ">
            <h3 className="authorName ">Author : ( {journal?.author} )</h3>
            <h5 className="email">Email : ( {journal?.email} )</h5>
          </div>

          <div className="status">
            <h6 className="heading  font-bold text-xl my-7">
              Status :{" "}
              <span
                className={` ${
                  journal?.status === "Published"
                    ? "text-green-800"
                    : journal?.status === "Under Review"
                    ? "text-yellow-400"
                    : journal?.status === "Submitted"
                    ? "text-gray-600"
                    : "text-red-900 "
                }`}
              >
                {journal?.status}
              </span>{" "}
            </h6>
          </div>

          {journal?.status === "Resubmit" && (
            <div className="resubmitBUtton">
              <form onSubmit={submitFileHandler}>
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-journal"
                  type="file"
                  accept=".pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple={false}
                  onChange={(e) => setfile(e.target.files[0])}
                />
                <button
                  type="submit"
                  className=" bg-blue-600 px-6 py-2 rounded-md text-white resubmitBtn "
                >
                  Resubmit
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MyJournalDetails;
