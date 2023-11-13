const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=eb9b90ce560d3c0598221180ca460d64&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    // console.log(body)
    if (error) {
      callback("no internet connection", undefined);
    } else if (body.current === 0) {
      callback("input the latitude and longitude", undefined);
    } else {
      callback(
        undefined,
        "the temperature is " +
          body.current.temperature +
          " degree " +
          "but it feelslike " +
          body.current.feelslike +
          " degree"
      );
    }
  });
};

module.exports = forecast;
