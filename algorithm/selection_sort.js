/**
 * O(n^2)
 * 选择排序
 * 与冒泡排序相似， 区别：选择排序是计算一轮后做一次交换，冒泡一轮中每次符合条件就交换一次
 * @param {array} list 
 */
function selection_sort(list) {
  let min
  for (let i = 0; i < list.length - 1; i++) {
    min = i
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[min]) {
        min = j
      }
    }
    ;[list[i], list[min]] = [list[min], list[i]]
  }
  return list
}

// 测试数据
const demo_list = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 100)
)

console.log(selection_sort(demo_list))
