import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Settings, X } from "lucide-react";
import { ListDetails } from "./list-details";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVoter } from "@/api/delete-voter";
import { GetVotersResponse } from "@/api/get-voters";

export interface ListTableRowProps {
    voter: {
        id: number,
        name: string,
        sexo: string,
        phone_number: string,
        date_of_birth: string,
        district_id: number,
        voter_zone: string | null,
        section_zone: string | null,
        district_name: string,
        created_at: string | null,
        updated_at: string | null
    }
}

export function ListTableRow({voter}: ListTableRowProps){
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient();

    const {mutateAsync: delVoter} = useMutation({
        mutationFn: deleteVoter,
        async onSuccess(_, {voterId}){
            const votersListCache = queryClient.getQueriesData<GetVotersResponse>({
                queryKey: ['voters']
            })
            votersListCache.forEach(([cacheKey, cacheData]) => {
                if(!cacheData) return;

                queryClient.setQueryData<any>(cacheKey, {
                    ...cacheData,
                    data: cacheData.data.map((voter) => {
                        if(voter.id === voterId){
                            return {}
                        }
                        return voter
                    })
                })
            })
        }
    })

    
     return (
        
        voter.id && (<TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Settings className="h-3 w-3"/>
                            <span className="sr-only">Editar</span>
                        </Button>
                    </DialogTrigger>

                    <ListDetails open={isDetailsOpen} voterId={voter.id}/>
                </Dialog>
            </TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.name}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.sexo}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.phone_number}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.date_of_birth == "01/01/1900" ? "" : voter.date_of_birth}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.district_name}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.voter_zone ?? ''}</TableCell>
            <TableCell className="font-nono text-xs font-medium">{voter.section_zone ?? ''}</TableCell>
            <TableCell className="font-nono text-xs font-medium">
            <Button onClick={() => delVoter({voterId:voter.id})} variant="ghost" size="xs">
                <X className="mr-2 h-3 w-3"/>
                Deletar
            </Button>
            </TableCell>
        </TableRow>)
        
     );
}