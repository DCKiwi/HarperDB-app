const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const httpRequest = require('./db/index');
const { describeAll, createSchema, createTable, insert } = require('./db/query');


// Init app
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS Template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  httpRequest(describeAll()).then(data => {
    console.log(data.data);
    res.render('index', { data });
  }).catch(error => {
    console.log(error);
  });
  // res.render('index');
});

app.post('/', (req, res) => {
  res.render('index', {
    data: req.body
  })
})

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
