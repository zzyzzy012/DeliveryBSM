import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/SideMenu'
import { Outlet } from 'react-router-dom'
import api from '@/api'
import useStore from '@/store'
import { useEffect } from 'react'

const { Content } = Layout

function LayoutFC() {
  const { updateUserInfo } = useStore()
  const getUserInfo = async () => {
    const res = await api.getUserInfo()
    updateUserInfo(res)
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <div>
      <Watermark content={['ZZ Design', 'Backstage Management']}>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#001529' }}>
          <SideMenu />
          <Layout>
            <NavHeader />
            <Content style={{ margin: '0 16px' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG
                }}
              >
                <Outlet />
              </div>
            </Content>
            <NavFooter />
          </Layout>
        </Layout>
      </Watermark>
    </div>
  )
}

export default LayoutFC
