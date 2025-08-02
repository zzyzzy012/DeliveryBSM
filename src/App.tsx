// import { Outlet } from 'react-router-dom'
import Router from '@/router/index'
import './App.css'
import './styles/theme.less'
import '@ant-design/v5-patch-for-react-19'
import { ConfigProvider, App as AntdApp, theme } from 'antd'
import AntDGlobal from '@/utils/AntDGlobal'
import useStore from '@/store'

function App() {
  const isDark = useStore(state => state.isDark)
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#f9723d',
          borderRadius: 2

          // // 派生变量，影响范围小
          // colorBgContainer: '#faece8ff',
        },
        // 1. 单独使用暗色算法
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntdApp>
        <AntDGlobal />
        <div className='app'>
          {/* <div>app页</div> */}
          {/* <Outlet></Outlet> */}
          <Router />
        </div>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
