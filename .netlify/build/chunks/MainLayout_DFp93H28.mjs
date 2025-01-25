import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent, p as createTransitionScope, f as renderScript, d as createAstro, e as addAttribute, n as renderHead, o as renderSlot } from './astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx } from 'react/jsx-runtime';
import { atom } from 'nanostores';
import Cookies from 'js-cookie';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
/* empty css                             */
import 'clsx';

class CartCookiesClient {
  static getCart() {
    return JSON.parse(Cookies.get("cart") ?? "[]");
  }
  static getTotalItems() {
    const cart = CartCookiesClient.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
  static AddItem(cartItem) {
    const cart = CartCookiesClient.getCart();
    const itemInCart = cart.find(
      (item) => item.productId === cartItem.productId && item.size === cartItem.size
    );
    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }
    Cookies.set("cart", JSON.stringify(cart));
    return cart;
  }
  static removeItem(productId, size) {
    const cart = CartCookiesClient.getCart();
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    Cookies.set("cart", JSON.stringify(updatedCart));
    return updatedCart;
  }
}

const itemsInCart = atom(0);

const CartCounter = () => {
  const $itemsInCart = useStore(itemsInCart);
  useEffect(() => {
    const cart = CartCookiesClient.getCart();
    itemsInCart.set(cart.length);
  }, []);
  return /* @__PURE__ */ jsxs("a", { href: "/cart", className: "relative inline-block", children: [
    $itemsInCart > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-5 h-5", children: $itemsInCart }),
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5em",
        height: "1.5em",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsxs("g", { fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, children: [
          /* @__PURE__ */ jsx("path", { d: "M4 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0" }),
          /* @__PURE__ */ jsx("path", { d: "M12.5 17H6V3H4" }),
          /* @__PURE__ */ jsx("path", { d: "m6 5l14 1l-.86 6.017M16.5 13H6m10 6h6m-3-3v6" })
        ] })
      }
    )
  ] });
};

const $$Astro$2 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { isLoggedIn, isAdmin } = Astro2.locals;
  return renderTemplate`<!-- component -->${maybeRenderHead()}<nav class="flex justify-between px-20 py-10 items-center fixed top-0 w-full z-10 h-20" style="background-color: #F9F9F9;"> <h1 class="text-xl text-gray-800 font-bold"> <a href="/">AstroStore</a> </h1>  <div class="hidden sm:block"> <a class="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">
Hombres
</a> <a class="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">
Mujeres
</a> <a class="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">
Niños
</a> </div> <div class="flex items-center"> <ul class="flex items-center space-x-6"> ${renderComponent($$result, "CartCounter", CartCounter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components", "client:component-export": "CartCounter", "data-astro-transition-persist": createTransitionScope($$result, "h6ox5dzo") })} <li class="font-semibold text-gray-700"> <a href="/">Home</a> </li> ${isAdmin && renderTemplate`<li class="font-semibold text-gray-700"> <a href="/admin/dashboard">Admin</a> </li>`} ${!isLoggedIn ? renderTemplate`<li class="font-semibold text-gray-700"> <a href="/login">Ingresar</a> </li>` : renderTemplate`<li id="logout" class="font-semibold text-gray-700"> <a href="#">Salir</a> </li>`} </ul> </div> </nav> ${renderScript($$result, "/Users/macbook/Documents/astro/07-store/src/components/shared/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/macbook/Documents/astro/07-store/src/components/shared/Navbar.astro", "self");

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/macbook/Documents/astro/07-store/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/macbook/Documents/astro/07-store/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Astro Store" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="container m-auto max-w-5xl px-5 mt-20"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/macbook/Documents/astro/07-store/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
