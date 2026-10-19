// 浏览器端入口文件
// 当 browser 字段指向此文件时，打包工具会使用此文件替代 Node.js 版本

export function getEnv() {
  return 'browser';
}

export function getPlatformInfo() {
  return {
    platform: 'browser',
    hasFs: false,
    hasConsole: true
  };
}
