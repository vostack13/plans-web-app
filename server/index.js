const express = require('express');
const app = express();
const cors = require('cors');
const models = require('./model/tasks');
const loginRoute = require('./routes/loginRoute');

app.use(cors());
app.use('/login', loginRoute);

app.get('/tasks', function(req, res) {
	setTimeout(() => {
		res.json(models.tasks);
	}, 3000)
});

app.listen(3020, () => {console.log('Plans APP server running')})
