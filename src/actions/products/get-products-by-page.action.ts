import type { ProductWithImages } from '@/interfaces';
import { defineAction } from 'astro:actions';
import { count, db, eq, Product, ProductImage, sql } from 'astro:db';
import { z } from 'astro:schema';

export const getProductsByPage = defineAction({
    accept: 'json',
    input: z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(12),
        gender: z.string().optional(),
    }),
    handler: async ({ page, limit, gender }) => {
        page = page <= 0 ? 1 : page;
        //console.log('1');

        const [totalRecords] = await db.select({ count: count() })
            .from(Product)
            .where(eq(Product.gender, gender ?? Product.gender));
        const totalPages = Math.ceil(totalRecords.count / limit);

        // console.log(totalRecords, gender);

        if (page > totalPages) {
            // page = totalPages;
            return {
                products: [] as ProductWithImages[],
                totalPages: totalPages,
            }
        }

        // const products = await db
        //     .select()
        //     .from(Product)
        //     .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
        //     .limit(limit)
        //     .offset((page - 1) * 12);

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
        // console.log({ rows });

        const products = rows.map(product => {
            return {
                ...product,
                images: product.images ? product.images : 'no-image.png'
            }
        }) as unknown as ProductWithImages[];

        return {
            products: products, //rows as unknown as ProductWithImages[],
            totalPages: totalPages,
        }
    },
});