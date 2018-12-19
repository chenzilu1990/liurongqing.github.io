/**
 * O(logn)
 * 二分查找
 * @param {array} list  有序数组
 * @param {number} item 要查找的值
 * @return {number} 索引或 -1
 */
function binary_search(list, item) {
  let mid,
    guess,
    low = 0,
    high = list.length - 1

  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    guess = list[mid]

    if (guess === item) return mid
    if (guess > item) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return -1
}

// 调用测试
const demo_list = Array.from({ length: 120 }, (v, k) => (k + 1) * 2)

// 打印找到的元素的索引值
console.log(binary_search(demo_list, 26))
