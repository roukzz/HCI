const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const cors = require ("cors");

const User = require ("./models/user") ;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());






// ===== users outes =====
// ===========================================
app.use("/api/user", require("./routes/userController"));

// ===== Authentication routes =====
// =================================
app.use("/api/auth", require("./routes/authenticationController"));


// ===== home route =====
// =================================

app.get("/api/user/all",function(req,res){
  res.send("Welcome to EfficientAthlete ")
  
});












module.exports = app;
