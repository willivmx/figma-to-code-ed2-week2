import React, { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

const QuantityCounter = ({
  initialValue = 1,
  cartItem,
}: {
  cartItem: string;
  initialValue?: number;
}) => {
  const [value, setValue] = React.useState(initialValue);
  const { updateQuantity } = useCart();
  const increase = () => {
    setValue((prev) => prev + 1);
  };

  const decrease = () => {
    if (value > 1) {
      setValue((prev) => prev - 1);
    }
  };

  useEffect(() => {
    updateQuantity(cartItem, value);
  }, [value]);

  return (
    <div
      className={
        "flex justify-center items-center gap-5 p-3.5 bg-b-light-gray rounded-full"
      }
    >
      <Image
        src={"/assets/vectors/icons/remove.svg"}
        alt={"icon"}
        width={20}
        height={20}
        quality={100}
        className={"size-5 cursor-pointer"}
        onClick={decrease}
      />
      <span
        className={
          "flex justify-center items-center size-5 text-sm font-medium"
        }
      >
        {value}
      </span>
      <Image
        src={"/assets/vectors/icons/plus.svg"}
        alt={"icon"}
        width={20}
        height={20}
        quality={100}
        className={"size-5 cursor-pointer"}
        onClick={increase}
      />
    </div>
  );
};

export default QuantityCounter;
