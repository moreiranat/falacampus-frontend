import ApiService from './ApiService';

export default class DepartamentApiService extends ApiService{

    constructor(){
        super('/departament');
    }

    create(object){
        return this.post('',object);
    }
    update(id,object){
        return this.put(`/${id}`,object);
    }
    delete(id){
        return super.delete(`/${id}`)
    }
    find(params){
        return this.get(`${params}`);
    }
    findAll(params){
        return this.getAll('');
    }
    
}