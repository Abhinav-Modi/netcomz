const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 100,
		currency: "inr",
		description: "Created Test Payment",
		shipping: {
			name: "Test Customer Name",
			address: {
				line1: "Test Customer Address",
				postal_code: "Test Customer Postal Code",
				city: "Test Customer City",
				state: "Test  State",
				country: "IN",
			},
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
};
