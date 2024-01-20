import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getJournalDetails } from "../../reducers/journalDetails";
import Loader from "../layout/Loader";
import axios from "axios";
import { Alert, Stack } from "@mui/material";

function AdminJournalDetails() {
  const { id } = useParams();

  const [file, setfile] = useState("");

  const statusOPtions = [
    "Under Review",
    "Resubmit",
    "Published",
    "Rejected",
    "Submitted",
  ];
  const dispatch = useDispatch();
  const { loading, error, journal } = useSelector(
    (state) => state.journalDetails
  );
const [selectedValue, setselectedValue] = useState("")
  const [publishFile, setpublishFile] = useState("");
  const [sucess, setsucess] = useState(false);

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
    if (error) {
      dispatch(clearErrors());
    }

    if (sucess) {
      setsucess(false);
    }

    dispatch(getJournalDetails(id));
  }, [error, dispatch, sucess,id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlertDisplay && (
            <div className="alert fixed top-0 w-full ">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alertType}>{alertMessage}</Alert>
              </Stack>
            </div>
          )}
          <div className=" journalDetials relative min-h-screen px-3 md:px-6">
          <div className="downloadBtn w-full flex justify-evenly ">
            <a href={journal && journal?.pdf.url ? journal?.pdf.url: "#"}>
            <button className="btn py-2 px-5 rounded-lg bg-green-500 text-white my-4">Download Paper</button>
            </a>
            <a href={journal && journal?.form.url ? journal?.form.url: "#"}>
            <button className="btn py-2 px-5 rounded-lg bg-green-500 text-white my-4">Download Form</button>
            </a>
          </div>
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

            <div className="statusText mt-10 ">
              <p
                className={`text-2xl text-center font-bold ${
                  journal?.status === "Published"
                    ? "text-green-800"
                    : journal?.status === "Under Review"
                    ? "text-yellow-400"
                    : journal?.status === "Submitted"
                    ? "text-gray-600"
                    : "text-red-900 "
                }  `}
              >
                {journal?.status}
              </p>
            </div>

            <div class="md:flex md:items-center my-6">
              <div class="md:w-1/3 text-start">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlhtmlFor="inline-journal"
                >
                  Upload Checked Paper if Resubmit :
                </label>
              </div>
              <div class="md:w-fit">
                <input
                  required
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-journal"
                  type="file"
                  accept=".pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple={false}
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
            </div>

            <div class="md:flex md:items-center my-6">
              <div class="md:w-1/3 text-start">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlhtmlFor="inline-journal"
                >
                  Upload Final Paper before Publish :
                </label>
              </div>
              <div class="md:w-fit">
                <input
                  required
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-journal"
                  type="file"
                  accept=".pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple={false}
                  onChange={(e) => setpublishFile(e.target.files[0])}
                />
              </div>
            </div>
            <select
              name="status"
              value={selectedValue}
              id="status"
              className="bg-gray-200 px-7"
              onChange={(e) => {
                // Check if journal?._id is defined
                if (journal && journal?._id) {
                  if (e.target.value === "Resubmit") {
                    if (file) {
                      const formData = new FormData();
                      formData.append("status", e.target.value);
                      formData.append("journal", file);

                      const config = {
                        headers: { "Content-Type": "multipart/form-data" },
                      };

                      axios
                        .put(
                          `/api/v1/admin/status/${journal?._id}`,
                          formData,
                          config
                        )
                        .then((data) => {
                          fireAlert("success", "Status Changes Successfully ");

                          setsucess(true);
                        })
                        .catch((error) => {
                          fireAlert("error", error.message);

                          setsucess(false);
                        });
                    } else {
                      fireAlert("error", "File required for resubmit");
                      setselectedValue(state => state)
                    }
                  } else if (e.target.value === "Published") {
                    if (publishFile) {
                      const formData = new FormData();
                      formData.append("status", e.target.value);
                      formData.append("journal", publishFile);

                      const config = {
                        headers: { "Content-Type": "multipart/form-data" },
                      };

                      axios
                        .put(
                          `/api/v1/admin/status/${journal?._id}`,
                          formData,
                          config
                        )
                        .then((data) => {
                          fireAlert("success", "Status Changes Successfully ");

                          setsucess(true);
                        })
                        .catch((error) => {
                          fireAlert("error", error.message);

                          setsucess(false);
                        });
                    } else {
                      fireAlert("error", "File required for resubmit");
                      setselectedValue(state=>state)
                    }
                  } else {
                    const config = {
                      headers: { "Content-Type": "application/json" },
                    };
                    axios
                      .put(
                        `/api/v1/admin/status/${journal?._id}`,
                        { status: e.target.value },
                        config
                      )
                      .then((data) => {
                        fireAlert("success", "Status Changes Successfully ");
                        setsucess(true);
                      })
                      .catch((error) => {
                        fireAlert("error", error.message);

                        setsucess(false);
                      });
                  }
                } else {
                  fireAlert("error", "Journal Not found");
                }
              }}
            >
              <option value="" disabled selected>
                {journal?.status}
              </option>
              {statusOPtions.map((status, i) => {
                return (
                  <option key={i} value={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
    </>
  );
}

export default AdminJournalDetails;
