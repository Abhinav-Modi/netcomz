import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { showAverage } from "../../functions/rating";
const { Meta } = Card;

const ProductCard = ({ product }) => {
	const { images, title, description, slug, price } = product;

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
						src={images && images.length ? images[0].url : ""}
						style={{ height: "150px", objectFit: "contain" }}
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-warning" />, <br /> View Product
					</Link>,
					<Link to={`/product/${slug}`}>
						<ShoppingCartOutlined className="text-danger" />, <br /> Add to Cart
					</Link>,
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
