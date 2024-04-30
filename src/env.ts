import { z } from 'zod'

const envSchama = z.object({
    VITE_API_URL: z.string().url(),
})

export const env = envSchama.parse(import.meta.env)