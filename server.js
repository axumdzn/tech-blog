const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const routes = require('./controllers');
const sequelize = require('./config/sequelize.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const { User, Blog, Comment } = require("./models");

const sess = {
    secret: 'something secretive',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
      })
};

app.use(session(sess));

//handlebars for later
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use(routes);

sequelize.sync({force:false}).then(()=> {
    app.listen(PORT, ()=> console.log('Now listening'))
});
