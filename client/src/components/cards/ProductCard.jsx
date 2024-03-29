import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { showAverage } from "../../functions/rating";
import { useDispatch, useSelector } from "react-redux";
import Laptop from "../../images/laptop.png";
const { Meta } = Card;

const ProductCard = ({ product }) => {
	const { images, title, description, slug, price } = product;
	const [tooltip, setTooltip] = useState("Click to add");

	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleAddtoCart = () => {
		// create cart array
		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}

			cart.push({
				...product,
				count: 1,
			});

			let unique = _.uniqWith(cart, _.isEqual);

			localStorage.setItem("cart", JSON.stringify(unique));
			setTooltip("Added");

			dispatch({
				type: "ADD_TO_CART",
				payload: unique,
			});
			dispatch({
				type: "SET_VISIBLE",
				payload: true,
			});
		}
	};
	useEffect(() => {
		if (product.quantity < 1) {
			setTooltip("Out of Stock");
		}
	}, [product.quantity]);
	return (
		<>
			{product && product.ratings && product.ratings.length > 0 ? (
				showAverage(product)
			) : (
				<div className="text-center pt-1 pb-3">No rating yet</div>
			)}
			<Card
				hoverable
				cover={
					<img
						alt="example"
						src={images && images.length ? images[0].url : Laptop}
						style={{ height: "150px", objectFit: "contain" }}
					/>
				}
				actions={[
					<Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
						<EyeOutlined className="text-warning" /> <br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						{product.quantity < 1 ? (
							<>
								<ShoppingCartOutlined
									onClick={handleAddtoCart}
									className="text-danger"
								/>
								<br />
								<p className="text-danger">Out of Stock</p>
							</>
						) : (
							<>
								<ShoppingCartOutlined
									onClick={handleAddtoCart}
									className="text-danger"
								/>
								<br />
								Add to Cart
							</>
						)}
					</Tooltip>,
				]}
				className="p-1"
			>
				<Meta
					title={`${title} - $${price}`}
					description={`	${description && description.substring(0, 50)}...`}
				/>
			</Card>
		</>
	);
};

export default ProductCard;
