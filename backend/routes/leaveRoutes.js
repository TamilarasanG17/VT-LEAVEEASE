const express = require("express");
const LeaveApplication = require("../models/LeaveApplication");
const router = express.Router();

router.post("/", async (req, res) => {
  const leave = new LeaveApplication(req.body);
  try {
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const leaves = await LeaveApplication.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
