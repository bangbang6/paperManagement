import request from "../util/request";

// const downloadBaseUrl = 'http://211.69.197.138:8090'
const downloadBaseUrl = 'http://localhost:8090'
/**
 * 获取paper详细内容
 * @param {*} id 
 */
export function getPaperDetail(id){
  return request({
    url:`/paper/getPaperVO?id=${id}`,
    method:'get',
    
  })
}

//修改信息
export function editPaper(obj){
  return request({
    url:"",
    data:obj,
    method:"POST",
   
  })
}
/**
 * 根据中文名返回用户
 * @param {*} chineseName 
 */
export function getUserByChineseName(ChineseName){
  
  return request({
    url:`/user/getUserByChineseName?ChineseName=${ChineseName}`,
    method:'GET',
    
  })
}

export function downloadFile(id){
  let a = document.createElement('a')
  a.href =`${downloadBaseUrl}/file/download?file_id=${id}`
  a.click();
  
}