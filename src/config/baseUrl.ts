// 开发模式 api 调试列表
const devUrl =
  // 'http://1.15.238.119:8083' // 本地调试
  'http://1.15.238.119:8083' // 线上调试

export const baseUrl = import.meta.env.MODE === 'production' ? 'http://1.15.238.119:8083' : devUrl
