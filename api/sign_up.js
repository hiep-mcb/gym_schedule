const express = require('express');
const router  = express.Router();

const User = require('../model/user');

const signUp = (req, res) => {
	const user = new User({
		age: req.body.age,
		email: req.body.email,
		gender: req.body.gender,
		height: req.body.height,
		name: req.body.name,
		password: req.body.password,
		weight: req.body.weight
	});

	// Hash pass
	user.password = user.generateHash(user.password);

	console.log(req.body.password);

	user.save((err) => {
		if(err) res.send(err);

		res.json({ message: 'User created!' });
	});
};

module.exports = signUp;