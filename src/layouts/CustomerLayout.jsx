import React from "react";
import { Outlet } from "react-router-dom";
import { CustomerNavbar, CustomerFooter } from "@components";

export function CustomerLayout() {
  return (
    <>
      <section>
        <span className="z-[1000] sticky top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
          <CustomerNavbar />
        </span>
        <div>
          <Outlet />
        </div>
        <CustomerFooter />
      </section>
    </>
  );
}
