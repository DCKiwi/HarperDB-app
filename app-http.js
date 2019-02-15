const http = require('http');

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
    console.log(dataJASON.dev);
  });

  res.on('error', error => {
    console.error(error);
  });
});

const data = JSON.stringify({ operation: 'describe_all' });

req.write(data);
req.end();
