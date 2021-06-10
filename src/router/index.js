import VueRouter from 'vue-router'

import NewUsercenter  from '../components/doctor/NewUsercenter'
import Login  from '../components/login/Login'
import Register  from '../components/login/Register'
import ChangePassword  from '../components/login/ChangePassword'
// import newAdmin  from '../components/admin/newAdmin'
import ErrorStatus  from '../components/admin/ErrorStatus'
import MyFile  from '../components/doctor/MyFile'
import PaperForm  from '../components/doctor/form/PaperForm'
import PatentForm  from '../components/doctor/form/PatentForm'
import SoftwareForm  from '../components/doctor/form/SoftwareForm'
import Allfile  from '../components/doctor/Allfile'
import AllPatentfile  from '../components/doctor/AllPatentfile'
import AllSoftware  from '../components/doctor/AllSoftware'
import PaperRequest  from '../components/admin/PaperRequest'
import EditMeeting  from '../components/admin/EditMeeting'
import patentManagement  from '../components/doctor/PatentManagement'
import FindRepeat  from '../components/repeat/FindRepeat'
import AdminMain  from '../pages/AdminMain'
import repeatMain  from '../pages/RepeatMain'
import UndoPaperdetail  from '../pages/paper/UndoPaperdetail'
import UndoSoftwareDetail  from '../pages/software/UndoSoftwareDetail'
import SoftwareDetail  from '../pages/software/SoftwareDetail'
import Main  from '../pages/Main'
import Backforward  from '../pages/Backforward'
import UndoPatentdetail  from '../pages/patent/UndoPatentdetail'
import LoginMain  from '../pages/LoginMain'
import PaperDetail  from '../pages/paper/PaperDetail'
import PatentDetail  from '../pages/patent/PatentDetail'
import DashBoard  from '../components/admin/dashboard/DashBoard'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [

      {
        path:"/",
        component:LoginMain,
        redirect:"/login",
        children:[
          
          {
            path:"/login",
            name:"login",
            component:Login
          },
          {
            path:"/register",
            name:"register",
            component:Register
          },
          {
            path:"/changePassword",
            name:"changePassword",
            component:ChangePassword
          }
         
        ]
      },
     
      {
        path:"/teacher",
        name:"teacherMain",
        redirect:'/teacher/userCenter',
        component:Main,
        children:[
       /*    {
            path:'/teacher/userCenter',
            name:"user",
            component:User
          }, */
          {
            path:'/teacher/userCenter',
            name:"user",
            component:NewUsercenter
          },
          {
            path:'/teacher/patentForm',
            name:"patentForm",
            component:PatentForm
          },
          {
            path:'/teacher/myfile',
            name:"myfile",
            component:MyFile
          },
          {
            path:'/teacher/fileManagement',
            name:"fileManagement",
            component:PaperForm
          },
          {
            path:'/teacher/softwareForm',
            name:"softwareForm",
            component:SoftwareForm
          },
            {
                path:'/teacher/patentManagement',
                name:"patentManagement",
                component:patentManagement
            },
          {
            path:'/teacher/allfile',
            name:"allfile",
            component:Allfile
          },
            {
                path:'/teacher/allPatentfile',
                name:"allPatentfile",
                component:AllPatentfile
            },
            {
                path:'/teacher/allSoftware',
                name:"allSoftwarefile",
                component:AllSoftware
            },
          {
            path:'/teacher/errorStatus',
            name:"errorStatus2",
            component:ErrorStatus
          },
        ]
      },
      {
        path:"/admin",
        component:AdminMain,
        children:[
          // {
          //   path:"/admin",
          //   name:"AdminMain",
          //   component:newAdmin,
          //
          // },
            {
                path:"/admin",
                name:"dashBoard",
                component:DashBoard,
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
          {
            path:"/admin/errorStatus",
            name:"errorStatus",
            component:ErrorStatus,

          },
            {
                path:'/admin/allfile',
                name:"allfile",
                component:Allfile
            },
            {
                path:'/admin/allPatentfile',
                name:"allPatentfile",
                component:AllPatentfile
            },
            {
                path:'/admin/allSoftware',
                name:"allSoftware",
                component:AllSoftware
            },
          // {
          //   path:"/admin/allfile",
          //   name:"allfile",
          //   component:Allfile,
          // }
          
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
        path:"/patentDetail",
        name:"patentDetail",
        component:PatentDetail
    },
      {
        path:"/paperDetail",
        name:"paperDetail",
        component:PaperDetail
      },
      {
        path:"/undoPaperdetail",
        name:"undoPaperdetail",
        component:UndoPaperdetail
      },
      {
        path:"/undoPatentDetail",
        name:"undoPatentDetail",
        component:UndoPatentdetail
      },
   
      {
        path:"/undoSoftwaredetail",
        name:"undoSoftwareDetail",
        component:UndoSoftwareDetail
      },
      {
        path:"/softwaredetail",
        name:"softwareDetail",
        component:SoftwareDetail
      },
   
      {
        path:"/backforward",
        name:"backforward",
        component:Backforward
      },

]


export default   new VueRouter({
  routes 
})