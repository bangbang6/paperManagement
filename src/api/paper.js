import request from "../util/request";


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