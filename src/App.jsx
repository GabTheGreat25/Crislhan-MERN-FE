import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  ResetLink,
  ResetPassword,
  Dashboard,
  Product,
  ViewProductById,
  CreateProduct,
  EditProduct,
  Inventory,
  Transaction,
} from "@/pages";
import {
  AdminLayout,
  CustomerLayout,
  HomeLayout,
  NotFound,
  RootLayout,
} from "@/layouts";
import { PrivateRoute, PublicRoute } from "@/components";

export default function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route element={<HomeLayout />}>
                  <Route index element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="forgotPassword" element={<ForgotPassword />} />
                  <Route path="resetLink" element={<ResetLink />} />
                  <Route path="resetPassword" element={<ResetPassword />} />
                </Route>
              </Route>
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                {/* Admin Routes */}
                <Route path="dashboard" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="product" element={<Product />} />
                  <Route path="product/:id" element={<ViewProductById />} />
                  <Route path="product/create" element={<CreateProduct />} />
                  <Route path="product/edit/:id" element={<EditProduct />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="transaction" element={<Transaction />} />
                </Route>
                {/* Customer Routes */}
                <Route path="home" element={<CustomerLayout />}></Route>
              </Route>
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>,
          ),
        )}
      />
    </>
  );
}
