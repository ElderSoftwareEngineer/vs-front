import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { ListTableRow } from "./list-table-row";
import { ListTableFilters } from "./list-table-filters";
import { Pagination } from "@/components/pagination";
import { getVoters } from "@/api/get-voters";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { getDistricts } from "@/api/get-districts"

export function Lists() {

    const {data:districts} = useQuery({
        queryKey: ['districts'],
        queryFn: getDistricts
    })

    const [searchParams, setSearchParams] = useSearchParams()

    const name = searchParams.get('name')
    const sexo = searchParams.get('sexo')
    const bairro = searchParams.get('bairro')

    const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

    const {data: result} = useQuery(
        {
            queryKey: ['voters', pageIndex, name, sexo, bairro],
            queryFn: () => getVoters({pageIndex, name, sexo, bairro})
        }
    )

    function handlePaginate(pageIndex: number){
        setSearchParams((url) => {
            url.set('page', (pageIndex + 1).toString())
            return url
        })
    }

    return (
        <>
            <Helmet title="Lista" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Lista</h1>
            <div className="space-y-2.5">
                {districts && (
                    <ListTableFilters districts={districts?.districts} />
                )}
                
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Sexo</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Data Nasc</TableHead>
                                <TableHead>Bairro</TableHead>
                                <TableHead>Zona</TableHead>
                                <TableHead>Seção</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result && result.data.map(voter => {
                                return <ListTableRow key={voter.id} voter={voter}/>
                            })}
                        </TableBody>
                    </Table>
                </div>
                {result && (
                    <Pagination 
                    onPageChange={handlePaginate}
                    pageIndex={result.current_page} 
                    totalCount={result.total} 
                    perPager={result.per_page}
                    />
                )}
            </div>
        </div>
    </>
    );
}