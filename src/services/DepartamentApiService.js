import ApiService from './ApiService';

export default class DepartamentApiService extends ApiService{
    constructor(){
        super('/api/departament');
    }
    create(object){
        return this.post('',object);
    }
    update(id,object){
        return this.put(`/${id}`);
    }
    delete(id){
        return super.delete(`/${id}`)
    }
    find(params){
        return this.get(`${params}`);
    }
}