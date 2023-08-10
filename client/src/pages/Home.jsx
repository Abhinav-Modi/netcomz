import React from "react";

import NewArrival from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
const Home = () => {
	return (
		<>
			{" "}
			<div className="bg-primary  font-monospace bg-opacity-50 p-5 rounded-lg mb-5 text-center">
				<h1 className="display-3 ">Netcomz</h1>
			</div>
			<div className="text-center p-3 mb-5  font-monospace mt-5">
				<h1 className="display-4">Latest Products</h1>
			</div>
			<NewArrival />
			<div className="text-center  font-monospace  p-3 mb-5 mt-5">
				<h1 className="display-4">Our Best Sellers</h1>
			</div>
			<BestSellers />
		</>
	);
};

export default Home;
