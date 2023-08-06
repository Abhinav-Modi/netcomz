import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
const ProductCreate = () => {
	const initialState = {
		title: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		subs: [],
		shipping: "",
		quantity: "",
		images: [],
		colors: ["Black", "Brown", "Silver", "White", "Blue"],
		brands: [
			"Apple",
			"Samsung",
			"Microsoft",
			"Lenovo",
			"ASUS",
			"HP",
			"Dell",
			"Acer",
			"Xiaomi",
			"Sony",
		],
		color: "",
		brand: "",
	};
	const [values, setValues] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [showSub, setShowSub] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategories().then((c) => setValues({ ...values, categories: c.data }));
	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				toast.success(`"${res.data.title}" is created`);
				setValues({ ...initialState });
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		if (e.target.name === "category" && e.target.value === "") {
			setShowSub(false);
		}
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log("CLICKED CATEGORY", e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });
		getCategorySubs(e.target.value).then((res) => {
			console.log("SUB OPTIONS ON CATEGORY CLICK", res);
			setSubOptions(res.data);
			setShowSub(true);
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h4>Product create</h4>
					)}
					<hr />
					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductCreateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						values={values}
						handleCategoryChange={handleCategoryChange}
						subOptions={subOptions}
						showSub={showSub}
						setValues={setValues}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
