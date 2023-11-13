const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoiaGVyaXRhZ2VkeCIsImEiOiJjbG9vNTVuZmUzOHhqMmtwOWFnbDc0YnhzIn0.nZOHCw6FJVOWsZEAj6Bb9g&limit=1";

  request({ url, json: true }, (error, {body}) => {
    // console.log(body)
    if (error) {
      callback("no internet connection", undefined);
    } else if (body.features.lenght === 0) {
      callback("try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
