/**
 * 栈
 * push(...element) 添加一个或多个元素到栈顶
 * pop() 移除栈顶元素
 * peek() 查看栈顶元素
 * isEmpty() 栈是否为空
 * size() 栈大小
 * clear() 清除栈
 * print() 打印整个栈
 * 栈应用： 进制转换、平衡圆括号、汉诺塔
 */
function Stack() {
  const _items = []

  function push(...element) {
    _items.push(...element)
  }

  function pop() {
    _items.pop(element)
  }

  function peek() {
    return _items[_items.length - 1]
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
    push,
    pop,
    peek,
    isEmpty,
    size,
    clear,
    print
  }
}
