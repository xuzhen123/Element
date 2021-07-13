import axios from 'axios'
import store from '../store/index'
import { Message, MessageBox } from 'element-ui';

 function httpRequest(config){
   const instance = axios.create({
       baseURL: 'http://hza1-uat01.gqioa.com:7380',
       timeout: 5000,
       headers: {
        'Accept-Language': navigator.language || 'en-US',
        'Content-Type': 'application/json;charset=utf-8',
        'Reqest-From': 'freepay.manager',
     },
   }) 

   //拦截器 请求的拦截
   instance.interceptors.request.use(request => {
       if(!request.headers.Authorization){
        request.headers.Authorization = store.getters.authorization
       }
       return request
   })

   //拦截器 返回报文的拦截
   instance.interceptors.response.use(response => {
       return response.data.data
   }, (error) =>{
       // Do something with error
        if (error.response) {
            if (error.response.data) {
                Message({
                    message: error.response.data.message || error.response.statusText,
                    type: 'error'
                });
                if (error.response.data.status === 400 && error.response.data.data && error.response.data.data.model_error) {
                    let dom = [];
                    for (var p in error.response.data.data.model_error) {
                        dom.push(`<p><b>${p}</b><span style="padding-left:10px">${error.response.data.data.model_error[p].join(null)}</span></p>`)
                    }
                    MessageBox.alert(dom.join('<br/>'), error.response.data.message, {
                        type: 'error',
                        dangerouslyUseHTMLString: true
                    });
                }
            }
            else {
                Message({
                    message: `${error.response.status}:${error.response.statusText}`,
                    type: 'error'
                });
            }
        }

        return Promise.reject(error);
   })

   return instance(config)
}

export default httpRequest