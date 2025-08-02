import axios, { AxiosError } from 'axios'
import { showLoading, hideLoading } from './loading/index'
// import { message } from 'antd'
import storage from './storage'
import env from '@/config/index'
import type { Result } from '@/types/api'
import { message } from './AntDGlobal'

const instance = axios.create({
  // baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    // icode: 'A7EEA094EAA44AF4'
    icode: 'B815F86524423DB0'
  }
})

instance.interceptors.request.use(
  config => {
    showLoading()
    // const token = localStorage.getItem('token')
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // config.headers.icode='A7EEA094EAA44AF4'
    if (import.meta.env.VITE_MOCK === 'true') {
      // config.baseURL = import.meta.env.VITE_MOCK_API
      config.baseURL = env.mockApi
    } else {
      // config.baseURL = import.meta.env.VITE_BASE_API
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (data.code === 501) {
      message.error(data.msg)
      // localStorage.removeItem('token')
      // location.href = '/login'
      location.href = '/login?callback=' + encodeURIComponent(location.href)
      storage.remove('token')
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (error: AxiosError) => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  },
  downloadFile(url: string, params?: object, filename?: string): Promise<void> {
    return instance
      .post(url, params, {
        responseType: 'blob'
      })
      .then(response => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename || 'download.xlsx'
        link.click()
        URL.revokeObjectURL(link.href)
      })
  }
}
