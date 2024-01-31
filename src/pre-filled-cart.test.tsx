import { RenderBuilder } from "./test-utils/render-builder";
import App from "./App";

import { setupMockServer } from "./test-utils/setup-mock-server";
import { Locator, PageBuilder } from "./test-utils/page-builder";
import { testLocators } from "./cart/test-locators";
import {
	cartSubmitErrorResponse,
	cartSubmitSuccessfulResponse,
	cartSuccessfulResponse,
} from "./cart/api-mocks";
import { CartBuilder } from "./cart/cart-builder";
import { ProductType } from "./cart/types";

describe("pre-filled cart", () => {
	let fixtures: ReturnType<typeof getFixtures>;

	beforeEach(() => {
		fixtures = getFixtures();
	});

	test("allows to increase the product quantity and submit the cart", async () => {
		// Przygotowanie danych
		const product1 = CartBuilder.buildProduct({
			name: "Air Force",
			quantity: 1,
		});
		const product2 = CartBuilder.buildProduct({ name: "Air Max", quantity: 3 });
		const productsInCart = fixtures.given
			.products()
			.withProduct(product1)
			.withProduct(product2)
			.build();

		// Mockowanie API
		fixtures.given.cart.hasProducts(productsInCart);
		fixtures.given.cart.canBeSubmitted();

		// Renderowanie komponentu
		fixtures.show();

		// Sprawdzanie komponentu
		const { page } = fixtures.given;

		await page.then().text("Air Force").isVisible();
		await page.then().text("1").isVisible();

		await page.when().tappingFirstOf(Locator.of(testLocators.increaseQuantity));
		await page.then().text("2").isVisible();

		await page.when().tapping(/place your order/i);
		await page
			.then()
			.text(/thank you for order/i)
			.isVisible();
	});

	test("allows to remove product", async () => {
		const product = CartBuilder.buildProduct({ name: "Air Force" });
		const product2 = CartBuilder.buildProduct({ name: "Air Max", quantity: 2 });
		const productsInCart = fixtures.given
			.products()
			.withProduct(product)
			.withProduct(product2)
			.build();
		fixtures.given.cart.hasProducts(productsInCart);
		fixtures.given.cart.canBeSubmitted();

		const { page } = fixtures.given;

		fixtures.show();
		await page.then().text("Air Force").isVisible();
		await page.then().text("1").isVisible();

		await page.when().tappingFirstOf(Locator.of(testLocators.removeProduct));
		await page.then().text("Air Force").isNotVisible();

		await page.when().tapping(/place your order/i);
		await page
			.then()
			.text(/thank you for order/i)
			.isVisible();
	});

	test("API problem", async () => {
		const product = CartBuilder.buildProduct({ name: "Air Force" });
		const productsInCart = fixtures.given
			.products()
			.withProduct(product)
			.build();
		fixtures.given.cart.hasProducts(productsInCart);
		fixtures.given.cart.cannotBeSubmitted();

		const { page } = fixtures.given;

		fixtures.show();

		await page.when().tapping(/place your order/i);
		await page
			.then()
			.text(/something went wrong/i)
			.isVisible();
	});
});

const { mockServer } = setupMockServer();

const getFixtures = () => {
	const render = () => {
		return new RenderBuilder().withFetchProvider().render(<App />);
	};

	return {
		show: render,
		given: {
			products: () => new CartBuilder(),
			page: new PageBuilder(),
			cart: {
				hasProducts: (products: ProductType[]) => {
					mockServer.use(cartSuccessfulResponse(products));
				},
				canBeSubmitted: () => {
					mockServer.use(cartSubmitSuccessfulResponse());
				},
				cannotBeSubmitted: () => {
					mockServer.use(cartSubmitErrorResponse());
				},
			},
		},
	};
};
