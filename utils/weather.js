const request = require('request');

const weather = (lat, Longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d1bc01fac6d6096d531ce6fa2c08a1de&query=${lat},${Longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Could NOT connect to the internet');
    } else if (response.body.error) {
      callback('Unable to find such location. Try another search.');
    } else {
      const data = {
        loc: `${response.body.location.region}, ${response.body.location.country}`,
        temperature: response.body.current.temperature,
        description: response.body.current.weather_descriptions[0],
        feelsLike: response.body.current.feelslike,
      };
      callback(null, data);
    }
  });
};

module.exports = weather;
