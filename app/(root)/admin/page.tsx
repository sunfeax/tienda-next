import ProductTable from "@/components/admin/product-table";
import SignOutButton from "@/components/auth/signout-button";
import { getProductsTable } from "@/lib/actions/product.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminPage({ searchParams } : { searchParams: Promise<{callbackUrl?: string}> }) {
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

  const { page = 1, pageSize = 2 } = await searchParams;
  const products = await getProductsTable({page: Number(page), pageSize: Number(pageSize)});

  return (
    <div className="flex flex-col gap-5 p-8">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <ProductTable products={data} page={page.currentPage} totalPages={pageInfo.totalPages}/>
      <SignOutButton />
    </div>
  );
}
