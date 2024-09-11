const express = require('express');
const port = 3000;
const path = require('path');

// Create the app and mount the routes at the base URI.
const app = express();
const router = express.Router();
app.use(process.env.PASSENGER_BASE_URI || '/', router);

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


router.get('/', (req, res) => {
  res.render('index', {
    baseUrl: process.env.PASSENGER_BASE_URI || '/',
  });
})

router.post('/list', (req, res) => {
  const { spawnSync} = require('child_process');
  const child = spawnSync('ls', ['-lrt']);

  res.render('index', {
    baseUrl: process.env.PASSENGER_BASE_URI || '/',
    lsOutput: child.stdout,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})