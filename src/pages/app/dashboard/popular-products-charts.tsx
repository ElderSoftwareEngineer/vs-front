import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import colors from 'tailwindcss/colors'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { BarChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAmountFiveDistricts } from "@/api/get-amount-five-districts";



const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500]
]


export function PopularProductsChart(){

    const { data:amountFiveDistricts } = useQuery({
        queryFn: getAmountFiveDistricts,
        queryKey: ['total-five-districts']
    })
    
    return (
        <Card className="col-span-6 lg:col-span-3">
            <CardHeader className="pb-8">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">5 Melhores Bairros</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground"/>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart style={{fontSize: 12}}>
                        <Pie 
                            data={amountFiveDistricts}
                            dataKey="amount"
                            nameKey="district"
                            cx="50%"
                            cy="50%"
                            outerRadius={86}
                            innerRadius={64}
                            strokeWidth={8}
                            labelLine={false}
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index,
                              }) => {
                                const RADIAN = Math.PI / 180
                                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                              
                                return (
                                  <text
                                    x={x}
                                    y={y}
                                    className="fill-muted-foreground text-xs"
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                  >
                                    {amountFiveDistricts[index].district.length > 12
                                      ? amountFiveDistricts[index].district.substring(0, 12).concat('...')
                                      : amountFiveDistricts[index].district}{' '}
                                    ({value})
                                  </text>
                                )
                              }}
                        >
                            {amountFiveDistricts && amountFiveDistricts.map((_:any,index:any) => {
                                return <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80"/>
                            })}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
    
}

