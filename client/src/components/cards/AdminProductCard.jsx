import React from "react";
import { Card } from "antd";
import Laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
	const { title, description, images, slug } = product;
	const handleDelete = (slug) => {
		handleRemove(slug);
	};

	return (
		<Card
			hoverable
			cover={
				<img
					src={images && images.length ? images[0].url : Laptop}
					style={{ height: "150px", objectFit: "cover" }}
					className="img-fluid p-1"
					alt="product"
				/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<EditOutlined className="text-warning" />,
				</Link>,
				<DeleteOutlined
					className="text-danger"
					onClick={() => handleDelete(slug)}
				/>,
			]}
		>
			<Meta
				title={title}
				description={`
				${description && description.substring(0, 50)}...
			
			`}
			/>
		</Card>
	);
};

export default AdminProductCard;
