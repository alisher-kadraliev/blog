"use client"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import {
    CardContent, CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { login } from "@/actions/login"
const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        login(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-4">
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
                    <Button className="w-full text-xl" type="submit" >Login </Button>
                </CardFooter>
            </form>
        </Form>
    )
}

export default LoginForm