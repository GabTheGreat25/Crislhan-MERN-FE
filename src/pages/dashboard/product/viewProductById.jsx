import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { hooks } from "@api";

export function ViewProductById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = hooks.useGetSingleProductQuery(id);

  if (isLoading) {
    return (
      <section className="loader">
        <FadeLoader color="#FAF7F7" loading={true} size={50} />
      </section>
    );
  }

  return (
    <section className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 mb-6 rounded-md text-light-default bg-primary-default"
      >
        Go Back
      </button>
      <div className="flex flex-col items-center p-6 space-y-6 rounded-lg shadow-lg lg:items-start bg-light-variant lg:flex-row lg:space-y-0 lg:space-x-6">
        <div className="flex-1">
          <h1 className="mb-4 text-3xl font-bold text-primary-default">
            {product.data.name}
          </h1>
          <p className="mb-4 text-lg text-dark-default">
            <strong>Description:</strong> {product.data.description}
          </p>
          <p className="mb-4 text-lg text-dark-default">
            <strong>Price:</strong> ${product.data.price}
          </p>
        </div>
        <div className="flex items-center justify-center flex-1">
          <img
            src={product.data.image[0]?.url}
            alt={`Image of ${product.data.name}`}
            className="object-cover w-full h-auto max-w-sm border rounded-lg shadow-md border-primary-default"
          />
        </div>
      </div>
    </section>
  );
}
