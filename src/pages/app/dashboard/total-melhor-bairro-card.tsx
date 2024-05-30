import { getTotalMelhorBairro } from "@/api/get-total-melhor-bairro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";

export function TotalMelhorBairro() {

    const { data:totalMelhorBairro } = useQuery({
        queryFn: getTotalMelhorBairro,
        queryKey: ['total-melhor-bairro']
    })
    
  return (
    <Card>
        <CardHeader className="flex-row items-center justify-between space-y-8 pb-2">
            <CardTitle className="text-base font-semibold">
                Melhor Bairro : {totalMelhorBairro && totalMelhorBairro.name}
            </CardTitle>
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
            {totalMelhorBairro && (
                <span className="text-2xl font-bold tracking-tight">
                    {totalMelhorBairro.total}
                </span>
            )}
        </CardContent>
    </Card>
  );
}