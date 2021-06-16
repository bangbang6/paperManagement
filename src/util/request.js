import axios from 'axios'
import { Message } from '_element-ui@2.15.1@element-ui'

const request = axios.create({
  //baseURL:"http://211.69.197.138:8090",//赵
   baseURL:"http://211.69.197.157:8090",//卢
    //  baseURL:"http://localhost:8090",//线
  timeout:50000
})

request.interceptors.request.use(
  request=>{
    const token1 = localStorage.getItem('token') 
    if(token1){
      request.headers['token'] = token1
    }
    return request
  }
)
request.interceptors.response.use(
  
  response=>{
    if(response.status == 200){
      return response.data
    }else{
      
     return Promise.reject(new Error('请求失败'))
    }
  },
  err=>{
    console.log('err',err);
    Message({
      type:'error',
      duration:1000,
      message:err.response  //err.response.data这个可以拿到报错的具体message
    })
    return Promise.reject(err)
  }
)
export default request