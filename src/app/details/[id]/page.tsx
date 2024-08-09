"use client";
import React, { useEffect, useState } from "react";
import ProductDetail from "@/components/product-detail";
import { getProduct, getProducts } from "@/models/products";
import ProductCard from "@/components/product-card";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Products>([]);

  const handleGetProducts = async () => {
    const dbProducts = await getProducts();
    setProducts(dbProducts);
  };
  const handleGetProduct = async () => {
    const _product = await getProduct(id);
    setProduct(_product);
  };

  useEffect(() => {
    handleGetProduct();
    handleGetProducts();
  }, []);

  return (
    <div className={"flex flex-col gap-[72px]"}>
      {product && <ProductDetail product={product} />}
      <div className={"flex flex-col gap-8"}>
        <span className={"font-[Chillax-SemiBold] text-3xl"}>
          You may also like
        </span>
        <div
          className={
            "flex flex-col md:flex-row md:overflow-x-auto gap-3.5 no-scrollbar"
          }
        >
          {products
            .filter((p) => p.id !== product?.id)
            .map(
              (product) =>
                product && (
                  <div
                    key={product.id}
                    className={"w-full md:w-1/2 lg:w-1/4 flex-shrink-0"}
                  >
                    <ProductCard product={product} />
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;
