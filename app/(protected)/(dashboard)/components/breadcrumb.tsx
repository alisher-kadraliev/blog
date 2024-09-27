"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

const BreadCrumb = () => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    const isDashboard = paths === '/dashboard'
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {isDashboard ? (
                    <BreadcrumbItem>Dashboard</BreadcrumbItem>
                ) : (
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {isDashboard ? null : <BreadcrumbSeparator />}
                {isDashboard ? null :
                    pathNames.map((link, index) => {
                        const href = `/${pathNames.slice(0, index + 1).join('/')}`
                        const linkName = link[0].toUpperCase() + link.slice(1, link.length)
                        const isLastPath = pathNames.length === index + 1
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {isLastPath ?

                                        <BreadcrumbPage>{linkName} </BreadcrumbPage>
                                        :
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{linkName} </Link>
                                        </BreadcrumbLink>
                                    }
                                </BreadcrumbItem>
                                {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                            </Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>

    )
}

export default BreadCrumb