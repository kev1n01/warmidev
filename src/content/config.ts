import { defineCollection, z } from 'astro:content';

const semanasCollection = defineCollection({
    schema: z.object({
        numero: z.number(),
        descripcion: z.string(),
        temas: z.array(z.object({
            slug: z.string(),
            titulo: z.string(),
            descripcion: z.string(),
            tareas: z.array(z.object({
                titulo: z.string(),
                descripcion: z.string()
            })).default([]),
            recursos: z.array(z.object({
                nombre: z.string(),
                url: z.string().url()
            })).default([]),
        }))
    })
});

export const collections = {
    semanas: semanasCollection
};