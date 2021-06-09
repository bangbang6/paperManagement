import request from "../util/request";
/**
 * 上传软著
 * @param {*} data 
 * @returns 
 */
export function upload(data){
  return request({
    url:'/softwarecopyright/upload',
    method:'POST',
    data
  })
}
/**
 * 分页查询
 * @param {*} data 
 * @returns 
 */
export function getMySoftware(page=0,size=8){
  return request({
    url:`/softwarecopyright/getUserSoftwareCopyrights?page=${page}&size=${size}`,
    method:'GET',
    
  })
}
/**
 * 分页查询
 * @param {*} data 
 * @returns 
 */
export function searchMySoftware(queryData){
  return request({
    url:`/softwarecopyright/findUserSoftwareCopyrightsByQueryCriteria?page=${queryData.page}&size=${queryData.size}`,
    method:'POST',
    data:queryData
  })
}
/**
 * 软著溯源
 * @param {*} data 
 * @returns 
 */
export function getSoftwareHistory(id){
  return request({
    url:`/softwarecopyright/getSoftwareCopyrightHistory?id=${id}`,
    method:'GET',
  })
}