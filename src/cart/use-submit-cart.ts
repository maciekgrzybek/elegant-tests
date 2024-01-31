import { useMutation } from "react-query";

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

export const useSubmitCart = () => {
	const { mutateAsync } = useMutation(submitCard);

	return {
		submitCart: mutateAsync,
	};
};
