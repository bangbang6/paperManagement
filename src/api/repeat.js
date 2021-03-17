import request from "../util/request";

export function checkPaper(){
  return request({
    url:'/dcadmin/getUncheckPaper',
    method:'GET',

  })
}