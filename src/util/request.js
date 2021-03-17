import axios from 'axios'

const request = axios.create({
  baseURL:"http://211.69.197.138:8080",
  timeout:5000
})
request.interceptors.response.use(
  
  response=>{
    if(response.status == 200){
      return response
    }else{
      
     return Promise.reject(new Error('请求失败'))
    }
  },
  err=>{
    return Promise.reject(err)}
)
export default request