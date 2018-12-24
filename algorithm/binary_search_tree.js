/**
 * 二叉搜索树【移除节点未完成】
 * 可以另外学习：AVL 树是自平衡、红黑树、堆积树
 */
function BinarySearchTree() {
  const Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }

  let root = null

  function insert(key) {
    const newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      _insertNode(root, newNode)
    }
  }

  function _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        _insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        _insertNode(node.right, newNode)
      }
    }
  }
  function search(key) {
    return searchNode(root, key)
  }

  function searchNode(node, key) {
    if (node === null) {
      return false
    }

    if (key < node.key) {
      return searchNode(node.left, key)
    } else if (key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 中序
  function inOrderTraverse() {
    inOrderTraverseNode(root)
  }

  function inOrderTraverseNode(node) {
    if (node !== null) {
      inOrderTraverseNode(node.left)
      console.log(node.key)
      inOrderTraverseNode(node.right)
    }
  }

  //   先序
  function preOrderTraverse() {
    preOrderTraverseNode(root)
  }

  function preOrderTraverseNode(node) {
    console.log(node.key)
    preOrderTraverseNode(node.left)
    preOrderTraverseNode(node.right)
  }

  //   后序
  function postOrderTraverse() {
    postOrderTraverseNode(root)
  }

  function postOrderTraverseNode(node) {
    postOrderTraverseNode(node.left)
    postOrderTraverseNode(node.right)
    console.log(node.key)
  }

  // 引用，应该有问题
  function min() {
    return minNode(root)
  }

  function minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  function max() {
    return maxNode(root)
  }

  function maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  function remove(key) {
    root = removeNode(root, key)
  }

  function removeNode(node, key) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      // 1. 叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      // 2. 只有 1 个子节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // 3. 有 2 个子节点
    }
  }

  return {
    insert,
    search,
    inOrderTraverse,
    preOrderTraverse,
    postOrderTraverse,
    min,
    max,
    remove
  }
}
