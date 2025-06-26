// src/app/perfumes/[id]/page.tsx
import { notFound } from "next/navigation";
import PerfumeDetailClient from "./PerfumeDetailClient";
import { products } from "@/product";

async function getPerfume(id: string) {
  
  return products.find((p) => p.id === id) || null;
}

interface PerfumeDetailPageProps {
  params: { id: string };
}

export default async function PerfumeDetailPage({
  params,
}: PerfumeDetailPageProps) {
  const perfume = await getPerfume(params.id);

  if (!perfume) notFound();

  return <PerfumeDetailClient perfume={perfume} />;
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}
