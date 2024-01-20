import React from "react";
import pic from "../../../images/legsci.jpg";

function Editorial() {
  return (
    <div className="home">
      <div className="upper-home relative flex justify-center items-center h-[60vmin]">
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

      <div className=" space-y-6 my-16">
        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            Editorial Board
          </h2>
          <h2 
            className="text-3xl  text-center  -translate-y-4 md:text-start "
            style={{ color: "#6EC1E4" }}
          >
            Editor-In-Chief :-
          </h2>
          <p>
            Dr. Muhammad Zia-Ul-Haq, Office of Research, Innovation and
            Commercialization, University of Engineering and Technology Lahore
            Pakistan. Managing Editor: DINU Cătălina Georgeta, Faculty of Law,
            Transilvania University of Brasov, Romania
          </p>
          <p>Editorial Advisory Board members</p>
        </div>
      </div>
    </div>
  );
}

export default Editorial;
