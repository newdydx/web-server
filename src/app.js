const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)

const app = express();

// console.log(path.join(__dirname, "../public"));
const viewPath = path.join(__dirname, "../template/views");
// console.log(viewPath);
const partialPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "The weather is cool",
    name: "heritage ololade",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "The About page",
    name: "mary omotola",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      // console.log(req.query.address)
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({error})
        }

        res.send({
          forecast: data,
          location: location
        })
      })
    }
  );

  // res.send({
  //   address: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    message: "this is an error page",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
