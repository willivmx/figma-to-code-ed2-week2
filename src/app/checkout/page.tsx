"use client";
import React from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const shippingMethods = [
  {
    id: "1",
    name: "Free Shipping",
    description: "7-30 business days",
    price: 0,
  },
  {
    id: "2",
    name: "Regular Shipping",
    description: "3-14 business days",
    price: 7.5,
  },
  {
    id: "3",
    name: "Express Shipping",
    description: "1-3 business days",
    price: 22.5,
  },
];

const paymentMethods = [
  {
    id: "1",
    name: "Debit/Credit Card",
    icon: "/assets/vectors/icons/card.svg",
  },
  {
    id: "2",
    name: "Virtual account",
    icon: "/assets/vectors/icons/bank.svg",
  },
];

const checkoutFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  region: z.string().min(2),
  zipCode: z.string().min(2),
  paymentMethod: z.string().min(2),
  deliveryMethod: z.string().min(2),
  cardNumber: z.string().min(2),
  expirationDate: z.string().min(2),
  securityCode: z.string().min(2),
  savePaymentMethod: z.boolean(),
});

const shippingAdressFields = [
  {
    label: "First name",
    name: "firstName",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    label: "Last name",
    name: "lastName",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    label: "Phone number",
    name: "phoneNumber",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    label: "Address",
    name: "address",
    placeholder: "Enter your address",
    type: "text",
  },
  {
    label: "City",
    name: "city",
    placeholder: "Enter your city",
    type: "text",
  },
  {
    label: "Region",
    name: "region",
    placeholder: "Enter your region",
    type: "text",
  },
  {
    label: "Zip code",
    name: "zipCode",
    placeholder: "Enter your zip code",
    type: "text",
  },
];

const Page = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [selectedShippingMethod, setSelectedShippingMethod] = React.useState<
    Record<"id" | "name" | "description", string> & Record<"price", number>
  >(shippingMethods[1]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    Record<"id" | "name" | "icon", string>
  >(paymentMethods[0]);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      region: "",
      zipCode: "",
      paymentMethod: selectedPaymentMethod.id,
      deliveryMethod: selectedShippingMethod.id,
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      savePaymentMethod: false,
    },
  });

  const checked = form.watch("savePaymentMethod");
  const toggleCheckbox = () => {
    form.setValue("savePaymentMethod", !checked);
  };

  const onSubmit = () => {
    router.push("/checkout/success");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className={"w-full flex flex-col gap-5"}>
        <span className={"text-2xl font-semibold"}>Checkout</span>
        <div
          className={"flex flex-col lg:flex-row justify-between gap-[112px]"}
        >
          <div className={"w-full flex-1 flex flex-col gap-6"}>
            <div className={"flex flex-col gap-4"}>
              <div className={"flex flex-col gap-1"}>
                <span className={"font-semibold text-sm"}>Your order</span>
                <span className={"text-xs font-medium text-b-dark-gray"}>
                  By placing your order, you agree to Ballamas{" "}
                  <span className={"font-semibold underline text-b-black"}>
                    Privacy
                  </span>{" "}
                  and{" "}
                  <span className={"font-semibold underline text-b-black"}>
                    Policy
                  </span>
                  .
                </span>
              </div>
              <div className={"flex flex-col gap-6"}>
                <div className={"flex flex-col justify-between gap-3"}>
                  {cart.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={"flex justify-between items-center"}
                    >
                      <div className={"flex gap-2.5 items-center"}>
                        <div
                          className={"size-[72px] rounded-lg overflow-hidden"}
                        >
                          <Image
                            src={
                              item.variants.colors[0]?.image ??
                              item.product.image
                            }
                            alt={item.id}
                            width={100}
                            height={100}
                            className={"size-full object-cover"}
                          />
                        </div>
                        <div className={"flex flex-col gap-0.5"}>
                          <span className={"text-sm font-semibold"}>
                            {item.product.name}
                          </span>
                          <span
                            className={"font-medium text-xs text-b-dark-gray"}
                          >
                            {item.variants.colors[0]?.name} -{" "}
                            {item.variants.sizes[0]?.label}
                          </span>
                        </div>
                      </div>
                      <span className={"font-semibold text-sm"}>
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={"w-full md:w-[401px] flex flex-col gap-2"}>
                  <div className={"flex flex-col gap-1"}>
                    <span className={"text-xs"}>Discount Code</span>
                    <div className={"flex gap-2 items-center"}>
                      <Input
                        className={"w-3/4"}
                        placeholder={"Add discount code"}
                      />
                      <Button
                        className={
                          "w-1/4 bg-b-black text-b-white font-medium text-sm"
                        }
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  <span className={"text-xs font-medium"}>
                    New Customer?{" "}
                    <span className={"underline cursor-pointer"}>Signup</span>
                    <span className={"text-b-dark-gray"}>
                      {" "}
                      to get better offer
                    </span>
                  </span>
                </div>
                <div className={"flex flex-col gap-3"}>
                  <div
                    className={
                      "flex flex-col gap-1 font-medium text-sm text-b-dark-gray"
                    }
                  >
                    <div className={"flex justify-between items-center"}>
                      <span>Subtotal</span>
                      <span>
                        $
                        {cart.items.reduce(
                          (acc, item) =>
                            acc + item.product.price * item.quantity,
                          0,
                        )}
                      </span>
                    </div>
                    <div className={"flex justify-between items-center"}>
                      <span>Discount</span>
                      <span>
                        $
                        {cart.items.reduce(
                          (acc, item) => acc + item.product.discount,
                          0,
                        )}
                      </span>
                    </div>
                  </div>
                  <span className={"flex w-full border-b border-b-dark-gray"} />
                  <div className={"flex flex-col gap-2 font-semibold text-sm"}>
                    <div className={"flex justify-between items-center"}>
                      <span>Order total</span>
                      <span>${cart.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"flex flex-col gap-3.5"}>
              <span className={"text-sm font-semibold"}>Shipping method</span>
              <div className={"flex flex-col gap-3 w-full"}>
                {shippingMethods.map((method) => (
                  <div
                    key={method.id}
                    className={
                      "flex items-center justify-between gap-5 w-full bg-b-light-gray rounded-xl p-3 border border-b-dark-gray cursor-pointer hover:bg-b-light-gray/70 transition-all"
                    }
                    onClick={() => setSelectedShippingMethod(method)}
                  >
                    <div
                      className={"flex gap-[13px] justify-start items-center"}
                    >
                      <div
                        className={cn(
                          "size-[18px] border rounded-full overflow-hidden flex justify-center items-center p-1",
                          selectedShippingMethod.id === method.id
                            ? "border-b-black"
                            : "border-b-dark-gray",
                        )}
                      >
                        {selectedShippingMethod.id === method.id && (
                          <span
                            className={"size-full bg-b-black rounded-full"}
                          />
                        )}
                      </div>
                      <div className={"flex flex-col justify-center gap-0.5"}>
                        <span className={"text-sm font-medium"}>
                          {method.name}
                        </span>
                        <span className={"text-xs text-b-dark-gray"}>
                          {method.description}
                        </span>
                      </div>
                    </div>
                    <span className={"font-medium text-sm"}>
                      ${method.price.toString().replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={"w-full lg:w-[488px] flex flex-col gap-6"}>
            <div className={"flex flex-col gap-1"}>
              <span className={"font-semibold text-sm"}>Payment details</span>
              <span className={"text-xs font-medium text-b-dark-gray"}>
                Complete your purchase by providing your payment details.
              </span>
            </div>
            <div className={"flex flex-col gap-[22px]"}>
              <div className={"flex flex-col gap-6"}>
                <div className={"flex flex-col gap-3"}>
                  <span className={"font-semibold text-sm"}>
                    Shipping address
                  </span>
                  <div
                    className={
                      "grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-2"
                    }
                  >
                    {shippingAdressFields.map((field) => {
                      return (
                        <div key={field.name} className={"flex flex-col gap-2"}>
                          <span className={"font-medium text-xs"}>
                            {field.label}
                          </span>
                          <Input
                            name={field.name}
                            placeholder={field.placeholder}
                            type={field.type}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={"flex flex-col gap-3"}>
                  <span className={"font-semibold text-sm"}>
                    Select payment method
                  </span>
                  <div className={"flex flex-col gap-[22px]"}>
                    <div className={"w-full grid grid-cols-2 gap-5"}>
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={cn(
                            "w-full flex flex-col gap-2 p-3 rounded-xl border cursor-pointer",
                            selectedPaymentMethod.id === method.id
                              ? "border-2 border-b-black"
                              : "border-b-dark-gray",
                          )}
                          onClick={() => setSelectedPaymentMethod(method)}
                        >
                          <Image
                            src={method.icon}
                            alt={method.name}
                            width={40}
                            height={40}
                            className={"size-5"}
                          />
                          <span>{method.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className={"flex flex-col gap-3"}>
                      <div className={"w-full relative"}>
                        <Input
                          placeholder={"Card number"}
                          className={"w-full pr-5"}
                        />
                        <Image
                          src={"/assets/vectors/icons/lock.svg"}
                          width={20}
                          height={20}
                          alt="calendar"
                          className={
                            "absolute top-1/2 right-4 -translate-y-1/2 size-5 bg-b-white"
                          }
                        />
                      </div>
                      <div
                        className={
                          "w-full grid grid-cols-1 md:grid-cols-2 gap-2"
                        }
                      >
                        <Input placeholder={"Expiration date (MM/YY)"} />
                        <Input placeholder={"Security code"} />
                      </div>
                      <div className={"flex gap-1 items-center text-xs mt-2"}>
                        <div
                          className={
                            "flex justify-center items-center size-5 p-1 border-2 border-b-dark-gray rounded-md cursor-pointer"
                          }
                          onClick={toggleCheckbox}
                        >
                          <Image
                            src={"/assets/vectors/icons/checkmark.svg"}
                            width={20}
                            height={20}
                            alt="lock"
                            className={cn(
                              "size-full",
                              checked ? "flex" : "hidden",
                            )}
                          />
                        </div>
                        Save card for future purchases
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"w-full flex justify-center items-center"}>
                <Button
                  type={"submit"}
                  className={
                    "w-full md:w-1/2 bg-b-black text-b-white hover:gap-3 transition-all"
                  }
                >
                  <span>
                    Pay $
                    {(cart.totalPrice +
                      selectedShippingMethod.price).toString().replace(".", ",")}
                  </span>
                  <Image
                    src={"/assets/vectors/icons/arrow-right.svg"}
                    alt="arrow-right"
                    width={20}
                    height={20}
                    className={"size-5 invert"}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
