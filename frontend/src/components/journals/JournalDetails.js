import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getJournalDetails } from "../../reducers/journalDetails";
import Loader from "../layout/Loader";

function JournalDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, journal } = useSelector(
    (state) => state.journalDetails
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getJournalDetails(id));
  }, [error, dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="journalDetials min-h-screen px-3 md:px-6">
          
          <div className="downloadBtn w-full text-center">
            <a href={journal && journal.pdf.url ? journal.pdf.url: "#"}>
            <button className="btn py-2 px-5 rounded-lg bg-green-500 text-white my-4">Download</button>
            </a>
          </div>
          <div className="heading my-7">
            <h2 className="title text-center  font-bold text-2xl">
              {journal && journal.title ? journal.title : "No Title"}
            </h2>

            <p className="date text-center text-gray-500">
              {journal && journal.date ? `(${journal.date.slice(0, 10)})` : ""}
            </p>
          </div>

          <div className="abstractDiv ">
            <p className="text-start font-bold mb-3 ">Abstract :</p>
            <p className="abstract ">
              {journal && journal.description
                ? journal.description
                : "NO Description"}
            </p>
          </div>

          <div className="author text-end mr-4 mt-10">
            <h3 className="authorName">
              Author:{" "}
              {journal && journal.author
                ? `(${journal.author})`
                : "(No Author)"}
            </h3>
            <h5 className="email">
              Email:{" "}
              {journal && journal.email ? `(${journal.email})` : "(No Email)"}
            </h5>
          </div>
        </div>
      )}
    </>
  );
}

export default JournalDetails;
