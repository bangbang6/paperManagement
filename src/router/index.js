import VueRouter from 'vue-router'

import Login  from '../components/Login'
import User  from '../components/User'
import fileManagement  from '../components/FileManagement'
import Admin  from '../pages/Admin'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  
      {
        path:"/",
        name:"Main",
        component:Login
      },
      {
        path:"/userCenter",
        name:"userCenter",
        component:User
      },
      {
        path:"/fileManagement",
        name:"fileManagement",
        component:fileManagement
      },
      {
        path:"/admin",
        name:"admin",
        component:Admin
      },

]


export default   new VueRouter({
  routes 
})