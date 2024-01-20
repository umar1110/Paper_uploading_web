import catchAsyncFuncError from "../utils/catchAsyncFunctionError.js";
import { Journal } from "../Models/JournalModel.js";
import { cloudinaryUpload } from "../utils/cloudinaryUpload.js";
import cloudinary from "cloudinary";
import FilterJournals from "../utils/filterDb.js";
import ErrorHandler from "../utils/errorhandler.js";
import sendMail from "../utils/sendMail.js";

// to submit by user
export const submitJournal = catchAsyncFuncError(async (req, res, next) => {
  // Owner will get from user in req
  // imlement all jwt token to store cookie in user model than access it by middleware to authentication

  const owner = req.user._id;

  const { author, title, description, email } = req.body;

  // cloudinary implementation to generate the pdf links

  if (!req.files["journal"] || !req.files["form"]) {
    return next(new ErrorHandler("Enter Both files", 401));
  }

  const journal = await Journal.create({
    owner,
    author,
    title,
    email,
    description,
    ms_id: "sample",
    pdf: {
      public_id: "pdf.public_id",
      url: "pdf.secure_url",
    },
    form: {
      public_id: "Form.public_id",
      url: "Form.secure_url",
    },
  });

  const j_id = journal.id.toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const ms_id = `ls-${random}${j_id}`;

  let pdf = await cloudinaryUpload(
    req.files["journal"][0].path,
    req.files["journal"][0].filename
  );

  journal.pdf.public_id = pdf.public_id;
  journal.pdf.url = pdf.secure_url;

  pdf = await cloudinaryUpload(
    req.files["form"][0].path,
    req.files["form"][0].filename
  );

  
  journal.form.public_id = pdf.public_id;
  journal.form.url = pdf.secure_url;

  journal.ms_id = ms_id;

  await journal.save({ validateBeforeSave: false });
  // const journal=2;

  const message = `Your journal with  ID: ${journal.ms_id} has been submitted `;

  await sendMail({
    email: journal.email,
    subject: "Journal UnderReview",
    message: message,
  });

  res.status(200).json({
    success: true,
    message: " Journal Submitted successfully ",
    journal,
  });
});

// Admin -> Get all journals
export const getAllJournals = catchAsyncFuncError(async (req, res) => {
  let filterJournals = new FilterJournals(Journal, req.query)
    .titleFilter()
    .authorFilter()
    .idFilter()
    .yearFilter();

  let journals = await filterJournals.query.find();
  const journalsCounts = journals.length;

  filterJournals = new FilterJournals(Journal, req.query)
    .titleFilter()
    .authorFilter()
    .yearFilter()
    .idFilter()
    .pagination(15);

  journals = await filterJournals.query.sort({ _id: -1 }).find(); // Sorting by date in descending order

  res.status(200).json({
    success: true,
    journals,
    totalJournals: (await Journal.find()).length,
    filteredJournals: journalsCounts,
  });
});

//Admin -> Delete Journal
export const deleteJournal = catchAsyncFuncError(async (req, res) => {
  const { id } = req.params;
  const journal = await Journal.findById(id);

  if (!journal) {
    return res.status(404).json({
      success: false,
      message: "No journal found.",
    });
  }

  let pId = journal.pdf.public_id;
  //   const result = await cloudinary.v2.uploader.destroy("Journals/COAL_Assignment_2_F23_iuzgpi.docx-1703166747902.docx");
  const { result } = await cloudinary.v2.uploader.destroy(pId, {
    resource_type: "raw",
  });

  pId = journal.form.public_id;
  const formDel = await cloudinary.v2.uploader.destroy(pId, {
    resource_type: "raw",
  });

  if (!result === "ok") {
    console.log("Journal not deleted from cloudinary");
  }

  await Journal.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Journal deleted successfully",
  });
});

// Admin -> Change status, Rejected etc
export const changeStatus = catchAsyncFuncError(async (req, res, next) => {
  const journal = await Journal.findOne({ _id: req.params.id });

  if (!journal) {
    return res.status(404).json({
      success: false,
      message: "Journal not found.",
    });
  }

  const status = req.body.status;

  if (status === "Published") {
    if (!req.file) {
      return next(new ErrorHandler("File required for resubmit"));
    }

    const { result: delRes } = await cloudinary.v2.uploader.destroy(
      journal.pdf.public_id,
      { resource_type: "raw" }
    );

    const pdf = await cloudinaryUpload(req.file.path, req.file.filename);

    journal.pdf.public_id = pdf.public_id;
    journal.pdf.url = pdf.secure_url;

    const date = new Date(Date.now());
    const month = date.getMonth();
    const day = date.getDate() + 1;
    const year = date.getFullYear();

    const currentDate = new Date(year, month, day);

    journal.date = Date.parse(currentDate);
    journal.year = year;

    const journalurl = `${req.protocol}:://${req.get(
      "host"
    )}/paper/${journal._id} `; 
    const message = `Your journal with ${journal.ms_id}  has been published. 
     Visit the link ${journalurl} `;

    await sendMail({
      email: journal.email,
      subject: "Journal Published",
      message: message,
    });
  }

  if (status === "Resubmit") {
    if (!req.file) {
      return next(new ErrorHandler("File required for resubmit"));
    }

    const { result: delRes } = await cloudinary.v2.uploader.destroy(
      journal.pdf.public_id,
      { resource_type: "raw" }
    );

    const pdf = await cloudinaryUpload(req.file.path, req.file.filename);

    journal.pdf.public_id = pdf.public_id;
    journal.pdf.url = pdf.secure_url;

    const message = `Your paper has been send back for re-submit kindly dwnload it and resubmit  `;

    await sendMail({
      email: journal.email,
      subject: "Journal rsubmit",
      message: message,
    });
  }

  if (status === "Under Review") {
    const message = `Your journal with ${journal.ms_id} is Under reveiw `;

    await sendMail({
      email: journal.email,
      subject: "Journal UnderReview",
      message: message,
    });
  }
  if (status === "Rejected") {
    const message = `Your journal with ID ${journal.ms_id} Has been rejected `;

    await sendMail({
      email: journal.email,
      subject: "Journal Rejected",
      message: message,
    });
  }

  journal.status = status;

  await journal.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: `Status Changed successfully to ${status}`,
    journal,
  });
});

//resubmit Journal
export const reSubmitJournal = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;

  const jr = await Journal.findById(id);

  if (!jr) {
    return next(new ErrorHandler("Journal Not Exists", 401));
  }

  if (!req.file) {
    return next(new ErrorHandler(" Enter File ", 401));
  }

  let pdf = await cloudinaryUpload(req.file.path, req.file.filename);

  const { result } = await cloudinary.v2.uploader.destroy(jr.pdf.public_id, {
    resource_type: "raw",
  });

  jr.pdf.public_id = pdf.public_id;
  jr.pdf.url = pdf.secure_url;
  jr.status = "Resubmitted";
  await jr.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    journal: jr,
    message: "Journal Resubmitted Successfully",
  });
});

//Journals for display -> For all users
export const getJournals = catchAsyncFuncError(async (req, res) => {
  // console.log(journals)

  let filterJournals = new FilterJournals(Journal, req.query)
    .titleFilter()
    .authorFilter()
    .yearFilter();

  let journals = await filterJournals.query.find({ status: "Published" });
  const journalCounts = journals.length;

  filterJournals = new FilterJournals(Journal, req.query)
    .titleFilter()
    .authorFilter()
    .yearFilter()
    .pagination(15);

  journals = await filterJournals.query
    .sort({ date: -1 })
    .find({ status: "Published" });

  res.status(200).json({
    success: true,
    journals,
    totalJournals: (await Journal.find({ status: "Approved" })).length,
    filteredJournals: journalCounts,
  });
});

//Journals for display -> For me
export const getMyJournals = catchAsyncFuncError(async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    return next(new ErrorHandler("No User Loginned !! "));
  }

  const filterJournals = new FilterJournals(
    Journal.find({ owner: `${_id}` }),
    req.query
  ).pagination(15);

  const journals = await filterJournals.query.find();

  if (!journals) {
    return next(new ErrorHandler(" Invalid User "));
  }

  res.status(200).json({
    success: true,
    totalJournals: (await Journal.find({ owner: `${_id}` })).length,
    journals,
  });
});

// delete user's own Journal
export const deleteOwnJournal = catchAsyncFuncError(async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const journal = await Journal.findById(id);

  if (!journal) {
    return next(new ErrorHandler("Journal not exists", 401));
  }

  // console.log(userId,"   ",journal.owner)
  if (userId != journal.owner) {
    return next(
      new ErrorHandler("You are not allowed to delete other's journal", 401)
    );
  }

  if (journal.status === "Approved" || journal.status === "Under Review") {
    return next(
      new ErrorHandler(`Not allowed to delete ${journal.status} journal`)
    );
  }

  const { result } = await cloudinary.v2.uploader.destroy(
    journal.pdf.public_id,
    {
      resource_type: "raw",
    }
  );

  const formRes = await cloudinary.v2.uploader.destroy(journal.form.public_id, {
    resource_type: "raw",
  });

  if (!result === "ok") {
    console.log("Journal not deleted from cloudinary");
  }

  await Journal.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Journal deleted successfully",
    journal,
  });
});

// To Edit Journal
export const updateJournal = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;

  let prev;
  try {
    prev = await Journal.findById(id);
  } catch (e) {
    return next(new ErrorHandler("Journal Not Found", 401));
  }

  const { email, author, title, description } = req.body;
  let data;

  if (req.file) {
    const { path, filename } = req.file;
    const file = await cloudinaryUpload(path, filename);
    // console.log(file)
    data = {
      email,
      author,
      title,
      description,
      pdf: {
        public_id: file.public_id,
        url: file.secure_url,
      },
    };
    const { result } = await cloudinary.v2.uploader.destroy(
      prev.pdf.public_id,
      {
        resource_type: "raw",
      }
    );
  } else {
    data = { email, author, title, description };
  }

  const journal = await Journal.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Journal has been updated ",
    journal,
  });
});

// get Journal details -> User
export const getJournalDetials = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;

  const journal = await Journal.findById(id);

  if (!journal) return next(new ErrorHandler("Journal not found ", 404));

  res.status(200).json({
    success: true,
    journal,
  });
});
