import { defineCollection, z } from 'astro:content';

const semanasCollection = defineCollection({
    type: 'content',
    schema: z.object({
        numero: z.number(),
        label_select: z.string(),
        titulo: z.string(),
        w_motivation: z.string(),
        temas: z.array(z.object({
            slug: z.string(),
            titulo: z.string(),
            descripcion: z.string(),
            tips: z.string(),
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