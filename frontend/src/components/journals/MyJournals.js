import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMyJournals } from "../../reducers/myJournalsReducer";
import Loader from "../layout/Loader";
// import JournalCard from "./JournalCard";
import MyJournalsCard from "./MyJouralsCard"

function MyJournals() {
  const dispatch = useDispatch();
  const { journals, error, loading, totalJournals } = useSelector(
    (state) => state.myJournals
  );
  const [success, setsuccess] = useState(false);
  const [page, setpage] = useState(1);

  const [resubmitLoading, setresubmitLoading] = useState(false)

  const nextButtonHandler = () => {
    console.log(totalJournals);
    if (totalJournals >= 15 * page) setpage(page + 1);
  };
  const backButtonhandler = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  useEffect(() => {
    dispatch(getMyJournals(page));
if(success)
{
  setsuccess(false)
}

  }, [dispatch, page,success]);

  return (
    <div className="home">
      {loading || resubmitLoading  ? (
        <Loader />
      ) : journals.length == 0 ? (
        <>
          <div
            id="filterMenu"
            className="  filterBox hidden  mx-auto  justify-evenly lg:hidden h-[60vmax] flex-col items-center w-[70vmax] max-w-full bg-gray-700 "
          ></div>
          <div className="journalslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[98%]">
            <div className="journals min-w-[700px] ">
              <div
                className="journalHeadings w-full flex"
                style={{ backgroundColor: "#DAEFF1" }}
              >
                <div className="serialNoHeadings w-[5%]  font-semibold border-b-2 p-2 flex-shrink-0 border-r-2 border-gray-200">
                  Sr.
                </div>
                <div className="titleHeading w-[40%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                  Title
                </div>
                <div className="authorHeading w-[30%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                  Status
                </div>
                <div className="dateHeading w-[15%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                  Date
                </div>
                <div className="downloadLink w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                  Download/Upload
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
          <div className="relative">
            <div className="journalslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[98%]">
              <div className="journals min-w-[700px] ">
                <div
                  className="journalHeadings w-full flex"
                  style={{ backgroundColor: "#DAEFF1" }}
                >
                  <div className="serialNoHeadings w-[5%]  font-semibold border-b-2 p-2 flex-shrink-0 border-r-2 border-gray-200">
                    Sr.
                  </div>
                  <div className="titleHeading w-[40%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                    Title
                  </div>
                  <div className="authorHeading w-[30%] font-semibold border-b-2 p-2  flex-grow border-r-2 border-gray-200">
                    Status
                  </div>
                  <div className="dateHeading w-[15%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                    Actions
                  </div>
                  <div className="downloadLink w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                    Download/Upload
                  </div>
                </div>

                {journals?.map((journal, sr) => {
                  return (
                    <MyJournalsCard
                      key={journal._id}
                      journal={journal}
                      loadingTrue = {()=>setresubmitLoading(true)}
                      loadingFalse = {()=>setresubmitLoading(false)}
                      successTrue = {()=>setsuccess(true)}
                      successFalse = {()=>setsuccess(false)}
                      sr={page !== 1 ? sr + 1 + (page - 1) * 15 : sr + 1}
                    />
                  );
                })}
              </div>
            </div>

            <div className="pagination mx-auto flex mb-14 w-[98%] justify-center space-x-6 h-12 bg-black text-white ">
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
    </div>
  );
}

export default MyJournals;
