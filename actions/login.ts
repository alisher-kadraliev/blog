"use server"
import * as z from "zod"

import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { revalidatePath } from "next/cache"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Try again!" }
    }
    const { email, password } = validatedFields.data

    await signIn("credentials", {
        email,
        password,
    })
    revalidatePath("/login")
    return { success: "Login successful", redirectTo: "/dashboard" }
}