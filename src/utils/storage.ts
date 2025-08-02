export default {
  set (key: string, value: any) {
    // 对象序列化
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      // 对象反序列化
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  remove (key: string): void {
    localStorage.removeItem(key)
  },
  clear (): void {
    localStorage.clear()
  }  
}