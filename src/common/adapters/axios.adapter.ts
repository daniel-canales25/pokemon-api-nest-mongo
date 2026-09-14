import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";
// Creamos un Adaptador para Axios para centralizar el uso llamadas por axios
@Injectable()
export class AxiosAdapter implements HttpAdapter{
    
    private axios: AxiosInstance = axios

    async get<T>(url: string): Promise<T> {
        try {
            const {data} = await this.axios.get<T>(url);
            return data
        } catch (error){
            throw new Error('This is an error - Check logs')
        }
    }

}