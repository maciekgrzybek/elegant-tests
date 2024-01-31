import testMatrix from "jest-test-matrix";
import {
	PaymentStatus,
	ProductAvailability,
	Props,
	ShippingStatus,
	checkOrderStatus,
} from "./status";

const rejected = "🔴";
const approved = "🟢";
const pending = "🟡";

const testCheck = (props: Props) => {
	const orderStatus = checkOrderStatus(props);

	if (orderStatus === "Rejected") {
		return rejected;
	}
	if (orderStatus === "Approved") {
		return approved;
	}
	if (orderStatus === "Pending") {
		return pending;
	}
};

test("calculates order status", () => {
	expect(
		testMatrix(testCheck, {
			paymentStatus: [
				PaymentStatus.Failed,
				PaymentStatus.Paid,
				PaymentStatus.Pending,
				
			],
			shippingStatus: [
				ShippingStatus.Shipped,
				ShippingStatus.Processing,
				ShippingStatus.NotAvailable,
			],
			productAvailability: [
				ProductAvailability.InStock,
				ProductAvailability.LowStock,
				ProductAvailability.OutOfStock,
			],
			isPriorityCustomer: [true, false],
		}),
	).toMatchInlineSnapshot(`
					.--------------------------------------------------------------------------------.
					|                                   testCheck                                    |
					|--------------------------------------------------------------------------------|
					| isPriorityCustomer | paymentStatus | shippingStatus | productAvailability |    |
					|--------------------|---------------|----------------|---------------------|----|
					| true               | FAILED        | SHIPPED        | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    | PAID          | SHIPPED        | IN_STOCK            | 🟢 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    | PENDING       | SHIPPED        | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					| false              | FAILED        | SHIPPED        | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🔴 |
					|                    |               |                | LOW_STOCK           | 🔴 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    | PAID          | SHIPPED        | IN_STOCK            | 🟢 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    | PENDING       | SHIPPED        | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | PROCESSING     | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					|                    |               | NOT_AVAILABLE  | IN_STOCK            | 🟡 |
					|                    |               |                | LOW_STOCK           | 🟡 |
					|                    |               |                | OUT_OF_STOCK        | 🔴 |
					'--------------------------------------------------------------------------------'
				`);
});
