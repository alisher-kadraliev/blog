import { Button } from '@/components/ui/button'
import { auth } from "@/auth"
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


const Dashboard = async () => {
    const session = await auth()
    return (
        <ContentLayout>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
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
                </CardContent>
            </Card>
        </ContentLayout>

    )
}

export default Dashboard