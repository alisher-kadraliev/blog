import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast'
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layouts'
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
   /*  if (!session) {
        redirect("/login")
    } */
    return (
        <>
            <Toaster />
            <SessionProvider session={session}>
                <AdminPanelLayout>
                    {/* <NavbarPc /> */}
                    {children}
                </AdminPanelLayout>
            </SessionProvider>
        </>
    )
}