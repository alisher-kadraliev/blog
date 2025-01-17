import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { LoginSchema } from "./schemas";
import db from "@/lib/db";

export default {
    providers: [
        Google,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await db.user.findUnique({
                        where: {
                            email,
                        },
                    })
                    if (!user || !user.password) return null

                    const passwordMatch = await bcryptjs.compare(
                        password,
                        user?.password,
                    )

                    if (passwordMatch) return user
                }
                return null
            }
        }),
    ],
} satisfies NextAuthConfig