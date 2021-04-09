import request from "../util/request";
/* const token = localStorage.getItem('token') */

export function login(email,password){
  return request({
    url:"/auth/login",
    method:"POST",
    
    data:{
      email,
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


export function register(email,username,password,code){
  
  return request({
    url:`/user/register/${code}`,
    method:'POST',
    data:{
      email,
      password,
      username
    }
  })
}

export function sendEmail(email,username){
  return request({
    url:'/user/toSendMail',
    method:'POST',
    data:{
      email:email,
      username:username
    }
  })
}
export function changePassword(email,password,username,code){
  return request({
    url:`/user/register/${code}`,
    method:'POST',
    data:{
      email:email,
      username:username,
      password:password,
    }
  })
}
/**
 * 确定用户的身份后发邮件
 * @param {*} email 
 * @param {*} username 
 * @returns 
 */
export function toPassword(email,username){
  return request({
    url:`/user/toPassword`,
    method:'POST',
    data:{
      email:email,
      username:username,
      
    }
  })
}
/**
 * 填写新的密码
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @param {*} code 
 * @returns 
 */
export function rePassword(email,password,username,code){
  return request({
    url:`/user/rePassword/${code}`,
    method:'POST',
    data:{
      email:email,
      username:username,
      password:password,
    }
  })
}

export function getAvatar(){
  return request({
    url:'/user/getAvatar',
    method:'GET'
  })
}
export function setAvatar(data){
  return request({
    url:'/user/setAvatar',
    method:'POST',
    data
  })
}