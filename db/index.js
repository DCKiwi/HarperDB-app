const http = require('http');
const { describeAll, createSchema, createTable, insert } = require('./query');

const options = {
  method: 'POST',
  hostname: 'localhost',
  port: 9925,
  path: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic SERCX0FETUlOOmhkYl9hZG1pbg==',
  },
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  const chunks = [];

  res.on('data', chunk => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    const dataJASON = JSON.parse(body);
    console.log(dataJASON);
  });

  res.on('error', error => {
    console.error(error);
  });
});

const foo = [{
  "name": "Harper",
  "breed": "Mutt",
  "id": "5",
  "age": 5
}]

// const data2 = JSON.stringify({
//   "operation": "insert",
//   "schema": "cats",
//   "table": "breeds",
//   "records": foo

// })
const data = insert('cats', 'breeds', foo);
console.log(data)

req.write(data);
req.end();
