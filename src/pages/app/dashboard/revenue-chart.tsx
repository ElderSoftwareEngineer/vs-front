import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import colors from 'tailwindcss/colors'
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
} from 'recharts'
import { useQuery } from "@tanstack/react-query";
import { getAmountByPeriod } from "@/api/get-amount-by-period";

export function RevenueChart(){

    const { data:amountByPeriod } = useQuery({
        queryFn: getAmountByPeriod,
        queryKey: ['amount-by-period']
    })
    
    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Cadastro do periodo</CardTitle>
                    <CardDescription>Cadastro diário no período</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={amountByPeriod} style={{fontSize: 12}}>
                        <XAxis dataKey="period" tickLine={false} axisLine={false} dy={16}/>
                        
                        <YAxis
                            stroke="#888"
                            axisLine={false}
                            tickLine={false}
                            width={20}
                            // tickFormatter={value}
                        />
                        <CartesianGrid vertical={false} className="stroke-muted"/>
                        <Line type="linear" strokeWidth={2} dataKey="amount" stroke={colors['violet'][500]}/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}