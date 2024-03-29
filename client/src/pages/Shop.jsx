import React, { useState, useEffect } from "react";
import {
	getProductsByCount,
	fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, StarOutlined } from "@ant-design/icons";
import { getCategories } from "../functions/category";
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState([0, 0]);
	const [ok, setOk] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryIds, setCategoryIds] = useState([]);
	const [star, setStar] = useState("");

	let dispatch = useDispatch();
	let { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	useEffect(() => {
		loadAllProducts();
		getCategories().then((res) => setCategories(res.data));
	}, []);

	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data);
		});
	};

	// 1. load products by default on page load
	const loadAllProducts = () => {
		getProductsByCount(12).then((p) => {
			setProducts(p.data);
			setLoading(false);
		});
	};

	// 2. load products on user search input
	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchProducts({ query: text });
			if (!text) {
				loadAllProducts();
			}
		}, 300);
		return () => clearTimeout(delayed);
	}, [text]);

	// 3. load products based on price range
	useEffect(() => {
		console.log("ok to request");
		fetchProducts({ price });
	}, [ok]);

	const handleSlider = (value) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		// reset

		setCategoryIds([]);
		setPrice(value);
		setStar("");

		setTimeout(() => {
			setOk(!ok);
		}, 300);
	};

	const showCategories = () =>
		categories.map((c) => (
			<div key={c._id}>
				<Checkbox
					onChange={handleCheck}
					className="pb-2 pl-4 pr-4"
					value={c._id}
					name="category"
					checked={categoryIds.includes(c._id)}
				>
					{c.name}
				</Checkbox>
				<br />
			</div>
		));

	const handleCheck = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		// reset
		setPrice([0, 0]);
		setStar("");
		let inTheState = [...categoryIds];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked) === -1;
		if (foundInTheState) {
			inTheState.push(justChecked);
		} else {
			inTheState.splice(inTheState.indexOf(justChecked), 1);
		}
		setCategoryIds(inTheState);
		fetchProducts({ category: inTheState });
	};

	const showStars = () => (
		<div className="pr-4 pl-4 pb-2">
			<Star starClick={handleStarClick} numberOfStars={5} />
			<Star starClick={handleStarClick} numberOfStars={4} />
			<Star starClick={handleStarClick} numberOfStars={3} />
			<Star starClick={handleStarClick} numberOfStars={2} />
			<Star starClick={handleStarClick} numberOfStars={1} />
		</div>
	);

	const handleStarClick = (num) => {
		console.log(num);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		// reset
		setCategoryIds([]);
		setPrice([0, 0]);
		setStar(num);

		fetchProducts({ stars: num });
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3 pt-2">
					<h4>Search/Filter</h4>
					<hr />

					<Menu defaultOpenKeys={["1", "2"]} mode="inline">
						<SubMenu
							key="1"
							title={
								<span className="h6">
									<DollarOutlined /> Price
								</span>
							}
						>
							<div>
								<Slider
									className="ml-4 mr-4"
									tipFormatter={(v) => `$${v}`}
									range
									value={price}
									onChange={handleSlider}
									max="50000"
								/>
							</div>
						</SubMenu>
						<SubMenu key="2" title={<span className="h6">Categories</span>}>
							<div style={{ maringTop: "-10px" }}>{showCategories()}</div>
						</SubMenu>
						<SubMenu
							key="3"
							title={
								<span className="h6">
									<StarOutlined /> Rating
								</span>
							}
						>
							<div style={{ maringTop: "-10px" }}>{showStars()}</div>
						</SubMenu>
					</Menu>
				</div>

				<div className="col-md-9 pt-2">
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
