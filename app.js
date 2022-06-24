const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//get the app to use body-parser/necessery code to be able to pass through the body of the request.
app.use(bodyParser.urlencoded({extended: true}));

// calls the app on the root Home 
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

//app.post get the data from the imput on the html file when pressed the button
app.post("/", function (req, res) {

    //getting the req made by the name of the input on the body html
    const query = req.body.cityName;
    // get the API 
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=da3929389ee948648bce15bdd5532df6&units=metric";

    //use library HTTPS to get data from the API 
    https.get(url, function (response) {
        console.log(response.statusCode);

        //fetch the data from the API to cons and then manipulate it to show the desired one.
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const name = weatherData.name;
            const weatherDecription = weatherData.weather[0].description
            const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon + "@2x.png";

            //send more then a line with res
            res.write("<h1>The temperatures in "+ name +" is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDecription +"</p>");
            res.write(" <img src=" + icon + ">");
            res.send();
        })
    })
});


// listen to the server for the port
app.listen(3000, function () {
    console.log("Server is runing in port 3000.");
});