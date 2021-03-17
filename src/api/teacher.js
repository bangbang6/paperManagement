/**
 * 上传文件
 */
import requset from '@/util/request'
export async function uploadFile(obj){
   return  requset({
     url:"/file/upload",
    method:'POST',
    
    data:obj
    
   })
}
export async function uploadPaper(obj){
   return  requset({
     url:"/paper/upload",
    method:'POST',
    
    data:obj
    
   })
}