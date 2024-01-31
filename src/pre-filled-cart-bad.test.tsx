import App from "./App";

import { testLocators } from "./cart/test-locators";

import { useGetCart } from "./cart/use-get-cart";
import { useSubmitCart } from "./cart/use-submit-cart";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("./cart/use-get-cart");
vi.mock("./cart/use-submit-cart");

describe("pre-filled cart", () => {
	test("allows to increase the product quantity and submit the cart", async () => {
		// Przygotowanie danych
		const product1 = {
			id: "1",
			name: "Air Force",
			color: "red",
			price: 10,
			image: "https://example.com/image.png",
			quantity: 1,
		};
		const product2 = {
			id: "1",
			name: "Air Max",
			color: "red",
			price: 10,
			image: "https://example.com/image.png",
			quantity: 2,
		};

		// Mockowanie hooków
		vi.mocked(useGetCart).mockReturnValue({
			data: { products: [product1, product2] },
			isLoading: false,
			isError: false,
		});
		vi.mocked(useSubmitCart).mockReturnValue({ submitCart: async () => "ok" });

		// Renderowanie komponentu
		render(<App />);

		// Sprawdzanie komponentu
		expect(screen.getByText("Air Force")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();

		const [removeElement] = screen.getAllByTestId(
			testLocators.increaseQuantity,
		);
		await userEvent.click(removeElement);
		expect(await screen.findByText("2")).toBeInTheDocument();

		await userEvent.click(screen.getByText(/place your order/i));
		expect(screen.getByText(/thank you for order/i)).toBeInTheDocument();
	});
});
