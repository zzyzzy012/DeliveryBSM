import { HomeOutlined, UserOutlined, UserSwitchOutlined, DownOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import useStore from '@/store'
import { useNavigate } from 'react-router-dom'
import storage from '@/utils/storage'
import { useEffect } from 'react'

function NavHeader() {
  const { userInfo, breadcrumbs, isDark, updateIsDark } = useStore()
  const navigate = useNavigate()

  // 处理面包屑点击
  const handleBreadcrumbClick = (path?: string) => {
    if (path) {
      navigate(path)
    }
  }

  // 转换面包屑数据格式
  const breadcrumbItems = breadcrumbs.map((item, index) => ({
    title:
      index === 0 ? (
        <>
          <HomeOutlined />
          <span>{item.title}</span>
        </>
      ) : (
        <span
          style={{
            cursor: item.path ? 'pointer' : 'default',
            color: item.path ? '#f9723d' : 'inherit'
          }}
          onClick={() => handleBreadcrumbClick(item.path)}
        >
          {item.title}
        </span>
      ),
    href: item.path || undefined
  }))
  // 下拉菜单项
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='/'>
          个人中心
        </a>
      ),
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='/login'>
          退出
        </a>
      ),
      icon: <UserSwitchOutlined />
    }
  ]

  // const onMenuClick: MenuProps['onClick'] = () => {
  //   console.log('xxx')
  // }
  // 切换深色主题
  const onThemeChange = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    storage.set('isDark', isDark)
    updateIsDark(isDark)
  }
  useEffect(() => {
    onThemeChange(isDark)
  }, [isDark])

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className={styles.right}>
        <Switch
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          checked={isDark}
          style={{ marginRight: 16 }}
          onChange={onThemeChange}
        />
        {/* onClick: onMenuClick */}
        <Dropdown menu={{ items: menuItems }}>
          <Space>
            <span className={styles.title}>{userInfo.userName || '张三'}</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
