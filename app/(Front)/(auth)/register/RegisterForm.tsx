"use client"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import {
    CardContent, CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { register } from "@/actions/register"
import { useState } from "react"
const RegisterForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        try {
            await register(values);
            setSuccess("Registration successful");

        } catch (error: any) {
            setError("Error" + error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} name="name" type="name" placeholder="Full name" />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} name="email" type="email" placeholder="example@example.com" />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} name="password" type="password" placeholder="********" />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 justify-center items-center">
                    <Button className="w-full" type="submit">Sign in</Button>
                    <div>{error} </div>
                    <div>{success} </div>
                </CardFooter>
            </form>
        </Form>
    )
}

export default RegisterForm