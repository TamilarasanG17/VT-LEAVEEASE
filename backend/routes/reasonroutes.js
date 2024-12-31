const express = require("express");
const Reason = require("../models/reason");
const router = express.Router();

router.post("/", async (req, res) => {
  const reason = new Reason(req.body);
  try {
    await reason.save();
    res.status(201).json(reason);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const reasons = await Reason.find();
    res.status(200).json(reasons);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
