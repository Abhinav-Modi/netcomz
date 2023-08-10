import React from "react";
import { Link } from "react-router-dom";
const ProductListItems = ({ product }) => {
	const { price, category, subs, shipping, color, brand, quantity, sold } =
		product;
	console.log(product);
	return (
		<div>
			<ul className="list-group ">
				<li className="list-group-item border-0 h3 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Price </span>

						<span className="label text-success fw-normal  text-end col">
							${price}
						</span>
					</div>
				</li>
				{category && (
					<li className="list-group-item border-0 h5 fw-light">
						<div className="row justify-content-around fw-normal">
							<span className="col">Category </span>
							<span className="label  fw-normal text-end col">
								<Link
									to={`/category/${category.slug}`}
									className="label label-default label-pill pull-xs-right"
								>
									{category.name}
								</Link>
							</span>
						</div>
					</li>
				)}
				{subs && (
					<li className="list-group-item border-0 h5 fw-light  ">
						<div className="row justify-content-around fw-normal">
							<span className="col">Sub Categories </span>

							<span className="label  fw-normal  text-end col">
								{subs.map((s) => (
									<Link
										to={`/sub/${s.slug}`}
										className="label label-default label-pill pull-xs-right"
									>
										{s.name}
									</Link>
								))}
							</span>
						</div>
					</li>
				)}
				<li className="list-group-item border-0 h5 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Shipping </span>

						<span className="label  fw-normal  text-end col">{shipping}</span>
					</div>
				</li>
				<li className="list-group-item border-0 h5 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Color </span>

						<span className="label  fw-normal  text-end col">{color}</span>
					</div>
				</li>
				<li className="list-group-item border-0 h5 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Brand </span>

						<span className="label  fw-normal  text-end col">{brand}</span>
					</div>
				</li>
				<li className="list-group-item border-0 h5 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Available </span>

						<span className="label  fw-normal  text-end col">{quantity}</span>
					</div>
				</li>
				<li className="list-group-item border-0 h5 fw-light  ">
					<div className="row justify-content-around fw-normal">
						<span className="col">Sold </span>

						<span className="label  fw-normal  text-end col">{sold}</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default ProductListItems;
