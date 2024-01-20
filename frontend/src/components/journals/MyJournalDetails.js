import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJournalDetails } from "../../reducers/journalDetails";
import Loader from "../layout/Loader";

function MyJournalDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, journal } = useSelector(
    (state) => state.journalDetails
  );

  useEffect(() => {
    dispatch(getJournalDetails(id));
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="journalDetials min-h-screen px-3 md:px-6">
          <div className="heading my-7">
            <h2 className="title text-center  font-bold text-2xl">
              {journal.title}
            </h2>

            <p className="date text-center text-gray-500">
              ( {journal.date.slice(0, 10)} )
            </p>
          </div>

          <div className="abstractDiv ">
            <p className="text-start font-bold mb-3 ">Abstract :</p>
            <p className="abstract ">{journal.description}</p>
          </div>

          <div className="author text-end mr-4 mt-10  ">
            <h3 className="authorName ">Author : ( {journal.author} )</h3>
            <h5 className="email">Email : ( {journal.email} )</h5>
          </div>

          <div className="status">
            <h6 className="heading  font-bold text-xl my-7">
              Status :{" "}
              <span
                className={` ${
                  journal.status == "Published"
                    ? "text-green-800"
                    : journal.status == "Under Review"
                    ? "text-yellow-400"
                    : journal.status == "Submitted"
                    ? "text-gray-600"
                    : "text-red-900 "
                }`}
              >
                {journal.status}
              </span>{" "}
            </h6>
          </div>

          <di className="resubmitBUtton">
            <button className=" bg-blue-600 px-6 py-2 rounded-md text-white resubmitBtn ">
                Resubmit
            </button>
          </di>
        </div>
      )}
    </>
  );
}

export default MyJournalDetails;
