"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
}

export default function RejectedProductsPage() {
  const [rejectedProducts, setRejectedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const fetchRejectedProducts = async () => {
    try {
      const response = await api.get("/products");
      const rejectedProducts = response.data.data.filter(
        (product: Product) => product.status === "REJECTED"
      );
      setRejectedProducts(rejectedProducts);
    } catch (error) {
      console.error("Error fetching rejected products:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${selectedProductId}`);
      setRejectedProducts(
        rejectedProducts.filter(
          (product) => product.id !== selectedProductId
        )
      );
      setSelectedProductId(null);
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRejectedProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Rejected Products</h1>
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
          {rejectedProducts.map((product, index) => (
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
