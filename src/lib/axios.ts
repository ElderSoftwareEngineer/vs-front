// import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://yvq0ypx859.execute-api.us-east-1.amazonaws.com/dev/api'
    // baseURL: 'http://localhost:8001/api',
    // withCredentials: true
})