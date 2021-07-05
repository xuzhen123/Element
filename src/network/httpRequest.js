import axios from 'axios'
import store from '../store/index'

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
   instance.interceptors.request.use(request=> {
       if(!request.headers.Authorization){
        request.headers.Authorization = store.getters.authorization
       }
       return request
   })

   //拦截器 返回报文的拦截
   instance.interceptors.response.use(response=> {
       return response
   })

   return instance(config)
}

export default httpRequest