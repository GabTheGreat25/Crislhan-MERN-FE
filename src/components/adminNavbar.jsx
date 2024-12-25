import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@hooks";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function AdminNavbar({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
    Toast(TOAST.SUCCESS, "Logged out successfully");
  };

  const handleProduct = () => {
    navigate("/dashboard/product");
  };

  return (
    <div className="relative w-full rounded-lg shadow-lg h-28 bg-gradient-to-r from-primary-default via-secondary-default to-info-secondary">
      <div className="absolute inset-0 bg-opacity-50 rounded-lg bg-dark-shadow/25"></div>

      <div className="relative flex items-center justify-between h-full px-8">
        <h1 className="text-4xl font-bold text-light-variant drop-shadow-lg">
          {title}
        </h1>

        <nav className="flex items-center space-x-6">
          <a
            href="#"
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Dashboard
          </a>
          <button
            onClick={handleProduct}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Product
          </button>
          <button
            onClick={handleLogout}
            className="text-lg font-medium transition duration-300 text-light-default hover:text-primary-variant"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
