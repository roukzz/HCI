
require('dotenv').config();
const router = require("express").Router();
const User = require ("../models/user") ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./VerifyToken");
const nodemailer = require ("../config/nodemailerConfig");
const saltRounds = 10;
const _ = require("lodash");

//app.get("/api/auth/confirm/:confirmationCode", controller.verifyUser)

router.get("/confirm/:confirmationCode",   function (req,res){

  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else if (user.status === "Active"){
        return res.status(400).send({ message: "User already Active." });
      }

      user.status = "Active";

      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send("user activated")
        }
      });
    })
    .catch((e) => console.log("error", e));

});


// ====== register a new user ======
//===================================
router.post("/register", async function (req,res){
  // check if email is already taken by a user
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("User Already exists");
  }

  const characters = process.env.SECRET;
  // random confirmation code
  let token = '';
  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }

  // hashing
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User ({
      email: req.body.email,
      password: hash,
      institution: req.body.institution,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      confirmationCode: token
    });

    newUser.save(function(err){
      if (err){
      res.status(400).send(err);
      } else {
      res.status(200).send("user successuly registered ! Please check your email for a confirmation link");
      }
    });

    nodemailer.sendConfirmationEmail(
              newUser.firstName,
              newUser.email,
              newUser.confirmationCode
       );


     });


   });




// ===== user login =====
// =========================
router.post("/login", async (req, res) => {

    // checking if user does not exist in the database
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
        return res.status(400).send("User does not exist");
    }

    // check password is correct
    if (userExist.status === "Active"){
        const validPass = await bcrypt.compare(req.body.password, userExist.password);
        if (!validPass) {
            return res.status(403).send("Invalid password");
        }

        // create and assign a token
        const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
        //res.header("auth-token", token).send(token);
        
        res.status(200).json({
          accessToken: token,
          roles: userExist.roles,
          email: userExist.email,
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          institution: userExist.institution,
          id: userExist._id


        })
    }else{
        return res.status(400).send({ message: "The user account is inactive." });
    }
});

// ===== user logout =====
// =========================
router.get("/logout", async (req, res) => {
  try{
    //Delette the token from client
    res.clearCookie("jwt");
    console.log("Logout successfull");
    //Render to the login page when it is done.
    //res.redirect("/login");
  } catch (error) {
    res.status(500).send(error);
  }


});

router.post("/forgetPassword", async (req,res) => {

  if (!req.body.email){
    return res.status(400).json({message:"Provide Email !"})
  }

  const userEmail = req.body.email;

  const userExist = await User.findOne({email:userEmail});
  console.log("User exist :"+ userExist);
  if (!userExist){
    return res.status(400).json({message:"user not found !"})
  }

  // create and assign a token
  const resToken = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
  
  console.log("resToken: "+ resToken);


       User.updateOne(
      {email:userExist.email},
      { $set:
        {
        resetToken: resToken
       }
      },
      {overwrite:true},
      async function(err){
        if (err){
          console.log(err)  
          return res.status(400).json({error:"error occured"});
          
        } else {

          //console.log("resetTOken : " = user)
         await nodemailer.sendResetPassworEmail(

            userExist.firstName,
            userExist.email,
            resToken
        );
        return res.json({message: "Email has been sent, you are ready to reset your password"})
          
        }

    });
  
  });


    router.post("/resetPassword", function (req,res){

      console.log(req.body);
    const {resToken,newPassword}= req.body;
    const hashedPassword = "";
  
    if (!resToken ){
      return res.status(401).json({error: "missing token"});
    }
    if (!newPassword){
      return res.status(401).json({error: "missing new password"});
    }
  
     bcrypt.hash(newPassword,saltRounds,function(err,hash){
      if (err){
        return res.status(400).json({error:err.message})
      } else {
        
  
        if (resToken){
          console.log("before jwt");
          jwt.verify(resToken,process.env.TOKEN_SECRET,function (error, decodeData) {
            console.log("after jwt");
            if (error){
              return res.status(401).json({error: "incorect token"})
            } else{
              User.findOne({resetToken:resToken}, function(err, user){
                if (err || !user){
                  return res.status(400).json({error:"User with this token does not exist"});
                }
      
                const passObj = {
                  password: hash,
                  resetToken: ""
                }
                console.log("newpassword: "+hash );
                user = _.extend(user,passObj);
                user.save((err,result)=> {
                  if (err){
                   return  res.status(400).json({error:"new password cound be saved"})
      
                  }
                 return  res.status(200).json({message:"password has been changed"})
                })
      
              })
            }
          });
      
          
        } else {
          return res.status(401).json({message:"Authentication Error, No reset Token provided"});
        }
      }
    });



});

module.exports = router;
