import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const fileUploadAndResize = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.images;
		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						axios
							.post(
								`${process.env.REACT_APP_API}/uploadimages`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : "",
									},
								}
							)
							.then((res) => {
								console.log("IMAGE UPLOAD RES DATA", res);
								setLoading(false);
								allUploadedFiles.push(res.data);
								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => {
								setLoading(false);
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
		}
	};
	const handleImageRemove = (public_id) => {
		setLoading(true);
		axios
			.post(
				`${process.env.REACT_APP_API}/removeimage`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : "",
					},
				}
			)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<>
			<div className="row">
				{values.images &&
					values.images.map((image) => (
						<Badge
							count="X"
							key={image.public_id}
							onClick={() => handleImageRemove(image.public_id)}
							style={{ cursor: "pointer" }}
						>
							<Avatar
								src={image.url}
								size={100}
								shape="square"
								className="ml-3"
							/>
						</Badge>
					))}
			</div>

			<div className="row">
				<div className="col-md-2">
					<label className="btn btn-primary mt-4">
						Choose File
						<input
							type="file"
							multiple
							hidden
							accept="images/*"
							onChange={fileUploadAndResize}
						/>
					</label>
				</div>
			</div>
		</>
	);
};

export default FileUpload;
