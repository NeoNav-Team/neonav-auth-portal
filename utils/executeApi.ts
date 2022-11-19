import axios from 'axios';
import { apiUrl, authApiEnpoints } from '../utils/constants';

const executeAPI = (endpoint:string, data:object, callback: any, errBack: any):Promise<any> => {
    const axiosDefaults:any = axios.defaults;
    axiosDefaults.port = apiUrl.port;
    const { path, method } = (authApiEnpoints as any)[endpoint];
    const url = `${apiUrl.protocol}://${apiUrl.hostname}${path}`;
    return axios({
        method,
        url,
        data
    }).then(
        function (response) {
            callback && callback(response)
        }
    ).catch(function (error) {
        if (error.response) {
            console.log('Error', error.response.data)
            errBack && errBack(error.response.data);
        } else if (error.request) {
            console.log('Error', error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log('Error', error.config);
        return error;
      });
}

export default executeAPI;