"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
}

export default function PendingProductsPage() {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);

  const fetchPendingProducts = async () => {
    try {
      const response = await api.get("/products/pending");
      setPendingProducts(response.data.data as Product[]);
    } catch (error) {
      console.error("Error fetching pending products:", error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await api.put(`/products/${id}/approve`);
      setPendingProducts(
        pendingProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await api.put(`/products/${id}/reject`);
      setPendingProducts(
        pendingProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Pending Products</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Rp. {product.price.toLocaleString("id-ID")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Button
                  variant="secondary"
                  className="mr-2"
                  onClick={() => handleApprove(product.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(product.id)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
