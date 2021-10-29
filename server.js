const path = require('path');
const express = require('express');

const session = require('express-session');

const routes = require('./controllers');
const sequelize = require('./config/connnection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'something secretive',
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));

//handlebars for later

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.statis(path.join(__dirname,'public')));

app.use(routes);

sequelize.sync({force:false}).then(()=> {
    app.listen(PORT, ()=> console.log('Now listening'))
});
