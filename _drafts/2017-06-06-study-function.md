# 函数式编程学习




## 参考资料
(十年踪迹 - 函数式编程离我们有多远？)[https://www.h5jun.com/post/functional-how-far.html]

[ecmadao - JavaScript函数式编程](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/JavaScript/JavaScript%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B.md)

[淘宝前端团队FED](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)

[十年踪迹 - 什么是函数式编程](https://www.zcfy.cc/article/master-the-javascript-interview-what-is-functional-programming-2221.html)

[函数式编程入门](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)

[网络埋伏纪事](https://zcfy.cc/article/composing-software-an-introduction-javascript-scene-medium)

[阮一峰的博文《Pointfree 编程风格指南》）](http://www.ruanyifeng.com/blog/2017/03/pointfree.html)

[四人帮《设计模式：可重用面向对象软件的要素》](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612/ref=as_li_ss_tl?ie=UTF8&qid=1494993475&sr=8-1&keywords=design+patterns&linkCode=ll1&tag=eejs-20&linkId=6c553f16325f3939e5abadd4ee04e8b4)

lambda 演算学习

Lisp 学习
我知道的使用 Lisp 的最佳计算机科学教材是：计算机程序的构造和解释
箭头函数像函数式编程的火箭推进剂一样

WebAssembly 学习

## 学习书籍

- 《JavaScript函数式编程》

- 《JavaScript ES6 函数式编程入门经典（Web开发经典丛书）》

- 《前端函数式攻城指南》

    [在线阅读](http://wiki.jikexueyuan.com/project/clojure-flavored-javascript/)

- 《JavaScript Allonge》

    [在线阅读](https://leanpub.com/javascript-allonge/read#online)

- 《Functional JavaScript》

- 《Functional Programming in Javascript》


## 学习杂记

纯函数（Pure functions）
    相同输入返回相同输出
    没有副作用
    [什么是纯函数](http://zcfy.cc/article/master-the-javascript-interview-what-is-a-pure-function-2186.html)

函数复合（Function composition）

    [什么是函数组合](https://zcfy.cc/article/master-the-javascript-interview-what-is-function-composition-2160.html)

避免共享状态（Avoid shared state）

    共享状态的意思是任意变量、对象或者内存空间存在于共享作用域下
    [函数式编程处理应用程序状态](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)

避免改变状态（Avoid mutating state）

    一个不可变的（immutable）
    Object.freeze 浅冻结一个对象
    trie 数据结构
         Immutable.js 和 Mori 使用了 trie

避免副作用（Avoid side effects）

    使用 monads 技巧从纯函数中隔离和封装副作用

高阶函数指的是一个函数以函数为参数，或以函数为返回值，或者既以函数为参数又以函数为返回值。

引用透明（你可以将一个函数调用替换成它的结果值，而不会对程序的运行造成影响）

函数式编程是一个声明式范式


在计算机科学中，也许最重要的设计原则就是 KISS 原则（保持简洁，Keep It Simple, Stupid）

mori 是 clojure 风格函数式库

单线程 JS 引擎并不意味着没有并发。相反，在 JavaScript 中有很多并发的来源。API I/O、事件监听器、Web Worker、iframe 以及 timeout 都会在程序中引入不确定性。而这些与共享状态结合在一起，就会得到一堆 bug。


软件开发过程就是将大问题分解成较小的问题，创建解决这些较小问题的组件，然后将这些组件组合在一起，形成一个完整的应用程序。

编写不涉及参数的函数称为 piont-free 风格

“四人帮”还定义了其他组合设计模式，包括 flyweight模式、委托模式、聚合模式等。

有三个要点让 Lambda 演算变得很特别：
    1 函数总是匿名的
    2 只接入一个输入，柯里化
    3 函数是头等的

    

如下是一些函数式语言有，但是 JavaScript 没有的特性：

纯度：在有些函数式编程语言中，纯度是通过语言强制的。带有副作用的表达式是被禁止的。
不可变性：一些函数式语言禁用了变动。表达式被求值为新的数据结构，而不是修改已有的数据结构，比如数组或者对象。这可能听起来效率低下，不过很多函数式语言在幕后使用字典树数据结构，而字典树这种结构是以结构性共享为特征：这意味着旧对象和新对象共享引用相同的数据。
递归：递归是函数为迭代用途引用自身的能力。在很多函数式语言中，递归是迭代的唯一方法。没有像 for、while 或者 do 循环这样的循环语句。

JavaScript 的可变性是其主要缺陷

Monads 的盒子将副作用伪装成纯函数