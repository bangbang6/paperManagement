import request from "../util/request";
/**
 * 获取链上论文列表
 * @returns 
 */
export function getChainPapers(){
  return request({
    url:"/paper/getUpChainPapers",
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