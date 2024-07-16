import { getTotalVoters } from "@/api/get-total-voters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";

export function TotalMetaCard() {

    const { data:TotalVoters } = useQuery({
        queryFn: getTotalVoters,
        queryKey: ['total-voters']
    })

  return (
    <Card>
        <CardHeader className="flex-row items-center justify-between space-y-8 pb-2">
            <CardTitle className="text-base font-semibold">
                Total de Cadastros / (%) Meta de 5.000
            </CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
        {TotalVoters && (
                <span className="text-2xl font-bold tracking-tight">
                    {Number(TotalVoters.total) }
                    / 
                    { ((Number(TotalVoters.total)/5000) * 100).toFixed(2)}%
                </span>
            )}
        </CardContent>
    </Card>
  );
}