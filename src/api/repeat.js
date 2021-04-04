import request from "../util/request";

export function checkPaper(){
  return request({
    url:'/dcadmin/getUncheckPaper',
    method:'GET',
   
  })
}

/**
 * 提交查重结果
 * @param {*} data 
 */
export function submitCheckResult(data){
  return request({
    url:'/dcadmin/submitCheckResult',
    data,
    method:'post',
    
  })
}