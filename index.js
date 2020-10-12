const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
	res.send([1, 2, 3]);
});

// PORT env port set to 5000 - export PORT=5000 in terminal for app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
