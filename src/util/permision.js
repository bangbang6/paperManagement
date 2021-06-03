import router from '@/router/index'
import { Message } from '_element-ui@2.15.1@element-ui';
 



router.beforeEach(async(to, from, next) => {
 
  console.log('router change');
  
  let token = localStorage.getItem('token')
  
  if(to.path!=='/login' && to.path !=='/register' && to.path !== '/changePassword'){
    if(!token){
      Message({
        type:'error',
        duration:1000,
        message:"请先登录"
      })
      next({path:"/login"})
    }else{
      let role = localStorage.getItem('role')
      if((to.path.indexOf('/teacher') > -1 && role === '0') ||(to.path.indexOf('/admin') > -1 && role === '1')||(to.path.indexOf('/repeat') > -1 && role === '2') || to.path.indexOf('etail')>-1|| to.path.indexOf('back')>-1){
        next()
      }else{
        Message({
          type:'error',
        duration:1000,
        message:"权限不正确"
        })
        /* next({path:"/login"}) */
      }
     
      
    
    }
  }else{
    next()
  }
  })