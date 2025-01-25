import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, d as createAstro } from './astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$ProductImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductImage;
  const { src, alt, className } = Astro2.props;
  const currentImage = src.startsWith("http") ? src : `/images/products/${src}`;
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(currentImage, "src")}${addAttribute(alt, "alt")}${addAttribute([className], "class:list")}>`;
}, "/Users/macbook/Documents/astro/07-store/src/components/products/ProductImage.astro", void 0);

export { $$ProductImage as $ };
