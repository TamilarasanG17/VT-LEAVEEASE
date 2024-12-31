const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path=require('path')
require("dotenv").config();

const leaveRoutes = require("./routes/leaveRoutes");
const reasonRoutes = require("./routes/reasonroutes")
const app = express();

app.use(cors());
app.use(express.json());
PORT=process.env.PORT||3500

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/leaves", leaveRoutes);

app.use("/api/reasons", reasonRoutes);

app.use(express.static(path.join(__dirname,'frontend','dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});


