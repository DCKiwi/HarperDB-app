const express = require('express');
const ejs = require('ejs');

// Init app
const app = express();

// EJS Template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
