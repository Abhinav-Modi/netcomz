import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const CategoryHome = () => {
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = useParams();

	useEffect(() => {
		setLoading(true);
		getCategory(slug).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setCategory(res.data.category);
			setProducts(res.data.products);
			setLoading(false);
		});
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col 	">
					{loading ? (
						<h4 className="text-center p-3 mt-5 mb-5 display-4 ">Loading...</h4>
					) : (
						<h4 className="text-center p-3 mt-5 mb-5 display-4 ">
							{products.length} Products in "{category.name}" category
						</h4>
					)}
				</div>
			</div>
			<div className="row justify-content-around">
				{products.map((p) => (
					<div key={p._id} className="col-md-4">
						<ProductCard product={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryHome;
