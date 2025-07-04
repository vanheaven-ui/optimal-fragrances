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
  price?: number; // Price is now optional as per your data.ts file
  imageUrl: string; // Keep as string, but required status changes
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
  rating?: number; // ADDED: Trusted rating for the product (e.g., 1.0 to 5.0)
  ratingSource?: string; // ADDED: Source of the rating for credibility
}

interface AdminProductFormProps {
  initialProduct?: Product; // Optional prop for pre-filling the form (for editing)
  isEditMode?: boolean; // Indicate if the form is in edit mode
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialProduct,
  isEditMode: propIsEditMode = false, // Default to false if not provided
}) => {
  const { db, isAuthReady } = useFirebase();
  const [formData, setFormData] = useState<Product>(
    initialProduct || {
      name: "",
      brand: "",
      imageUrl: "",
      description: "",
      category: "unisex",
      featured: false,
      scentNotes: {
        topNotes: "",
        heartNotes: "",
        baseNotes: "",
      },
      rating: undefined,
      ratingSource: undefined,
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
        price: initialProduct.price ? Number(initialProduct.price) : undefined,
        rating: initialProduct.rating
          ? Number(initialProduct.rating)
          : undefined,
      });
    } else {
      setFormData({
        name: "",
        brand: "",
        imageUrl: "",
        description: "",
        category: "unisex",
        featured: false,
        scentNotes: { topNotes: "", heartNotes: "", baseNotes: "" },
        rating: undefined,
        ratingSource: undefined,
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
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? undefined : Number(value), // Handle empty string for optional numbers
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

    // Basic validation for required fields
    // imageUrl is now only required for NEW products, not for edits
    if (!formData.name || !formData.brand || !formData.description) {
      setStatusMessage({
        type: "error",
        message:
          "Please fill in all required fields (Name, Brand, Description).",
      });
      setLoading(false);
      return;
    }

    // Explicitly check imageUrl for new products
    if (!propIsEditMode && !formData.imageUrl) {
      setStatusMessage({
        type: "error",
        message: "Image URL is required for new products.",
      });
      setLoading(false);
      return;
    }

    try {
      if (propIsEditMode && formData.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...dataToUpdate } = formData;
        await updateDoc(doc(db, "products", formData.id), {
          ...dataToUpdate,
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "Product updated successfully!",
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...dataToAdd } = formData;
        await addDoc(collection(db, "products"), {
          ...dataToAdd,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setStatusMessage({
          type: "success",
          message: "New product added successfully!",
        });
        setFormData({
          name: "",
          brand: "",
          imageUrl: "",
          description: "",
          category: "unisex",
          featured: false,
          scentNotes: { topNotes: "", heartNotes: "", baseNotes: "" },
          rating: undefined,
          ratingSource: undefined,
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

        {/* PRICE FIELD */}
        <div>
          <label
            htmlFor="price"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Price (UGX)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price !== undefined ? formData.price : ""}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            min="0"
            step="1000"
            disabled={loading}
          />
        </div>

        {/* RATING FIELD */}
        <div>
          <label
            htmlFor="rating"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Rating (1.0 to 5.0)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating !== undefined ? formData.rating : ""}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            min="1.0"
            max="5.0"
            step="0.1"
            disabled={loading}
          />
        </div>

        {/* RATING SOURCE FIELD */}
        <div>
          <label
            htmlFor="ratingSource"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Rating Source
          </label>
          <input
            type="text"
            id="ratingSource"
            name="ratingSource"
            value={formData.ratingSource || ""}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="e.g., Fragrantica (4.5/5), Sephora (4.7/5)"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-ug-text-dark text-sm font-semibold mb-2"
          >
            Image URL{" "}
            {propIsEditMode ? "" : <span className="text-red-500">*</span>}
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-ug-neutral-light rounded-lg focus:ring-ug-purple-primary focus:border-ug-purple-primary"
            placeholder="https://example.com/perfume.png or /local-image.jpg"
            required={!propIsEditMode} // Required only if not in edit mode
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
