import { useEffect, useState } from "react";
import { ProductType } from "./cart/types";
import Cart from "./cart/Cart";
import { useGetCart } from "./cart/use-get-cart";

export default function App() {
	const { data, isError, isLoading } = useGetCart();

	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		if (data?.products) {
			setProducts(data.products);
		}
	}, [data]);

	const removeProduct = (id: string) => {
		setProducts((currentProducts) =>
			currentProducts.filter((product) => product.id !== id),
		);
	};

	const addProduct = (id: string) => {
		setProducts((currentProducts) => {
			const item = currentProducts.find((product) => product.id === id)!;
			return [
				...currentProducts.filter((product) => product.id !== id),
				{
					...item,
					quantity: item.quantity + 1,
				},
			];
		});
	};

	const subtractProduct = (id: string) => {
		setProducts((currentProducts) => {
			const item = currentProducts.find((product) => product.id === id)!;
			return [
				...currentProducts.filter((product) => product.id !== id),
				{
					...item,
					quantity: item.quantity - 1,
				},
			];
		});
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading cart</div>;

	return (
		<Cart
			products={products}
			removeProduct={removeProduct}
			addProduct={addProduct}
			subtractProduct={subtractProduct}
		/>
	);
}
