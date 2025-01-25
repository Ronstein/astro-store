import './_astro_actions_DpyLhVGI.mjs';
import * as z from 'zod';
import { d as defineAction } from './server_FdejM81F.mjs';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { d as db, U as User, P as Product, a as ProductImage, g as getSession } from './server_DAnqlqzd.mjs';
import { eq, inArray, count, sql } from '@astrojs/db/dist/runtime/virtual.js';
import { v2 } from 'cloudinary';

const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365),
        // 1 año
        path: "/"
      });
    } else {
      cookies.delete("email", {
        path: "/"
      });
    }
    try {
      return {
        ok: true,
        //msg: 'Usuario creado exitosamente',
        email
      };
    } catch (error) {
      console.log(error);
      const authError = error;
      throw new Error(`Auxilio! algo salío mal: ${authError.message}`);
    }
  }
});

const logout = defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    return { ok: true };
  }
});

const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365),
        // 1 año
        path: "/"
      });
    } else {
      cookies.delete("email", {
        path: "/"
      });
    }
    try {
      const user = {
        id: v4(),
        name,
        email,
        password: bcrypt.hashSync(password),
        role: "user"
      };
      await db.insert(User).values(user);
      return {
        ok: true,
        msg: "Usuario creado exitosamente",
        user: {
          uid: user.id,
          email: user.email
          //displayName: user.password,
        }
      };
    } catch (error) {
      const authError = error;
      console.log(error);
      throw new Error(authError.message);
    }
  }
});

const loadProductsFromCart = defineAction({
  accept: "json",
  //input: z.string(),
  handler: async (_, { cookies }) => {
    const cart = JSON.parse(cookies.get("cart")?.value ?? "[]");
    if (cart.length === 0) return [];
    const productIds = cart.map((item) => item.productId);
    const dbProducts = await db.select().from(Product).innerJoin(ProductImage, eq(Product.id, ProductImage.productId)).where(inArray(Product.id, productIds));
    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);
      if (!dbProduct) throw new Error(`Product with id ${item.productId} not found.`);
      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;
      return {
        productId: item.productId,
        title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith("http") ? image : `${"http://localhost:4321"}/images/products/${image}`,
        price,
        slug
      };
    });
  }
});

v2.config({
  cloud_name: "react-fh",
  api_key: "116238795733853",
  api_secret: "HvUp3ld0pdKWzG6rwqsvqVbgkJA"
});
class ImageUpload {
  static async upload(file) {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageType = file.type.split("/")[1];
    const resp = await v2.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`
    );
    return resp.secure_url;
  }
  static async delete(image) {
    try {
      const imageName = image.split("/").pop() ?? "";
      const imageId = imageName.split(".")[0];
      const resp = await v2.uploader.destroy(imageId);
      console.log("ImageUpload - delete - resp: ", resp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const MAX_FILE_SIZE = 5e6;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/avif"
];
const createUpdateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.string().optional(),
    stock: z.number(),
    slug: z.string(),
    price: z.number(),
    sizes: z.string(),
    type: z.string(),
    tags: z.string(),
    title: z.string(),
    description: z.string(),
    gender: z.string(),
    //Todo: la Imagen
    imageFiles: z.array(
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, "Max image size 5MB").refine(
        (file) => {
          console.log(file);
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        },
        `Only supported image files are valid, ${ACCEPTED_IMAGE_TYPES.join(",")}`
      )
    ).optional()
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const { id = v4(), imageFiles, ...rest } = form;
    rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();
    const product = {
      id,
      user: user.id,
      // siempre trae id
      ...rest
    };
    const queries = [];
    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }
    const secureUrls = [];
    if (form.imageFiles && form.imageFiles.length > 0 && form.imageFiles[0].size > 0) {
      const urls = await Promise.all(
        form.imageFiles.map((file) => ImageUpload.upload(file))
      );
      secureUrls.push(...urls);
    }
    secureUrls.forEach((imageUrl) => {
      const imageObj = {
        id: v4(),
        image: imageUrl,
        productId: product.id
      };
      queries.push(db.insert(ProductImage).values(imageObj));
    });
    await db.batch(queries);
    return product;
  }
});

const newProduct = {
  id: "",
  stock: 5,
  slug: "nuevo-producto",
  price: 100,
  sizes: "XS,S,M",
  type: "shirts",
  tags: "shirt,men,nuevo",
  title: "Nuevo Producto",
  description: "Nueva Descripción",
  gender: "men"
};
const getProductBySlug = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (slug) => {
    if (slug === "new") {
      return {
        product: newProduct,
        images: []
      };
    }
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));
    if (!product) throw new Error(`Product with slug ${slug} not found`);
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id));
    return {
      product,
      //images: images.map(i => i.image),
      images
    };
  }
});

const getProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(12),
    gender: z.string().optional()
  }),
  handler: async ({ page, limit, gender }) => {
    page = page <= 0 ? 1 : page;
    const [totalRecords] = await db.select({ count: count() }).from(Product).where(eq(Product.gender, gender ?? Product.gender));
    const totalPages = Math.ceil(totalRecords.count / limit);
    if (page > totalPages) {
      return {
        products: [],
        totalPages
      };
    }
    const productsQuery = await sql`
        select a.* ,
        (select GROUP_CONCAT(image,',') FROM 
        (select * FROM ${ProductImage} WHERE productId = a.id limit 2)
        ) as images
        from ${Product} a
        ${gender ? sql`WHERE a.gender = ${gender}` : sql``}
        LIMIT ${limit} OFFSET ${(page - 1) * limit};
        `;
    const { rows } = await db.run(productsQuery);
    const products = rows.map((product) => {
      return {
        ...product,
        images: product.images ? product.images : "no-image.png"
      };
    });
    return {
      products,
      //rows as unknown as ProductWithImages[],
      totalPages
    };
  }
});

const deleteProductImage = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (imageId, { request }) => {
    const session = await getSession(request);
    const user = session?.user;
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const [productImage] = await db.select().from(ProductImage).where(
      eq(ProductImage.id, imageId)
    );
    if (!productImage) {
      throw new Error(`image with id:  ${imageId} not found`);
    }
    await db.delete(ProductImage).where(
      eq(ProductImage.id, imageId)
    );
    if (productImage.image.includes("http")) {
      await ImageUpload.delete(productImage.image);
    }
    return { ok: true };
  }
});

const server = {
  // actions
  // Auth
  loginUser,
  logout,
  registerUser,
  //Products
  getProductsByPage,
  getProductBySlug,
  //Cart
  loadProductsFromCart,
  //Admin
  createUpdateProduct,
  deleteProductImage
};

export { server };
