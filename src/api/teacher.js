/**
 * 上传文件
 */
import request from '../util/request'
export async function uploadFile(obj){
   return request({
     url:"/file/upload",
    method:'POST',
  
    data:obj
    
   })
}
export async function uploadPaper(obj){
   return request({
     url:"/paper/upload",
    method:'POST',
  
    data:obj
    
   })
}


