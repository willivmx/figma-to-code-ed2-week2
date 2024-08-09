import axios from "axios";

export const categories: Categories = [
  {
    id: "all",
    label: "All",
    count: 132,
  },
  {
    id: "accessories",
    label: "Accessories",
    count: 13,
  },
  {
    id: "featured",
    label: "Featured",
    count: 67,
  },
  {
    id: "unisex",
    label: "Unisex",
    count: 52,
  },
];

export const getProducts = async () => {
  const dbProducts = await axios
    .get(
      "https://mock.shop/api?query={products(first:%2010){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20priceRange{minVariantPrice{amount%20currencyCode}%20maxVariantPrice{amount%20currencyCode}}%20variants(first:%203){edges%20{node%20{id%20title%20selectedOptions%20{name%20value}%20price%20{amount%20currencyCode}%20image{id%20url%20altText%20height%20width}}}}}}}}",
    )
    .then((res) => res.data.data.products.edges as []);
  return dbProducts.map((product: any) => {
    return {
      id: product.node.id,
      name: product.node.title,
      image: product.node.featuredImage.url,
      price: product.node.priceRange.minVariantPrice.amount,
      category: product.node.variants.edges[0].node.selectedOptions[0].value,
      description: product.node.description,
      discount: 0,
      variants: {
        sizes: product.node.variants.edges.map((edge: any) =>
          edge.node.selectedOptions.map((option: any) => {
            return {
              label: option.name,
              size: option.value,
            };
          }),
        ),
        colors: product.node.variants.edges.map((edge: any) =>
          edge.node.selectedOptions.map((option: any) => {
            return {
              name: option.name,
              hex: option.value,
              image: edge.node.image.url,
            };
          }),
        ),
      },
    } as Product;
  }) as Products;
};

const references = {
  sizes: [
    { label: "extra small", size: "XS" },
    { label: "small", size: "S" },
    { label: "medium", size: "M" },
    { label: "large", size: "L" },
    { label: "extra large", size: "XL" },
  ],
  colors: [
    {
      label: "green",
      hex: "#2D5C43",
    },
    {
      label: "purple",
      hex: "#393158",
    },
    {
      label: "ocean",
      hex: "#2A5259",
    },
    {
      label: "olive",
      hex: "#706947",
    },
  ],
};

export const getProduct = async (id: string) => {
  const dbProduct = await axios
    .get(
      `https://mock.shop/api?query=%7B%20product(id%3A%20%22gid%3A%2F%2Fshopify%2FProduct%2F${id}%22)%20%7B%20id%20title%20description%20featuredImage%20%7B%20id%20url%20%7D%20priceRange%7B%20minVariantPrice%7B%20amount%20currencyCode%20%7D%20%7D%20variants(first%3A%203)%20%7B%20edges%20%7B%20cursor%20node%20%7B%20id%20title%20image%20%7B%20url%20%7D%20price%20%7B%20amount%20currencyCode%20%7D%20selectedOptions%7B%20value%20name%20%7D%20%7D%20%7D%20%7D%20%7D%7D`,
    )
    .then((res) => res.data.data.product);

  return {
    id: dbProduct.id,
    name: dbProduct.title,
    image: dbProduct.featuredImage.url,
    price: dbProduct.priceRange.minVariantPrice.amount,
    category: dbProduct.variants.edges[0].node.selectedOptions[0].value,
    description: dbProduct.description,
    discount: 0,
    variants: {
      sizes: dbProduct.variants.edges
        .map(
          (edge: any) =>
            edge.node.selectedOptions
              .filter((option: any) => option.name.toLowerCase() === "size")
              .map((option: any) => {
                return {
                  label: option.value,
                  size: references.sizes.find(
                    (size: any) => size.label === option.value.toLowerCase(),
                  )?.size,
                };
              })[0],
        )
        .filter(
          (value: any, index: number, self: any[]) =>
            index ===
            self.findIndex(
              (t) => t.label === value.label && t.size === value.size,
            ),
        ),
      colors: dbProduct.variants.edges.map(
        (edge: any) =>
          edge.node.selectedOptions
            .filter((option: any) => option.name.toLowerCase() === "color")
            .map((option: any) => {
              return {
                label: option.value,
                hex: references.colors.find(
                  (size: any) => size.label === option.value.toLowerCase(),
                )?.hex,
                image: edge.node.image.url,
              };
            })[0],
      ),
    },
  } as Product;
};
