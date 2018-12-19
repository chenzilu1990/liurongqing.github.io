/**
 * O(nlogn)
 * 归并排序
 * @param {array} list 数组列表
 */
function merge_sort(list) {
  const len = list.length
  if (len < 2) return list
  const mid = parseInt(len / 2)
  return merge(merge_sort(list.slice(0, mid)), list.slice(mid))
}

function merge(left, right) {
  const final = []
  while (left.length && right.length) {
    final.push(left[0] <= right[0] ? left.shift() : right.shift())
  }
  return final.concat(left.concat(right))
}

// 测试数据
const demo_list = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 200)
)
console.log(merge_sort(demo_list))
