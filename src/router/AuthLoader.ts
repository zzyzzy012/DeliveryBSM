import api from '@/api'
import type { Menu } from '@/types/api'
import { getMenuPath } from '@/utils'
export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}

export default async function AuthLoader() {
  const res = await api.getPermissionList()
  const menuPathList = getMenuPath(res.menuList)
  return {
    buttonList: res.buttonList,
    menuList: res.menuList,
    menuPathList
  }
}
