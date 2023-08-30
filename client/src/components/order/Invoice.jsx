import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ order }) => (
	console.log("Order aa gya", JSON.stringify(order, null, 4)),
	(
		<Document>
			<Page style={styles.body}>
				<Text style={styles.header} fixed>
					~ {new Date().toLocaleString()} ~
				</Text>
				<Text style={styles.title}>Order Invoice</Text>
				<Text style={styles.author}>React Redux Ecommerce</Text>
				<Text style={styles.subtitle}>Order Summary</Text>

				<Text style={styles.tableRow}>
					<Text style={styles.tableHeader}>Title</Text>
					<Text style={styles.tableHeader}>Price</Text>
					<Text style={styles.tableHeader}>Quantity</Text>
					<Text style={styles.tableHeader}>Brand</Text>
					<Text style={styles.tableHeader}>Color</Text>
				</Text>
				{order.products.map((product) => (
					<Text style={styles.tableRow}>
						<Text style={styles.tableCell}>{product.title}</Text>
						<Text style={styles.tableCell}>${product.price}</Text>
						<Text style={styles.tableCell}>{product.count}</Text>
						<Text style={styles.tableCell}>{product.brand}</Text>
						<Text style={styles.tableCell}>{product.color}</Text>
					</Text>
				))}

				<Text style={styles.text}>
					<Text>
						Date: {"               "}
						{new Date(order.paymentIntent.created * 1000).toLocaleString()}
					</Text>
					{"\n"}
					<Text>
						Order Id: {"         "}
						{order.paymentIntent.id}
					</Text>
					{"\n"}
					<Text>
						Order Status: {"  "}
						{order.orderStatus}
					</Text>
					{"\n"}
					<Text>
						Total Paid: {"       "}
						{order.paymentIntent.amount}
					</Text>
				</Text>

				<Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
			</Page>
		</Document>
	)
);

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify",
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	footer: {
		padding: "100px",
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingBottom: 5,
	},
	tableHeader: {
		width: "20%",
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 5,
	},
	tableCell: {
		width: "20%",
		textAlign: "center",
		paddingVertical: 5,
	},
});

export default Invoice;
