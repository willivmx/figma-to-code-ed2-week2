"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div className={cn("w-full flex flex-col gap-4 cursor-pointer", className)}>
      <div
        className={
          "relative size-auto rounded-[32px] h-[450px] overflow-hidden group"
        }
      >
        <Image
          src={product.image}
          alt={"product-card"}
          width={1728}
          height={2160}
          quality={100}
          className={
            "size-full object-cover hover:brightness-75 transition-all"
          }
        />
        {product.discount > 0 && (
          <Button className={"absolute top-0 left-0 m-5 px-2.5 py-2"}>
            GET OFF {product.discount}%
          </Button>
        )}
        <div
          className={
            "absolute left-0 w-full grid grid-cols-2 gap-1 opacity-0 bottom-0 group-hover:opacity-100 transition-all p-5 text-xs lg:text-base"
          }
        >
          <Button
            className={"px-5 py-3 gap-1.5 w-full"}
            onClick={() => router.push(`/details/${product.id.split('/')[4]}`)}
          >
            <Image
              src={"/assets/vectors/icons/cart.svg"}
              alt={"cart"}
              width={20}
              height={20}
              quality={100}
              className={"size-5"}
            />
            <span className={"font-semibold text-nowrap"}>ADD TO CART</span>
          </Button>
          <Button
            className={
              "px-5 py-3 bg-transparent border border-b-white text-b-white w-full"
            }
            onClick={() => router.push(`/details/${product.id.split('/')[4]}`)}
          >
            BUY NOW
          </Button>
        </div>
      </div>
      <div className={"flex flex-col gap-0.5"}>
        <Link
          href={`/details/${product.id.split('/')[4]}`}
          className={"font-semibold text-2xl lg:text-3xl"}
        >
          {product.name}
        </Link>
        <span className={"font-semibold text-[28px] text-b-dark-gray"}>
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
