import request from "../util/request";
/**
 * 获取会议类型
 * @returns 
 */
export function getConfType(){
  return request({
    url:"/achievementType/getConfType",
    method:'GET',
  })
}


export function getJournalType1(){
  return request({
    url:"/achievementType/getJournalType1",
    method:'GET',
  })
}
export function getJournalType2(){
  return request({
    url:"/achievementType/getJournalType2",
    method:'GET',
  })
}