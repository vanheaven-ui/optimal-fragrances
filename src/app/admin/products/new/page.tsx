// src/app/admin/products/new/page.tsx
"use client";

import AdminLayout from "components/AdminLayout";
import AdminProductForm from "../../../../components/AdminProductForm";
export default function NewProductPage() {
  return (
    <AdminLayout>
      {/* Render AdminProductForm without initial data, so it's in "add new" mode */}
      <AdminProductForm />
    </AdminLayout>
  );
}
