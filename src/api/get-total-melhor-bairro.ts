import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetTotalMelhorBairroResponse {
    name: string,
    total: number
}

export async function getTotalMelhorBairro(){
  const response = await api.get<GetTotalMelhorBairroResponse>(`/getTotalMelhorBairro`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data);
  return response.data;
}