"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { PostStatus } from "@prisma/client"
import db from '@/lib/db'
import { CreatePostSchema } from "@/schemas/post"
import * as z from 'zod'


export const getPosts = async () => {
    const posts = await db.post.findMany();
    return posts;
}

const generateUniqueSlug = async (title: string) => {
    let slug = title.toLowerCase().replace(/ /g, "-");
    while (await db.post.findUnique({ where: { slug } })) {
        slug = `${title.toLowerCase().replace(/ /g, "-")}`;
    }
    return slug;
}

export const createMe = async (values: any) => {
    console.log(values);
}
export const createPost = async (formData: z.infer<typeof CreatePostSchema>) => {
    const session = await auth()
    if (!session || !session.user) return null;

    const title = formData.title as string;
    const providedSlug = formData.slug as string;
    const content = formData.content as string;
    const published = formData.published === false;
    const likes = formData.likes ? Number(formData.likes) : 0;
    const readingTime = formData.readingTime ? Number(formData.readingTime) : 0;
    const image = formData.image as string | null;
    const imageAlt = formData.imageAlt as string | null;
    const status = formData.status as PostStatus | null;
    const watched = formData.watched ? Number(formData.watched) : 0
    const slug = providedSlug ? await generateUniqueSlug(providedSlug) : await generateUniqueSlug(title);
    const tags = formData.tags.map((tag: { title: string; id: number }) => ({ id: tag.id.toString(), slug: tag.title.toLowerCase().replace(/ /g, "-") }));

    try {
        const existingPost = await db.post.findUnique({ where: { slug } });
        if (existingPost) {
            return { error: "Slug already exists" };
        }

        const post = await db.post.create({
            data: {
                title,
                content,
                slug,
                published,
                likes,
                readingTime,
                image,
                imageAlt,
                status: status || PostStatus.progress,
                watched,
                authorId: session.user.id || "",
                categoryId: formData.categoryId,
                tags: {
                    connect: tags.map((tag) => ({ id: tag.id, slug: tag.slug })),
                }
            },
            include: {
                tags: true,
            }
        })
        revalidatePath("/blogs")

        return { success: `${post.title} created successfully` }
    } catch (error: any) {
        console.log(error);
        return { error: "Error try again" }
    }
}

export const deletePost = async (id: string) => {
    try {
        await db.post.delete({
            where: {
                id
            }
        })
        revalidatePath("/blogs")
        return { success: "Post deleted successfully" }
    } catch (error: any) {
        console.log(error);
        return { error: "Error try again" }
    }
}