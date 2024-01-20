import React from "react";
// import "./adminJournalCard.css"
// import "./AdminJournalCardStyle.css"
import { useNavigate } from "react-router-dom";
function AdminJournalCard({ journal, sr }) {
  const navigate = useNavigate();

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
          onClick={() => navigate(`/admin/paper/${journal._id}`)}
          className="titleHeading hover:underline cursor-pointer w-[40%] p-2 border-r-2 border-gray-200"
        >
          {journal.title}
        </div>
        <div className=" authorHeading w-[30%] p-2 border-r-2 border-gray-200">
          {journal.author}
        </div>
        <div className="descriptionHeading w-[15%] p-2 border-r-2 border-gray-200">
          {journal.date.substring(0, 10)}
        </div>
        <div className="downloadLink  w-[10%] p-2  border-gray-200">
          <a className="downloadPdf" href={journal.pdf?.url }>
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
        </div>
      </div>
    </>
  );
}

export default AdminJournalCard;
