import VueRouter from 'vue-router'

import User  from '../components/User'
import Login  from '../components/Login'
import Admin  from '../components/Admin'
import PaperRequest  from '../components/PaperRequest'
import EditMeeting  from '../components/EditMeeting'
import fileManagement  from '../components/FileManagement'
import AdminMain  from '../pages/AdminMain'
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
            path:"/fileManagement",
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
        path:"/paperDetail",
        name:"paperDetail",
        component:PaperDetail
      },

]


export default   new VueRouter({
  routes 
})