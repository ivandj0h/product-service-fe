"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
      <nav className="flex items-center space-x-6">
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/products"
              className={`px-4 py-2 rounded-md ${
                pathname === "/products"
                  ? "bg-gray-200 text-black font-bold"
                  : "text-gray-600 hover:bg-gray-500 hover:text-white"
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/products/pending"
              className={`px-4 py-2 rounded-md ${
                pathname === "/products/pending"
                  ? "bg-gray-200 text-black font-bold"
                  : "text-gray-600 hover:bg-gray-500 hover:text-white"
              }`}
            >
              Pending Products
            </Link>
          </li>
          <li>
            <Link
              href="/products/rejected"
              className={`px-4 py-2 rounded-md ${
                pathname === "/products/rejected"
                  ? "bg-gray-200 text-black font-bold"
                  : "text-gray-600 hover:bg-gray-500 hover:text-white"
              }`}
            >
              Rejected Products
            </Link>
          </li>
        </ul>
        <Button
          variant="destructive"
          onClick={() => router.push("/products/create")}
        >
          Create Product
        </Button>
      </nav>
    </header>
  );
}
