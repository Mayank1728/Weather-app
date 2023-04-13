const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const weather = require('../utils/weather');

const app = express();

// paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mayank Mudgal',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Mayank Mudgal',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    purpose: 'Find weather of a particular location',
    name: 'Mayank Mudgal',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address field is empty!!',
    });
  }
  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }

    const { lat, long } = response;
    weather(lat, long, (error, response) => {
      if (error) {
        return res.send({ error });
      }

      res.send(response);
    });
  });
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must send a search query',
    });
  }
  res.send({
    location: 'PA',
    weather: 'sunny',
  });
});

app.get('*', (req, res) => {
  res.send('Error 404, PAGE NOT FOUND!!');
});

app.listen(3000, () => {
  console.log('App is up and running..');
});
