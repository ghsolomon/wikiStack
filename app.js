const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const layout = require('./views/layout');
const { db, User, Page } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

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
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.redirect('/wiki');
});
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

const init = async () => {
  await db.sync();
  // await db.sync({force: true})
  // UNCOMMENT THE ABOVE LINE TO CLEAR THE DB
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
