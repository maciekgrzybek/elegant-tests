import { HttpResponse, http } from "msw";

import { ProductType } from "./types";

export const cartSuccessfulResponse = (products: ProductType[] = []) =>
	http.get("http://localhost:3001/api/cart", ({ request, params, cookies }) => {
		return HttpResponse.json({ products });
	});

export const cartSubmitSuccessfulResponse = () =>
	http.post(
		"http://localhost:3001/api/cart/submit",
		({ request, params, cookies }) => {
			return HttpResponse.json("ok");
		},
	);

export const cartSubmitErrorResponse = () =>
	http.post(
		"http://localhost:3001/api/cart/submit",
		({ request, params, cookies }) => {
			return HttpResponse.error();
		},
	);
