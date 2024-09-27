"use client"
import React from 'react'
import { Button } from "@/components/ui/button"

const SearchBtn = () => {

    return (
        <Button variant={"outline"} className="flex gap-3 justify-center items-center text-muted-foreground bg-muted rounded-full">
            <div>Search...</div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
    )
}

export default SearchBtn