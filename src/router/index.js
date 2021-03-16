import VueRouter from 'vue-router'

import User  from '../components/doctor/User'
import Login  from '../components/login/Login'
import Register  from '../components/login/Register'
import Admin  from '../components/admin/Admin'
import MyFile  from '../components/doctor/MyFile'
import PaperRequest  from '../components/admin/PaperRequest'
import EditMeeting  from '../components/admin/EditMeeting'
import fileManagement  from '../components/doctor/FileManagement'
import FindRepeat  from '../components/repeat/FindRepeat'
import AdminMain  from '../pages/AdminMain'
import repeatMain  from '../pages/RepeatMain'
import undoPaperdetail  from '../pages/UndoPaperdetail'
import Main  from '../pages/Main'

import PaperDetail  from '../pages/PaperDetail'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  
      {
        path:"/",
        component:Main,
        
        children:[
          
          {
            path:"/userCenter",
            name:"userCenter",
            component:User
          },
          {
            path:"/",
            name:"Login",
            component:Login
          },
          {
            path:"/register",
            name:"register",
            component:Register
          },
          {
            path:"/fileManagement",
            name:"fileManagement",
            component:fileManagement
          },
          {
            path:"/myfile",
            name:"myfile",
            component:MyFile
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
      {
        path:"/paperDetail",
        name:"paperDetail",
        component:PaperDetail
      },
      {
        path:"/undoPaperdetail",
        name:"undoPaperdetail",
        component:undoPaperdetail
      },
      

]


export default   new VueRouter({
  routes 
})