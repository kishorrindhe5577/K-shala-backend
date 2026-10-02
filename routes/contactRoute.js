const express = require("express");

const router = express.Router();

const rateLimit = require("express-rate-limit");

// const { validationResult } = require("express-validator");

const Contact = require("../db/Contact");

// const validateContact = require("../middlewares/contactMiddleware");


// Rate Limiter
const contactLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },

});


// POST Contact Route
router.post(

  "/contact",

  contactLimiter,



  async (req, res) => {

    try {


      // Save Contact
      const contact = new Contact({
        ...req.body,
        ipAddress: req.ip,
      });

      await contact.save();

      console.log("Contact form submitted");

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
      });

    } catch (error) {

      console.error("Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });

    }

  }
);

module.exports = router;