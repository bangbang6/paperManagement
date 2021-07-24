import request from "../util/request";
//!获取dblp未处理数量
export function getDblpDataCount(){
  return request({
    url:"/dblp/getCountUndoDblpData",
    method:'GET'
  })
}
/**
 * 获取未处理的论文
 * @returns 
 */
export function getUndoDblpData(){
  return request({
    url:"/dblp/getUndoDblpData",
    method:"GET",
  })
}
/**
 * 根据title获取dblp详情论文
 */
export function getDblpDataById(id){
  return request({
    url:`/dblp/getDblpDataById?id=${id}`,
    method:'GET'
  })
}
/**
 * 根据英文名获取信息
 * @param {*} englishname 
 * @returns 
 */
export function getUserByEnglishname(englishName){
  return request({
    url:`/user/findUserByEnglishName?englishName=${englishName}`,
    method:'GET'
  })
}
/**
 * 根据英文名获取信息
 * @param {*} englishname 
 * @returns 
 */
export function doDblpData(id){
  return request({
    url:`/dblp/doDblpData`,
    method:'POST',
    data:{
      state:2,
      id:id
    }
  })
}
/**
 * 根据论文名获取论文信息
 * @param {*} title 
 * @returns 
 */
export function getUndoDblpByTitle(title){
  return request({
    url:`/dblp/getUndoDblpByTitle?title=${title}`,
    method:'GET',
    
  })
}