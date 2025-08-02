// 测试百度地图 API Key 是否有效
export const testBaiduMapAPI = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${apiKey}`)
    return response.ok
  } catch (error) {
    console.error('API Key 测试失败:', error)
    return false
  }
}

// 检查当前 API Key
export const checkCurrentAPIKey = () => {
  const script = document.querySelector('script[src*="api.map.baidu.com"]')
  if (script) {
    const src = script.getAttribute('src')
    const match = src?.match(/ak=([^&]+)/)
    if (match) {
      console.log('当前 API Key:', match[1])
      return match[1]
    }
  }
  return null
}

// 验证 BMapGL 对象
export const validateBMapGL = () => {
  if (typeof window !== 'undefined' && window.BMapGL) {
    console.log('✅ BMapGL 对象已加载')
    console.log('BMapGL 版本:', window.BMapGL.version || '未知')
    return true
  } else {
    console.log('❌ BMapGL 对象未加载')
    return false
  }
}
