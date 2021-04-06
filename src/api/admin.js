import request from "../util/request";


/**
 * 获取已经收录但待审核的paper
 */
export function getToAcceptedReviewPapers(){
  return request({
    url:"/admin/getToAcceptedReviewPapers",
    method:'GET'
  })
}
/**
 * 获取将要投稿但待审核的paper
 */
export function getToPublicReviewPapers(){
  return request({
    url:"/admin/getToPublicReviewPapers",
    method:'GET'
  })
}

export function reviewToUpChain(data){
  return request({
    url:`/admin/reviewToUpChain?paperId=${data.paperId}&op=${data.op}`,
    method:'POST'
    
  })
}
export function reviewToPublic(data){
  return request({
    url:`/admin/reviewToPublic?paperId=${data.paperId}&op=${data.op}`,
    method:'POST'
  
  })
}
