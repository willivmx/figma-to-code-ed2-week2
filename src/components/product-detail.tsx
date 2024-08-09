"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/button";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }: { product: Product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(null);
  const { addItem, cart } = useCart();
  const router = useRouter();
  const handleColorChange = (color: ColorVariant) => {
    setSelectedColor(color);
  };

  const handleToggleSize = (size: SizeVariant) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    setSelectedColor(product.variants.colors[0]);
    setSelectedSize(product.variants.sizes[0]);
  }, []);

  const selectedVariants = {
    sizes: selectedSize ? [selectedSize] : [],
    colors: selectedColor ? [selectedColor] : [],
  };

  const areVariantsEqual = (variants1: Variants, variants2: Variants) => {
    return (
      JSON.stringify(variants1.sizes) === JSON.stringify(variants2.sizes) &&
      JSON.stringify(variants1.colors) === JSON.stringify(variants2.colors)
    );
  };

  const handleCheckCanBeAddedToCart = (product: Product) => {
    return cart.items.some(
      (item) =>
        item.product.id === product.id &&
        areVariantsEqual(item.variants, selectedVariants),
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, selectedVariants);
  };
  return (
    <div
      className={
        "flex flex-col lg:flex-row justify-between items-start gap-[42px]"
      }
    >
      <div
        className={
          "relative md:h-[600px] lg:w-1/2 rounded-[32px] overflow-hidden"
        }
      >
        <Image
          src={selectedColor?.image || product.image}
          alt={product.name}
          width={600}
          height={600}
          className={"size-full object-cover"}
        />
        <span className={"absolute top-0 left-0 size-full bg-b-black/10"} />
      </div>
      <div className={"lg:w-1/2 flex flex-col gap-7"}>
        <div className={"w-full flex flex-col gap-[22px]"}>
          <div className={"w-full flex flex-col gap-[18px]"}>
            <span className={"font-[Chillax-SemiBold] text-[42px]"}>
              {product.name}
            </span>
            <span className={"font-semibold text-4xl"}>
              CAD ${product.price}
            </span>
            {product.variants.colors.length > 0 &&
              !!product.variants.colors[0] && (
                <div className={"flex flex-col gap-3.5"}>
                  <span className={"font-medium text-3xl"}>
                    Color: {selectedColor?.name}
                  </span>
                  <div className={"flex gap-[11px] items-center"}>
                    {product.variants.colors.map((color) => (
                      <span
                        key={color.hex}
                        className={cn(
                          "flex size-7 rounded-full cursor-pointer",
                          selectedColor?.hex === color.hex &&
                            "border-2 border-b-light-gray",
                        )}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                </div>
              )}
            {product.variants.sizes.length > 0 && (
              <div className={"flex flex-col gap-3.5"}>
                <span className={"font-medium text-3xl"}>Size:</span>
                <div className={"flex gap-[11px] items-center"}>
                  {product.variants.sizes.map((size) => (
                    <Button
                      key={size.label}
                      className={cn(
                        "border border-b-black",
                        selectedSize?.size === size.size &&
                          "bg-b-black text-b-white",
                      )}
                      onClick={() => handleToggleSize(size)}
                    >
                      {size.size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className={
              "w-full flex items-center justify-between gap-3.5 text-sm font-semibold"
            }
          >
            <Button
              className={"w-1/2 bg-b-black text-b-white"}
              onClick={() => {
                if (handleCheckCanBeAddedToCart(product)) {
                  router.push("/checkout");
                } else {
                  handleAddToCart(product);
                  router.push("/checkout");
                }
              }}
            >
              BUY NOW
            </Button>
            <Button
              className={"w-1/2 border border-b-black"}
              onClick={() => {
                if (handleCheckCanBeAddedToCart(product)) {
                  router.push("/cart");
                } else {
                  handleAddToCart(product);
                }
              }}
            >
              {handleCheckCanBeAddedToCart(product)
                ? "VIEW CART"
                : "ADD TO CART"}
            </Button>
          </div>
        </div>
        <div className={"w-full flex flex-col gap-3.5"}>
          <span className={"font-[Chillax-Medium] text-3xl"}>Description</span>
          <span className={"text-lg text-b-dark-gray"}>
            {product.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
