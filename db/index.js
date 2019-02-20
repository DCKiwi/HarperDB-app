const axios = require('axios');

// Query HarperDB and return a promise.
const httpRequest = async (query) => {

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic SERCX0FETUlOOmhkYl9hZG1pbg==',
    },
  };

  try {
    return await axios.post('http://localhost:9925', query, options)
  } catch (error) {
    // console.error(error);
  };
};

module.exports = httpRequest;
