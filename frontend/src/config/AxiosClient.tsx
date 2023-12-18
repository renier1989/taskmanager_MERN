import axios, { AxiosResponse } from "axios";

const AxiosClient = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default AxiosClient