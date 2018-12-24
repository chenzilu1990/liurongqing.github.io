/**
 * HashMap 散列表
 * 是 Dictionary 类的一种散列表实现方式
 * 散列冲突解决方法：分离链接、线性探查、双散列法
 */
function HashMap() {
  let table = []

  // lose lose 散列函数
  const loseloseHashCode = function(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }

  function put(key, value) {
    const position = loseloseHashCode(key)
    table[position] = value
  }

  function remove(key) {
    table[loseloseHashCode[key]] = undefined
  }

  function get(key) {
    return table[loseloseHashCode[key]]
  }
}

//   djb2 散列函数，比 lose lose 实现更好用一个散列函数
// const djb2HashCode = function(key) {
//     let hash = 5381
//     for (let i = 0; i < key.length; i++) {
//       hash = hash * 33 + key.charCodeAt(i)
//     }
//     return hash % 1013
//   }
