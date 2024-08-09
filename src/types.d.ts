type Category = Record<"id" | "label", string> & Record<"count", number>;

type Categories = Category[];

type ColorVariant = Record<"name" | "hex", string> &
  Partial<Record<"image", string>>;

type SizeVariant = Record<"label" | "size", string>;

type ColorsVariants = ColorVariant[];

type SizesVariants = SizeVariant[];

type Variants = Record<"sizes", SizesVariants> &
  Record<"colors", ColorsVariants>;

type Product = Record<
  "id" | "name" | "image" | "category" | "description",
  string
> &
  Record<"discount" | "price", number> &
  Record<"variants", Variants>;

type Products = Product[];

type CartItem = Record<"id", string> &
  Record<"product", Omit<Product, "variants">> &
  Record<"quantity", number> &
  Record<"variants", Variants>;

type Cart = Record<"items", CartItem[]> &
  Record<"totalPrice" | "totalItems", number>;
