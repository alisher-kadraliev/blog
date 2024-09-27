import { auth, signIn } from "@/auth"
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { login } from "@/actions/login"
import LoginForm from "./LoginForm"
import { Toaster } from "react-hot-toast"

const LoginPage = async () => {
    const session = await auth()
    if (session) {
        redirect("/dashboard")
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <LoginForm />
                <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div></div>
                <br />
                <CardFooter>
                    {/* <form className="w-full border rounded-lg flex justify-center items-center"
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: "/dashboard" })
                        }}
                    >
                        <button type="submit" className="p-2 w-full flex mx-auto justify-center items-center"><FcGoogle size={30} /></button>
                    </form> */}
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage

