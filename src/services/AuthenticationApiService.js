import ApiService, {LOGGED_USER, TOKEN} from './ApiService';
import StorageService from './StorageService';

export default class AuthenticationApiService extends ApiService {

    constructor(){
        super('');
        this.storageService = new StorageService();
    }

    // Authentication - Função assíncrona
    async login(registration, password){
        const loginDTO = {
            "registration": registration,
            "password": password
        };

        try{
            
            const response = await this.post('/login', loginDTO);
            const user = response.data.user;
            const token = response.data.token;
    
            this.storageService.setItem(LOGGED_USER, user);
            this.storageService.setIItem(TOKEN, token);
    
            this.registerToken(token);
            return user;
    
        } catch (error){
            return null;
        }


    }

    
    //Remove os dados do usuário
    logout(){
        this.StorageService.removeItem(LOGGED_USER);
        this.StorageService.removeItem(TOKEN);
        
        return this.post('/logout');
    }

    //Retorna o usuário logado armazenado no storageService
    getLoggedUser(){
        return this.StorageService.getItem(LOGGED_USER);
    }
    
    //Retorna o token armazenado no storageService
    getToken(){
        return this.StorageService.getItem(TOKEN);
    }

    //Pega o usuário logado e o token do storageService e envia o token para a api para checar se é válido
    async isAuthenticated(){
        const user = this.getLoggedUser();
        const token = this.getToken();

        if (!user || !token){
            return false;
        }

        const tokenDTO = {
            "token": token
        }

        const response = await this.isTokenValid(tokenDTO);
        return response.data;
    }

    //Checa se o token é válido
    isTokenValid(token){
        return this.post('/isTokenValid', token);
    }

}