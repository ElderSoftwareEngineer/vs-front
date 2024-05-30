import { GetDistrictsResponse } from "@/api/get-districts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const listFiltersSchema = z.object({
    name: z.string().optional(),
    sexo: z.string().optional(),
    bairro: z.string().optional()
})

type ListFiltersSchema = z.infer<typeof listFiltersSchema>

export function ListTableFilters({districts}:GetDistrictsResponse){

    const [searchParams, setSearchParams] = useSearchParams()

    const name = searchParams.get('name')
    const sexo = searchParams.get('sexo')
    const bairro = searchParams.get('bairro')

    const {register, handleSubmit, control, reset} = useForm<ListFiltersSchema>({
        resolver: zodResolver(listFiltersSchema),
        defaultValues: {
            name: name || '',
            sexo: sexo || '',
            bairro: bairro || ''
        }
    })

    function handleFilter({name,sexo,bairro}: ListFiltersSchema){
        setSearchParams(state => {
            if(name){
                state.set('name', name)
            }else{
                state.delete('name')
            }

            if(sexo){
                state.set('sexo', sexo)
            }else{
                state.delete('sexo')
            }

            if(bairro){
                state.set('bairro', bairro)
            }else{
                state.delete('bairro')
            }

            state.set('page', '1')

            return state

        })
    }

    function handleClearFilters(){
        setSearchParams(state => {
            state.delete('name')
            state.delete('sexo')
            state.delete('bairro')
            state.set('page', '1')
            return state
        })

        reset({
            name: '',
            sexo: '',
            bairro: ''
        });
    }

   return ( 
   <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Input placeholder="Nome" className="h-8 w-[320px]" {...register('name')}></Input>
        <Controller
            control={control}
            name="sexo"
            render={({field: {name,onChange, value,disabled} }) => {
                return (
                    <Select name={name} onValueChange={onChange} value={value} disabled={disabled}>
                        <SelectTrigger className="h-8 w-[180px]">
                            <SelectValue placeholder="Sexo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Sexo</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                    </Select>
                )
            }}
        />
        <Controller 
            control={control}
            name="bairro"
            render={({field: {name,onChange, value,disabled} }) => {
                return (
                    <Select name={name} onValueChange={onChange} value={value} disabled={disabled}>
                        <SelectTrigger className="h-8 w-[180px]">
                            <SelectValue placeholder="Bairro" />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map(district => (
                                <SelectItem key={district.id} value={String(district.id)}>{district.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            }}
        />
        <Button type="submit" variant="secondary" size="xs">
            <Search className="h-4 w-4 mr-2"/>
            Filtrar Listagem
        </Button>

        <Button onClick={handleClearFilters} type="button" variant="outline" size="xs">
            <X className="h-4 w-4 mr-2"/>
            Remover Filtros
        </Button>
    </form>)
}