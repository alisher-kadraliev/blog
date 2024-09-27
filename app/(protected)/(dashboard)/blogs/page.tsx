import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import db from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card";
import { ContentLayout } from '@/components/admin-panel/content-layout'
type Blogs = {
    id: string;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    authorId: string;
    likes: number;
    readingTime: number;
    image: null | string;
    status: "completed" | "progress"; // Updated
    imageAlt: null | string;
    watched: number;
    createdAt: Date;
    updatedAt: Date;
    order: number;
};
const BlogsPage = async () => {
  /*   const data = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    }); */
    const data: Blogs[] = [ // Explicitly type the data array
        {
            order: 10,
            id: '1',
            title: 'First Blog Post',
            content: 'This is the content of the first blog post.',
            slug: 'first-blog-post',
            published: true,
            authorId: 'author1',
            likes: 10,
            readingTime: 5,
            image: null,
            status: 'completed', // Updated
            imageAlt: null,
            watched: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            order: 20,
            id: '2',
            title: 'Second Blog Post',
            content: 'This is the content of the second blog post.',
            slug: 'second-blog-post',
            published: false,
            authorId: 'author2',
            likes: 5,
            status: 'completed', // Updated
            readingTime: 3,
            image: null,
            imageAlt: null,
            watched: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    return (
        <ContentLayout>
            <Card className="rounded-lg border-none mt-6">
                <CardContent>
                    {data.length > 0 ? (
                        <DataTable columns={columns} data={data} />
                    ) : (
                        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                            <div className="flex flex-col relative">
                                <div className="flex flex-col justify-center items-center gap-1 text-center">
                                    <h3 className="text-3xl mb-3 font-bold tracking-tight">
                                        You have no posts
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        You can add a new post by clicking the button below
                                    </p>
                                    <Link href={'/blogs/create'}>
                                        <Button className="mt-4">Add Post</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default BlogsPage