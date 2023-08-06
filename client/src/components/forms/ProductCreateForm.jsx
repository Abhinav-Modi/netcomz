import React from "react";
import { Select } from "antd";
const { Option } = Select;
const ProductCreateForm = ({
	handleSubmit,
	handleChange,
	values,
	handleCategoryChange,
	subOptions,
	showSub,
	setValues,
}) => {
	const {
		title,
		description,
		price,
		categories,
		category,
		subs,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand,
	} = values;
	return (
		<form onSubmit={handleSubmit} className="mt-4 mb-4">
			<div className="form-group mt-4 mb-4">
				<label>Title</label>
				<input
					type="text"
					className="form-control"
					name="title"
					value={title}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Description</label>
				<input
					type="text"
					className="form-control"
					name="description"
					value={description}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Price</label>
				<input
					type="number"
					className="form-control"
					name="price"
					value={price}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Shipping</label>
				<select
					name="shipping"
					className="form-control"
					onChange={handleChange}
				>
					<option>Please select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Quantity</label>
				<input
					type="number"
					className="form-control"
					name="quantity"
					value={quantity}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Color</label>
				<select name="color" className="form-control" onChange={handleChange}>
					<option>Please select</option>
					{colors.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<div className="form-group mt-4 mb-4">
				<label>Brand</label>
				<select name="brand" className="form-control" onChange={handleChange}>
					<option>Please select</option>
					{brands.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
			</div>
			<div className="form-group mt-4 mb-4">
				<label>Parent Category</label>
				<select
					name="category"
					className="form-control"
					onChange={handleCategoryChange}
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

			{showSub && (
				<div>
					<label>Sub Categories</label>
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="Please select"
						value={subs}
						onChange={(value) => setValues({ ...values, subs: value })}
					>
						{subOptions.length &&
							subOptions.map((s) => (
								<Option key={s._id} value={s._id}>
									{s.name}
								</Option>
							))}
					</Select>
				</div>
			)}

			<button className="btn btn-outline-info">Save</button>
		</form>
	);
};

export default ProductCreateForm;
