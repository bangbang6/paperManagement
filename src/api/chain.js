import request from "../util/request";
/**
 * 获取链上论文列表  可以分页
 * @returns 
 */
export function getChainPapers(page=0,size=8){
  return request({
    url:`/paper/query?page=${page}&size=${size}`,
    method:"POST",
    data:{
      
    }
  })
}
/**
 * 获取链上专利列表  可以分页
 * @returns 
 */
export function getChainPatents(page=0,size=8){
  return request({
    url:`/patent/getUpChainPatents?page=${page}&size=${size}`,
    method:"GET",
   

  })
}
/**
 * 获取异常论文列表
 * @returns 
 */
export function getErrorList(){
  return request({
    url:"/paperException/getExceptionList",
    method:"GET",

  })
}
/**
 * 根据论文id获取论文异常详情
 * @param {*} paperId 
 * @returns 
 */
export function getErrorDetail(paperId){
  return request({
    url:`/paperException/info/${paperId}`,
    method:"GET",

  })
}
/**
 * 根据论文id获取溯源历史
 * @param {*} paperId 
 * @returns 
 */
export function  getHistory(paperId){
  return request({
    url:`/paperHis/getHistoryByPaperId/${paperId}`,
    method:"GET",

  })
}

export function  getExceptionListByTitle(title){
  return request({
    url:`/paperException/getExceptionListByTitle?title=${title}`,
    method:"GET",

  })
}

export function findPapersByQuery(queryData){
  return request({
    url:`/paper/query?page=${queryData.page}&size=${queryData.size}`,
    method:"POST",
    data:queryData,
  })
}
export function findPatentsByQuery(queryData){
  return request({
    url:`/patent/findPatentsByQueryCriteria?page=${queryData.page}&size=${queryData.size}`,
    method:"POST",
    data:queryData,
  })
}