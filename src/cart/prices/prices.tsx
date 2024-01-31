import clsx from "clsx";

interface Props {
	orderPrice: number;
	deliveryPrice: number;
}

const Prices = ({ orderPrice, deliveryPrice }: Props) => {
	return (
		<div className="grid grid-rows-2 grid-cols-2 gap-y-2.5 text-right py-5">
			<span className="text-gray-400">Order</span>
			<span className="font-bold">$ {orderPrice}</span>
			<span className="text-gray-400">Delivery</span>
			<span
				className={clsx("font-bold", {
					"line-through": deliveryPrice === 0,
				})}
			>
				{deliveryPrice > 0 ? `$ ${deliveryPrice.toFixed(2)}` : "Free"}
			</span>
		</div>
	);
};

export default Prices;
