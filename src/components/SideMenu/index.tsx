import { useState, useEffect } from 'react'
import { Menu, Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './index.module.less'
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  AlignCenterOutlined,
  IdcardOutlined,
  ApartmentOutlined,
  MoneyCollectOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  TruckOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import useStore from '@/store'
import type { BreadcrumbItem } from '@/store'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    label,
    key,
    icon,
    children
  } as MenuItem
}
// 菜单数据结构
const items: MenuItem[] = [
  // 一级菜单：工作台
  getItem('工作台', '/dashboard', <PieChartOutlined />),
  // 一级菜单：系统管理（带子菜单）
  getItem('系统管理', 'system', <DesktopOutlined />, [
    getItem('用户管理', '/userlist', <TeamOutlined />),
    getItem('菜单管理', '/menulist', <AlignCenterOutlined />),
    getItem('角色管理', '/rolelist', <IdcardOutlined />),
    getItem('部门管理', '/deptlist', <ApartmentOutlined />)
  ]),
  // 一级菜单：订单管理（带子菜单）
  getItem('订单管理', 'order', <MoneyCollectOutlined />, [
    getItem('订单列表', '/orderlist', <FileTextOutlined />),
    getItem('订单聚合', '/ordercluster', <FileDoneOutlined />),
    getItem('司机列表', '/driverlist', <TruckOutlined />)
  ])
]

const { Sider } = Layout

// 菜单路径映射表
const menuPathMap: Record<string, { title: string; parent?: string }> = {
  '/dashboard': { title: '工作台' },
  '/userlist': { title: '用户管理', parent: '系统管理' },
  '/menulist': { title: '菜单管理', parent: '系统管理' },
  '/rolelist': { title: '角色管理', parent: '系统管理' },
  '/deptlist': { title: '部门管理', parent: '系统管理' },
  '/orderlist': { title: '订单列表', parent: '订单管理' },
  '/ordercluster': { title: '订单聚合', parent: '订单管理' },
  '/driverlist': { title: '司机列表', parent: '订单管理' }
}

function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
  // 控制哪些父级菜单是展开状态
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const navigate = useNavigate() // 路由跳转函数
  const location = useLocation() // 当前路由信息
  const { updateBreadcrumbs } = useStore()

  // 处理菜单点击事件
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // 只处理有实际路由的菜单项
    if (key.startsWith('/')) {
      navigate(key) // 路由跳转
      updateBreadcrumb(key) // 更新面包屑
    }
  }
  // 更新面包屑
  const updateBreadcrumb = (path: string) => {
    const menuInfo = menuPathMap[path] // 获取当前路径对应的菜单标题及父级
    if (menuInfo) {
      const breadcrumbs: BreadcrumbItem[] = [{ title: '首页', path: '/welcome' }] // 固定首页
      // 如果有父级菜单，添加父级菜单
      if (menuInfo.parent) {
        breadcrumbs.push({ title: menuInfo.parent }) // 二级菜单
      }
      // 添加当前页面
      breadcrumbs.push({ title: menuInfo.title, path }) // 当前页面
      updateBreadcrumbs(breadcrumbs) // 更新 store 中的面包屑数据
    }
  }

  // 处理子菜单展开/收起事件
  const handleOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys) // 更新展开的菜单项状态
  }

  // 根据当前路径设置选中的菜单项
  const getSelectedKeys = () => {
    const pathname = location.pathname
    // 找到对应的菜单key
    const findMenuKey = (items: MenuItem[]): string[] => {
      for (const item of items) {
        if (item?.key === pathname) {
          return [item.key as string]
        }
        if (item && 'children' in item && item.children) {
          const found = findMenuKey(item.children)
          if (found.length > 0) {
            return found
          }
        }
      }
      return []
    }
    return findMenuKey(items)
  }

  // 根据当前路径设置展开的子菜单
  const getDefaultOpenKeys = () => {
    const pathname = location.pathname
    const defaultOpenKeys: string[] = []

    // 检查系统管理子菜单
    if (
      pathname.startsWith('/userlist') ||
      pathname.startsWith('/menulist') ||
      pathname.startsWith('/rolelist') ||
      pathname.startsWith('/deptlist')
    ) {
      defaultOpenKeys.push('system')
    }

    // 检查订单管理子菜单
    if (
      pathname.startsWith('/orderlist') ||
      pathname.startsWith('/ordercluster') ||
      pathname.startsWith('/driverlist')
    ) {
      defaultOpenKeys.push('order')
    }

    return defaultOpenKeys
  }

  // 初始化展开的菜单和面包屑
  useEffect(() => {
    const defaultOpenKeys = getDefaultOpenKeys()
    setOpenKeys(defaultOpenKeys)

    // 初始化面包屑
    const pathname = location.pathname
    if (pathname === '/welcome') {
      updateBreadcrumbs([{ title: '首页', path: '/welcome' }])
    } else {
      updateBreadcrumb(pathname)
    }
  }, [location.pathname])

  return (
    <div className={styles.sideMenu}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{ minHeight: '100vh' }}>
        <div className={styles.logoContainer}>
          <img src='/imgs/Wardiere.png' alt='logo' className={styles.logo} />
          <span className={styles.title}>滴滴货运</span>
        </div>
        <Menu
          theme='dark'
          selectedKeys={getSelectedKeys()}
          openKeys={openKeys}
          mode='inline'
          items={items}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Sider>
    </div>
  )
}

export default SideMenu
