const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// Permite que seja exibido frames desse app em https://teams.microsoft.com/
// Allow from a specific host:
app.use(helmet.frameguard({
  action: 'allow-from',
  domain: 'https://teams.microsoft.com'
}))

app.use(logger('dev'));

// Add your API routes under the route `/api`
// const api = require('./api');
// app.use('/api', api);

// Serve the React application
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.send('Hello')
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = normalizePort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on port: ${port}`);
});