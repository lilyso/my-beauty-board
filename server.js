// const cloudinary = require('cloudinary').v2;

// if (typeof process.env.CLOUDINARY_URL === 'undefined') {
//   console.warn('!! cloudinary config is undefined !!');
//   console.warn('export CLOUDINARY_URL or set dotenv file');
// } else {
//   console.log('cloudinary config:');
//   console.log(cloudinary.config());
// }
// console.log(
//   '-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --'
// );

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.DB_SESS,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    // Check active user every hour
    checkExpirationInterval: 60 * 60 * 1000,
    // Session expires after 4 hours
    expiration: 60 * 60 * 1000,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
