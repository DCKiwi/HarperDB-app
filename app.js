const http = require('http');

const options = {
  method: 'POST',
  hostname: 'localhost',
  port: 9925,
  path: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic SERCX0FETUlOOmhkYl9hZG1pbg=='
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

// data = '{\n  "operation":"create_schema",\n  "schema": "dev"\n}';
data = '{\n  "operation":"describe_all"}';

req.write(data);
req.end();
