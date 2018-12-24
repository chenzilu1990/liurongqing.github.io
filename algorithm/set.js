/**
 * 集合（类似 ES6 的 Set 类）
 * 一组值不重复的元素
 * 可应用于：并集、交集、差集、子集
 */
function Set() {
  let _items = {}
  function add(value) {
    if (!has(value)) {
      _items[value] = value
      return true
    }
    return false
  }

  function del(value) {
    if (has(value)) {
      delete _items[value]
      return true
    }
    return false
  }
  function has(value) {
    return _items.hasOwnProperty(value)
  }
  function clear() {
    _items = {}
  }
  function size() {
    return Object.keys(_items).length
  }
  function values() {
    return Object.values(_items)
  }

  return {
    add,
    del,
    has,
    clear,
    size,
    values
  }
}
