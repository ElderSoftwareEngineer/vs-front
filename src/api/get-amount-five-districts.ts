import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetAmountFiveDistrictsResponse {
    amountFiveDistricts:{
    district: string,
    amount: number
    }[]
}

export async function getAmountFiveDistricts(){
  const response = await api.get<GetAmountFiveDistrictsResponse|any>(`/amountVotersTopFiveDistricts`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  return response.data.amountFiveDistricts;
}