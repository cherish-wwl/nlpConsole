import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import consoleLayout from '../views/console/layout/index'
import { WSAENETUNREACH } from 'constants';

export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/myService',
  },
  {
    path: '/myService',
    component: consoleLayout,
    children: [
      {
        path: '',
        name: 'consoleService',
        component: () => import('@/views/console/myService'),
        meta:{
          title:'概览',
          search:false,
          show:true
        }
      },
      {
        path: 'detail',
        name: 'consoleServiceDetail',
        component: () => import('@/views/console/myServiceDetail'),
        meta:{
          title:'详情信息',
          attr:"consoleService",
          search:false
          
        }
      },
      {
        path: 'techDocument',
        name: 'consoleTechDocument',
        component: () => import('@/views/console/techDocument'),
        meta:{
          title:'技术文档',
          attr:"consoleService",
          search:false
        }
      },
    ]
  },
  {
    path: '/myApplicantion',
    component: consoleLayout,
    children:[
      {
        path: '',
        name: 'consoleMyApplicantion',
        component: () => import('@/views/console/myApplicantion'),
        meta:{
          title:'我的应用',
          search:true,
          show:true
        }
      },
      {
        path: 'detail',
        name: 'consoleMyApplicantionDetail',
        component: () => import('@/views/console/myApplicantionDetail'),
        meta:{
          title:'应用详情',
          attr:"consoleMyApplicantion",
          search:false
        }
      },
    ]
  },
  {
    path: '/myDataSet',
    component: consoleLayout,
    children:[
      {
        path: '',
        name: 'consoleMyDataSet',
        component: () => import('@/views/console/myDataSet'),
        meta:{
          title:'我的数据集',
          search:true,
          show:true
        }
      },
    ]
  },
  {
    path: '/mine',
    component: consoleLayout,
    children:[
      {
        path: '',
        name: 'consoleMine',
        component: () => import('@/views/console/mine'),
        meta:{
          title:'帐号信息',
          search:false,
          show:true
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

