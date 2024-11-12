"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const createProduct = async () => {
    try {
      await api.post("/products", {
        name,
        price,
        description,
      });
      toast({
        title: "Success",
        description: "Product created successfully and moved to pending list.",
      });
      router.push("/products/pending");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Create Product</h1>
      <div className="mb-5">
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
        <Button onClick={createProduct}>Submit</Button>
      </div>
    </div>
  );
}
