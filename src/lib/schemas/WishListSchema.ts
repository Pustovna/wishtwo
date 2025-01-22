import { z } from 'zod';

export const wishListSchema = z.object({
    title: z.string().min(2, {message: 'Title must be at least 2 characters long'}),
});

export type WishListSchema = z.infer<typeof wishListSchema>;