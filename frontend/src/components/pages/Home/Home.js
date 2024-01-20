import React from "react";
import "./home.css";
import pic from "../../../images/legsci.jpg";
import {Link} from "react-router-dom"

function Home() {

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

      <div className="journalOptions my-16 mb-28 mx-auto mt-10 m-4 p-4 space-y-3 md:justify-between  md:w-[95%] md:flex">
       
       <div className="space-y-4 md:w-[50%] lg:pl-28 ">
       <h2 className="text-4xl text-center md:text-start font-bold" style={{color : "#6EC1E4"}}>Legal Research and Analysis</h2>
        <p>Legal Research and Analysis is a biannually Journal (January-June; July-December) published by the Society of Education for All. It aims at providing its readers with a detailed, advanced and insightful legal analysis of various ongoing developments in the legal arena. For the realization of its goals, the Journal draws on the academic rigor and excellence of students, faculty members, lawyers, judges and practitioners by featuring their valuable contributions in the Journal.</p>
       </div>
        
        <div className="space-y-4 md:w-[40%] ">
         <Link to={"/submit/journal"}>
         <button className="bg-green-400 hover:bg-green-800 duration-700 py-4 w-full text-white font-semibold">
            Submit a Journal
          </button>
         </Link>
          <button className="bg-green-400 hover:bg-green-800 duration-700 py-4 w-full text-white font-semibold">
            Open Access Peer Reviewed Research Journal
          </button>
          <button className="bg-green-400 hover:bg-green-800 duration-700 py-4 w-full text-white font-semibold">
            A Journal of Education for all Society 
          </button>
        </div>
      </div>

   

    </div>
  );
}

export default Home;
