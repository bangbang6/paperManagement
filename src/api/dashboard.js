import request from "../util/request";
/**
 * 获取最近异常列表
 * @param {*} number 
 * @returns 
 */
export function getErrorList(number=6){
  return request({
    url:`/admin/getRecentExceptionAchv?number=${number}`,
    method:'GET'
  })
}
/**
 * 获取成果总数
 * @param {*} number 
 * @returns 
 */
export function getPaperCount(){
  return request({
    url:`/admin/getAchvCount`,
    method:'GET'
  })
}
/**
 * 获取用户总数
 * @param {*} number 
 * @returns 
 */
export function getUserCount(){
  return request({
    url:`/admin/getUserCount`,
    method:'GET'
  })
}
/**
 * 获取成果数量变化
 * @param {*} number 
 * @returns 
 */
export function getCountThread(month=12){
  return request({
    url:`/admin/getCountTrend?month=${month}`,
    method:'GET'
  })
}
/**
 * 获取成果数量变化
 * @param {*} number 
 * @returns 
 */
export function getCountByGroup(month=0){
  return request({
    url:`/admin/getCountByGroup?month=${month}`,
    method:'GET'
  })
}
/**
 * 获取异常总数
 * @param {*} number 
 * @returns 
 */
export function getErrorCount(){
  return request({
    url:`/admin/getExceptionCount`,
    method:'GET'
  })
}
/**
 * 获取近期成果列表
 * @param {*} number 
 * @returns 
 */
export function getRecentAchvlist(number=6){
  return request({
    url:`admin/getRecentAchv?number=${number}`,
    method:'GET'
  })
}
/**
 * 获取近期成果列表
 * @param {*} number 
 * @returns 
 */
export function getCountByType(){
  return request({
    url:`/admin/getCountByType`,
    method:'GET'
  })
}

export function getMyDashboard(){
  return request({
    url:`/user/getUserAchvCount`,
    method:'GET'
  })
}

//  this.categoryOptions = {
//         title: [/* {
//           text: "文件分布",
//           textStyle: {
//             fontSize: 14,
//             color: 'white',
//           },
//           left: 20,
//           top: 20
//         }, */ {
//             text: "成果分布",
//             x: "44.5%",
//             y: "45%",
//             textAlign: 'center',
//             textStyle: {
//               fontSize: 14,
//               color: 'white',
//               fontWeight: 'normal'
//             }
//           }],
//         series: [{
//           name: "category",
//           type: 'pie',
//           data: mockData,
//           label: {
//             normal: {
//               show: true,
//               position: 'outter',
//               formatter: function (params) {
//                 return params.data.legondname
//               }
//             }
//           },
//           center: ["45%", "50%"],
//           radius: ['35%', '50%'],
//           labelLine: {
//             normal: {
//               length: 5,
//               length2: 3,
//               smooth: true
//             }
//           },
//           /* itemStyle: {
//             borderWidth:4px
//           }, */
//           clockwise: true
//         }],
//         /* legend: {
//           type: 'scroll',
//           orient: "vertical",
//           height: 250,
//           left: '65%',
//           top: 'middle',
//           textStyle: {
//             color: "white",
//             fontSize: '12px'
//           }
//         }, */
//         tooltip: {
//           trigger: 'item',
//           formatter: function (params) {
//            // const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
//             return str
//           }
//         },

//       } 

// const mockData = [
//   {
//     legondname: "安全组",
//     value: 97,
//     percent: "21.15%",
//     itemStyle: {
//       color: '#49a7f8'
//     },
//     name: "安全组 | 21.15%",

//   },

//   {
//     legondname: "系统组",
//     value: 67,
//     percent: "22.30%",
//     itemStyle: {
//       color: '#236fff'
//     },
//     name: "系统组 | 22.30%"
//   },

//   {
//     legondname: "大数据组",
//     value: 92,
//     percent: "15.4%",
//     itemStyle: {
//       color: '#9c00ff'
//     },
//     name: "大数据组 | 15.4%"

//   },
//   {
//     legondname: "云计算组",
//     value: 204,
//     percent: "41.15%",
//     itemStyle: {
//       color: '#74fbf5'
//     },
//     name: "云计算组 | 41.15%"

//   },
// ]

// const mockData2 = [
//   {
//     legondname: "top80/A类/B类/C类",
//     value: 21,
//     percent: "11.5%",
//     itemStyle: {
//       color: '#74fbf5'
//     },
//     name: "top80/A类/B类/C类 | 11.5%"
//   },
//   {
//     legondname: "trans/sci/中文期刊",
//     value: 38,
//     percent: "22.5%",
//     itemStyle: {
//       color: '#49a7f8'
//     },
//     name: "trans/sci | 22.5%"
//   },
//   {
//     legondname: "专利",
//     value: 97,
//     percent: "54.5%",
//     itemStyle: {
//       color: '#9c00ff'
//     },
//     name: "专利 | 54.5%",

//   },
//   {
//     legondname: "其他",
//     value: 13,
//     percent: "7%",
//     itemStyle: {
//       color: '#236fff'
//     },
//     name: "其他 | 7%"

//   }
// ]