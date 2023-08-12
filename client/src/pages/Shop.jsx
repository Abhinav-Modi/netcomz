import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByFilter } from "../functions/product";
const Shop = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	let { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	useEffect(() => {
		loadAllProducts();
	}, [search]);

	const loadAllProducts = () => {
		getProductsByCount(12).then((p) => {
			setProducts(p.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchProducts({ query: text });
		}, 300);
		return () => clearTimeout(delayed);
	}, [text]);

	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data);
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3">search/filter menu</div>

				<div className="col-md-9">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4 className="text-danger">Products</h4>
					)}

					{products.length < 1 && <p>No products found</p>}

					<div className="row pb-5">
						{products.map((p) => (
							<div key={p._id} className="col-md-4 mt-3">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
