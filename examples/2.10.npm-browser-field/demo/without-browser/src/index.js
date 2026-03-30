// Node.js 版本入口（同时也是浏览器打包时的默认入口）
// 没有 browser 字段，所以无论什么环境都使用此文件

export function getEnv() {
  return 'node (no browser field)';
}

export function getPlatformInfo() {
  try {
    const fs = require('fs');
    return {
      platform: 'node',
      hasFs: true,
      hasConsole: true
    };
  } catch (e) {
    return {
      platform: 'unknown',
      hasFs: false,
      hasConsole: true
    };
  }
}
