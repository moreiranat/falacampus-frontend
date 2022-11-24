import ApiService from './ApiService';

export default class UserApiService extends ApiService{
    constructor(){
        super('/user');
    }
    create(object){
        return this.post('', object);
    }
    update(id,object){
        return this.put(`/${id}`, object);
    }
    delete(id){
        return super.delete(`/${id}`)
    }
    find(params){
        return this.get(`${params}`);
    }
    findAll(){
        return this.getAll('/all');
    }
}