import React from "react";
import pic from "../../../images/legsci.jpg";

function Author() {
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
            AUTHOR GUIDELINES
          </h2>

          <p>
            Please read and understand the author’s guidelines for the
            preparation manuscript. The author who submits a manuscript to the
            editors should comply with the author’s guidelines and template. If
            the submitted manuscript does not comply with the guidelines or
            using a different format, it will be rejected by the editorial team
            before being reviewed. The editorial team will only accept a
            manuscript that meets the specified formatting requirements
            (download Template ). This template is designed to assist Author in
            preparing manuscript; it is an exact representation of the format
            expected by the editor. To use this template, please just Save As
            this MS Word file to your document, then copy and paste your
            document here. All papers submitted to the journal should be written
            in English language.
          </p>
        </div>

        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            PAPER FORMAT
          </h2>

          <p className="space-y-2">
            &rarr;The sequence of manuscripts following: Title; Abstract;
            Keywords; Introduction; Method (for original research articles);
            Main Heading Analysis; Conclusion; and References.
            <p>
              {" "}
              &ndash;&gt; Referencing style uses the Chicago Manual of Style.
            </p>
          </p>
        </div>

        <div className="space-y-4  lg:pl-28 mx-auto w-[90%] mt-6">
          <h2
            className="text-4xl text-center md:text-start font-bold"
            style={{ color: "#6EC1E4" }}
          >
            Title
          </h2>

          <p className="space-y-3">
            <p>
              Title of articles are written with Calibri Light Bold (18 pt) and
              preferably not more than 14 words. Author(s) name, affiliations
              and e-mail.
            </p>
            <h3 className="font-semibold translate-y-3">Abstract</h3>
            <p>
              The abstract should be clear, concise, and descriptive. This
              abstract should provide a brief introduction to the problem,
              objective of paper, followed by a statement regarding the method
              and a brief summary of results. Font with Calibri Light (10 pt)
              and preferably not more than 200 words.
            </p>
            <h3 className="font-semibold translate-y-3">Keywords</h3>
            <p>
              Keywords arranged by alphabetically and should have at least two
              keywords and maximum five keywords separated by a semicolon (;).
            </p>
            <h3 className="font-semibold translate-y-3">Introduction</h3>
            <p>
              The introduction should be clear and provide the issue to be
              discussed in the manuscript. At the end of the paragraph, the
              author/s should end with a comment on the significance concerning
              identification of the issue and the objective of research.
            </p>
            <h3 className="font-semibold translate-y-3">Method</h3>
            <p>
              The method written in descriptive. This Method are optional, only
              for original research articles.
            </p>
            <h3 className="font-semibold translate-y-3">
              Analysis and Discussion
            </h3>
            <p>
              This section is the most important section of your article.
              Contains the results of the object of study and should be clear
              and concise.
            </p>
            <h3 className="font-semibold translate-y-3">Conclusion</h3>
            <p>
              Conclusion contains a description that should answer the
              objectives of research. Do not repeat the Abstract or simply
              describe the results of the research. Give a clear explanation
              regarding the possible application and/or suggestions related to
              the research findings.
            </p>
            <h3 className="font-semibold translate-y-3">References</h3>
            <p>
              For submissions, Legal Research and Analysis uses the Chicago
              Manual of Style in the References at the end of the manuscript.
              Cite only items that you have read and written on footnotes.
              Please use Reference Manager Applications like EndNote, Mendeley,
              Zotero, etc. Use other published articles in the same journal as
              models. All publications cited in the text should be included in
              the References section and arranged alphabetically.{" "}
            </p>
            <p>
              The citation quick guide can be found at:
              http://www.chicagomanualofstyle.org/tools_citationguide/citation-guide-1.html
            </p>
          </p>

          <div className="guidelines space-y-3">
            <h3 className="font-semibold">Guideline for Online Submission</h3>
            <p>
              Author should fulfil the form as detail as possible where the star
              marked form must be entered. After all form textbox was filled,
              Author clicks on “Register” button to proceed the registration.
              Therefore, Author is brought to online author submission interface
              where Author should click on “New Submission”. In the Start a New
              Submission section, click on “’Click Here’: to go to step one of
              the five-step submission process”. The following are five steps in
              online submission process:
            </p>
            <br />

            <ol className="space-y-3">
              <li>
                Step 1 – Starting the Submission: Select the appropriate section
                of journal, i.e. Original Research Articles or Review Article.
                Thus, author must check-mark on the submission checklists.
              </li>
              <li>
                Step 2 – Uploading the Submission: To upload a manuscript to
                this journal, click Browse on the Upload submission file item
                and choose the manuscript document file to be submitted, then
                click Upload button.{" "}
              </li>
              <li>
                Step 3 – Entering Submission’s Metadata: In this step, detail
                authors metadata should be entered including marked
                corresponding author. After that, manuscript title and abstract
                must be uploaded by copying the text and paste in the textbox
                including keywords
              </li>
              <li>
                Step 4 – Uploading Supplementary Files: Supplementary file
                should be uploaded including Covering/Submission Letter, the
                proofread evidence, and Signed Copyright Transfer Agreement
                Form. Therefore, click on Browse button, choose the files, and
                then click on Upload button.
              </li>
              <li>
                Step 5 – Confirming the Submission: Author should final check
                the uploaded manuscript documents in this step. To submit the
                manuscript to HALREV journal, click Finish Submission button
                after the documents is true. The corresponding author or the
                principal contact will receive an acknowledgement by email and
                will be able to view the submission’s progress through the
                editorial process by logging in to the journal web address site.
                After this submission, Authors who submit the manuscript will
                get a confirmation email about the submission. Therefore,
                Authors are able to track their submission status at any time by
                logging in to the online submission interface. The submission
                tracking includes the status of manuscript review and editorial
                process.
              </li>
            </ol>
          </div>
          <div>
            <h3>Submission Preparation Checklist</h3>
            <p>
              As part of the submission process, authors are required to check
              off their submission’s compliance with all of the following items,
              and submissions may be returned to authors that do not adhere to
              these guidelines. <br />
              The submission has not been previously published, nor is it before
              another journal for consideration (or an explanation has been
              provided in Comments to the Editor). It is up to the editorial
              board to decide upon acceptance. <br />
              The submission file is in OpenOffice or Microsoft Word file
              format. <br /> The submission article has been in accordance with
              Author’s Guidelines. <br /> Any third-party-owned materials used
              have been identified with appropriate credit lines, and permission
              obtained from the copyright holder for all formats of the journal.{" "}
              <br />
              The author declares the absence of any conflict of interest in
              this work.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
