import isBrowser from '../utils/isBrowser';

interface IlocalStorage {
    method:string;
    key:string;
    value?:string;
}

const localStorage = (method:string, key:string, value?:string):string => {

 const getStorage = (key: string) => {
    const payload = isBrowser && 
        typeof window.localStorage.getItem(key) !== null &&
        window.localStorage.getItem(key);
    return payload ? payload : '';
 }
 const setStorage = (key:string, value:string) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    return '';
 }
 const clearStorage = (key:string) => {
    window.localStorage.setItem(key, '');
 };

    switch (method) {
        case 'set':
            value && setStorage(key, value);
        break;
        case 'get':
            getStorage(key);
        break;
        case 'clear':
            clearStorage(key);
        break;
        default:
    }
    return '';
}

export default localStorage;