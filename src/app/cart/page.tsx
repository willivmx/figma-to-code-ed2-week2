"use client";
import React, { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/button";
import Image from "next/image";
import QuantityCounter from "@/components/quantity-counter";
import OrderSummary from "@/components/order-summary";

const Page = () => {
  const { cart, removeItem, clearCart } = useCart();
  return (
    <div
      className={
        "w-full flex flex-col lg:flex-row items-center lg:items-start gap-[42px]"
      }
    >
      <div className={"flex-1 w-full flex flex-col gap-5"}>
        <div className={"flex justify-between items-center"}>
          <span className={"font-[Chillax-SemiBold] text-2xl"}>
            Cart ({cart.totalItems})
          </span>
          <Button
            className={"bg-b-light-gray text-b-dark-gray font-medium text-xs"}
            onClick={clearCart}
          >
            <Image
              src={"/assets/vectors/icons/trash.svg"}
              alt={"icon"}
              width={20}
              height={20}
              quality={100}
              className={"size-3.5"}
            />
            Clear Cart
          </Button>
        </div>
        <div>
          <div
            className={
              "flex justify-between items-center text-xs text-b-dark-gray font-medium py-3 border-b border-b-light-gray"
            }
          >
            <span className={"w-1/2"}>Product</span>
            <div
              className={
                "w-1/2 flex justify-between items-center gap-2 pr-[23px]"
              }
            >
              <span>Quantity</span>
              <span>Price</span>
            </div>
          </div>
          {cart.items.length > 0 ? (
            cart.items.map((item, index) => (
              <div
                key={item.id}
                className={
                  "border-b border-b-light-gray py-5 flex justify-between items-center"
                }
              >
                <div className={"w-1/2 flex gap-2.5"}>
                  <div className={"size-[70px] rounded-lg overflow-hidden"}>
                    <Image
                      src={item.variants.colors[0]?.image ?? item.product.image}
                      alt={item.product.name}
                      width={70}
                      height={70}
                      quality={100}
                      className={"object-cover size-full"}
                    />
                  </div>
                  <div
                    className={"flex flex-col flex-1 justify-between gap-0.5"}
                  >
                    <span className={"font-semibold text-sm"}>
                      {item.product.name}
                    </span>
                    <span className={"font-medium text-xs text-b-dark-gray"}>
                      {item.variants.colors[0]?.name} -{" "}
                      {item.variants.sizes[0]?.label}
                    </span>
                    <span className={"font-bold text-base"}>
                      ${item.product.price}
                    </span>
                  </div>
                </div>
                <div className={"w-1/2 flex justify-between items-center"}>
                  <div className={"flex justify-between items-center gap-2"}>
                    <QuantityCounter
                      initialValue={item.quantity}
                      cartItem={item.id}
                    />
                    <Button
                      className={"bg-b-light-gray p-3.5"}
                      onClick={() => removeItem(item.id)}
                    >
                      <Image
                        src={"/assets/vectors/icons/trash.svg"}
                        alt={"icon"}
                        width={20}
                        height={20}
                        quality={100}
                        className={"size-5"}
                      />
                    </Button>
                  </div>
                  <span className={"font-semibold text-base"}>
                    ${item.quantity * item.product.price}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span
              className={
                "w-full py-10 flex justify-center items-center text-center text-sm font-semibold"
              }
            >
              Your cart is empty
            </span>
          )}
        </div>
      </div>
      <div className={"w-[285px]"}>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;
