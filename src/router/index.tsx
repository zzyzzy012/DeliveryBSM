import { useRoutes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import App from '../App'
import Layout from '@/layout'
import Welcome from '@/views/welcome'
// @ts-ignore
import Dashboard from '@/views/dashboard'
// import AuthLoader from './AuthLoader'

// 懒加载组件
const LazyUserList = lazy(() => import('@/views/system/user'))
const LazyDept = lazy(() => import('@/views/system/dept'))
const LazyMenu = lazy(() => import('@/views/system/menu'))
const LazyRole = lazy(() => import('@/views/system/role'))
const LazyOrderList = lazy(() => import('@/views/order/OrderList'))
const LazyOrderCluster = lazy(() => import('@/views/order/OrderCluster'))
const LazyDriverList = lazy(() => import('@/views/order/DriverList'))
const LazyError404 = lazy(() => import('@/views/Error404'))
const LazyLogin = lazy(() => import('@/views/login'))

// 加载组件
const LoadingComponent = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '16px',
      color: '#666'
    }}
  >
    加载中...
  </div>
)

const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    element: <Layout />,
    // 数据加载机制，在路由组件渲染之前预加载数据
    // loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userlist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyUserList />
          </Suspense>
        )
      },
      {
        path: '/menulist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyMenu />
          </Suspense>
        )
      },
      {
        path: '/rolelist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyRole />
          </Suspense>
        )
      },
      {
        path: '/deptlist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyDept />
          </Suspense>
        )
      },
      {
        path: '/orderlist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyOrderList />
          </Suspense>
        )
      },
      {
        path: '/ordercluster',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyOrderCluster />
          </Suspense>
        )
      },
      {
        path: '/driverlist',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LazyDriverList />
          </Suspense>
        )
      }
    ]
  },

  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LazyLogin />
      </Suspense>
    )
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LazyError404 />
      </Suspense>
    )
  }
]

export default function Router() {
  return useRoutes(routes)
}
// export default createBrowserRouter(router)
