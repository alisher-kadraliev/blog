import React from 'react'
import { Badge } from '@/components/ui/badge'
import db from '@/lib/db'

const NavbarBadge = async () => {
    const post = await db.post.findMany()
    return (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {post.length}
        </Badge>
    )
}

export default NavbarBadge