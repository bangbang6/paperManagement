import axios from 'axios'

const request = axios.create({
  baseURL:"http://211.69.197.157:8090",
  timeout:5000
})
const token1 = localStorage.getItem('token') 
request.interceptors.request.use(
  request=>{
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
    return Promise.reject(err)}
)
export default request