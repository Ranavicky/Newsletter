const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");
require("dotenv").config();


const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){

     var finame = req.body.fname;
     var laname = req.body.lname;
     var mail = req.body.mail;

     var data ={
       members:[{
           email_address:mail,
           status:"subscribed",
           merge_fields:{
             FNAME: finame,
             LNAME: laname

       }
     }]
   };
   let key=process.env.API_KEY;
     var jsondata = JSON.stringify(data);
     const url = "https://us21.api.mailchimp.com/3.0/lists/59bdcf8505";
     const options ={
       method:"POST",
       auth:"vicky:"+key
     }
  var request=https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");

    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){

        console.log(JSON.parse(data));
    });
  });

     request.write(jsondata);
     request.end();

});
app.listen(process.env.PORT||2000,function(){
  console.log("hosted");
});
