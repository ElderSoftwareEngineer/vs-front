import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetTotalVotersResponse {
    total: number
}

export async function getTotalVoters(){
  const response = await api.get<GetTotalVotersResponse>(`/getTotalVoters`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data);
  return response.data;
}