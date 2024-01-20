import React from "react";
import pic from "../../../images/legsci.jpg";

function Archive() {
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

      <div className=" space-y-6 my-16 text-lg">
        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            DIGITAL ARCHIVING & PRESERVATION
          </h2>

          <p>
          Our journal is included in the following networks for digital archiving and long-term preservation <br />&rarr; LOCKSS (Lots of Copies Keep Stuff Safe), based at Stanford University <br /> &rarr; CLOCKSS (Controlled Lots of Copies Keep Stuff Safe), An independent non-profit organization. <br />LOCKSS is a “light” archive, which means that it can provide access to content even in the case of a temporary loss of access. <br />If a publisher’s server goes offline, LOCKSS participants can access their archived copy. <br /> Other archival services, like CLOCKKS, are “dark” archives, meaning that they serve as long-term archives, but users can only access content in the event of a catastrophic loss of access (e.g. the publisher goes bankrupt and ceases to exist).
          </p>
        </div>

      
      </div>
    </div>
  );
}

export default Archive;
