'use client';

import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/router";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { actionTest } from "@/lib/actions/product.actions";

export default function ProductForm() {
  const router = useRouter();

  return (
    <form>
      <Card>
        <CardHeader className="border-b border-foreground/20">
          <CardTitle className="flex items-center justify-between">
            Create form
            <Button type="button" onClick={() => router.back()}>Go back</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={actionTest} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                className="col-span-2"
                placeholder="Enter product name..."
                defaultValue={"product"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                className="col-span-2"
                placeholder="Enter category..."
                defaultValue={"category"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Brand</Label>
              <Input
                type="text"
                name="brand"
                className="col-span-2"
                placeholder="Enter brand..."
                defaultValue={"brand..."}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Description</Label>
              <Textarea
                name="description"
                className="col-span-2"
                placeholder="Enter description..."
                defaultValue={"description"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                className="col-span-2"
                placeholder="Enter stock..."
                defaultValue={"12"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                className="col-span-2"
                placeholder="Enter price..."
                defaultValue={"20.00"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label>Publish this product after creating?</Label>
              <Checkbox
                name="publish"
                className="col-span-2"
              />
            </div>

            <Button type="submit" className={cn("w-full text-2xl")}></Button>
          </form>
        </CardContent>
      </Card>
    </form>
  )
}
