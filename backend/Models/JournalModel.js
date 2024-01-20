import mongoose from "mongoose";
import validator from "validator";
const journalSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
      required: [true, "Author Names are required"],
    },
    title: {
      type: String,
      required: [true, "Title required for Journal"],
    },

    email: {
      type: String,
      required: [true, "Email required .."],
      validate: [validator.isEmail, "Please Enter valid email"],
    },

    description: {
      type: String,
      required: [true, "Description require for journal"],
    },
    status: {
      type: String,
      enum: ["Resubmit","Resubmitted","Under Review", "Published", "Rejected","Submitted"], // Add other allowed values as needed
      default: "Submitted",
    },

    pdf: {
      //paper pdf
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    form: {
      // form pdf
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    date: {
      //aproved date
      type: Date,
      default: Date.now(),
      required: true,
    },
    year: {
      type: Number,
      default: 0,
      required: true,
    },
    ms_id: {
      type: String,
      required: true,
      
    },
  },

  { timestamps: true }
);

export const Journal = mongoose.model("Journal", journalSchema);
