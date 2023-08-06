import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const AllProducts = () => {
	// state
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	// useEffect
	useEffect(() => {
		loadAllProducts();
		console.log(products);
	}, []);
	// load all products
	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(100)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};
	const handleRemove = (slug) => {
		let answer = window.confirm("Delete?");
		if (answer) {
			// console.log("send delete request", slug);
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts(); // load all products after delete
					toast.error(`${res.data.title} is deleted`);
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data);
					console.log(err);
				});
		}
	};
	return (
		<div className="container-fluid">
			<div className="row justify-content-around">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<>
							<h4>All Products</h4>
							<hr />
							{products.length < 1 ? (
								<p>No products found</p>
							) : (
								<div className="row">
									{products.map((product) => (
										<div key={product._id} className="col-md-4 mb-4 pb-4">
											<AdminProductCard
												product={product}
												handleRemove={handleRemove}
											/>
										</div>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
