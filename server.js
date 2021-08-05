const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const baseUrl = 'https://ghibliapi.herokuapp.com';

function success(req, res, json, logs) {
  res.status(json.status).send({
    status: json.status,
    message: json.message || '',
    data: json.data || [],
    logs,
  });
}

function failure(res, err) {
  const status = err.code || 500;
  res.status(status).send({ status, message: err.message || '' });
}

app.get('/films', async (req, res) => {
  try {
    const response = await fetch(`${baseUrl}/films`);
    const jsonData = await response.json();

    success(req, res, {
      status: response.status,
      message: response.message,
      data: jsonData,
    });
  } catch(err) {
    failure(res, err);
  }
})


app.listen(port, () => console.log(`Listening on port ${port}`));
