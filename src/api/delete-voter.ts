import { api } from "@/lib/axios";
import  Cookies  from 'js-cookie'

export interface DeleteVoterParams {
    voterId: number;
}

export async function deleteVoter({voterId} : DeleteVoterParams){
    await api.delete(`/voters/${voterId}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('auth')}`
        }
    });
}