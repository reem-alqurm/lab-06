'use strict'
const express = require('express') // git things from express
const cors = require('cors'); // Api call our of domian

const app = express(); // to use the express 
app.use(cors());//to make the app to talke out of domin 
const port = 7000; // to resive a port for my server (pc)
app.listen(process.env.port || port , ()=>{console.log('conected server .......')});//to conect to server

function CityExpoler(search_query, formatted_query, latitude, longitude) {
    this.search_query = search_query,
    this.formatted_query = formatted_query,
    this.latitude = latitude,
    this.longitude = longitude
}

app.get('/location',getLocation);//to get the data (API)

function getLocation(requst , response ){
const loc = require('./data/location.json');
const search_query = requst.query.city; //get the name that user entered in input feild 
    const formatted_query = loc[0].display_name;
    const latitude = loc[0].lat;
    const longitude = loc[0].lon;
    let cityLocation = new CityExpoler(search_query, formatted_query, latitude, longitude);
    response.send(cityLocation); //send the data to the frontend side to display for the user 
}

function Weathercity(time, description) {
    this.time = time,
    this.description = description
}
app.get('/weather' , getWeather);

function getWeather (requst , response){
    const weth = require('./data/weather.json');
    let array = [];

    let data = weth.data;
    data.forEach(((item) => {
        // eslint-disable-next-line no-unused-vars
        let weather = new Weathercity(item.datetime,item.weather.description);
        array.push({ 'time': item.datetime, 'forecast': item.weather.description })
    }))
    response.send(array);
}

//error handler
app.use('*', (requst, response) => {
    let status = 404;
    response.status(status).send({status:status , msg:'Not found'});
  });