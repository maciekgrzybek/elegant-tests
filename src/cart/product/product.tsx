import { testLocators } from "../test-locators";
import { ProductType } from "../types";

export interface Props {
	product: ProductType;
	handleRemove: (id: string) => void;
	handleAdd: (id: string) => void;
	handleSubtract: (id: string) => void;
}

const Product: React.FC<Props> = ({
	product,
	handleRemove,
	handleAdd,
	handleSubtract,
}) => {
	const { image, name, color, quantity, price, id } = product;

	const regularPrice = quantity * price;
	const subtractDisabled = quantity === 1;

	return (
		<li
			className="grid grid-cols-[1.2fr_2fr] items-center bg-[#f5f6f5] rounded-lg p-2.5 relative mb-3 last:mb-0"
			data-testid={testLocators.product}
		>
			<div>
				<img src={image} alt={name} className="max-w-[110px] p-2.5" />
			</div>
			<div className="grid grid-areas['title_title'_'quantity_price']">
				<div className="grid grid-rows-2 grid-area-title font-semibold text-lg mb-2.5">
					{name}
					<span className="font-light text-gray-400 text-sm">{color}</span>
				</div>
				<div className="grid-area-quantity grid grid-cols-[repeat(3,_min-content)] items-center">
					<button
						type="button"
						disabled={subtractDisabled}
						className="w-6 h-6 bg-white border-none rounded-sm shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05)] transition duration-300 cursor-pointer font-semibold text-[#7d7d7d] disabled:cursor-not-allowed disabled:bg-[#e6e6e696] disabled:text-[#d8d8d8] hover:shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)]"
						onClick={() => handleSubtract(id)}
					>
						-
					</button>
					<span className="px-5">{quantity}</span>
					<button
						type="button"
						onClick={() => handleAdd(id)}
						data-testid={testLocators.increaseQuantity}
					>
						+
					</button>
				</div>

				<div className="grid-area-price font-semibold text-right flex items-center justify-end relative">
					$ {regularPrice.toFixed(2)}{" "}
				</div>
			</div>
			<button
				className="absolute border-none bg-white rounded-full text-[#c3c3c3] text-xs w-5 h-5 top-[-3px] right-[-3px] cursor-pointer shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] transition duration-300 hover:shadow-[0px_0px_4px_1px_rgba(0,0,0,0.3)]"
				onClick={() => handleRemove(id)}
				data-testid={testLocators.removeProduct}
			>
				X
			</button>
		</li>
	);
};

export default Product;
