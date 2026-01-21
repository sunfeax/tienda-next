import NotFound from "@/app/not-found";
import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductDetailPage from "./productDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  
  const product = await getProductBySlug(slug);

  if (!product) return NotFound();

  return <ProductDetailPage product={product} />;
}
