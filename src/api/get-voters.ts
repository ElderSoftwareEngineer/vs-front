import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface GetVotersQuery {
    pageIndex?: number | null,
    name?: string | null,
    sexo?: string | null,
    bairro?: string | null
}
export interface GetVotersResponse {
        current_page: number,
        data: [
            {
                id: number,
                name: string,
                sexo: string,
                phone_number: string,
                date_of_birth: string,
                district_id: 26,
                district_name: string,
                voter_zone: string,
                section_zone: string,
                created_at: string | null,
                updated_at: string | null,
                status: string | undefined
            }
        ],
        first_page_url: string,
        from: number,
        last_page: number | null,
        last_page_url: string | null,
        next_page_url: string | null,
        path: string | null,
        per_page: number,
        prev_page_url: string | null,
        to: number | null,
        total: number
}

export async function getVoters({pageIndex,name,sexo,bairro}:GetVotersQuery){
  const response = await api.post<GetVotersResponse>(`/allVoters?page=${pageIndex}`, {
            // page: pageIndex,
            name: name,
            sexo: sexo,
            bairro: bairro
        },{
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`
            },
        });
  console.log(response.data);
  return response.data;
}