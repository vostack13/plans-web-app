const express = require('express');
const router = express.Router();
const formidable = require('formidable');

router.post('/', function(req, res) {
	const form = new formidable.IncomingForm();

	form.parse(req, (err, body) => {
		const {email, password} = body;

		if (email === 'admin' && password === '123')
			res.json({status: 'ok'})
		else
			res.status(401).json({
				message: 'Unauthorized',
				status : 401,
			})
	})
});

module.exports = router;
