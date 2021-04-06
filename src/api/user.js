import request from "../util/request";
/* const token = localStorage.getItem('token') */

export function login(username,password){
  return request({
    url:"/auth/login",
    method:"POST",
    
    data:{
      username,
      password
    }
  })
}




//获取个人所有论文
export function getMyFilelist(){
  return request({
    url:"/paper/getUserPapers",
    method:"GET",
  })
}
//修改论文
export function updateFile(data){
  return request({
    url:"/paper/update",
    method:"POST",
    data
  })
}

export function updateUserInfo(user){
  return request({
    url:"/user/updateUserInfo",
    method:"POST",
    data:user
  })
}


export function getUserInfo(){
  return request({
    url:"/user/getCurrentUserInfo",
    method:'GET'
  })
}


export function register(data){
  return request({
    url:"/user/register",
    method:'POST',
    data
  })
}