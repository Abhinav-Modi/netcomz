import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
	const { title, images, description } = product;

	return (
		<>
			<div className="col-md-7">
				<Carousel showArrows={true} autoPlay infiniteLoop>
					{images &&
						images.map((image) => (
							<img
								src={image.url}
								key={image.public_id}
								alt={title}
								className=""
							/>
						))}
				</Carousel>
				{/* add description */}

				<Tabs type="card ">
					<TabPane tab="Description" key="1">
						{description && description}
					</TabPane>
					<TabPane tab="More" key="2">
						Call us on xxxx xxx xxx to learn more about this product.
					</TabPane>
				</Tabs>
			</div>

			<div className="col-md-5">
				<h1 className="bg-primary bg-opacity-50 p-3">{title}</h1>
				<Card
					actions={[
						<>
							<ShoppingCartOutlined className="text-success" /> <br />
							Add to Cart
						</>,
						<Link to="/">
							<HeartOutlined className="text-info" /> <br /> Add to Wishlist
						</Link>,
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
