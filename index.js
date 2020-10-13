// CRUD handler using express - RESTFUL API

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
// joi is a class so starts with a capital - joi is validation package

const Joi = require('joi');
const logger = require('./logger');
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
	console.log('Morgan enabled...');
}

// adding express middleware functions to app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //serve static content
app.use(helmet());
app.use(morgan('tiny'));

//pulling in the loggerjs file middleware
app.use(logger);

// courses array
const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

// post course to app
app.post('/api/courses', (req, res) => {
	const { error } = validateCourse(req.body); // same as result.error
	// if invalid, return 404 - bad request
	if (error) {
		// 400 bad request - below sends error message to user - joi will generate error messages based on what you set.
		return res.status(400).send(result.error.details[0].message);
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

// updating a course with put request
// updating a course with put request
app.put('/api/courses/:id', (req, res) => {
	// look up the course - if not existing, return 404
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('This course was not found');

	const { error } = validateCourse(req.body); // same as result.error
	// if invalid, return 404 - bad request
	if (error) {
		// 400 bad request - below sends error message to user - joi will generate error messages based on what you set.
		return res.status(400).send(error.details[0].message);
	}
	// update course
	course.name = req.body.name;
	// return the updated course
	res.send(course);
});

// api course: find and return course to user
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('This course was not found');
	res.send(course);
});
// function to validate put reqest from user
function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(course, schema);
}
// end of put request
// end of put request

// handler for delete course request
app.delete('/api/courses/:id', (req, res) => {
	//look for the course in the courses array and validate if it exists
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('This course was not found');
	// if course exists, delete from courses array
	const index = courses.indexOf(course);
	courses.splice(index, 1); //go to index and remove 1 item
	// return the deleted course from the courses array
	res.send(course);
});

// PORT env port set to 5000 - export PORT=5000 in terminal for app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
