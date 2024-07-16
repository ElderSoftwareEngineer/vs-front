import { Helmet } from "react-helmet-async";
import { TotalMetaCard } from "./total-meta-card";
import { TotalSexoMCard } from "./total-sexo-m-card";
import { TotalSexoFCard } from "./total-sexo-f-card";
import { TotalMelhorBairro } from "./total-melhor-bairro-card";

import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-charts";

export function Dashboard() {
  return (
    <>
        <Helmet title="Dashboard"/>
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TotalMetaCard/>
            {/* <MonthRevenueCard/> */}
            <TotalSexoMCard/>
            <TotalSexoFCard/>
            <TotalMelhorBairro/>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-4">
            <RevenueChart/>
            <PopularProductsChart/>
        </div>
    </>
  );
}