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

/* this.papers = [

      {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      },
      {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',



      }
    ] */
        /* files: [
        {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      }
      ],*/