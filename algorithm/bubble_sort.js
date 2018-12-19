/**
 * O(n^2)
 * 冒泡排序（从小到大）
 * @param {array} list
 */
function bubble_sort(list) {
  const len = list.length - 1
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (list[j] > list[j + 1]) {
        ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
      }
    }
  }
  return list
}

const demo_list = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 200)
)

console.log(bubble_sort(demo_list))
