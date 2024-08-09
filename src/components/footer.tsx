import React from "react";
import Logo from "@/components/logo";
import Input from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";

const FooterLinks = [
  {
    group_label: "Product",
    group_links: [
      {
        label: "Jacket",
        href: "#",
      },
      {
        label: "T-Shirt",
        href: "#",
      },
      {
        label: "Jacket",
        href: "#",
      },
      {
        label: "Shoes",
        href: "#",
      },
      {
        label: "Sunglasses",
        href: "#",
      },
    ],
  },
  {
    group_label: "Categories",
    group_links: [
      {
        label: "Man",
        href: "#",
      },
      {
        label: "Woman",
        href: "#",
      },
      {
        label: "Kids",
        href: "#",
      },
      {
        label: "Gift",
        href: "#",
      },
      {
        label: "New arrival",
        href: "#",
      },
    ],
  },
  {
    group_label: "Our Social Media",
    group_links: [
      {
        label: "Instagram",
        href: "#",
      },
      {
        label: "Facebook",
        href: "#",
      },
      {
        label: "Youtube",
        href: "#",
      },
      {
        label: "X",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div
      className={
        "w-full px-5 md:px-[46px] lg:px-[120px] py-[52px] bg-b-black flex flex-col gap-8"
      }
    >
      <div
        className={
          "flex flex-col lg:flex-row justify-between items-start gap-8"
        }
      >
        <div className={"md:w-[452px] flex flex-col gap-5"}>
          <Logo />
          <span className={"font-medium text-sm text-b-gray"}>
            Subscribe to our newsletter for upcoming products and best discount
            for all items
          </span>
          <div className={"w-full flex justify-center items-center gap-2"}>
            <Input
              type={"email"}
              className={"w-3/4 border-b-white text-b-white "}
              placeholder={"Your email"}
            />
            <Button className={"w-1/4"}>Subscribe</Button>
          </div>
        </div>
        <div className={"flex gap-[52px] text-b-white"}>
          {FooterLinks.map((group, index) => (
            <div key={index} className={"flex flex-col gap-2"}>
              <span className={"text-base font-medium"}>
                {group.group_label}
              </span>
              <div className={"flex flex-col gap-0.5"}>
                {group.group_links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={"text-sm text-b-gray"}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "w-full flex justify-center items-center text-xs text-b-dark-gray gap-1"
        }
      >
        &copy; Ballamas 2024 by{" "}
        <span className={"underline cursor-pointer"}>waris</span>
      </div>
    </div>
  );
};

export default Footer;
