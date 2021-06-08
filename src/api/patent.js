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

export function findPatentsByQuery(queryData){
  return request({
    url:`/patent/findUserPatentsByQueryCriteria?page=${queryData.page}&size=${queryData.size}`,
    method:"POST",
    data:queryData,
  })
}