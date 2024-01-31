export enum PaymentStatus {
	Paid = "PAID",
	Pending = "PENDING",
	Failed = "FAILED",
}

export enum ShippingStatus {
	Shipped = "SHIPPED",
	Processing = "PROCESSING",
	NotAvailable = "NOT_AVAILABLE",
}

export enum ProductAvailability {
	InStock = "IN_STOCK",
	LowStock = "LOW_STOCK",
	OutOfStock = "OUT_OF_STOCK",
}

type OrderStatus = "Approved" | "Pending" | "Rejected";
export interface Props {
	paymentStatus: PaymentStatus;
	shippingStatus: ShippingStatus;
	productAvailability: ProductAvailability;
	isPriorityCustomer: boolean;
}

export function checkOrderStatus({
	paymentStatus,
	shippingStatus,
	productAvailability,
	isPriorityCustomer,
}: Props): OrderStatus {
	if (
		productAvailability === ProductAvailability.OutOfStock ||
		paymentStatus === PaymentStatus.Failed
	) {
		return "Rejected";
	}

	if (
		productAvailability === ProductAvailability.LowStock &&
		(paymentStatus === PaymentStatus.Pending || !isPriorityCustomer)
	) {
		return "Pending";
	}

	if (
		paymentStatus === PaymentStatus.Paid &&
		productAvailability === ProductAvailability.InStock &&
		shippingStatus === ShippingStatus.Shipped
	) {
		return "Approved";
	}

	return "Pending";
}
