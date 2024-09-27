"use server"
import * as z from "zod"
import bcryptjs from "bcryptjs"
import db from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { signIn } from "@/auth"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "invalid fields" }
    }
    const { email, password, name } = validatedFields.data
    const hashP = await bcryptjs.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        return { error: "user already exists" }
    }
    await db.user.create({
        data: {
            name,
            password: hashP,
            email,
        }
    })


}