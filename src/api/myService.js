import request from '@/utils/request'

// 获取最近使用的应用列表
export function getApplicationListbyNum(params) {
  return request({
    url: '/console/getApplicationListbyNum',
    method: 'post',
    params
  })
}

// 获取一级服务分类
export function getRootServiceClass(params){
  return request({
    url: '/console/getRootServiceClass',
    method: 'post',
    params
  })
}

// 获取服务详情列表（带查询、分页）
export function getServicesListByAId(params) {
  return request({
    url: '/console/getServicesListByAId',
    method: 'post',
    params
  })
}

// 获取所有二级服务分类列表 （不区分一级分类）
export function getAllSecondServiceClass(params) {
  return request({
    url: '/console/getAllSecondServiceClass',
    method: 'post',
    params
  })
}

// 根据服务分类id 查询服务列表
export function getServicesListByCId(params) {
  return request({
    url: '/console/getServicesListByCId',
    method: 'post',
    params
  })
}

// 获取服务统计详情信息
export function getServicesStatisticsBySId(params) {
  return request({
    url: '/console/getServicesStatisticsBySId',
    method: 'post',
    params
  })
}
