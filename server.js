const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const httpRequest = require('./db/index');
const {
  describeAll,
  describeSchema,
  describeTable,
  createSchema,
  createTable,
  insert,
  selectAllTable
} = require('./db/query');

// Init app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS Template engine
app.set('view engine', 'ejs');

// Landing page, create or select schema
app.get('/', (req, res) => {
  httpRequest(describeAll())
    .then(data => {

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
    httpRequest(describeSchema(req.body.schemas))
      .then(queryData => {

        // Test if query object is empty, if not extract table name key values from object array
        if (Object.entries(queryData.data).length !== 0 && queryData.data.constructor !== Object) {
          tables = queryData.data.map(value => value.name);
        }

        message = `Current schema: ${req.body.schemas}`;

        res.render('create_table', { message, tables, data: req.body, schema: req.body.schemas });
      }).catch(error => {
        console.log(error);
        res.redirect('index', { error });
      });

    // Create schema from user input, schema will have no description
  } else {
    httpRequest(createSchema(req.body.schemaName))
      .then(queryData => {
        // Extract response msg and capitalize first word.
        message = queryData.data.message;
        message = message.charAt(0).toUpperCase() + message.slice(1);

        res.render('create_table', { message, tables, data: req.body, schema: req.body.schemaName });
      }).catch(error => {
        console.log(error);
      });
  }
});

// Display selected or created table
app.post('/display_insert', (req, res) => {
  const schema = req.body.currentSchema;

  // If the user selected an existing table  
  if (req.body.existingTableName) {
    const table = req.body.existingTableName;

    // select all values in table using a SQL query 
    httpRequest(selectAllTable(schema, table))
      .then(queryData => {

        message = `Current table: ${table}`;

        //extract table object keys
        const attributes = Object.keys(queryData.data[0]);

        let tableData = [];

        queryData.data.forEach(function (arrayItem) {
          val = Object.values(arrayItem);
          tableData.push(val);
        });
        console.log(tableData);

        res.render('display_insert', { data: req.body, attributes, tableData, message });
      }).catch(error => {
        console.log(error);
      });
  };
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
