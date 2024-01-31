import { RenderBuilder } from "../../test-utils/render-builder";
import Prices from "./prices";

describe("<Prices />", () => {
	let fixtures: ReturnType<typeof getFixtures>;
	beforeEach(() => {
		fixtures = getFixtures();
	});

	test("delivery not free", () => {
		const { container } = fixtures.show(10);

		expect(container).toMatchInlineSnapshot(`
			<div>
			  <div
			    class="grid grid-rows-2 grid-cols-2 gap-y-2.5 text-right py-5"
			  >
			    <span
			      class="text-gray-400"
			    >
			      Order
			    </span>
			    <span
			      class="font-bold"
			    >
			      $ 
			      20
			    </span>
			    <span
			      class="text-gray-400"
			    >
			      Delivery
			    </span>
			    <span
			      class="font-bold"
			    >
			      $ 10.00
			    </span>
			  </div>
			</div>
		`);
	});
	test("delivery free", () => {
		const { container } = fixtures.show(0);

		expect(container).toMatchInlineSnapshot(`
			<div>
			  <div
			    class="grid grid-rows-2 grid-cols-2 gap-y-2.5 text-right py-5"
			  >
			    <span
			      class="text-gray-400"
			    >
			      Order
			    </span>
			    <span
			      class="font-bold"
			    >
			      $ 
			      20
			    </span>
			    <span
			      class="text-gray-400"
			    >
			      Delivery
			    </span>
			    <span
			      class="font-bold line-through"
			    >
			      Free
			    </span>
			  </div>
			</div>
		`);
	});
});

const getFixtures = () => {
	const render = (deliveryPrice: number) => {
		return new RenderBuilder().render(
			<Prices orderPrice={20} deliveryPrice={deliveryPrice} />,
		);
	};

	return {
		show: render,
	};
};
