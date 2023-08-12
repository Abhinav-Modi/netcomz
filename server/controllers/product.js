const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
exports.create = async (req, res) => {
	try {
		console.log(req.body);
		req.body.slug = slugify(req.body.title);
		const newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (err) {
		console.log(err);
		// res.status(400).send("Create product failed");
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.listAll = async (req, res) => {
	let products = await Product.find({})
		.limit(parseInt(req.params.count))
		.populate("category")
		.populate("subs")
		.sort([["createdAt", "desc"]])
		.exec();
	res.json(products);
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndRemove({
			slug: req.params.slug,
		}).exec();
		res.json(deleted);
	} catch (err) {
		console.log(err);
		return res.staus(400).send("Product delete failed");
	}
};

exports.read = async (req, res) => {
	const product = await Product.findOne({ slug: req.params.slug })
		.populate("category")
		.populate("subs")
		.exec();
	res.json(product);
};

exports.update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const updated = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).exec();
		res.json(updated);
	} catch (err) {
		console.log("PRODUCT UPDATE ERROR ----> ", err);
		// return res.status(400).send("Product update failed");
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.list = async (req, res) => {
	try {
		const { sort, order, page } = req.body;
		const currentPage = page || 1;
		const perPage = 3;

		const products = await Product.find({})
			.skip((currentPage - 1) * perPage)
			.populate("category")
			.populate("subs")
			.sort([[sort, order]])
			.limit(perPage)
			.exec();

		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

exports.productsCount = async (req, res) => {
	let total = await Product.find({}).estimatedDocumentCount().exec();
	res.json(total);
};

exports.productStar = async (req, res) => {
	const product = await Product.findById(req.params.productId).exec();
	const user = await User.findOne({ email: req.user.email }).exec();
	const { star } = req.body;

	let existingRatingObject = product.ratings.find(
		(ele) => ele.postedBy.toString() === user._id.toString()
	);
	if (existingRatingObject == undefined) {
		let ratingAdded = await Product.findByIdAndUpdate(
			product._id,
			{
				$push: { ratings: { star: star, postedBy: user._id } },
			},
			{ new: true }
		).exec();

		res.json(ratingAdded);
	} else {
		const ratingUpdated = await Product.updateOne(
			{
				ratings: { $elemMatch: existingRatingObject },
			},
			{ $set: { "ratings.$.star": star } },
			{ new: true }
		).exec();
		console.log("ratingUpdated", ratingUpdated);
		res.json(ratingUpdated);
	}
};

exports.listRelated = async (req, res) => {
	const product = await Product.findById(req.params.productId).exec();
	const related = await Product.find({
		_id: { $ne: product._id },
		category: product.category,
	})
		.limit(3)
		.populate("category")
		.populate("subs")
		.exec();
	res.json(related);
};

const handleQuery = async (req, res, query) => {
	const products = await Product.find({ $text: { $search: query } })
		.populate("category", "_id name")
		.populate("subs", "_id name")
		.exec();

	res.json(products);
};

const handlePrice = async (req, res, price) => {
	try {
		let products = await Product.find({
			price: {
				$gte: price[0],
				$lte: price[1],
			},
		})
			.populate("category", "_id name")
			.populate("subs", "_id name")
			.exec();

		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

const handleCategory = async (req, res, category) => {
	try {
		let products = await Product.find({ category })
			.populate("category", "_id name")
			.populate("subs", "_id name")
			.exec();
		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

const handleStar = async (req, res, stars) => {
	try {
		const aggregates = await Product.aggregate([
			{
				$project: {
					document: "$$ROOT",
					floorAverage: {
						$floor: { $avg: "$ratings.star" },
					},
				},
			},
			{ $match: { floorAverage: stars } },
		])
			.limit(12)
			.exec(); // Remove the callback function

		const productIds = aggregates.map((aggregate) => aggregate.document._id);
		const products = await Product.find({ _id: { $in: productIds } })
			.populate("category", "_id name")
			.populate("subs", "_id name")
			.exec();

		res.json(products);
	} catch (err) {
		console.log("Aggregation error:", err);
		return res.status(400).json({
			error: "Unable to fetch products by stars",
		});
	}
};

exports.listsearchFilters = async (req, res) => {
	const { query, price, category, stars, sub } = req.body;

	if (query) {
		console.log("query", query);
		await handleQuery(req, res, query);
	}

	if (price !== undefined) {
		console.log("price ---> ", price);
		await handlePrice(req, res, price);
	}

	if (category) {
		console.log("category ---> ", category);
		await handleCategory(req, res, category);
	}

	if (stars) {
		console.log("stars ---> ", stars);
		await handleStar(req, res, stars);
	}
};
