
require('dotenv').config();
const router = require("express").Router();
const User = require ("../models/user") ;


//========== update a user credentials  with the object id ========
//===================================================
router.post("/updateUser", async function (req,res){


  const userEmail = req.body.email;
  
  
  const userExist = await User.findOne({ email: userEmail });
  if (!userExist) {
    return res.status(400).send("User does not  exists");
  }

  console.log("user object info"+userExist);
  const sta = userExist.status;
  const pawd = userExist.password;
  console.log("new institution = " + req.body.institution);
  console.log("new last name = " + req.body.lastName); 
  console.log("new forst name = " + req.body.firstName); 
  


  User.updateOne(
    {email:userEmail},
    { $set:
      {institution: req.body.institution,
      lastName: req.body.lastName,
      firstName: req.body.firstName
     }
      
    },
    {overwrite:true},

     async function(err){
      if (!err){
        const updatedUser =  await User.findOne({email:userEmail});
        console.log( "updated user : "+  updatedUser)
        res.status(200).json(updatedUser);
      } else {
        res.status(400).send(err);
      }

    }

  )
});


//========== get user by email ========
//=====================================
router.post ("/getUserByEmail", async function(req,res){
  if (!req.body.email){
    return res.status(400).send("Please provide an Email")
  }

  User.findOne({email:req.body.email}, function (err,user){
    if(!user){
      return res.status(400).send("User does not exist");
    }
    if (!err){
      res.send(user);
    }else{
      res.send(err);
    }
  });
});


//========== delete user by email ========
//========================================
router.post("/deleteUser", async function(req,res){

  if (!req.body.email){
    return res.status(400).send("Please provide an Email")
  }

  const userEmail = req.body.email;

  // check if user exists in the DB
  const userExist = await User.findOne({email: req.body.email}, function (err,user){});
  if(!userExist){
    return res.status(400).send("User does not exist");
  }

  User.deleteOne({email: userEmail}, function (err){
    if (err){
      res.send(err);
    } else {
      res.send("user account has been deleted");
    }
  });

});

module.exports = router;
