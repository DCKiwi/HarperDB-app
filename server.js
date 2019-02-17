const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const httpRequest = require('./db/index');
const { describeAll, describeSchema, createSchema, createTable, insert } = require('./db/query');


// Init app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS Template engine
app.set('view engine', 'ejs');

// Landing page, create or select schema
app.get('/', (req, res) => {
  httpRequest(describeAll()).then(data => {

    // Array of keys from describe all object
    const schemas = Object.keys(data.data);

    res.render('index', { data, schemas });
  }).catch(error => {
    console.log(error);
  });
});

// Takes request from previous page then create or select table.
app.post('/create_table', (req, res) => {
  let tables = [];
  let message = ""

  // If schema exists describe it
  if (req.body.schemas) {
    httpRequest(describeSchema(req.body.schemas)).then(queryData => {

      // Test if query object is empty, if not extract table name key values from object array
      if (Object.entries(queryData.data).length !== 0 && queryData.data.constructor !== Object) {
        tables = queryData.data.map(value => value.name);
      }

      message = `Current schema: ${req.body.schemas}`;

      res.render('create_table', { message, tables, data: req.body });
    }).catch(error => {
      console.log(error);
    });

    // Create schema from user input, schema will have no description
  } else {
    httpRequest(createSchema(req.body.schemaName)).then(queryData => {

      // Extract response msg and capitalize first word.
      message = queryData.data.message;
      message = message.charAt(0).toUpperCase() + message.slice(1);

      res.render('create_table', { message, tables, data: req.body });
    }).catch(error => {
      console.log(error);
    });
  }



});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
