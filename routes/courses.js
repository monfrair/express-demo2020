const express = require('express');
const router = express.Router();

// courses array
const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];

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

module.exports = router;
