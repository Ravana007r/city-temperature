const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
     
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const cityName = req.body.cityName
const url = (process.env.URL);
https.get(url, function(response){
console.log(response.statusCode);

response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const des  = weatherData.weather[0].description
    const image = weatherData.weather[0].icon
    console.log(des);

    const iconUrl = "https://openweathermap.org/img/wn/"+ image +"@2x.png"
   
    res.send("<h1>The temperature in "+cityName+ " is " + temp + " degree celcius.</h1>" +
     "<h3>The weather is currently " + des + ".</h3>" + 
     "<img src =" +iconUrl +">");
});

});
});





app.listen("3000", function(){
    console.log("Started");
});