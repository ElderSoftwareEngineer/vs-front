import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetAmountByPeriodResponse {
  amountVotersByPeriod:{
    period: string,
    amount: number
    }[]
}

export async function getAmountByPeriod(){
  const response = await api.get<GetAmountByPeriodResponse|any>(`/getAmountVotersByPeriod`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data.amountVotersByPeriod);
  return response.data.amountVotersByPeriod;
}