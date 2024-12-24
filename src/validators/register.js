import * as yup from "yup";

const noSpecialCharacters = /^[a-zA-Z\s]+$/;

export const registerValidation = yup.object().shape({
  firstname: yup
    .string()
    .matches(
      noSpecialCharacters,
      "First Name should not contain special characters or numbers",
    )
    .required("First Name is required"),
  lastname: yup
    .string()
    .matches(
      noSpecialCharacters,
      "Last Name should not contain special characters or numbers",
    )
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
