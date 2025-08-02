// 百度地图 GL 类型声明
declare global {
  interface Window {
    BMapGL: {
      Point: new (lng: number, lat: number) => any
      Map: new (container: string | HTMLElement, options?: any) => any
      Marker: new (point: any, options?: any) => any
      InfoWindow: new (content: string | HTMLElement, options?: any) => any
      Circle: new (center: any, radius: number, options?: any) => any
      Polygon: new (points: any[], options?: any) => any
      Polyline: new (points: any[], options?: any) => any
      Label: new (content: string, options?: any) => any
      Icon: new (url: string, size: any, options?: any) => any
      Size: new (width: number, height: number) => any
      Point: new (lng: number, lat: number) => any
      LngLat: new (lng: number, lat: number) => any
      Bounds: new (sw: any, ne: any) => any
      Pixel: new (x: number, y: number) => any
      Icon: new (url: string, size: any, options?: any) => any
      Size: new (width: number, height: number) => any
      Point: new (lng: number, lat: number) => any
      LngLat: new (lng: number, lat: number) => any
      Bounds: new (sw: any, ne: any) => any
      Pixel: new (x: number, y: number) => any
    }
  }
}

export {}
