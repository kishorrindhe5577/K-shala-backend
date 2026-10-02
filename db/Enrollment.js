const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,

      required: [true, "Full name is required"],

      trim: true,

      minlength: 3,

      maxlength: 60,
    },

    email: {
      type: String,

      required: [true, "Email is required"],

      trim: true,

      lowercase: true,

      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],

      index: true,
    },

    mobile: {
      type: String,

      required: [true, "Mobile number is required"],

      trim: true,

      match: [
        /^[0-9+\-\s]{10,15}$/,
        "Please enter a valid mobile number",
      ],

      index: true,
    },

    dob: {
      type: Date,

      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,

      required: true,

      enum: ["Male", "Female", "Other"],
    },

    address: {
      type: String,

      required: true,

      trim: true,

      maxlength: 300,
    },

    highestQualification: {
      type: String,

      required: true,

      trim: true,

      enum: [
        "10th",
        "12th",
        "Diploma",
        "Graduate",
        "Undergraduate",
        "Postgraduate",
        "PhD",
        "Other",
      ],
    },

    university: {
      type: String,

      required: true,

      trim: true,

      maxlength: 100,
    },

    passingYear: {
   type: String,
   required: true,
},

    batchTiming: {
      type: String,

      required: true,

      enum: [
        "Morning",
        "Afternoon",
        "Evening",
        "Weekend",
      ],
    },

    heardAbout: {
      type: String,

      required: true,

      trim: true,

      maxlength: 100,
    },

    courseTitle: {
      type: String,

      required: true,

      trim: true,

      index: true,
    },
    terms: {
  type: Boolean,

  required: true,

  default: false,
},

  

  
  },

  {
    timestamps: true,

    versionKey: false,
  }
);


// Compound Index for fast filtering
EnrollmentSchema.index({
  email: 1,
  courseTitle: 1,
  createdAt: -1,
});


module.exports = mongoose.model(
  "Enrollment",
  EnrollmentSchema
);