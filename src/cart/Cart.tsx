import { ProductType } from "./types";

import Product from "./product/product";
import React, { SyntheticEvent, useState } from "react";
import Prices from "./prices/prices";
import { useMutation } from "react-query";
import { useSubmitCart } from "./use-submit-cart";

export interface Props {
	products: ProductType[];
	removeProduct: (id: string) => void;
	addProduct: (id: string) => void;
	subtractProduct: (id: string) => void;
	freeDeliveryPrice?: number;
}

const submitCard = async () => {
	try {
		const response = await fetch("http://localhost:3001/api/cart/submit", {
			method: "POST",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {}
};

const Cart: React.FC<Props> = ({
	products,
	removeProduct,
	addProduct,
	subtractProduct,
	freeDeliveryPrice = 500,
}) => {
	const { submitCart } = useSubmitCart();

	const [status, setStatus] = useState("idle");

	const orderPrice = products.reduce((acc, current) => {
		return acc + current.quantity * current.price;
	}, 0);

	// we round the price to 2 decimal places
	const formattedOrderPrice = parseFloat(
		(Math.round(orderPrice * 100) / 100).toFixed(2),
	);

	const deliveryPrice = formattedOrderPrice > freeDeliveryPrice ? 0 : 30;
	const totalPrice = !formattedOrderPrice
		? 0
		: (formattedOrderPrice + deliveryPrice).toFixed(2);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const data = await submitCart();
			if (data === "ok") {
				setStatus("finished");
			} else {
				setStatus("error");
			}
		} catch (error) {
			setStatus("error");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center">
			<div className="w-[400px] rounded-lg bg-white overflow-hidden p-[20px_20px_30px]">
				{status === "finished" && (
					<div className="fixed bg-[rgba(0,0,0,0.9)] flex top-0 left-0 w-full h-full items-center justify-center z-40 text-white font-bold text-2xl">
						Thank you for order
					</div>
				)}
				{status === "error" && (
					<div className="fixed bg-[rgba(170,0,0,0.7)] flex top-0 left-0 w-full h-full items-center justify-center z-40 text-white font-bold text-2xl">
						Something went wrong
					</div>
				)}
				<ul>
					{products
						.sort((a, b) => {
							if (a.id > b.id) return 1;
							if (a.id < b.id) return -1;
							return 0;
						})
						.map((product) => (
							<Product
								product={product}
								key={product.id}
								handleRemove={removeProduct}
								handleAdd={addProduct}
								handleSubtract={subtractProduct}
							/>
						))}
				</ul>

				<Prices
					orderPrice={formattedOrderPrice}
					deliveryPrice={deliveryPrice}
				/>

				<div className="text-2xl font-black grid grid-cols-[auto_auto] justify-between mb-7.5">
					In Total: <span>$ {totalPrice}</span>
				</div>

				<button
					className="bg-black text-white border-0 p-[20px_40px] rounded-lg font-semibold text-lg w-full cursor-pointer transition duration-300 hover:opacity-80"
					type="submit"
				>
					Place Your Order
				</button>
			</div>
		</form>
	);
};

export default Cart;
