'use server';

import { prisma } from "@/db/prisma";
import { Product } from "@/types/product";
import { convertToPlainObject } from "../utils";

function normalizeProduct(product: any): Product {
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
    createdAt: product.createdAt ? product.createdAt.toISOString() : undefined,
  };
}

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return data.map(normalizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findFirst({
    where: { slug },
  });

  return data ? normalizeProduct(data) : null;
}

export async function getProductsTable({
  page = 1,
  pageSize = 2,
}: {
  page?: number;
  pageSize?: number;
}) {
  const skip = (page - 1) * pageSize;
  const [data, totalCount] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: convertToPlainObject(data) as unknown as Product[],
    pageInfo: {
      totalCount,
      totalPages,
      currentPage: page
    },
  };
}

export async function actionTest(formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    slug: formData.get("slug"),
  };
}
