export default class StorageService {

    setItem(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key){
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }

    removeItem(key){
        localStorage.removeItem(key);
    }
}