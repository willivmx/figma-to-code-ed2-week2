"use client";
import React from "react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const { cart } = useCart();
  const router = useRouter();
  return (
    <div
      className={
        "w-full flex flex-col gap-4 py-4 px-6 rounded-xl bg-b-light-gray"
      }
    >
      <span className={"font-semibold text-lg"}>Order summary</span>
      <div className={"flex flex-col gap-3"}>
        <div
          className={"flex flex-col gap-1 font-medium text-sm text-b-dark-gray"}
        >
          <div className={"flex justify-between items-center"}>
            <span>Subtotal</span>
            <span>
              $
              {cart.items.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              )}
            </span>
          </div>
          <div className={"flex justify-between items-center"}>
            <span>Discount</span>
            <span>
              $
              {cart.items.reduce((acc, item) => acc + item.product.discount, 0)}
            </span>
          </div>
        </div>
        <span className={"flex w-full border-b border-b-dark-gray"} />
        <div className={"flex flex-col gap-2 font-semibold text-sm"}>
          <div className={"flex justify-between items-center"}>
            <span>Order total</span>
            <span>${cart.totalPrice}</span>
          </div>
          <div className={"w-full"}>
            <Button
              className={"bg-b-black text-b-white w-full"}
              onClick={() => router.push("/checkout")}
              disabled={cart.items.length <= 0}
            >
              Checkout now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
