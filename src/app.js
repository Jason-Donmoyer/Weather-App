// Path module
const path = require('path');

// Require Express
const express = require('express');

// Require Handlebars --- HBS
const hbs = require('hbs');

// Require modules
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Create app variable by calling the express function
const app = express();


// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars template library
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JDDev'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'JDDev'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
       title: 'Help Page',
       name: 'JDDev' 
    });
});

// Weather

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address!'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error });
            }
            res.send({
                address: req.query.address,
                location: location,
                latitude: latitude,
                longitude: longitude,
                forecast: forecastData
            });
        });   
    });
});

// 404 Error Handling
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Help Page not Found',
        name: 'JDDev'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Page Not Found',
        name: 'JDDev'
    });
});

app.listen(3000, () => {
    console.log('Server is locked, loaded and ready to ROCKKKK!');
});





