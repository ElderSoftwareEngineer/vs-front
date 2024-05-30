import { getTotalM } from "@/api/get-total-m";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";

export function TotalSexoMCard() {

    const { data:TotalM } = useQuery({
        queryFn: getTotalM,
        queryKey: ['total-m']
    })

  return (
    <Card>
        <CardHeader className="flex-row items-center justify-between space-y-8 pb-2">
            <CardTitle className="text-base font-semibold">
                Total M
            </CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
            {TotalM && (
                <span className="text-2xl font-bold tracking-tight">
                    {TotalM.total}
                </span>
            )}
            {/* <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 dark:text-emerald-400">
                    +6%
                </span>{' '}
                em relação ao mês passado
            </p> */}
        </CardContent>
    </Card>
  );
}