import request from "../util/request";


/**
 * 获取会议类别
 */
export function getTypeTree(){
  
  return request({
    url:"/publicType/getPublicTypeTree",
    method:"GET",
    
  })
}