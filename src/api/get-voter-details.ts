import { api } from "@/lib/axios"
import  Cookies  from 'js-cookie'

export interface GetVoterDetailsParams {
    voterId: number
}

export interface GetVoterDetailsResponse {
    id: number,
    name: string,
    sexo: string,
    phone_number: string,
    date_of_birth: string,
    district_id: number,
    district: {
        name: string
    },
    voter_zone: string | null,
    section_zone: string | null,
    district_name: string,
    created_at: string | null,
    updated_at: string | null
}

export async function getVoterDetails({voterId}: GetVoterDetailsParams) {
    const response = await api.get<GetVoterDetailsResponse>(`/voters/${voterId}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('auth')}`
        }
    })
    return response.data
}