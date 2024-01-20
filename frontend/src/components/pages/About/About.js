import React from "react";
import pic from "../../../images/legsci.jpg";

function About() {
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
            ABOUT THE JOURNAL
          </h2>
          <p>
            Legal Research and Analysis is an open access, peer-reviewed journal
            which aims to offer an academic platform for ‘multidimensional’
            legal research, i.e., research in which authors cross the boundaries
            of their own legal system or field. Authors may do so by conducting
            cross-country comparative legal research, connecting one legal field
            with another (e.g., private law with criminal law), or enriching
            legal analysis through reliance on disciplines other than law (e.g.,
            philosophy, economics, political science, public administration,
            technology studies). Authors should make sure that the law occupies
            a central position in their analysis. Authors can contribute their
            research work on any topic related to law and help create a quality
            platform that can be used by anyone to gain or develop their
            knowledge and expertise in the subject of law. The Journal revolves
            around Socio-legal topics and is not restricted to any specific
            field or subject of law. The Journal promotes interdisciplinary
            research entailing detailed study of law with other disciplines in
            the contemporary era.
          </p>
        </div>

        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            PUBLICATION FREQUENCY
          </h2>
          <p>
            The journal will be published twice a year in June, and December.
          </p>
        </div>

        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            OPEN ACCESS POLICY
          </h2>
          <p>
            This journal provides immediate open access to its content on the
            principle that making research freely available to the public
            supports a greater global exchange of knowledge.
          </p>
        </div>

        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            ARTICLE PROCESSING CHARGES (APCS)
          </h2>
          <p>The journal does not charge Article Processing Charges (APCs).</p>
        </div>
      </div>

     
    </div>
  );
}

export default About;
