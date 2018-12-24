/**
 * 字典 （类似 ES6 的 Map 类）
 */
function Dictionary() {
  let _items = {}
  function set(key, value) {
    _items[key] = value
  }
  function get(key) {
    return _items[key]
  }
  function del(key) {
    if (has(key)) {
      delete _items[key]
      return true
    }
    return false
  }
  function has(key) {
    return _items.hasOwnProperty(key)
  }
  function clear() {
    _items = {}
  }
  function size() {
    return Object.keys().length
  }
  function keys() {
    return Object.keys(_items)
  }
  function values() {
    return Object.values(_items)
  }

  return {
    get,
    set,
    del,
    has,
    clear,
    size,
    keys,
    values
  }
}
