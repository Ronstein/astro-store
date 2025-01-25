/* empty css                                        */
import { c as createComponent, r as renderTemplate, b as renderComponent, d as createAstro, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$ProductImage } from '../../chunks/ProductImage_B9CKcvZK.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_BULOkTdw.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_DFp93H28.mjs';
import 'js-cookie';
import { F as Formatter } from '../../chunks/fomatter_COXD278a.mjs';
import { a as actions } from '../../chunks/_astro_actions_DpyLhVGI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const searchParams = Astro2.url.searchParams;
  const pageParam = Number(searchParams.get("page") ?? 1);
  const { data, error } = await Astro2.callAction(actions.getProductsByPage, {
    page: pageParam
  });
  if (error) {
    return Astro2.redirect("/");
  }
  const { products, totalPages } = data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Panel Administrativo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Dashboard</h1> <p>Listado de productos</p> <div class="flex justify-end"> <a href="/admin/products/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">
Nuevo Producto
</a> </div> <table class="w-full mt-5 border"> <thead> <tr> <th class="text-left">Imagen</th> <th class="text-left">Título</th> <th class="text-left">Precio</th> <th class="text-left">Inventario</th> </tr> </thead> <tbody> ${products.map((product) => renderTemplate`<tr>  <td>  ${renderComponent($$result2, "ProductImage", $$ProductImage, { "src": product.images.split(",")[0], "alt": product.title, "className": "w-16 h-16" })} </td> <td> <a class="hover:underline cursor-pointer"${addAttribute(`/admin/products/${product.slug}`, "href")}>  ${product.title} </a> </td> <td>${Formatter.currency(product.price)}</td> <td>${product.stock}</td> </tr>`)} </tbody> </table> ${renderComponent($$result2, "Pagination", $$Pagination, { "totalPages": totalPages })} ` })}`;
}, "/Users/macbook/Documents/astro/07-store/src/pages/admin/dashboard.astro", void 0);

const $$file = "/Users/macbook/Documents/astro/07-store/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
