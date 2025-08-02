// 百度地图配置
export const MAP_CONFIG = {
  // 从环境变量获取 API Key，如果没有则使用默认值
  API_KEY: import.meta.env.VITE_BAIDU_MAP_AK || 'YOUR_BAIDU_MAP_AK',
  // 默认地图中心点（北京天安门）
  DEFAULT_CENTER: {
    lng: 116.404449,
    lat: 39.914889
  },
  // 默认缩放级别
  DEFAULT_ZOOM: 12,
  // 地图样式
  MAP_STYLE: {
    height: 450
  }
}

// 检查 API Key 是否有效
export const isMapApiKeyValid = () => {
  return MAP_CONFIG.API_KEY !== 'YOUR_BAIDU_MAP_AK' && MAP_CONFIG.API_KEY.length > 0
}
