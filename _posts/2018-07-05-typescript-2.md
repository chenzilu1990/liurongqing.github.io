---
title: TypeScript 进阶
keywords: typescript
tags: javascript
---

:racehorse:  TypeScript 进阶学习。
<!--more-->

## 类型别名

类型别名常用于联合类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if(typeof n === 'string'){
        return n;
    }else {
        return n();
    }
}
```



## 字符串字面量类型

从固定的几个字符串中取值

类型别名与字符串字面量类型都是使用 `type` 进行定义

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('#a'), 'click'); // 正常
handleEvent(document.getElementById('#b'), 'dbclick'); // Error
```



## 元组

数组合并了相同类型的对象，元组（Tuple）合并了不同类型的对象

```typescript
let a: [string, number] = ['tom', 10];

// 先声明后赋值
let a: [string, number];
a[0] = 'tom'; // 可以只赋值一项

let a: [string, number];
a = ['tom'];
a[1] = 10;

// 初始化赋值必须全部
let a: [string, number] = ['tom']; // Error

// 赋值越界的元素(越界的元素必须是元组内类型的联合类型)
let a: [string, number];
a = ['tom', 10, 'www.baidu.com']; // 越界的元素是 string 类型所以正常

// 访问越界的元素
let a: [string, number];
a = ['tom', 10, 'www.baidu.com'];
console.log(a[2].slice(1)); // Error, 元素识别为每个类型的联合类型
```



## 枚举



### 简单的例子

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun'] === 0);  // true
console.log(Days[0] === 'Sun');  // true
```



### 手动赋值

```typescript
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days['Sun'] === 7); // true
console.log(Days['Tue'] === 2); // true

// 未手动赋值的枚举项与手动赋值的重复了，TypeScript 不会察觉到
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days['Sun'] === 3); // true
console.log(Days['Wed'] === 3); // true

// 手动赋值可以为小数或负数，后面项递增仍为 1
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
console.log(Days['Mon'] === 1.5); // true
console.log(Days['Tue'] === 2.5); // true

// 手动赋值可以使用非数字，但要用类型断言来让 tsc 无视检查
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
```



### 常数项和计算所得项

枚举项有两种类型： 常数项（constant member）和计算所得项（computed member）

前面所举的例子都是常数项，计算所得项如下：

```typescript
enum Color {Red, Green, Blue='blue'.length}; // 如果后面还有自动项，则报错。
```



### 常数枚举

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right,
}
    
let directions = [Directions.up, Directions.Down, Directions.Left, Directions.Right]

// 编辑结果 
let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    
// 常数枚举与普通枚举区别是，编译阶段会被删除，并且不能包含计算成员
```



### 外部枚举

外部枚举与声明语句一样，常出现在声明文件中

```typescript
declare enum Directions {
    Up,
    Down,
    Left,
    Right,
}
 
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 编辑结果
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    
// declare 和 const 同时使用也是可以的
declare const enum Directions {
	Up,
    Down,
	Left,
    Right,
}
    
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```



## 类

### 类的概念

1. 类： 定义事物的抽象特点
2. 对象：类的实例
3. 面向对象：封装、继承、多态
4. 封装：封细节、隐藏私有属性或方法，暴露对外接口
5. 继承：子类继承父类
6. 多态：不同子类继承父类，实现各自方法
7. 存取器：改变属性或读取赋值行为
8. 修饰符：关键字：`public` `private` `protected` `static` 等等
9. 抽象类：供其他类继承，不可以被实例化，抽象方法必须在子类中实现
10. 接口：不同类之前公有的方法或属性，抽象成一个接口，接口可以被类实现（implements），一个类只能继承另一个类，但是可以实现多个接口

### 属性和方法

```typescript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    sayHi() {
        return 'haha';
    }
}
```



### 类的继承

`extends` 关键字实现继承，`super` 关键字调用父类构造函数和方法

```typescript
class Cat extends Animal {}
```



### 存取器

使用 `getter` `setter` 改变属性的赋值和读取行为

```typescript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    get name() {
        return 'jack';
    }
    
    set name(value) {
		this.name = value;
    }
}
```



### 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，不需要实例化，直接通过类调用，但访问不了 `this`

```typescript
class Animal {
    static isAnimal(a){
        console.log('static...')
    }
}
```



### ES7 中类的用法

#### 实例属性

```typescript
class Animal {
    name = 'jack';
    
    constructor() {
        // do something...
    }
}

let a = new Animal();
console.log(a.name); // jack
```



#### 静态属性

```typescript
class Animal {
    static num = 1;
}
console.log(Animal.num);
```



### TypeScript 中类的用法

- `public`  修饰属性或方法公有的，默认，本类、子类、外部都可以访问到
- `private` 修饰属性或方法私有的，本类中可以使用，外部、子类都不可用
- `protected` 修饰属性或方法受保护的，本类、子类可以使用，外部不可用

#### 抽象类

1. `abstract` 定义抽象类和抽象方法
2. 抽象类不允许被实例化
3. 抽象类的方法必须子类实现

```typescript
abstract class Animal {
    public name;
    public abstract sayHi();
}

class Cat extends Animal {
    public sayHi() {
        console.log('1...')
    }
}
```



#### 类的类型

```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
        return 'haha';
    }
}

let a: Animal = new Animal('jack');
console.log(a.sayHi());
```



## 类与接口

- 接口用于对【对象形状】进行描述
- 对类的一部分行为进行抽象

### 类实现接口

```typescript
interface Alarm {
    alert();
}

class Door {
    
}

class SecurityDoor extends Door implement Alarm {
    alert() {
        console.log('alert...')
    }
}
```



### 接口继承接口

```typescript
interface Alarm {
    alert();
}

interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```



### 接口继承类

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let Point3d: Point3d = {x: 1, y: 2, z: 3};
```

### 混合类型

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```



## 泛型

定义函数、接口或类时，不预先指定类型，在使用的时候再指定类型。

### 简单例子

```typescript
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for(let i = 0; i < length; i++){
        result[i] = value;
    }
    return result;
}
createArray(3, 'x');
// 没有明确的返回值类型，数组内返回值类型应该是 value 类型

// 使用泛型
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++){
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x');
```



### 多个类型参数

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([1, 'one']);
```



### 泛型约束

因不知道泛型类型，不能随意操作属性或方法



### 泛型接口

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++){
        result[i] = value;
    }
    return result;
}
```



### 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```



### 泛型参数的默认类型

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
	// do something...
}
```



## 声明合并

### 函数的合并

重载定义多个函数类型

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if(typeof x === 'number') {
        return Number(...)
	}else{
    	return ...;                 
	}
}
```



### 接口的合并

```typescript
interface Alarm {
    price: number;
}

interface Alarm {
    weight: number;
}

// 相当于
interface Alarm {
    price: number;
    weight: number;
}

// 合并的属性的类型必须是唯一的
interface Alarm {
    price: number;
}

interface Alarm {
    price: number; // 虽然重复了，但是类型一样，所以不报错
    weight: number;
}

// 接口里的函数合并也一样
interface Alarm {
    price: number;
    alert(s: string): string;
}

interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}

// 相当于
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```



### 类的合并

与接口的合并规则一样



## 代码检查

1. `TSLint`

2. `ESLint` + `typescript-eslint-parser`

   > `typescript-eslint-parser` 对部分 `ESLint`支持不好，故需安装 `eslint-plugin-typescript`



### 在 VSCode 中集成 ESLint 的检查

```typescript
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ]
}
```