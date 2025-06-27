// src/app/admin/products/new/page.tsx
"use client";

import { Product, products } from "@/product";
import AdminLayout from "components/AdminLayout";
import React, { useState, useEffect } from "react";

// Simple function to generate a unique ID for new products
const generateUniqueProductId = (): string => {
  const existingIds = products.map((p) => parseInt(p.id) || 0);
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return (maxId + 1).toString();
};

interface AdminProductFormProps {
  // This prop would typically be passed by a dynamic route
  // For '/admin/products/new', it won't be present
  // For '/admin/products/[id]/edit', the parent component would fetch and pass it
  initialProduct?: Product;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialProduct,
}) => {
  const [formData, setFormData] = useState<Product>(
    initialProduct || {
      id: generateUniqueProductId(), // Default new ID
      name: "",
      brand: "",
      price: 0,
      imageUrl: "",
      description: "",
      category: "unisex", // Default category
      featured: false,
      scentNotes: {
        topNotes: "",
        heartNotes: "",
        baseNotes: "",
      },
    }
  );
  const [isEditMode, setIsEditMode] = useState(!!initialProduct);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // This useEffect will run when the component mounts.
  // It checks if we're in 'edit' mode by looking at the URL.
  // If it's an edit page (e.g., /admin/products/some-id/edit), it loads the product data.
  // This is a workaround for not using Next.js dynamic routing and `useParams`.
  useEffect(() => {
    // Check if the current URL matches an edit pattern
    const pathParts = window.location.pathname.split("/");
    const isEditPath = pathParts.includes("edit") && pathParts.length > 3; // e.g., /admin/products/ID/edit
    const productIdFromUrl = isEditPath
      ? pathParts[pathParts.length - 2]
      : null;

    if (productIdFromUrl) {
      const foundProduct = products.find((p) => p.id === productIdFromUrl);
      if (foundProduct) {
        setFormData(foundProduct);
        setIsEditMode(true);
      } else {
        setStatusMessage({
          type: "error",
          message: "Product not found for editing.",
        });
        // Optionally redirect back to the product list if product not found
        // window.location.href = '/admin/products';
      }
    } else {
      // Ensure we are in "add new" mode and have a fresh ID
      setFormData((prev) => ({
        ...prev,
        id: generateUniqueProductId(),
        name: "",
        brand: "",
        price: 0,
        imageUrl: "",
        description: "",
        category: "unisex",
        featured: false,
        whatsappChannelLink: "",
        scentNotes: { topNotes: "", heartNotes: "", baseNotes: "" },
      }));
      setIsEditMode(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // Handle nested scentNotes properties
    if (name.startsWith("scentNotes.")) {
      const scentNoteKey = name.split(".")[1] as keyof Product["scentNotes"];
      setFormData((prev) => ({
        ...prev,
        scentNotes: {
          ...prev.scentNotes,
          [scentNoteKey]: value,
        } as Product["scentNotes"], // Cast to ensure type correctness
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null); // Clear previous messages

    // Basic validation
    if (
      !formData.name ||
      !formData.brand ||
      formData.price <= 0 ||
      !formData.imageUrl ||
      !formData.description
    ) {
      setStatusMessage({
        type: "error",
        message:
          "Please fill in all required fields (Name, Brand, Price, Image URL, Description).",
      });
      return;
    }

    if (isEditMode) {
      // Find and update the existing product in the global array
      const index = products.findIndex((p) => p.id === formData.id);
      if (index !== -1) {
        products[index] = formData; // Directly modifying the imported array
        setStatusMessage({
          type: "success",
          message: "Product updated successfully!",
        });
      } else {
        setStatusMessage({
          type: "error",
          message: "Error: Product not found for update.",
        });
      }
    } else {
      // Add new product to the global array
      const newProduct = { ...formData, id: generateUniqueProductId() }; // Ensure new ID
      products.push(newProduct); // Directly modifying the imported array
      setStatusMessage({
        type: "success",
        message: "New product added successfully!",
      });
      // Reset form for next entry, but keep new ID logic
      setFormData({
        id: generateUniqueProductId(),
        name: "",
        brand: "",
        price: 0,
        imageUrl: "",
        description: "",
        category: "unisex",
        featured: false,
        scentNotes: { topNotes: "", heartNotes: "", baseNotes: "" },
      });
    }

    setTimeout(() => {
      setStatusMessage(null);
      // Optional: Redirect back to product list after a short delay
      // window.location.href = '/admin/products';
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="">
        <h1 className="text-4xl font-bold text-ug-text-heading mb-8">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>

        {statusMessage && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {statusMessage.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Price (UGX) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              required
              min="0"
              step="1000"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              placeholder="https://example.com/perfume.png or /local-image.jpg"
              required
            />
            {formData.imageUrl && (
              <div className="mt-4 flex items-center space-x-4">
                <p className="text-sm text-ug-text-dark">Preview:</p>
                <img
                  src={formData.imageUrl}
                  alt="Product Preview"
                  className="w-20 h-20 object-cover rounded-md border border-ug-neutral-light"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/80x80/CCCCCC/000000?text=Error";
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
              placeholder="Detailed description of the product..."
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-ug-text-dark text-sm font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary bg-white"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-5 w-5 text-ug-purple-primary rounded border-ug-neutral-light focus:ring-ug-purple-primary"
            />
            <label
              htmlFor="featured"
              className="ml-2 block text-ug-text-dark text-sm font-semibold"
            >
              Featured Product
            </label>
          </div>

          {/* Scent Notes */}
          <fieldset className="border border-ug-neutral-light p-4 rounded-lg">
            <legend className="text-ug-text-dark text-lg font-semibold mb-4">
              Scent Notes
            </legend>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="scentNotes.topNotes"
                  className="block text-ug-text-dark text-sm font-semibold mb-2"
                >
                  Top Notes
                </label>
                <input
                  type="text"
                  id="scentNotes.topNotes"
                  name="scentNotes.topNotes"
                  value={formData.scentNotes?.topNotes || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
                  placeholder="e.g., Citrus, Bergamot, Pink Peppercorn"
                />
              </div>
              <div>
                <label
                  htmlFor="scentNotes.heartNotes"
                  className="block text-ug-text-dark text-sm font-semibold mb-2"
                >
                  Heart Notes
                </label>
                <input
                  type="text"
                  id="scentNotes.heartNotes"
                  name="scentNotes.heartNotes"
                  value={formData.scentNotes?.heartNotes || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
                  placeholder="e.g., Jasmine, Rose, Sandalwood"
                />
              </div>
              <div>
                <label
                  htmlFor="scentNotes.baseNotes"
                  className="block text-ug-text-dark text-sm font-semibold mb-2"
                >
                  Base Notes
                </label>
                <input
                  type="text"
                  id="scentNotes.baseNotes"
                  name="scentNotes.baseNotes"
                  value={formData.scentNotes?.baseNotes || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
                  placeholder="e.g., Musk, Amber, Vanilla, Oud"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end space-x-4">
            <a
              href="/admin/products"
              className="px-6 py-3 bg-ug-neutral-light text-ug-text-dark rounded-lg font-semibold hover:bg-ug-neutral-bg transition duration-300"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-6 py-3 bg-ug-purple-primary text-white rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProductForm;
