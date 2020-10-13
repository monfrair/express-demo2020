// CRUD handler using express - RESTFUL API
// if issues with app, change npm version to 5.5.1
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
// joi is a class so starts with a capital - joi is validation package

const Joi = require('joi');
const logger = require('./logger');
const courses = require('./');
const express = require('express');
const app = express();

// logging application settings & variables from config folder
console.log('application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
// console.log('mail password: ' + config.get('mail.password'));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	// console.log('Morgan enabled...');
	startupDebugger('Morgan enabled...');
}

app.set('view engine', 'pug'); //express will auto load module
app.set('views', './views'); // set as default HTML views

// adding express middleware functions to app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //serve static content
app.use(helmet());
app.use(morgan('tiny'));

//pulling in the loggerjs file middleware
app.use(logger);

app.get('/', (req, res) => {
	res.render('index', { title: 'My express app', message: 'hello dummy' });
});

// PORT env port set to 5000 - export PORT=5000 in terminal for app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
