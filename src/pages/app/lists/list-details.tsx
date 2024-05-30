import { getVoterDetails } from "@/api/get-voter-details";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";

export interface ListDetailsProps {
    voterId: number,
    open: boolean,
}

export function ListDetails({voterId, open} : ListDetailsProps) {
    const  {data: voter} = useQuery({
        queryKey: ['voter', {voterId}],
        queryFn: () => getVoterDetails({voterId}),
        enabled: open
    })

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{voterId}</DialogTitle>
                <DialogDescription>Detalhes</DialogDescription>
            </DialogHeader>

        {voter && (
            <div className="space-y-6">
            <Table>
                <TableBody>
                    {/* <TableRow>
                        <TableCell className="text-muted-foreground">Status</TableCell>
                        <TableCell className="flex justify-end">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-slate-400"/>
                                <span className="font-medium text-muted-foreground">
                                    Pendente
                                </span>
                            </div>
                        </TableCell>
                    </TableRow> */}

                    <TableRow>
                        <TableCell className="text-muted-foreground">Nome</TableCell>
                        <TableCell className="flex justify-end">
                            {voter.name}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">Telefone</TableCell>
                        <TableCell className="flex justify-end">
                            {voter.phone_number}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">Sexo</TableCell>
                        <TableCell className="flex justify-end">
                            {voter.sexo}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Data Nascimento
                        </TableCell>
                        <TableCell className="flex justify-end">
                            {voter.date_of_birth}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Bairro
                        </TableCell>
                        <TableCell className="flex justify-end">
                            {voter.district.name}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Zona
                        </TableCell>
                        <TableCell className="flex justify-end">
                            {voter.voter_zone}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="text-muted-foreground">
                            Seção
                        </TableCell>
                        <TableCell className="flex justify-end">
                            {voter.section_zone}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        )}
    </DialogContent>
    )
}