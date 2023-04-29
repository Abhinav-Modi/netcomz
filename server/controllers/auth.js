const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user;
	const user = await User.findOneAndUpdate(
		{ email },
		{ name: email.split("@")[0], picture },
		{ new: true }
	);
	//using email as unique identifier for user in db updated name and picture and return new user object and not old one as it may have old data so new is set as true
	//update user if exists in db
	if (user) {
		console.log("USER UPDATED", user);
		res.json(user);
	}
	//create user if not exists in db
	else {
		const newUser = await new User({
			email,
			name: email.split("@")[0],
			picture,
		}).save();
		console.log("USER CREATED", newUser);
		res.json(newUser);
	}
};
exports.currentUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
};
