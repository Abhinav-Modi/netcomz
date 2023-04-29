import axios from "axios";
export const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{}, // empty object as we are sending token in headers and not in body
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const currentUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-user`,
		{}, // empty object as we are sending token in headers and not in body
		{
			headers: {
				authtoken,
			},
		}
	);
};
