---
title: TypeScript 基础
keywords: typescript
tags: javascript
---

:racehorse:  TypeScript 基础学习。
<!--more-->

## boolean

```typescript
const test: Boolean = new Boolean(1);
const test: boolean = Boolean(1);
```



## number

```typescript
const nu: number = 6;
const nu: number = 0xf00d; // 16 进制
const nu: number = 0b1010; // 2 进制
const nu: number = 0o744; // 8 进制
const nu: number = NaN;
const nu: number = Infinity;
```



## string

```javascript
const s: string = 'liu';
const s: string = `hello, my name is ${name}, haha`;
```



## void

```typescript
function setName(): void {
    // 没有返回值的函数
}

const dt: void = undefined;
const dt: void = null;
```



## null & undefined

```typescript
const u: undefined = undefined;
const n: null = null;

const num: number = undefined;

let u: undefined;
let num: number = u;
```



## any

```typescript
let test: any = 'one';
test = 1;

let something; // 未声明类型，自动识别成任意类型
something = 'one';
something = 1;
```



## 类型推论

没有明确指定类型，依照类型推论规则推断出一个类型。

```typescript
let something = 'one'; // 解析成 let something: string = 'one'
something = 1; // error

let something; // 解析成 let something: any;
something = 'one';
something = 1;
```

## 联合类型

联合类型取值可以为多种类型中的一种。

```typescript
// 简单 demo
let something: string | number;
something = 'one';
something = 1;

// 不确定是哪个类型时，返回所有类型公有的属性或方法
function getLen(something: string | number): number {
    return something.length; // error，因为 number 没有 length 属性
}

// 联合类型的变量赋值时，会根据类型推论的规则推断出一个类型
let something: string | number;
something = 'one'; // 此时，something 为 string 类型
something.length; // 3, 得到字符串长度
something = 7; // 此时 something 为 number 类型
something.length; // error
```



## 对象的类型 - 接口

使用接口来定义对象的类型。

```typescript
// 简单 demo，变量形状与接口形状保持一致，少了或多了都不行
interface Person {
    name: string;
    age: number;
}

let liu: Person = {
    name: 'Liu',
    age: 20,
}

// 可选属性， 可以存在，也可不存在，但仍然不可新加未定义属性
interface Person {
    name: string;
    age?: number;
}
    
let liu: Person = {
	name: 'Liu',
}

// 任意属性
interface Person {
	name: string;
	age?: number;
	[propName: string]: any; // 确定属性与可选属性都是这个的子属性
}
    
let liu: Person = {
	name: 'Liu',
	a: 'aa',
}

// 只读属性
interface Person {
    readonly id: number;
    name: string;
}

let liu: Person = {
    id: 1,
    name: 'Liu',
}

liu.id = 2; // error
```



## 数组的类型

```typescript
// 类型 + 方括号 表示法
const fi: number[] = [1, 2, 3];

// 数组泛型
const fi: Array<number> = [1, 2, 3];
```



## 数组的类型 - 接口

```typescript
// NumberArray： index 的类型为 number，值的类型为 number
interface NumberArray {
    [index: number]: number
}

const fi: NumberArray = [1, 2, 3]
```



## any 在数组中的应用

```typescript
const list: any[] = ['1', 2];
```



## 类数组

```typescript
// 内置对象：IArguments NodeList HTMLCollection
function sum() {
    const args: IArguments = arguments;
}
```



## 函数的类型

### 函数定义

```typescript
// 声明式
function sum(x, y) {
    return x + y;
}

// 表达式
const sum = function(x, y) {
    return x + y;
}
```



### 函数声明

```typescript
// 对输入、输出进行约束
function sum(x: number, y: number): number {
    return x + y;
}
```



### 函数表达式

```typescript
const sum = function(x: number, y: number): number {
    return x + y;
}

// 表达式 sum 因类型推论而推断出来，如果要手动添加类型的话
const sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
}
// TypeScript 的 => 与 ES6 中的 =>
// TypeScript 的 => 表示类型函数的定义，左边是输入类型需要括号，右边是输出类型
// ES6 中的 => 叫做箭头函数
```



### 用接口定义函数的形状

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let search: SearchFunc;
search = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```



### 可选参数

函数可选参数(可选参数必须接在必需参数后面)

```typescript
function names(firstName: string, lastName?: string): string {
    return firstName + lastName;
}
```



### 参数默认值

默认参数识别成可选参数，但不受可选参数必须接在必需参数的后面的限制)(建议默认放后面

```typescript
function names(firstName: string = 'Liu', lastName: string): string {
    return firstName + lastName;
}
```



### 剩余参数(...rest)

rest参数只能是最后一个

```typescript
function push(array: any[], ...items: any[]) void {
    items.forEach(function(item){
        array.push(item);
    })
}
```



### 重载

使用重载精确表达函数，输入数字返回数字，输入字符串返回字符串

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if(typeof x === 'number'){
        return Number(x.toString().split('').reverse().join(''));
    }
    
    if(typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```



## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

1. <类型>值
2. 值 as 类型

tsx 语法，React jsx 语法的 ts 版，必须使用后一种

只能断言成联合类型存在的类型

```typescript
// as 写法，(something as string).length
function getLen(something: string | number): number {
    if((<string>something).length){
        return (<string>something).length;
    }else{
        return something.toString().length;
    }
}
```



## 声明文件

### 声明语句

```typescript
jQuery('#box');

// 使用 declare 关键字定义类型，帮助 TypeScript 判断我们传入的参数是否正确
declare let jQuery: (selector: string): => any;
```

### 声明文件

通常类型声明放在一个单独的文件中

```typescript
// jQuery.d.ts
declare let jQuery: (string) => any;

// 在文件开头，用 【三斜线指令】表示引用了声明文件
/// <reference path="./jQuery.d.ts" />

jQuery('#f00');
```



### 第三方声明文件

TypeScript 推荐使用 @types 来管理

types包：http://microsoft.github.io/TypeSearch/ 或直接到 https://www.npmjs.com/ 上找

```typescript
npm install @types/jquery --save-dev
```



## 内置对象



### ECMAScript 的内置对象

`Boolean`、`Error`、`Date`、`RegExp`

```typescript
const b: Boolean = new Boolean(1);
const e: Error = new Error('Error occurred');
const d: Date = new Date();
const r: RegExp = /[a-z]/;
```



### DOM 和 BOM 的内置对象

`Document`、 `HTMLElement` 、`Event`、`NodeList` 等

它们定义文件同样在 TypeScript 核心库的定义文件中

```typescript
const body: HTMLElement = document.body;
const allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent){
    // do something
});
```



### TypeScript 核心库的定义文件

常用的方法，TypeScript 已经做了很多类型的判断工作了

```typescript
// 内置函数例子：
Math.pow(10,2);

// 类型定义如下
interface Math {
    pow(x: number,y: number): number;
}

// DOM 例子：
document.addEventListener('click', function(e){
    console.log(e.targetCurrent); // Error
});

interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    // 上面的 e 推断成 MouseEvent，而 MouseEvent 没有 targetCurrent 属性
}
```


### TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js 则需要引入第三方声明文件。

```shell
npm install @types/node --save-dev
```