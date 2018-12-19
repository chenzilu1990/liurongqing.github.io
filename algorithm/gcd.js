/**
 * 欧几里德算法
 * 求两个正整数 a, b 的最大公约数
 * 计算公式：gcd(a,b) = gcd(b,a mod b)
 * @param {number} a 数字
 * @param {number} b 数字
 */

// 第一种：循环方式
function gcd(a, b) {
  if (a < b) {
    ;[a, b] = [b, a]
  }
  while (b !== 0) {
    ;[b, a] = [a % b, b]
  }
  return a
}

// 第二种：递归方式
function gcd(a, b) {
  if (a < b) {
    ;[a, b] = [b, a]
  }

  if (b === 0) {
    return a
  }

  ;[b, a] = [a % b, b]
  return gcd(a, b)
}

// 测试数据
console.log(gcd(12, 18)) // 6
