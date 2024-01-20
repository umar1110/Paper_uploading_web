import React, { useEffect, useState } from "react";
import pic from "../../images/legsci.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getJournals } from "../../reducers/journalsReducer";
import Loader from "../layout/Loader";
import JournalCard from "./JournalCard";
import { useRef } from "react";

function Journals() {
  const dispatch = useDispatch();
  const { journals, error, loading, filteredJournals } = useSelector(
    (state) => state.journals
  );

  const menuRef = useRef();
  const [page, setpage] = useState(1);
  const [filter, setFilter] = useState(["", "", 0]);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [year, setyear] = useState(0);

  const nextButtonHandler = () => {
    if (filteredJournals > (15*page) ) {
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
    setFilter([title, author, year]);
  };

  const toggleFilterMenu = () => {
    document.querySelector("#filterMenu")?.classList.toggle("hidden");
  };
  

  useEffect(() => {
    const payload = {
      // page,
      title: filter[0],
      author: filter[1],
      year: filter[2],
      page:page
    };
    dispatch(getJournals(payload));
  }, [dispatch, page, filter]);

  return (
    <div className="home">
      <div className="upper-home relative flex justify-center items-center h-[70vmin]">
        <div className="absolute top-0 opacity-90 img w-full h-full">
          <img src={pic} alt="" className="w-full h-full" />
        </div>

        <div className="headings text-center z-10 text-white space-y-4 opacity-100  ">
          <h1 className="md:text-8xl sm:text-5xl text-4xl font-semibold font-serif ">
            Legal Science
          </h1>
          <p className="text-xl  font-serif">A Research Journal</p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : journals.length === 0 ? (
        <>
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
            className="filterJournals hidden lg:flex  items-start    justify-between  p-2 text-white bg-gray-700"
          >
            <div className="title m-2 items-center flex space-x-2">
              <label htmlFor="titleFilter">Title :</label>
              <input
                type="text"
                id="titleFilter"
                value={title}
                onChange={(e) => settitle(e.currentTarget.value)}
                placeholder="Search by title"
                className="rounded-sm text-black outline-none p-2"
              />
            </div>

            <div className="year m-2 items-center flex space-x-2">
              <label htmlFor="dateFilter">Year :</label>
              <input
                type="number"
                placeholder="Year"
                className="w-[90px] p-2 text-black"
                maxLength={4}
                value={year}
                max={9999}
                onChange={(e) => setyear(e.currentTarget.value)}
              />
            </div>

            <div className="Author m-2 items-center flex space-x-2">
              <label htmlFor="authorFilter">Author :</label>
              <input
                type="text"
                id="authorFilter"
                onChange={(e) => setauthor(e.currentTarget.value)}
                value={author}
                placeholder="Search by Author"
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
                className="filterJournals  flex-col space-y-4  items-start    justify-between  p-2 text-white bg-gray-700"
              >
                <div className="title m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Title :</label>
                  </div>
                  <input
                    type="text"
                    id="titleFilter"
                    value={title}
                    onChange={(e) => settitle(e.currentTarget.value)}
                    placeholder="Search by title"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="Author m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Author :</label>
                  </div>

                  <input
                    type="text"
                    id="authorFilter"
                    onChange={(e) => setauthor(e.currentTarget.value)}
                    value={author}
                    placeholder="Search by Author"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="year m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Year :</label>
                  </div>
                  <input
                    type="number"
                    placeholder="Year"
                    className=" w-[40%] p-2 text-black"
                    maxLength={4}
                    value={year}
                    max={9999}
                    onChange={(e) => setyear(e.currentTarget.value)}
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
            <div className="journalslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[95%]">
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
                    Author
                  </div>
                  <div className="dateHeading w-[15%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                    Date
                  </div>
                  <div className="downloadLink w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                    Download
                  </div>
                </div>

                <p className="flex justify-center items-center font-bold text-xl">No Journal Found</p>
              </div>
            </div>
        </>
      ) : (
        <>
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
                className="filterJournals  flex-col space-y-4  items-start    justify-between  p-2 text-white bg-gray-700"
              >
                <div className="title m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Title :</label>
                  </div>
                  <input
                    type="text"
                    id="titleFilter"
                    value={title}
                    onChange={(e) => settitle(e.currentTarget.value)}
                    placeholder="Search by title"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="Author m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Author :</label>
                  </div>

                  <input
                    type="text"
                    id="authorFilter"
                    onChange={(e) => setauthor(e.currentTarget.value)}
                    value={author}
                    placeholder="Search by Author"
                    className="rounded-sm w-[80%] text-black outline-none p-2"
                  />
                </div>

                <div className="year m-2 items-center flex space-x-2">
                  <div className="w-[20%]">
                    <label htmlFor="dateFilter">Year :</label>
                  </div>
                  <input
                    type="number"
                    placeholder="Year"
                    className=" w-[40%] p-2 text-black"
                    maxLength={4}
                    value={year}
                    max={9999}
                    onChange={(e) => setyear(e.currentTarget.value)}
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
              className="filterJournals hidden lg:flex  items-start    justify-between  p-2 text-white bg-gray-700"
            >
              <div className="title m-2 items-center flex space-x-2">
                <label htmlFor="titleFilter">Title :</label>
                <input
                  type="text"
                  id="titleFilter"
                  value={title}
                  onChange={(e) => settitle(e.currentTarget.value)}
                  placeholder="Search by title"
                  className="rounded-sm text-black outline-none p-2"
                />
              </div>

              <div className="year m-2 items-center flex space-x-2">
                <label htmlFor="dateFilter">Year :</label>
                <input
                  type="number"
                  placeholder="Year"
                  className="w-[90px] p-2 text-black"
                  maxLength={4}
                  value={year}
                  max={9999}
                  onChange={(e) => setyear(e.currentTarget.value)}
                />
              </div>

              <div className="Author m-2 items-center flex space-x-2">
                <label htmlFor="authorFilter">Author :</label>
                <input
                  type="text"
                  id="authorFilter"
                  onChange={(e) => setauthor(e.currentTarget.value)}
                  value={author}
                  placeholder="Search by Author"
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

            <div className="journalslist min-h-[60vh] border-2 overflow-scroll overflow-x-scroll border-gray-200  mt-2 mx-auto w-[95%]">
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
                    Author
                  </div>
                  <div className="dateHeading w-[15%] font-semibold border-b-2 p-2 border-r-2 border-gray-200">
                    Date
                  </div>
                  <div className="downloadLink w-[10%] font-semibold border-b-2 p-2   border-gray-200">
                    Download
                  </div>
                </div>

                {journals?.map((journal, sr) => {
                  return (
                    <JournalCard
                      key={journal._id}
                      journal={journal}
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
    </div>
  );
}

export default Journals;
