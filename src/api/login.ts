import { api } from "@/lib/axios";

export interface LoginBody {
    login: string,
    password: string
}

export async function login({
    login,
    password
}: LoginBody) {
    const response = await api.post('/login', {
        login,
        password
    });

    return response.data;
    
}
