const { body } = require("express-validator");

const validateContact = [

  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Valid phone number required"),

  body("service")
    .notEmpty()
    .withMessage("Please select a service"),

  body("message")
    .trim()
    // .isLength({ min: 10 })
    .withMessage("Message should be at least 10 characters"),

];

module.exports = validateContact;