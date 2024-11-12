"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", params.id);
        const response = await api.get(`/products/${params.id}`);
        const { name, price, description } = response.data.data;
        setName(name);
        setPrice(price);
        setDescription(description);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  const updateProduct = async () => {
    try {
      await api.put(`/products/${params.id}`, { name, price, description });
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
      <Input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="mb-4"
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      <Button onClick={updateProduct}>Update</Button>
    </div>
  );
}
