import express from "express";
const router = express.Router();
import {changeStatus, deleteJournal, getJournals, getAllJournals, submitJournal, deleteOwnJournal, updateJournal, getMyJournals, reSubmitJournal, getJournalDetials} from "../controllers/journalController.js"
import { upload } from "../middleware/multer.js";
import { isAuthenticatedRole, isAuthenticatedUser } from "../middleware/routeAuth.js";



router.route("/journal/submit").post(isAuthenticatedUser,upload.fields([{name:"journal",maxCount:1},{name:"form",maxCount:1}]) ,submitJournal);
router.route("/journal/resubmit/:id").put(isAuthenticatedUser,upload.single("journal") ,reSubmitJournal);
router.route("/admin/journals").post(isAuthenticatedUser,isAuthenticatedRole,getAllJournals);   
router.route("/admin/delete/journal/:id").delete(isAuthenticatedUser,isAuthenticatedRole,deleteJournal);
router.route("/admin/status/:id").put(isAuthenticatedUser,isAuthenticatedRole,upload.single("journal"),changeStatus);
router.route("/journals").get(getJournals);
router.route("/journal/:id").get(getJournalDetials);

router.route("/me/journals").get(isAuthenticatedUser,getMyJournals);
router.route("/delete/journal/:id").delete(isAuthenticatedUser,deleteOwnJournal);
router.route("/journal/update/:id").put(isAuthenticatedUser,upload.single("journal") ,updateJournal);





export default router;