import { combineReducers } from "@reduxjs/toolkit";
import journalsReducer from "./journalsReducer";
import userReducer from "./userReducer";
import myJournalsReducer from "./myJournalsReducer";
import newJournalReducer from "./newJournal";
import allJournalsReducer from "./allJournalsReducer";
import allUsersReducer from "./allUsersReducer"
import  editUserReducer  from "./editUserReducer";
import journalDetailsReducer from "./journalDetails"
const rootReducers = combineReducers({
  user: userReducer,
  journals: journalsReducer,
  myJournals: myJournalsReducer,
  newJournal: newJournalReducer,
  allJournals : allJournalsReducer,
  allUsers:allUsersReducer,
  editUser:editUserReducer,
  journalDetails : journalDetailsReducer

});

export default rootReducers;
