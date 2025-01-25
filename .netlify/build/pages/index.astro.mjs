/* empty css                                     */
import { c as createComponent, r as renderTemplate, b as renderComponent, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'react/jsx-runtime';
import { $ as $$MainLayout } from '../chunks/MainLayout_DFp93H28.mjs';
import 'js-cookie';
import 'react';
import { P as ProductList } from '../chunks/ProductList_Rbc8RuXe.mjs';
import { $ as $$Pagination } from '../chunks/Pagination_BULOkTdw.mjs';
import { a as actions } from '../chunks/_astro_actions_DpyLhVGI.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const searchParams = Astro2.url.searchParams;
  const pageParam = Number(searchParams.get("page") ?? 1);
  const { data, error } = await Astro2.callAction(actions.getProductsByPage, {
    page: pageParam
  });
  if (error) {
    return Astro2.redirect("/");
  }
  const { products, totalPages } = data;
  if (products.length === 0) {
    return Astro2.redirect(`/?page=${totalPages}`);
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl">Listado de Productos</h1> ${renderComponent($$result2, "ProductList", ProductList, { "products": products, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components", "client:component-export": "ProductList" })} ${renderComponent($$result2, "Pagination", $$Pagination, { "totalPages": totalPages })}  ` })}`;
}, "/Users/macbook/Documents/astro/07-store/src/pages/index.astro", void 0);

const $$file = "/Users/macbook/Documents/astro/07-store/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
