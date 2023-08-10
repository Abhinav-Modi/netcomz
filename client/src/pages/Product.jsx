import React, { useState, useEffect } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useParams } from "react-router-dom";
const Product = () => {
	const [product, setProduct] = useState({});
	const { slug } = useParams();
	useEffect(() => {
		loadSingleProduct();
	}, [slug]);
	const loadSingleProduct = () => {
		getProduct(slug).then((res) => setProduct(res.data));
	};

	return (
		<div className="container-fluid">
			<div className="row pt-4">
				<SingleProduct product={product} />
			</div>

			<div className="row ">
				<div className="col text-center pt-5 pb-5">
					<hr />
					<h4>Related Products</h4>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default Product;
