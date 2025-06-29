// components/admin/AdminProductForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc, // Keep doc for updateDoc
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useFirebase } from "../context/FirebaseContext";
import FragranceLoader from "components/FragranceLoader";
import Image from "next/image";
import Link from "next/link"; // For the cancel button

// Define the Product interface
export interface Product {
  id?: string; // ID is optional when creating, Firestore generates it
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  description: string;
  category: "men" | "women" | "unisex";
  featured: boolean;
  volume?: number;
  scentNotes?: {
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
  };
  createdAt?: Date; // To store creation timestamp
  updatedAt?: Date; // To store update timestamp
}

interface AdminProductFormProps {
  // Renamed interface
  initialProduct?: Product; // Optional prop for pre-filling the form (for editing)
  isEditMode?: boolean; // Indicate if the form is in edit mode
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  // Renamed component
  initialProduct,
  isEditMode: propIsEditMode = false, // Default to false if not provided
}) => {
  const { db, isAuthReady } = useFirebase();
  const [formData, setFormData] = useState<Product>(
    initialProduct || {
      name: "",
      brand: "",
      price: 0,
      imageUrl: "",
      description: "",
      category: "unisex",
      featured: false,
      scentNotes: {
        topNotes: "",
        heartNotes: "",
        baseNotes: "",
      },
    }
  );
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Use the prop to determine edit mode, and update form data if initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        price: Number(initialProduct.price), // Ensure price is a number for the input
      });
    } else {
      // Reset form if initialProduct becomes null/undefined (e.g., navigating from edit to new)
      setFormData({
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
  }, [initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name.startsWith("scentNotes.")) {
      const scentNoteKey = name.split(".")[1] as keyof Product["scentNotes"];
      setFormData((prev) => ({
        ...prev,
        scentNotes: {
          ...prev.scentNotes,
          [scentNoteKey]: value,
        } as Product["scentNotes"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setLoading(true);

    if (!db) {
      setStatusMessage({
        type: "error",
        message: "Firebase Firestore not initialized.",
      });
      setLoading(false);
      return;
    }

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
      setLoading(false);
      return;
    }

    try {
      if (propIsEditMode && formData.id) {
        // Prepare data for update: exclude `id` from the object to be written
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...dataToUpdate } = formData; // Fix: Renamed 'id' to '_id'
        await updateDoc(doc(db, "products", formData.id), {
          ...dataToUpdate,
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "Product updated successfully!",
        });
      } else {
        // Prepare data for add: exclude `id` from the object to be written
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...dataToAdd } = formData; // Fix: Renamed 'id' to '_id'
        await addDoc(collection(db, "products"), {
          ...dataToAdd,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "New product added successfully!",
        });
        // Reset form for a new product entry
        setFormData({
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
    } catch (error) {
      console.error("Error saving product:", error);
      setStatusMessage({
        type: "error",
        message: `Error saving product: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-ug-text-heading mb-8">
        {propIsEditMode ? "Edit Product" : "Add New Product"}
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

      {loading && (
        <FragranceLoader
          message={`${
            propIsEditMode ? "Loading product..." : "Saving product..."
          } Please wait.`}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Form fields remain the same */}
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
            disabled={loading}
          />
        </div>

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
            disabled={loading}
          />
        </div>

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
            disabled={loading}
          />
        </div>

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
            disabled={loading}
          />
          {formData.imageUrl && (
            <div className="mt-4 flex items-center space-x-4">
              <p className="text-sm text-ug-text-dark">Preview:</p>
              <Image
                src={formData.imageUrl}
                width={100}
                height={100}
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
            disabled={loading}
          ></textarea>
        </div>

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
            disabled={loading}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-5 w-5 text-ug-purple-primary rounded border-ug-neutral-light focus:ring-ug-purple-primary"
            disabled={loading}
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-ug-text-dark text-sm font-semibold"
          >
            Featured Product
          </label>
        </div>

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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-ug-neutral-light text-ug-text-dark rounded-lg font-semibold hover:bg-ug-neutral-bg transition duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-ug-purple-primary text-white rounded-lg font-semibold hover:bg-ug-purple-accent transition duration-300"
            disabled={loading || !isAuthReady}
          >
            {propIsEditMode ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;