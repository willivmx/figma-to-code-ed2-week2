import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div
      className={
        "w-full flex flex-col justify-center items-center h-[30dvh] gap-2.5"
      }
    >
      <div
        className={
          "flex flex-col justify-center items-center border-4 border-b-black p-2 rounded-full size-[49px]"
        }
      >
        <Image
          src={"/assets/vectors/icons/checkmark.svg"}
          width={100}
          height={100}
          alt="checkmark"
          className={"size-full"}
        />
      </div>
      <div
        className={
          "w-full flex flex-col gap-2 justify-center items-center text-center"
        }
      >
        <span className={"text-lg font-semibold"}>Thanks for your order !</span>
        <span className={"text-xs font-medium"}>
          The order confirmation has been sent to johndoe@gmail.com
        </span>
      </div>
    </div>
  );
};

export default Page;
