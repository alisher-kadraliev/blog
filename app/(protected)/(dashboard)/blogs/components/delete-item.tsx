
import React from 'react'
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { deletePost } from '@/actions/Post'

const DeleteItems = ({ row }: { row: any }) => {
    const handleDelete = async () => {
        await deletePost(
            row.original.id
        )
    }
    return (
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
    )
}

export default DeleteItems