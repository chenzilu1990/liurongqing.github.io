/**
 * 队列
 * enqueue(...element) 添加一个或多个元素到队列
 * dequeue() 移除队列第一个元素
 * front() 查看队列第一个元素
 * isEmpty() 队列是否为空
 * size() 队列大小
 * clear() 清除队列
 * print() 打印整个队列
 * 队列修改版有： 优先队列、循环队列
 */
function Queue() {
  const _items = []

  function enqueue(...element) {
    _items.push(...element)
  }

  function dequeue() {
    _items.shift(element)
  }

  function front() {
    return _items[0]
  }

  function isEmpty() {
    return size() === 0
  }

  function size() {
    return _items.length
  }

  function clear() {
    _items = []
  }

  function print() {
    console.log(_items)
  }

  return {
    enqueue,
    dequeue,
    front,
    isEmpty,
    size,
    clear,
    print
  }
}
