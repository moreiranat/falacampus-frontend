import axios from 'axios';
import StorageService from './StorageService';

export const LOGGED_USER = 'loggedUser';
export const TOKEN = 'token';

//const baseURL = process.env.REACT_APP_API_URL;

export const httpClient = axios.create({
    baseURL:'http://localhost:8080/api',
    withCredentials: true,
});
export default class ApiService{
    
    constructor(endpoint){
        this.endpoint = endpoint;

        this.StorageService = new StorageService();
        const token = this.StorageService.getItem(TOKEN);
        this.registerToken(token);
    }

    registerToken(token){
        if (token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    post(url, params){
        url=this.buildUrl(url);
        return httpClient.post(url, params);
    }
    put(url,params){
        url=this.buildUrl(url);
        return httpClient.put(url, params); 
    }
    delete(url){
        url =this.buildUrl(url);
        return httpClient.delete(url);
    }

    get(url){
        url = this.buildUrl(url);
        return httpClient.get(url);
    }

    getAll(url){
        url = this.buildUrl(url);
        return httpClient.get(url);
    }

    patch(url, params) {
        url = this.builderUrl(url);
        return httpClient.patch(url, params);
    }

    buildUrl(url){
        return `${this.endpoint}${url}`;
    }
}
