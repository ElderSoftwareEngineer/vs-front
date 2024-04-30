import { api } from "@/lib/axios";

export interface GetDistrictsResponse {
    districts: {
        id: number;
        name: string;
    }[];
}

export async function getDistricts() {
    const response = await api.get<GetDistrictsResponse>('/districts');
    console.log(response.data);
    return response.data;
}