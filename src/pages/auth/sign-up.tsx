import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Helmet } from "react-helmet-async"
import { Controller,useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getDistricts } from "@/api/get-districts"
import { registerVoter } from "@/api/register-voter"

const signUpForm = z.object({
    name: z.string({required_error: "O nome é obrigatório"}).min(1, {message: "O nome é obrigatório"}),
    sexo: z.string({required_error: "O sexo é obrigatório"}).min(1, {message: "O sexo é obrigatório"}),
    phone_number: z.string(),
    // date_of_birth: z.string({required_error:"A data de aniversário é obrigatório"}).min(1,{message: "A data de aniversário é obrigatório"}),
    date_of_birth: z.string(),
    district_id: z.string({required_error: "O bairro é obrigatório."}).min(1, {message: "O bairro é obrigatório."}),
    voter_zone: z.string(),
    section_zone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp(){

    const {data:districts} = useQuery({
        queryKey: ['districts'],
        queryFn: getDistricts
    })
    
    const {
        register,
         handleSubmit,
         control,
         reset,
        formState: {isSubmitting, errors},
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm)
    })
    const {mutateAsync: registerVoterFn} = useMutation({
        mutationFn: registerVoter
    })

    async function handleSignUp(data: SignUpForm){
        try {
            await registerVoterFn({
                name: data.name,
                sexo: data.sexo,
                phone_number: data.phone_number,
                date_of_birth: "0000-00-00",
                district_id: Number(data.district_id),
                voter_zone: data.voter_zone,
                section_zone: data.section_zone
            });
            reset({
                name: '',
                sexo: '',
                phone_number: '',
                date_of_birth: '',
                district_id: '',
                voter_zone: '',
                section_zone: ''
            });
            toast.success('Cadastro efetuado com sucesso!',{
                // action: {
                //     label: 'Continuar',
                //     onClick: () => navigate('/')
                // }
            })
        } catch (error) {
            toast.error('Erro ao tentar cadastrar!');
        }
        
    }
    return (
        <>
            <Helmet title="Cadastro"/>
           <div className="p-8">
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Cadastrar novo
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja bem-vindo! Preencha o formulário abaixo para cadastrar um novo.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-1">
                        <div className="space-y-1">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" type="text" placeholder="Ex: José Cardoso Oliveira" {...register('name')}></Input>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="sexo">Sexo</Label>
                        <Controller 
                                name="sexo"
                                control={control}
                                render={({field: {name,onChange,value,disabled}}) => {
                                    return (
                                        <Select 
                                            name={name} 
                                            onValueChange={onChange} 
                                            value={value}
                                            disabled={disabled}
                                            >
                                            <SelectTrigger className="space-y-1">
                                                <SelectValue placeholder="Sexo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">M</SelectItem>
                                                <SelectItem value="2">F</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )
                                }}
                                />
                                {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="phoneNumber">Número do Telefone</Label>
                            <Input id="phoneNumber" type="tel" placeholder="Ex: 7199302-3367" {...register('phone_number')}></Input>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                            <Input id="date_of_birth" type="date"  {...register('date_of_birth')}></Input>
                            {/* {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth.message}</p>} */}
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="district">Bairro</Label>
                        <Controller 
                                name="district_id"
                                control={control}
                                render={({field: {name,onChange,value,disabled}}) => {
                                    return (
                                        <Select 
                                            name={name} 
                                            onValueChange={onChange} 
                                            value={value}
                                            disabled={disabled}
                                            >
                                            <SelectTrigger className="space-y-1">
                                                <SelectValue placeholder="Bairro" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {districts && districts.districts.map(district => {
                                                    return (
                                                        <SelectItem key={district.id} value={String(district.id)}>
                                                            {district.name}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                    )
                                }}
                                />
                                {errors.district_id && <p className="text-red-500 text-sm">{errors.district_id.message}</p>}
                            </div>
                        <div className="space-y-1">
                            <Label htmlFor="zone">Zona</Label>
                            <Input id="zone" type="text" placeholder="Ex: 026" {...register('voter_zone')}></Input>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="session">Seção</Label>
                            <Input id="session" type="number" placeholder="Ex: 0120" {...register('section_zone')}></Input>
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit"> 
                            Finalizar Cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao clicar em "Finalizar Cadastro"<b className="underline">VS.</b>
                        </p>
                    </form>
                </div>
           </div>
        </>
        )
}