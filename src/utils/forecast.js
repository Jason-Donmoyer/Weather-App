const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/62836e51d299b0ab17357ce65df17fa3/${lat},${lon}`;

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Unable to connect to weather service', undefined);
        } else if (body.error) {
            console.log('Unable to find location', undefined)
        } else {
            callback(undefined, 
                `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} out. There is a ${body.currently.precipProbability}% chance of rain.`,
            );
        }
    });

}

module.exports = forecast;

