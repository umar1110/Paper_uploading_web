import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import About from "./components/pages/About/About.js";
import Contact from "./components/pages/Contact/Contact.js";
import Editorial from "./components/pages/Editorial/Editorial.js";
import Author from "./components/pages/Author/Author.js";
import Archive from "./components/pages/Archive/Archive.js";
import Home from "./components/pages/Home/Home";
import Footer from "./components/layout/Footer";
import Journals from "./components/journals/Journals.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./reducers/userReducer.js";
import LoginSignUpp from "./components/user/LoginSignUPP.js";

import PrAccRoute from "./protectedRoutes/PrAccRoute.js";
import PrMyJournals from "./protectedRoutes/PrMyJournals.js";

import PrSubmitJournal from "./protectedRoutes/PrSubmitJournal.js";
import PrAdDashboardRoute from "./protectedRoutes/PrAdDashboardRoute.js";
import JournalDetails from "./components/journals/JournalDetails.js";
import PrAdminJournalDetails from "./protectedRoutes/PrAdminJournalDetails.js";

import PrMyJournalDetails from "./protectedRoutes/PrMyJournalDetails.js";
import NotFound from "./components/pages/NotFound.js";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/editorial" element={<Editorial />} />
          <Route path="/author" element={<Author />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/login" element={<LoginSignUpp />} />
          <Route path="/account/*" element={<PrAccRoute />} />
          <Route path="/myjournals/*" element={<PrMyJournals />} />
          <Route path="/submit/journal/*" element={<PrSubmitJournal />} />
          <Route path="/paper/:id" element={<JournalDetails />} />
          <Route path="/mypaper/:id/*" element={<PrMyJournalDetails />} />
          <Route path="/admin/paper/:id/*" element={<PrAdminJournalDetails />} />

          <Route
            path="/admin/dashboard/*"
            element={<PrAdDashboardRoute />}
          ></Route>

          <Route path="*" element={<NotFound />} />
          {/* 
          <Route path="/admin/dashboard/*" element={<Dashboard />}>
            <Route path="journals" element={<Home />} />
            <Route path="users" element={<Archive />} />
          </Route> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
