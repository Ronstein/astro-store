import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, d as createAstro } from './astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'js-cookie';

const generatePaginationNumbers = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages
  ];
};

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { totalPages } = Astro2.props;
  const url = Astro2.url;
  const pageParam = Number(url.searchParams.get("page") ?? 1);
  const currentPage = Math.max(
    pageParam > totalPages ? totalPages : pageParam,
    1
  );
  const path = url.pathname;
  const allPages = generatePaginationNumbers(currentPage, totalPages);
  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(url.searchParams);
    if (pageNumber === "...") {
      return `${path}?${params.toString()}`;
    }
    if (+pageNumber <= 0) {
      return `${path}`;
    }
    if (+pageNumber > totalPages) {
      return `${path}?${params.toString()}`;
    }
    params.set("page", pageNumber.toString());
    return `${path}?${params.toString()}`;
  };
  return renderTemplate`${maybeRenderHead()}<div class="flex text-center justify-center mt-10 mb-32"> <nav aria-label="Page navigation example"> <ul class="flex list-style-none"> <li class="page-item"> <a class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"${addAttribute(createPageUrl(currentPage - 1), "href")}>
Anterior
</a> </li> ${allPages.map((page, index) => renderTemplate`<li class="page-item"${addAttribute(`page-${index}`, "data-index")}> <a${addAttribute([
    "page-link relative block m-0.5 py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
    page === currentPage && "bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700"
  ], "class:list")}${addAttribute(createPageUrl(page), "href")}> ${page} </a> </li>`)} <li class="page-item"> <a class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"${addAttribute(createPageUrl(currentPage + 1), "href")}>
Siguiente
</a> </li> </ul> </nav> </div> <!-- <div class="flex justify-between my-32">
  <a class="button" href={\`\${path}?page=\${Math.max(currentPage - 1, 1)}\`}>
    Anteriores
  </a>
  <span>Página {pageParam} de {totalPages} </span>
  <a
    class="button"
    href={\`\${path}?page=\${Math.min(currentPage + 1, totalPages)}\`}>Siguentes</a
  >
</div>

<style>
  .button {
    @apply p-2 bg-blue-500 text-white rounded;
  }
</style> -->`;
}, "/Users/macbook/Documents/astro/07-store/src/components/shared/Pagination.astro", void 0);

export { $$Pagination as $ };
