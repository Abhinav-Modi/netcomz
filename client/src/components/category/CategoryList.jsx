import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getCategories().then((c) => {
			setCategories(c.data);
			setLoading(false);
		});
	}, []);

	const showCategories = () =>
		categories.map((c) => (
			<button
				key={c._id}
				className="col btn btn-outlined-primary btn-lg btn-block  raised-btn m-3 border border-primary nav-underline"
			>
				<Link to={`/category/${c.slug}`} style={{ textDecoration: "none" }}>
					{c.name}
				</Link>
			</button>
		));

	return (
		<div className="container">
			<div className="row">
				{loading ? (
					<h4 className="text-center">Loading...</h4>
				) : (
					showCategories()
				)}
			</div>
		</div>
	);
};

export default CategoryList;
