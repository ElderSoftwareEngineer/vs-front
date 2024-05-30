import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useMutation} from "@tanstack/react-query"
import { z } from 'zod'
import  Cookies  from 'js-cookie'
import { toast } from "sonner"
import { login } from "@/api/login"

const signInForm = z.object({
    login: z.string({required_error: "O login é obrigatório"}).min(1, {message: "O login é obrigatório"}),
    password: z.string({required_error: "A senha é obrigatória"}).min(1, {message: "A senha é obrigatória"})
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn(){
    const navigate = useNavigate();

    const {
        register,
         handleSubmit,
        formState: {isSubmitting, errors}
    } = useForm<SignInForm>(
        {
            resolver: zodResolver(signInForm)
        }
    )
    const {mutateAsync: loginFn} = useMutation({
        mutationFn: login
    })
    async function handleSignIn(data: SignInForm){
        try {
            const response = await loginFn({
                login: data.login,
                password: data.password
            })
            Cookies.set('auth', response.token);
            toast.success('Login efetuado com sucesso!');
            navigate('/');
        
        } catch (error) {
            toast.error('Erro ao efetuar login!');
        }
    }
    return (
        <>
            <Helmet title="Login"/>
           <div className="p-8">
            <Button variant="link" asChild className="absolute right-8 top-8">
                <Link to="/sign-up" className="">
                    Novo
                </Link>
            </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Acessar Painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe seus registros pelo painel!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="login">Login</Label>
                            <Input id="emloginail" type="login" {...register('login')}></Input>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" {...register('password')}></Input>
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit"> 
                            Acessar Painel
                        </Button>
                    </form>
                </div>
           </div>
        </>
        )
}