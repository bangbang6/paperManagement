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
/**
 * 所有软著查询
 * @param {*} data 
 * @returns 
 */
export function getAllSoftware(page=0,size=8){
  return request({
    url:`/softwarecopyright/getUpChainSoftwareCopyright?page=${page}&size=${size}`,
    method:'GET',
  })
}
/**
 * 所有软著搜索
 * @param {*} data 
 * @returns 
 */
export function searchAllSoftware(queryData){
  return request({
    url:`/softwarecopyright/findSoftwareCopyrightsByQueryCriteria?page=${queryData.page}&size=${queryData.size}`,
    method:'POST',
    data:queryData
  })
}
/**
 * 获取软著详细信息
 * @param {*} data 
 * @returns 
 */
export function getSoftwareVO(id){
  return request({
    url:`/softwarecopyright/getSoftwareCopyrightVO?id=${id}`,
    method:'GET',
  })
}
/**
 * 修改软著详细信息
 * @param {*} data 
 * @returns 
 */
export function updateSoftwareVO(data){
  return request({
    url:`/softwarecopyright/update?`,
    method:'POST',
    data,
  })
}