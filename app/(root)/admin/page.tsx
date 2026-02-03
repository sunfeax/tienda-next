import ProductTable from "@/components/admin/product-table";
import { Button } from "@/components/ui/button";
import { getProductsTable } from "@/lib/actions/product.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="p-8 space-x-4">
        <h1 className="mb-4 text-2xl font-bold">You are not authorized</h1>
      </div>
    );
  }

  const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
  const pageSize = Math.max(1, Number(searchParams?.pageSize ?? 2) || 2);
  const { data, pageInfo } = await getProductsTable({ page, pageSize });

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <div>
          {/* Plus icon */}
          <Button asChild>
            <Link href={'/admin/create'}></Link>
            Create product
          </Button>
        </div>
      </div>
      <ProductTable
        products={data}
        currentPage={pageInfo.currentPage}
        totalPages={pageInfo.totalPages}
        pageSize={pageSize}
      />
    </div>
  );
}
