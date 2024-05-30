import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetTotalFResponse {
    total: number
}

export async function getTotalF(){
  const response = await api.get<GetTotalFResponse>(`/getTotalF`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data);
  return response.data;
}