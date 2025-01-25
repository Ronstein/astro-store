import { jsxs, jsx } from 'react/jsx-runtime';
import './MainLayout_DFp93H28.mjs';
import 'js-cookie';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const images = product.images.split(",").map((img) => {
    return img.startsWith("http") ? img : `${"http://localhost:4321"}/images/products/${img}`;
  });
  const [currentImage, setCurrentImage] = useState(images[0]);
  return /* @__PURE__ */ jsxs("a", { href: `/products/${product.slug}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: currentImage,
        alt: product.title,
        className: "h-[350px] object-contain",
        onMouseEnter: () => setCurrentImage(images[1] ?? images[0]),
        onMouseLeave: () => setCurrentImage(images[0])
      }
    ),
    /* @__PURE__ */ jsx("h4", { children: product.title }),
    /* @__PURE__ */ jsxs("p", { children: [
      "$",
      product.price
    ] })
  ] });
};

const ProductList = ({ products }) => {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 place-items-center", children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) });
};

export { ProductList as P };
