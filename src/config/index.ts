/**
 * 环境配置封装
 */
type ENV = 'dev' | 'prd' | 'stg'

// let env: ENV = 'dev'
// if (location.host.indexOf('localhost')) {
//   env = 'dev'
// } else if (location.host.indexOf('driver-stg.marsview.cc')) {
//   env = 'stg'
// } else {
//   env = 'prd'
// }
const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: true,
    mockApi: 'http://localhost:3001/api'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api',
  }
}

export default {
  env,
  ...config[env]
}
