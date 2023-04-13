const request = require('request');

const geocode = (placeName, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    placeName,
  )}.json?access_token=pk.eyJ1IjoibWF5YW5rMTcyOSIsImEiOiJjbGdhejhjNW0wbjRpM2pxcG4xcmk0eHB5In0._TBWnQ7-774KTmEmKrmzQg&limit=1'`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Could NOT connect to the internet!!');
    } else if (!response.body.features.length) {
      callback('No such place Found');
    } else {
      const data = {
        place: response.body.features[0].place_name,
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
      };
      callback(null, data);
    }
  });
};

module.exports = geocode;
