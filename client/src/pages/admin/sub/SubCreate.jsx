import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const SubCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState("");
	const [subs, setSubs] = useState([]);
	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = () =>
		getCategories().then((res) => setCategories(res.data));

	const loadSubs = () => getSubs().then((res) => setSubs(res.data));
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success(`"${res.data.name}" is created`);
				loadSubs();
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};
	const handleRemove = async (slug) => {
		if (window.confirm("Delete?")) {
			setLoading(true);
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.error(`${res.data.name} deleted`);
					loadSubs();
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false);
						toast.error(err.response.data);
					}
				});
		}
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Create SubCategory</h4>
					)}
					<div className="form-group">
						<label>Parent Category</label>
						<select
							name="category"
							className="form-control"
							onChange={(e) => setCategory(e.target.value)}
						>
							<option>Please select</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</div>
					<br />

					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>
					<br />
					<LocalSearch keyword={keyword} setKeyword={setKeyword} />
					<br />
					{subs.filter(searched(keyword)).map((c) => (
						<div
							className="alert alert-secondary d-flex justify-content-between"
							key={c._id}
						>
							{c.name}{" "}
							<div>
								<Link to={`/admin/sub/${c.slug}`}>
									<span className="btn btn-sm">
										<EditOutlined className="text-warning" />
									</span>
								</Link>
								<span
									onClick={() => handleRemove(c.slug)}
									className="btn btn-sm"
								>
									<DeleteOutlined className="text-danger" />
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubCreate;
