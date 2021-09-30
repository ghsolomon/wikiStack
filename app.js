const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, User, Page } = require('./models');
db.authenticate()
  .then(() => {
    console.log('connected to the db');
  })
  .catch((error) => {
    console.error('Unable to connect to DB', error);
  });

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout());
});
const init = async () => {
  await db.sync();
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
