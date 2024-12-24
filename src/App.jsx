import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Login } from "@/pages";
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
                </Route>
              </Route>
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                {/* Admin Routes */}
                <Route path="dashboard" element={<AdminLayout />}></Route>
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
