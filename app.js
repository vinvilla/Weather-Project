//jslint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// on Hyper, run npm init
// NPM : Node Package Manager

app.get("/", function(req, res) {
  //  res.sendFile(__dirname + "/index.html");
  //  res.send("Server is up and running.");  only one SEND is allowed
  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res) {

  const city = req.body.cityName;
  const apiKey = "534e0de9c7e1806f3b322a19a7bb76e3";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // opposite is JSON.stringify(object);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The temperature in " + city + " is " + temp + " degree Farenheit.</h1>");
      res.write("<h3> The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src=" + imageURL + ">");
      res.send;
    })
  })
});


app.listen(port, function() {
  console.log("Server started on port " + port);
});



// Make a new folder called WeatherProject on your Desktop
// Change Directory to this new folder
// Inside the WeatherProject folder, create two new files
//         Enter::: touch index.html app.js     // creates 2 files
// Set up a new NPM package
//         // 1.  on Hyper, run::: npm init
// Using NPM install the express module
//        // 2. On Hyper: run::: npm install express
//             // or npm i express
//        // 2A. Also, install ::: npm i body-parser
// Open the project folder in Atom
// Require express in your app.js
// Setup express
// Create a root route get method with app.get()
// Send the words Hello World from the root route as the response
// Spin up our server on port 3000 with app.listen
//
// Run server with nodemon
//      //  3. On Hyper: run::: nodemon app.js


//. 4. Need to install Body Parser
//  run :: npm install body-parser
