import { ProductType } from "./types";

export class CartBuilder {
	cart: ProductType[] = [];

	public withProduct(product: ProductType) {
		this.cart.push(product);
		return this;
	}

	public build() {
		return this.cart;
	}

	public static buildProduct(
		overrides: Partial<ProductType> = {},
	): ProductType {
		return {
			id: "1",
			name: "Product 1",
			color: "red",
			price: 10,
			image: "https://example.com/image.png",
			quantity: 1,
			...overrides,
		};
	}
}
