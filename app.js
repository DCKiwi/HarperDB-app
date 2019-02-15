var http = require('http');

var options = {
  method: 'POST',
  hostname: 'localhost',
  port: 9925,
  path: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic SERCX0FETUlOOnBhc3N3b3Jk'
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

data = '{\n  "operation":"create_schema",\n  "schema": "dev"\n}';

req.write(data);
req.end();
