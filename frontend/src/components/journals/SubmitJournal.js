import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetNewJournal, submitJournal } from "../../reducers/newJournal";
import Loader from "../layout/Loader";
import { clearErrors } from "../../reducers/newJournal";
import { Alert, Stack } from "@mui/material";

function SubmitJournal() {
  const formUrl = "https://res.cloudinary.com/ddv6lasng/raw/upload/v1704298913/Journals/lefohkpkejvpuadfrqug.docx"
  const dispatch = useDispatch();

  const { loading, success, error, message } = useSelector(
    (state) => state.newJournal
  );
  const [email, setEmail] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, settitle] = useState("");
  const [file, setFile] = useState("");
  const [form, setForm] = useState("");

  const [isAlertDisplay, setisAlertDisplay] = useState(false);
  const [alertMessage, setalertMessage] = useState("Error Occured !!");
  const [alertType, setalertType] = useState("error");

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("email", email);
    formData.append("journal", file);
    formData.append("form",form)
    
   

    dispatch(submitJournal(formData));
  };

  const fireAlert = (type, message) => {
    setalertType(type);
    setalertMessage(message);
    setisAlertDisplay(true);

    setTimeout(() => {
      setisAlertDisplay(false);
    }, 3000);
  };

  useEffect(() => {
    if (success) {
      fireAlert("success", message);

      dispatch(resetNewJournal());
    }
    if (error) {
      fireAlert("error", error);
      dispatch(clearErrors());
    }
  }, [success, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlertDisplay && (
            <div className="alert absolute w-full ">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alertType}>{alertMessage}</Alert>
              </Stack>
            </div>
          )}
          <form
            className="w-full min-h-fit py-11 my-16 z-30  max-w-sm mx-auto h-[90vh] flex flex-col justify-center"
            onSubmit={submitForm}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Title
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Authors :
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="Authors, publishers"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Email :
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-description"
                >
                  Abstract :
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-description"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-journal"
                >
                  Upload Paper :
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-journal"
                  type="file"
                  accept=".pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple={false}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 min-w-fit text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-journal"
                >
                  Download Form :
                </label>
              </div>
              
              <a className="md:w-2/3 mx-auto"  onClick={()=>window.location.href = formUrl} >
                <button className="w-full text-white rounded-md bg-gray-700 py-3 px-6">Download form </button>
              </a>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3 min-w-fit text-start">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-journal"
                >
                  Upload Form <br />( After Fill ) :
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-journal"
                  type="file"
                  accept=".pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple={false}
                  onChange={(e) => setForm(e.target.files[0])}
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default SubmitJournal;
