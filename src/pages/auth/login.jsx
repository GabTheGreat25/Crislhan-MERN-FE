import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { MyCarousel } from "@components";
import { PasswordVisibility, Toast } from "@utils";
import { loginValidation } from "@validators";
import { hooks } from "@api";
import { TOAST } from "@constants";

export function Login() {
  const navigate = useNavigate();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [loginUser, { isLoading }] = hooks.useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      loginUser(values)
        .unwrap()
        .then((res) => {
          if (res.status) {
            Toast(TOAST.SUCCESS, "Login successful!");
            // navigate("/dashboard");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Something went wrong. Please try again.",
            );
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message ||
            "An unexpected error occurred. Please try again.";
          console.log(errorMessage);
          Toast(TOAST.ERROR, errorMessage);
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="grid w-full h-full p-12">
            <h1 className="mb-1 text-[30px] font-semibold">Login</h1>
            <p className="mb-2 text-">Sign in to get started</p>
            <hr className="mb-8" />

            <form onSubmit={formik.handleSubmit} className="">
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium text-">
                  Email address <span className="text-error-default">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={`text-lg w-full p-4 border rounded-md ${
                    formik.errors.email && formik.touched.email
                      ? "border-error-default"
                      : "border-light-secondary"
                  } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-2 text-lg text-error-default">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 font-medium text-"
                >
                  Password <span className="text-error-default">*</span>
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.password && formik.touched.password
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-2 text-lg text-error-default">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-start pb-6">
                <button
                  type="button"
                  onClick={() => navigate("/forgotPassword")}
                  className="text-lg underline text-light-secondary"
                >
                  Forgot Password
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-lg rounded-md bg-dark-secondary text-light-default"
                disabled={isLoading}
              >
                Login
              </button>
            </form>

            <div className="grid items-start justify-center grid-cols-[40%_20%_40%] text-sm text-center">
              <hr />
              <span className="text-light-secondary text-">Or</span>
              <hr />
            </div>

            <button
              onClick={() => navigate("/register")}
              className="w-full text-lg cursor-pointer roun ded-md bg-dark-secondary text-light-default"
            >
              Register
            </button>
          </div>
        </>
      )}
    </section>
  );
}
