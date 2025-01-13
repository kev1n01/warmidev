import { defineCollection, z } from 'astro:content';

const semanasCollection = defineCollection({
    schema: z.object({
        numero: z.number(),
        descripcion: z.string(),
        recursos: z.array(z.object({
            nombre: z.string(),
            url: z.string().url()
        })),
        temas: z.array(z.object({
            slug: z.string(),
            titulo: z.string(),
            descripcion: z.string(),
            tareas: z.array(z.object({
                titulo: z.string(),
                descripcion: z.string()
            }))
        }))
    })
});

export const collections = {
    semanas: semanasCollection
};