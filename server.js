const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const httpRequest = require('./db/index');
const { describeAll, describeSchema, createSchema, createTable, insert } = require('./db/query');


// Init app
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS Template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  httpRequest(describeAll()).then(data => {
    // console.log(data.data);

    // Array of keys from describe all object
    const schemas = Object.keys(data.data);

    res.render('index', { data, schemas });
  }).catch(error => {
    console.log(error);
  });
});

app.post('/create_table', (req, res) => {

  httpRequest(describeSchema(req.body.schemas)).then(queryData => {

    let tables = []

    // Test if query object is empty, if not extract table name key values from object array
    if (Object.entries(queryData.data).length !== 0 && queryData.data.constructor !== Object) {
      console.log("CALLED");
      tables = queryData.data.map(value => value.name);
    }

    res.render('create_table', { tables, data: req.body });
  }).catch(error => {
    console.log(error);
  });





  // httpRequest(describeAll()).then(queryData => {
  //   const schemas = Object.keys(queryData.data);
  //   console.log(req.body);
  //   res.render('index', { queryData, schemas, data: req.body });
  // }).catch(error => {
  //   console.log(error);
  // });

});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
