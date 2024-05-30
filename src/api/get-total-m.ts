import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetTotalMResponse {
    total: number
}

export async function getTotalM(){
  const response = await api.get<GetTotalMResponse>(`/getTotalM`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data);
  return response.data;
}