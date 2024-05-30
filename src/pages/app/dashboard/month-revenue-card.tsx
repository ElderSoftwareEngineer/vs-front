import { getTotalVoters } from "@/api/get-total-voters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";

export function MonthRevenueCard() {

    const { data:TotalVoters } = useQuery({
        queryFn: getTotalVoters,
        queryKey: ['total-voters']
    })

  return (
    <Card>
        <CardHeader className="flex-row items-center justify-between space-y-8 pb-2">
            <CardTitle className="text-base font-semibold">
                Total de Cadastros
            </CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
            {TotalVoters && (
                <span className="text-2xl font-bold tracking-tight">
                    {TotalVoters.total}
                </span>
            )}
        </CardContent>
    </Card>
  );
}