/**
 * 普通链表
 * 还有扩展的： 双向链表，循环列表
 */
function LinkedList() {
  let Node = function(element) {
    this.element = element
    this.next = null
  }
  let head = null,
    length = 0

  function append(element) {
    let node = new Node(element),
      current

    if (head === null) {
      head = node
    } else {
      current = head

      while (current.next) {
        current = current.next
      }

      current.next = node
    }
    length++
  }

  function insert(positon, element) {
    if (position > -1 && positon < length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0

      if (positon === 0) {
        node.next = current
        head = node
      } else {
        while (index++ < positon) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    } else {
      return false
    }
  }

  function remove(element) {
    let index = indexOf(element)
    return this.removeAt(index)
  }

  function indexOf(element) {
    let current = head,
      index = -1
    while (current) {
      if (element === current.element) {
        return index
      }

      index++
      current = current.next
    }
    return -1
  }

  function removeAt(positon) {
    if (positon > -1 && positon < length) {
      let current = head,
        previous,
        index = 0
      if (positon === 0) {
        head = current.next
      } else {
        while (index++ < positon) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      length--
      return current.element
    } else {
      return null
    }
  }

  function isEmpty() {
    return size() === 0
  }

  function getHead() {
    return head
  }

  function size() {
    return length
  }

  return {
    append,
    insert,
    remove,
    indexOf,
    removeAt,
    isEmpty,
    getHead,
    size
  }
}
const List = new LinkedList()
List.append(123)
List.append(456)
