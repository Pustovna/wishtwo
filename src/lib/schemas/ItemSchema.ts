import { z } from 'zod';

export const itemSchema = z.object({
    title: z.string().min(2, {message: 'Title must be at least 2 characters long'}),
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters long'
    }),
    link: z.string().url( {
        message: 'This is not a valid URL'
    }).or(z.literal("")),
    price: z.string({
        message: 'Price must be a number'
    }).or(z.literal("")),
    comment: z.string().or(z.literal("")),
    image: z.instanceof(File).or(z.literal("")).optional(),
});

export type ItemSchema = z.infer<typeof itemSchema>;