import router from '@/router/index'
import { Message } from 'element-ui'
/* import { getUserInfo } from '../api/user'; */
/* import Admin  from '../components/admin/Admin'
import MyFile  from '../components/doctor/MyFile'
import PaperRequest  from '../components/admin/PaperRequest'
import EditMeeting  from '../components/admin/EditMeeting'
import fileManagement  from '../components/doctor/FileManagement'
import FindRepeat  from '../components/repeat/FindRepeat'
import AdminMain  from '../pages/AdminMain'
import repeatMain  from '../pages/RepeatMain'
import User  from '../components/doctor/User'
import Main  from '../pages/Main' */
/* import { getUserInfo } from '../api/user' */

/* const asyncRoutes = [
  {
    path:"/teacher",
    name:"teacherMain",
    redirect:'/teacher/userCenter',
    component:Main,
    children:[
      {
        path:'/teacher/userCenter',
        name:"user",
        component:User
      },
      {
        path:'/teacher/myfile',
        name:"myfile",
        component:MyFile
      },
      {
        path:'/teacher/fileManagement',
        name:"fileManagement",
        component:fileManagement
      },
    ]
  },
{
    path:"/admin",
    component:AdminMain,
    children:[
      {
        path:"/admin",
        name:"Admin",
        component:Admin,

      },
      {
        path:"/admin/paperRequest",
        name:"paperRequest",
        component:PaperRequest,

      },
      {
        path:"/admin/editMeeting",
        name:"editMeeting",
        component:EditMeeting,

      },
      
    ]
  },
  {
    path:"/repeat",
    name:"repeatMain",
    component:repeatMain,
    children:[
      {
        path:"/repeat",
        name:"findRepeat",
        component:FindRepeat,

      },
    ]
  },
] */
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
      
     
      //todo
     /*  let hasRole = localStorage.getItem('role')
      //已经获取过权限啦就不再添加路由 在第一次添加role时候添加路由
        if(hasRole){
          next()
        }else{
          let {role} = getUserInfo()
          localStorage.setItem('role',role) //这样就hasRole啦
          let addRoutes = asyncRoutes[role]
          router.addRoute(addRoutes)
          next({ ...to, replace: true })
        } */
        next()
    }
  }else{
    next()
  }
  })