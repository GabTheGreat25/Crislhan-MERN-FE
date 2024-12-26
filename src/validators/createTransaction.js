import * as Yup from "yup";

export const createTransactionValidation = Yup.object().shape({
  user: Yup.string().required("User ID is required"),
  product: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("Product ID is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
      }),
    )
    .required("Product details are required")
    .min(1, "At least one product must be included"),
  totalPrice: Yup.number()
    .required("Total price is required")
    .min(0, "Total price cannot be negative"),
  payment: Yup.string()
    .required("Payment method is required")
    .oneOf(["Maya", "Cash"], "Invalid payment method"),
  status: Yup.string()
    .oneOf(["Pending", "Completed", "Failed"], "Invalid status")
    .default("Pending"),
});
