import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar, AdminFooter } from "@components";

export function AdminLayout() {
  return (
    <>
      <section>
        <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
          <AdminNavbar />
        </span>
        <div>
          <Outlet />
        </div>
        <AdminFooter />
      </section>
    </>
  );
}
