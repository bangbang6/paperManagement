import request from "../util/request";
/**
 * 获取我的专利
 * @returns 
 */
export function getUserPatents(page=0,size=8){
  return request({
    url: `/patent/getUserPatents?page=${page}&size=${size}`,
    method:'GET'
  })
}
/**
 * 搜索我的专利
 * @param {*} queryData 
 * @returns 
 */
export function findPatentsByQuery(queryData){
  return request({
    url:`/patent/findUserPatentsByQueryCriteria?page=${queryData.page}&size=${queryData.size}`,
    method:"POST",
    data:queryData,
  })
}
/**
 * 搜索我的专利
 * @param {*} queryData 
 * @returns 
 */
export function getPatentVO(id){
  return request({
    url:`/patent/getPatentVO?id=${id}`,
    method:"GET",
    
  })
}
/**
 * 搜索我的专利
 * @param {*} queryData 
 * @returns 
 */
export function updatePatentVO(data){
  return request({
    url:`/patent/update?confirm=${data.confirm}`,
    method:"POST",
    data:data
  })
}
/**
 * 专利溯源
 * @param {*} queryData 
 * @returns 
 */
export function backforward(id){
  return request({
    url:`/patent/getPatentHistory?id=${id}`,
    method:"GET",
  })
}
/**
 * 专利 中文专利是否纯在
 * @param {*} queryData 
 * @returns 
 */
export function checkRelative(relativeTitle){
  return request({
    url:`/patent/checkUsa`,
    method:"POST",
    data:{
      relativeTitle
    }
  })
}

