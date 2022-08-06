import ApiService from './ApiService';

export default class AnsweApiService extends ApiService{
    constructor(){
        super('/answer');
    }
    create(object){
        return this.post('',object);
    }
    // update(id,object){
    //     return this.put(`/${id}`);
    // }
    // delete(id){
    //     return super.delete(`/${id}`)
    // }
    find(params){
        return this.get(`/${params}`);
    }
    findAll(){
        return this.getAll('');
    }
}