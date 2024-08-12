"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/button";
import ProductCard from "@/components/product-card";
import { categories, getProducts } from "@/models/products";

export default function Page() {
  const [products, setProducts] = useState<Products>([]);

  const handleGetProducts = async () => {
    const dbProducts = await getProducts();
    setProducts(dbProducts);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className={"flex flex-col w-full pb-10 md:pb-20"}>
      <div
        className={cn(
          "w-full rounded-[52px] py-[42px] px-[22px] md:py-24 md:px-[78px] flex flex-col gap-[42px] mb-[72px]",
          `bg-[url('/assets/vectors/images/jordan-essentials-chicago-mens-jacket-N0ch5l.svg')] bg-center bg-cover bg-no-repeat`,
        )}
      >
        <div
          className={
            "flex flex-col gap-2.5 text-b-white text-center leading-6 tracking-tighter"
          }
        >
          <div className={"flex justify-center items-center gap-3"}>
            <span className={"border-b border-b-white w-[66px]"} />
            <span className={"text-[10px] md:text-sm"}>
              We bring new fashion to the world
            </span>
            <span className={"border-b border-b-white w-[66px]"} />
          </div>
          <div className={"flex flex-col justify-center items-center gap-4"}>
            <div
              className={
                "font-[Chillax-Bold] text-3xl md:text-5xl text-b-white text-center md:leading-[60px] lg:px-12"
              }
            >
              DISCOVER THE LATEST FASHION TRENDS HERE
            </div>
            <div className={"w-full md:w-[557px] text-xs md:text-base"}>
              Discover a world of fashion with our meticulously curated outfits.
              Shop now to update your wardrobe with chic and stylish outfits.
            </div>
          </div>
        </div>
        <div className={"flex justify-center items-center -gap-px"}>
          <Button className={""}>Start shopping</Button>
          <Button className={"p-3.5"}>
            <Image
              src={"/assets/vectors/icons/arrow.svg"}
              alt={"arrow-right"}
              width={20}
              height={20}
              quality={100}
              className={"size-5"}
            />
          </Button>
        </div>
      </div>
      <div className={"flex flex-col justify-center items-center gap-[72px]"}>
        <span
          className={
            "font-[Chillax-SemiBold] text-xl md:text-2xl lg:text-3xl text-center w-full"
          }
        >
          Discover the latest trends in summer fashion. Shop now and refresh
          your wardrobe with our stylish summer shirts.
        </span>
        <div
          className={"flex flex-col justify-center items-center gap-9 w-full"}
        >
          <div
            className={
              "w-full flex flex-wrap md:justify-center md:items-center gap-2.5"
            }
          >
            {categories.map((category, index) => (
              <Button
                key={category.id}
                className={cn(
                  "px-3.5 py-2 gap-2",
                  index === 0
                    ? "bg-b-black text-b-white"
                    : "border border-b-black",
                )}
              >
                <span className={"text-xl"}>{category.label}</span>
                <span className={"text-base"}>{category.count}</span>
              </Button>
            ))}
          </div>
          <div
            className={
              "lg:w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
            }
          >
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={"w-full flex justify-center items-center"}>
            <Button className={"bg-transparent border border-b-black"}>
              View More
            </Button>
          </div>
        </div>

        <div
          className={
            "flex flex-col justify-center items-center gap-9 lg:px-[102px]"
          }
        >
          <div className={"flex flex-col justify-center items-center gap-1"}>
            <span className={"font-[Chillax-SemiBold] leading-10 text-4xl"}>
              OUR COLLECTION
            </span>
            <span
              className={
                "font-medium text-lg text-b-dark-gray tracking-tighter"
              }
            >
              Our latest collection, where classic and contemporary styles
              converge in perfect harmony.
            </span>
          </div>
          <div
            className={
              "grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:h-[446px] overflow-hidden"
            }
          >
            <div
              className={"rounded-[52px] size-full overflow-hidden relative"}
            >
              <Image
                src={
                  "/assets/vectors/images/tech-mens-fleece-shacket-W5pmdx.svg"
                }
                alt={"tech-mens-fleece-shacket-W5pmdx"}
                width={1728}
                height={2160}
                quality={100}
                className={"size-full object-cover"}
              />
              <div
                className={
                  "absolute bottom-0 left-0 w-full flex justify-center items-center pb-6"
                }
              >
                <Button>
                  <span>Learn more</span>
                  <Image
                    src={"/assets/vectors/icons/arrow.svg"}
                    alt={"arrow-right"}
                    width={20}
                    height={20}
                    quality={100}
                    className={"size-5"}
                  />
                </Button>
              </div>
            </div>
            <div
              className={
                "lg:col-span-2 size-full rounded-[52px] overflow-hidden relative gap-2.5"
              }
            >
              <Image
                src={
                  "/assets/vectors/images/abraham-george-wwVtHt5Px18-unsplash.svg"
                }
                alt={"tech-mens-fleece-shacket-W5pmdx"}
                width={640}
                height={800}
                quality={100}
                className={"size-full object-cover"}
              />
              <div
                className={
                  "absolute top-0 left-0 size-full flex flex-col justify-center items-center gap-1 p-5 text-b-white text-center bg-b-black/20"
                }
              >
                <span
                  className={
                    "font-[Chillax-Bold] md:text-3xl lg:text-5xl leading-[60px] text-transparent text-stroke text-stroke-b-white"
                  }
                >
                  CLASSIC MEN
                </span>
                <span className={"md:text-sm lg:text-lg"}>
                  We&apos;re changing the way things get made
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
