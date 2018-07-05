import request from '@/utils/request'

// 获取所有数据集
export function getDataSetList(params) {
  return request({
    url: '/console/getDataSetList',
    method: 'post',
    params
  })
}
