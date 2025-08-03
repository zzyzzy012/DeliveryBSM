import { create } from 'zustand'
import type { User } from '@/types/api'
import storage from '@/utils/storage'
// 面包屑项类型
export interface BreadcrumbItem {
  title: string
  path?: string // 可选路径，用于点击跳转
}

const useStore = create<{
  token: string
  userInfo: User.UserItem
  breadcrumbs: BreadcrumbItem[]
  isDark: boolean
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: any) => void
  updateBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  updateIsDark: (isDark: boolean) => void
}>(set => ({
  token: '',
  updateToken: (token: string) => {
    set({ token })
  },
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: '',
    createTime: ''
  },
  breadcrumbs: [{ title: '首页', path: '/welcome' }],
  updateUserInfo: (userInfo: User.UserItem) => {
    set({ userInfo })
  },
  updateBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => {
    set({ breadcrumbs })
  },
  isDark: storage.get('isDark') || false,
  updateIsDark: (isDark: boolean) => {
    set({ isDark })
  }
}))

export default useStore
