/**
 * O(nlogn)
 * 快速排序
 * @param {array} list 数组列表
 */
function quick_sort(list) {
  const len = list.length
  if (len < 2) {
    return list
  }

  const basic = list[0],
    left = [],
    right = []
  for (let i = 1; i < len; i++) {
    const v = list[i]
    v >= basic ? right.push(v) : left.push(v)
  }
  return quick_sort(left).concat(basic, quick_sort(right))
}
