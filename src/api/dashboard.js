import request from "../util/request";
/**
 * 获取最近异常列表
 * @param {*} number 
 * @returns 
 */
export function getErrorList(number=8){
  return request({
    url:`/admin/getRecentExceptionAchv?number=${number}`,
    method:'GET'
  })
}
/**
 * 获取成果总数
 * @param {*} number 
 * @returns 
 */
export function getPaperCount(){
  return request({
    url:`/admin/getAchvCount`,
    method:'GET'
  })
}
/**
 * 获取用户总数
 * @param {*} number 
 * @returns 
 */
export function getUserCount(){
  return request({
    url:`/admin/getUserCount`,
    method:'GET'
  })
}
/**
 * 获取成果数量变化
 * @param {*} number 
 * @returns 
 */
export function getCountThread(month=12){
  return request({
    url:`/admin/getCountTrend?month=${month}`,
    method:'GET'
  })
}
/**
 * 获取成果数量变化
 * @param {*} number 
 * @returns 
 */
export function getCountByGroup(month=0){
  return request({
    url:`/admin/getCountByGroup?month=${month}`,
    method:'GET'
  })
}
/**
 * 获取异常总数
 * @param {*} number 
 * @returns 
 */
export function getErrorCount(){
  return request({
    url:`/admin/getExceptionCount`,
    method:'GET'
  })
}