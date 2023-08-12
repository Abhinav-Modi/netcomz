import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => state); // directly destructure 'search' from state
	const { text } = search || { text: "" }; // destructure 'text' from 'search'
	console.log("search", search);
	const navigate = useNavigate();

	const handleChange = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: e.target.value },
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate({
			pathname: "/shop",
			state: { fromSearch: true },
		});
	};

	return (
		<form
			className="form-inline my-2 my-lg-0 d-flex align-items-center"
			onSubmit={handleSubmit}
		>
			<input
				onChange={handleChange}
				type="search"
				value={text}
				className="form-control mr-sm-2 me-3 bg-transparent  "
				placeholder="Search"
			/>
			<SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
		</form>
	);
};

export default Search;
