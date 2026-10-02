const { body } = require("express-validator");

const validateEnrollment = [

  body("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),

  body("mobile")
    .trim()
    .isMobilePhone("any")
    .withMessage("Valid mobile number is required"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required"),

  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender selected"),

  body("address")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address is required"),

  body("highestQualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required"),

  body("university")
    .trim()
    .notEmpty()
    .withMessage("University name is required"),

  body("passingYear")
    .isInt({ min: 1990, max: 2100 })
    .withMessage("Invalid passing year"),

  body("batchTiming")
    .notEmpty()
    .withMessage("Batch timing is required"),

  body("heardAbout")
    .trim()
    .notEmpty()
    .withMessage("Please specify how you heard about us"),

  body("courseTitle")
    .trim()
    .notEmpty()
    .withMessage("Course title is required"),

  body("terms")
    .custom((value) => value === true)
    .withMessage("You must accept terms and conditions"),

];

module.exports = validateEnrollment;