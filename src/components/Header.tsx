"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a
              href="/products"
              className={`px-4 py-2 rounded-md ${
                currentPath === "/products"
                  ? "bg-gray-200 text-black font-bold"
                  : "text-gray-600 hover:bg-gray-500 hover:text-white"
              }`}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="/products/create"
              className={`px-4 py-2 rounded-md ${
                currentPath === "/products/create"
                  ? "bg-gray-200 text-black font-bold"
                  : "text-gray-600 hover:bg-gray-500 hover:text-white"
              }`}
            >
              Create Product
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
