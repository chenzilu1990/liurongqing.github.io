# 《JavaScript 权威指南》笔记



#### 基础

#### 对象

#### 数组

- 数组方法

  - join() （ES3）（纯函数）

    > 将数组元素转成字符串连接起来

    ```javascript
    const arr = [11, 22, 33];
    arr.join(); // "11, 22, 33"

    arr.join('-'); // "11-22-33"

    Array(10).join(); // "---------" 9个连字号生成的字符中

    ```

   - reverse()（ES3）（不纯函数）

     > 将数组元素颠倒顺序，对原先的数组进行重排

     ```javascript
     const arr = [11, 22, 33];
     arr.reverse(); // [33, 22, 11]
     ```

     ​

   - sort()（ES3）（不纯函数）

     > 对数组内元素进行排序

     ```javascript
     const arr = [3, 2 4];
     arr.sort(); // [2, 3, 4]
     ```

     ​

   - concat()（ES3）（纯函数）

     > 连接参数返回新数组

     ```javascript
     const arr = [2, 3, 4];
     arr.concat(5); // [2, 3, 4, 5]
     ```

     ​

   - slice(start, end)（ES3）（纯函数）

     > 截取数组
     >
     > 包含 start，不包含 end

     ```javascript
     const a = [2, 3, 4];
     a.slice(0, 2); // 2, 3
     ```

     ​

   - splice(start, num, add)（ES3）（不纯函数）

     > 数组中插入与删除的方法
     >
     > 参数一：删除位置开始
     >
     > 参数二：删除个数
     >
     > 参数三：添加元素

     ```javascript
     const a = [2, 3, 4];
     a.splice(0, 1, 'a'); // ['a', 3, 4]
     ```

     ​

   - push() 和 pop() （ES3）（不纯函数）

     > 添加一个或多个元素到数组后面  和  从数组后面删除一个元素
     >
     > 添加返回新数组长度
     >
     > 删除返回删除的元素

     ```javascript
     const a = [2, 3, 4];
     a.push(5); // 4
     a.pop(); // 5
     ```

     ​

   - unshift() 和 shift()（ES3）（不纯函数）

     > 与 push 和 pop 类似，只是unshift 与 shift 是往数组前面添加与删除值

     ```javascript
     const a = [2, 3, 4];
     a.unshift(5); // 4
     a.shift(); // 5
     ```

     ​

   - toString() 和 toLocaleString() （ES3）（纯函数）

     > 将元素转成字符串再通过逗号拼接起来

     ```javascript
     const a = [2, 3, 4];
     a.toString(); // '2, 3, 4'
     a.toLocateString(); // '2, 3, 4'
     ```

     ​

   - forEach()（ES5）（纯函数）

     > 遍历数组
     >
     > 元素值、元素索引、数组本身

     ```javascript
     const a = [2, 3, 4];
     a.forEach((value, key, arr)=>{
         // do something...
     })
     ```

     ​

   - map()（ES5）（纯函数）

     > 遍历数组，返回处理过的值的新数组

     ```javascript
     const a = [2, 3, 4];
     a.map((value, key, arr)=>{
         return value;
     })
     ```

     ​

   - filter()（ES5）（纯函数）

     > 遍历数组，返回符合条件的值

     ```javascript
     const a = [2, 3, 4];
     a.filter((value, key, arr) => {
         return value % 2 === 0;
     })
     ```

     ​

   - every() 和 some() （ES5）（纯函数）

     > 数组的逻辑判断
     >
     > every() 全部满足条件，返回 true
     >
     > some() 存在一个满足条件，即返回 true

     ```javascript
     const a = [2, 3, 4];
     a.every((v) => v < 4); // false
     a.some((v) => v < 4); // true
     ```

     ​


   - reduce() 和 reduceRight()

     > 对数组元素进行组合
     >
     > reduce 从左往右
     >
     > reduceRight 从右往左

     ```javascript
     const a = [2, 3, 4];
     a.reduce((v1, v2) => v1 + v2); // 9
     a.reduceRight((v1, v2) => v1 + v2); // 9
     ```

     ​

   - indexOf() 和 lastIndexOf()

     > 查找元素，返回索引值，若无则返回 -1

     ```javascript
     const a = [2, 3, 4, 3];
     a.indexOf(3); // 1
     a.lastIndexOf(3); // 3
     a.indexOf(5); // -1
     a.lastIndexOf(5); // -1
     ```

     ​







#### 函数

#### 类和模块

####  Window 对象

#### 事件处理

#### jQuery

#### 客户端存储

#### HTML5 API

