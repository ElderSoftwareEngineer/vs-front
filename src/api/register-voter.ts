import { api } from "@/lib/axios";

export interface RegisterVoterBody {
    name: string,
    sexo: string,
    phone_number: string | undefined | null | '',
    date_of_birth: string,
    district_id: number,
    voter_zone: string | undefined | null | '',
    section_zone: string | undefined | null | '',
}

export async function registerVoter({
    name,
    sexo,
    phone_number,
    date_of_birth,
    district_id,
    voter_zone,
    section_zone
}: RegisterVoterBody) {
    await api.post('/voters', {
        name,
        sexo,
        phone_number,
        date_of_birth,
        district_id,
        voter_zone,
        section_zone
    });
}
