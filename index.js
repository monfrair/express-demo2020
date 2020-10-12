const express = require('express');
const app = express();

// adding express middleware to app
app.use(express.json());

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
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

// api course: find and return course to user
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('This course was not found');
	res.send(course);
});

// PORT env port set to 5000 - export PORT=5000 in terminal for app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
