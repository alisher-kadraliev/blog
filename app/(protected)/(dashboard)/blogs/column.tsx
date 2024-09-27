"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "@/components/table/dataTableColumnHeader"
import DropActions from "./components/drop-actions"
import { Checkbox } from "@/components/ui/checkbox"


export type Blogs = {
    id: string;
    title: string;
    content: string;
    slug: string | null;
    published: boolean;
    authorId: string;
    likes: number | null;
    readingTime: number | null;
    image: string | null;
    imageAlt: string | null;
    status: "progress" | "completed";
    watched: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<Blogs>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "order",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order" />
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: "published",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Published" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blogs = row.original

            return (
                <DropActions row={row} />
            )
        },
    },
]
