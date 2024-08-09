"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import useScrollLock from "@/hooks/useScrollLock";
import { useCart } from "@/hooks/useCart";

const categories = [
  {
    label: "Men",
    href: "#",
  },
  {
    label: "Women",
    href: "#",
  },
  {
    label: "Kids",
    href: "#",
  },
  {
    label: "Collection",
    href: "#",
  },
];

const navItems = [
  {
    label: "Shop",
    href: "#",
    icon: null,
    value: null,
  },
  {
    label: "About Us",
    href: "#",
    icon: null,
    value: null,
  },
  {
    label: "Account",
    href: "#",
    icon: "/assets/vectors/icons/user.svg",
    value: null,
  },
];

const mobileExtraNavItems = [
  {
    label: "FAQ",
    href: "#",
  },
  {
    label: "Contact Us",
    href: "#",
  },
];

const Navbar = () => {
  return (
    <div
      className={
        "w-full px-5 md:px-[46px] lg:px-[120px] text-base leading-6 tracking-tighter bg-b-white"
      }
    >
      <DesktopNav />
      <MobileNav />
    </div>
  );
};

export default Navbar;

export const DesktopNav = () => {
  const { cart } = useCart();
  return (
    <div
      className={
        "hidden lg:flex w-full justify-between items-center py-5 gap-[50px] border-b border-b-b-light-gray"
      }
    >
      <div className={"flex gap-[18px]"}>
        {categories.map((category, index) => (
          <div key={index}>
            <Link href={category.href}>{category.label}</Link>
          </div>
        ))}
      </div>
      <div className={"w-full flex justify-center items-center"}>
        <Logo dark={true} />
      </div>
      <div className={"flex justify-end items-center gap-[18px]"}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={
              "flex justify-start items-center gap-[3px] text-nowrap w-auto"
            }
          >
            {!!item.icon && (
              <div className={"flex items-center size-[18px]"}>
                <Image
                  src={item.icon}
                  alt={"icon"}
                  width={18}
                  height={18}
                  quality={100}
                  className={"size-full"}
                />
              </div>
            )}
            {item.label}
          </Link>
        ))}
        <Link
          href={"/cart"}
          className={
            "flex justify-start items-center gap-[3px] text-nowrap w-auto"
          }
        >
          Cart ({cart.totalItems})
        </Link>
        <div className={"flex items-center size-[20px] cursor-pointer"}>
          <Image
            src={"/assets/vectors/icons/search.svg"}
            alt={"icon"}
            width={20}
            height={20}
            quality={100}
            className={"size-full"}
          />
        </div>
      </div>
    </div>
  );
};

export const MobileNav = () => {
  return (
    <div
      className={
        "flex lg:hidden justify-between items-center py-5 border-b border-b-b-light-gray"
      }
    >
      <HamburgerMenu />
      <Logo dark={true} />
      <div className={"flex justify-center items-center gap-3"}>
        <div className={"flex justify-center items-center size-5"}>
          <Image
            src={"/assets/vectors/icons/search.svg"}
            alt={"icon"}
            width={20}
            height={20}
            quality={100}
            className={"size-full"}
          />
        </div>
        <Link
          href={"/cart"}
          className={"flex justify-center items-center size-5"}
        >
          <Image
            src={"/assets/vectors/icons/cart-2.svg"}
            alt={"icon"}
            width={20}
            height={20}
            quality={100}
            className={"size-full"}
          />
        </Link>
      </div>
    </div>
  );
};

const HamburgerMenu = () => {
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={
          "flex justify-center items-center w-[42px] h-6 cursor-pointer"
        }
        onClick={toggleMenu}
      >
        <Image
          src={"/assets/vectors/icons/hamburger.svg"}
          alt={"icon"}
          width={20}
          height={20}
          quality={100}
          className={"size-full"}
        />
      </div>
      <div
        className={cn(
          "absolute top-0 left-0 w-full bg-b-white z-[-1] transition-all duration-500 ease-out pt-[125px]",
          isOpen ? "h-[100dvh]" : "h-0",
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col text-center text-lg py-[26px] gap-[42px] transition-all duration-300 ease-out",
            !isOpen && "-translate-y-full",
          )}
        >
          <div className={"flex flex-col gap-[18px]"}>
            {categories.map((category, index) => (
              <div key={index}>
                <Link href={category.href}>{category.label}</Link>
              </div>
            ))}
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={
                  "flex justify-center items-center gap-[3px] text-nowrap w-auto"
                }
              >
                {!!item.icon && (
                  <div className={"flex items-center size-[18px]"}>
                    <Image
                      src={item.icon}
                      alt={"icon"}
                      width={18}
                      height={18}
                      quality={100}
                      className={"size-full"}
                    />
                  </div>
                )}
                {item.label}
              </Link>
            ))}
          </div>
          <div className={"flex flex-col gap-[18px]"}>
            {mobileExtraNavItems.map((category, index) => (
              <div key={index}>
                <Link href={category.href}>{category.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
