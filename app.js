//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
const cors = require('cors');
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.static("Public"));
mongoose.connect('mongodb+srv://admin-amit:@Mit071100@cluster0.vghtf.mongodb.net/ARS', {
  useNewUrlParser: true
});
var userfield=[];
var admfield=[];


app.listen(3000, function() {
  console.log("Server started.");
});
app.get("/",function(req,res){
  res.render("index");
});
app.get("/index",function(req,res){
  res.render("index");
});
// app.get("/index.html",function(req,res){
//   res.render("index");
// });
app.get("/about.html",function(req,res){
  res.sendFile(__dirname+"/about.html");
});
app.get("/about1.html",function(req,res){
  res.sendFile(__dirname+"/about1.html");
});
app.get("/login.html",function(req,res){
  res.sendFile(__dirname+"/login.html");
});
app.get("/register.html",function(req,res){
  res.sendFile(__dirname+"/register.html");
});
app.get("/contact.html",function(req,res){
  res.sendFile(__dirname+"/contact.html");
});
app.get("/addflight.html",function(req,res){
  res.sendFile(__dirname+"/addflight.html");
});
app.get("/payment.html",function(req,res){
  res.sendFile(__dirname+"/payment.html");
});
app.get("/account.html",function(req,res){

  res.sendFile(__dirname+"/account.html");
});
const userSchema=new mongoose.Schema({
  username: String,
  password: String,
  Firstname: String,
  Lastname: String,
  Phonenumber: String
});

const userDB=mongoose.model("userDB",userSchema);

const admSchema=new mongoose.Schema({
  username: String,
  password: String
});
const adm=mongoose.model("adm",admSchema);

const adm1=new adm({
  username: "as3814@srmist.edu.in",
  password: "2387"
});
app.post("/register.html", function(req, res){
  const firstName = req.body.a;
  const lastName = req.body.b;
  const Username=req.body.c;
  const Password=req.body.e;
  const phoneNumber=req.body.d;
  const item3 = new userDB({
    username: Username,
    password: Password,
    Firstname: firstName,
    Lastname: lastName,
    Phonenumber: phoneNumber
  });
      item3.save();
      userfield.push(item3);
      console.log(userfield);
      res.sendFile(__dirname+"/success.html");
});

app.post("/admin.html",function(req,res){
  const Username=req.body.logi1;
  const Password=req.body.pass1;
  var flag=0;
  adm.find({},function(err,foundItems){
    for(var i=0;i<foundItems.length;i++)
    {
    if((foundItems[i].username===Username)&& (foundItems[i].password===Password))
    {
      flag=1;
      userDB.find({},function(err,foundItems){
        res.render("user",{a: foundItems});
      });
    }
  }
  if(flag===0)
    {
      res.sendFile(__dirname+"/failure.html");
    }
  });
});
app.post("/login.html", function(req, res){
  const Username=req.body.logi;
  const Password=req.body.pass;
  const phoneNumber=req.body.logi;
  flag=0;
  userDB.find({},function(err,foundItems){
    for(var i=0;i<foundItems.length;i++)
    {
    if((foundItems[i].username===Username||foundItems[i].Phonenumber===phoneNumber)&& (foundItems[i].password===Password))
    {
      flag=1;
      console.log("Success");
      res.redirect("/account.html");
    }
  }
  if(flag===0)
    {
      res.sendFile(__dirname+"/failure.html");
    }
  });

});
app.post("/failure",function(req,res){
  res.sendFile(__dirname+"/login.html");
});
app.get("/admin.html", function(req, res){
  res.sendFile(__dirname+"/admin.html");
});
app.post("/success",function(req,res){
  res.sendFile(__dirname+"/login.html");
});

const addflightSchema=new mongoose.Schema({
  airbus: Number,
  flightNumber: Number,
  from: String,
  to: String,
  Journey: String,
  Class: String,
  dd: String,
  dt: String,
  se: Number,
  pe: Number,
  sb: Number,
  pb: Number,
});
const addflight=mongoose.model("addflight",addflightSchema);
flightfield=[];
app.post("/addflight.html", function(req, res){
  const Airbus = req.body.a1;
  const FlightNumber = req.body.b1;
  const From=req.body.c1;
  const To=req.body.d1;
  const journey=req.body.g1;
  // const class=req.body.;
  const DD=req.body.date1;
  const DT=req.body.f1;
  const SE=req.body.h1;
  const PE=req.body.h2;
  const SB=req.body.i1;
  const PB=req.body.i2;
  const flight = new addflight({
    airbus: Airbus,
    flightNumber: FlightNumber,
    from: From,
    to: To,
    Journey: journey,
    dd: DD,
    dt: DT,
    se: SE,
    pe: PE,
    sb: SB,
    pb: PB
  });
      flight.save();
      flightfield.push(flight);
      console.log(flightfield);
      res.sendFile(__dirname+"/addflight.html");
});




app.get("/manageflights",function(req,res){

  addflight.find({},function(err,foundItems){
        res.render("manageflights",{flightDb: foundItems});
      });
});

app.get("/user",function(req,res){
  userDB.find({},function(err,foundItems){
    res.render("user",{a: foundItems});
  });

});
app.get("/pay.html",function(req,res){
  res.render("test");
});
app.get("/index.php",function(req,res){
  res.sendFile(__dirname+"/index.php")
})
app.post("/flightdisplay",function(req,res){
  const price=req.body.pr;
  console.log(price);
  res.render("test",{amt: price});
});
// res.render("manageflights.ejs", {link:"/manageflights"});

app.post("/deleteflight", function(req,res) {
  // const id=req.body.del;
  // console.log(id);
  const flightNumber=req.body.checkbox;
  addflight.findOneAndRemove({flightNumber: flightNumber},function(err,docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Removed User : ",docs);
        res.redirect("/manageflights");
    }
});
});

app.get("/flightdisplay",function(req,res){
    searchDB.findOne({}, {}, { sort: { 'created_at' : -1 } },function(err, postit) {
  addflight.find({from: postit.from,to: postit.to},function(err,foundItems){

        res.render("flightdisplay",{flightDb: foundItems, am: postit});
      });
        });
});



const searchSchema=new mongoose.Schema({
  from: String,
  to: String,
  dd: String,
  tc: String,
  root: String,
  nc: Number,
  na: Number,
  created_at: { type: Date, required: true, default: Date.now }
});
const searchDB=mongoose.model("searchDB",searchSchema);
app.post("/index",function(req,res){
  const From= req.body.from;
  const To=req.body.to;
  const DD=req.body.dd;
  const TC=req.body.tc;
  const NC=req.body.nc;
  const NA=req.body.na;
  const now=new Date();
  console.log(To);
  const searchitem = new searchDB({
    from: From,
    to: To,
    dd: DD,
    tc: TC,
    created_at: now,
    na: NA,
    nc: NC,
    root: "/index"
  });
  searchitem.save(function(err){
    if(!err){

      res.redirect("/flightdisplay");
    }
    else{
      console.log(err);
    }
  });

});
app.post("/account.html",function(req, res){
  const From= req.body.from;
  const To=req.body.to;
  const DD=req.body.dd;
  const TC=req.body.tc;
  const NC=req.body.nc;
  const NA=req.body.na;
  const now=new Date();
  console.log(To);
  const searchitem = new searchDB({
    from: From,
    to: To,
    dd: DD,
    tc: TC,
    created_at: now,
    nc: NC,
    na: NA,
    root: "/account.html"
  });
  searchitem.save(function(err){
    if(!err){

      res.redirect("/flightdisplay");
    }
    else{
      console.log(err);
    }
  });
});
// var nodemailer = require('nodemailer');
//
// var transporter = nodemailer.createTransport("SMTP",{
//   service: 'gmail',
//   auth: {
//     user: 'as2709professional@gmail.com',
//     pass: '@Mit07112000'
//   }
// });
//
// var mailOptions = {
//   from: 'as2709professional@gmail.com',
//   to: 'sri.amit2000@gmail.com',
//   subject: 'AIR INDIA Itinerary Booking Receipt',
//   text: 'Thank you for choosing AIR INDIA. Your ticket is confirmed. Have a happy and safe journey.',
//   attachments: [
//     {
//       filename: '7.jpg',
//         path: './Public/images/7.jpg'
//     }
//   ]
//   // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//   console.log(mailOptions);
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
