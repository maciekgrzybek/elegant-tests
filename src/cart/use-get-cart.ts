import { useQuery } from "react-query";
import { ProductType } from "./types";

const fetchCart = async (): Promise<{ products: ProductType[] }> => {
	const response = await fetch(`http://localhost:3001/api/cart`);

	return response.json();
};

export const useGetCart = () => {
	const { data, isError, isLoading } = useQuery("cart", fetchCart);

	return { data, isError, isLoading };
};
