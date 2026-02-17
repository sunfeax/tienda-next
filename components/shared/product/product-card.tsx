import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./product-price";
import { Star } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image className="rounded-t-lg" src={product.images[0]} alt={product.slug} height={300} width={300} />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <div className="text-sm font-medium">
            {product.name}
          </div>
        </Link>
        <div className="flex-between gap-4">
          <p className="flex items-center gap-1">
            <span>{product.rating}</span>
            <Star className="h-4 w-4 fill-amber-500 stroke-0" />
          </p>
          {product.stock > 0 ? (
            <ProductPrice value={+product.price} className={""} />
          ) : (
            <p className="text-destructive">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
