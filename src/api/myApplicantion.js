import request from '@/utils/request'

// 获取所有应用列表
export function getApplicationList(params) {
  return request({
    url: '/console/getAppliactionList',
    method: 'post',
    params
  })
}


// 获取应用详情
 export function getAppliactionDetailsByAId(params) {
  return request({
    url: '/console/getAppliactionDetailsByAId',
    method: 'post',
    params
  })
}