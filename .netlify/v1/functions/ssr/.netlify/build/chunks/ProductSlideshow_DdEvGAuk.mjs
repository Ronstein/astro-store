import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent, f as renderScript, d as createAstro } from './astro/server_DvEJYFl4.mjs';
import 'kleur/colors';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_BYGLMgqi.mjs';
/* empty css                          */

const $$Astro = createAstro();
const $$ProductSlideshow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductSlideshow;
  const { images } = Astro2.props;
  const fullImages = images.map((image) => {
    return image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`;
  });
  return renderTemplate`${maybeRenderHead()}<div class="swiper mt-10 col-span-1 sm:col-span-2" data-astro-cid-v5yllo6e> <!-- Additional required wrapper --> <div class="swiper-wrapper" data-astro-cid-v5yllo6e> <!-- Slides --> ${fullImages.map((image) => renderTemplate`<div class="swiper-slide" data-astro-cid-v5yllo6e> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": "Product Image", "class": "w-full h-full object-cover px-10", "width": 1024, "height": 800, "data-astro-cid-v5yllo6e": true })} </div>`)} </div> <!-- If we need pagination --> <div class="swiper-pagination" data-astro-cid-v5yllo6e></div> </div>  ${renderScript($$result, "/Users/macbook/Documents/astro/07-store/src/components/products/ProductSlideshow.astro?astro&type=script&index=0&lang.ts")} <!-- <h1>Product SlideShow</h1>

<p>
  {JSON.stringify(images, null, 2)}
</p> -->`;
}, "/Users/macbook/Documents/astro/07-store/src/components/products/ProductSlideshow.astro", void 0);

export { $$ProductSlideshow as $ };
