// joi is a class so starts with a capital - joi is validation package
const Joi = require('joi');
const express = require('express');
const app = express();

// adding express middleware to app
app.use(express.json());

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
	const schema = {
		name: Joi.string().min(3).required(),
	};
	const result = Joi.validate(req.body, schema);
	// console.log(result);

	if (result.error) {
		// 400 bad request - below sends error message to user - joi will generate error messages based on what you set.
		res.status(400).send(result.error.details[0].message);
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

// updating a course with put request
app.put('/api/courses/:id', (req, res) => {
	// look up the course - if not existing, return 404
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('This course was not found');

	const { error } = validateCourse(req.body); // same as result.error
	// if invalid, return 404 - bad request
	if (error) {
		// 400 bad request - below sends error message to user - joi will generate error messages based on what you set.
		res.status(400).send(result.error.details[0].message);
		return;
	}
	// update course
	course.name = req.body.name;
	// return the updated course
	res.send(course);
});

// api course: find and return course to user
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('This course was not found');
	res.send(course);
});
// function to validate put reqest from user
function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(course, schema);
}

// PORT env port set to 5000 - export PORT=5000 in terminal for app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
