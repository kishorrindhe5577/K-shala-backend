const express = require("express");
const router = express.Router();

const Enrollment = require("../db/Enrollment");

// CREATE ENROLLMENT
router.post("/enroll", async (req, res) => {
  console.log("========== NEW ENROLLMENT ==========");
  console.log("BODY RECEIVED:", req.body);

  try {
    const enrollment = new Enrollment(req.body);

    const savedEnrollment = await enrollment.save();

    console.log("ENROLLMENT SAVED:", savedEnrollment._id);

    const response = {
      success: true,
      message: "Enrollment Submitted Successfully",
      data: savedEnrollment,
    };

    console.log("SENDING RESPONSE:", response);

    return res.status(201).json(response);

  } catch (error) {
    console.error("ENROLLMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;