import React from "react";
import pic from "../../../images/legsci.jpg";


function Contact() {
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
        <div className="space-y-3  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
           Editor
          </h2>

          <h2 > 
          Dr Muhammad Zia Ul Haq
          </h2 >
          <h2 className="text-xl">University of Engineering and Technology Lahore Pakistan </h2>
          <h2 className="text-sm italic">editor@legalresearchanalysis.com </h2>
        </div>

      
      </div>
    </div>
  );
}

export default Contact;
