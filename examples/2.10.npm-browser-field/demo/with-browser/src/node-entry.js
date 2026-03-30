// Node.js 版本入口
// 当没有 browser 字段时，无论在 Node.js 还是浏览器都会使用此文件

export function getEnv() {
  return 'node';
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
