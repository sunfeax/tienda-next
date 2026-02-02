import { Product } from '@/types/product';
import { Pencil, Table, Trash } from 'lucide-react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function ProductTable({
  products,
  totalPages = 1,
  currentPage = 1,
  pageSize = 2,
}: {
  products: Product[];
  page?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize: number;
}) {
  return (
    <Table>
      <TableCaption>
        List of products
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{p.slug}</TableCell>
            <TableCell>{p.stock}</TableCell>
            <TableCell>
              <Button variant={'outline'} asChild>
                <Link href={`/admin/products/${p.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <Button variant={'outline'} className='text-destructive' asChild>
                <Link href={`/admin/products/${p.id}`}>
                  <Trash />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))};
      </TableBody>
    </Table>
  )
}
