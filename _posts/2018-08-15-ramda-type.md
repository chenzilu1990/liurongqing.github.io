---
title: Ramda 函数库参考手册【完整版】
keywords: ramda
tags: javascript
---

:racehorse:  Ramda 函数，完整分类。官方地址：https://ramdajs.com/。
<!--more-->

## 字符串（ String ）

### trim

> 移除两端空格

```javascript
R.trim(' abc '); // => 'abc'

// 使用场景
R.map(R.trim, R.split(',')('x, y, z')); // => ['x', 'y', 'z']
```

### split

> 根据给定的分隔符，将字符串拆分成字符串数组

```javascript
const path = R.split('/');

// 除第一个以外成员的数组
R.tail(path('/usr/local/bin/node')); // => ['usr', 'local', 'bin', 'node']

R.split('.')('a.b.c'); // => ['a', 'b', 'c']
```

### test

> 是否匹配

```javascript
R.test(/^x/)('xyz'); // => true
R.test(/^y/)('xyz'); // => false
```

### match

> 正则匹配 <br/>
> 无匹配返回空数组，`String.prototype.match` 返回的是 `null`

```javascript
R.match(/[a-z]a/g)('bananas'); // => ['ba', 'na', 'na']
R.match(/a/)('bbb'); // => []

// TypeError: null does not have a method named 'match'
R.match(/a/, null);
```

### replace

> 字符串或正则匹配，将匹配的字符串替换成指定字符串

```javascript
R.replace('foo', 'bar')('foo foo foo'); // => 'bar foo foo'

R.replace(/foo/, 'bar')('foo foo foo'); // => 'bar foo foo'
R.replace(/foo/g, 'bar')('foo foo foo'); // => 'bar bar bar'
```

### toLower

> 转小写

```javascript
R.toLower('XYZ'); // => 'xyz'
```

### toUpper

> 转大写

```javascript
R.toUpper('abc'); // => 'ABC'
```

### toString

> 返回值的字符串形式，与原生 `toString` 不一样

```javascript
R.toString(12); // => '12'
R.toString('abc'); // =>'"abc"'
R.toString([1,2,3]); // => '[1, 2, 3]'
R.toString({foo: 1, bar: 2}); // => '{"bar": 2, "foo": 1}'
R.toString(new Date('2000-02-02T04:05:06Z')); // => 'new Date("2000-02-02T04:05:06Z")'
```

## 数学（ Math ）

### add

> 求和

```javascript
R.add(2, 5); // => 7
R.add(2)(5); // => 7
```

### subtract

> 求差

```javascript
R.subtract(10, 8); // => 2

const minus5 = R.subtract(R.__, 5);
minus5(17); // => 12
```

### dec 

> 减 1

```javascript
R.dec(10); // => 9
```

### inc

> 加 1

```javascript
R.inc(10); // => 11
```

### divide

> 求商

```javascript
R.divide(11)(100);  // => 0.71

const half = R.divide(R.__, 2);
half(20); // => 10

// 倒数
const reciprocal = R.divide(1);
reciprocal(4); // => 0.25
```

### multiply

> 求积

```javascript
const double = R.multiply(2);
const triple = R.multiply(3);

double(3); // => 6
triple(4); // => 12

R.multiply(2, 5); // => 10
```

### mathMod

> 取模 <br>
> 为负时，取正 <br>
> 模数为 0 或 负数时，返回 NaN

```javascript
R.mathMod(-17, 5); // => 3   4 * 5 = 20
R.mathMod(17, 5); // => 2

R.mathMod(17, -5); // => NaN
R.mathMod(17, 0); // => NaN
R.mathMod(17.2, 5); // => NaN
R.mathMod(17, 5.3); // => NaN

const clock = R.mathMod(R.__, 12);
clock(15); // => 3
clock(24); // => 0
```

### modulo

> 取余

```javascript
R.modulo(17, 3); // => 2
R.modulo(-17, 3); // => -2
R.modulo(17, -3); // => 2

const isOdd = R.modulo(R.__, 2);
isOdd(42); // => 0
isOdd(21); // => 1
```

### mean

> 平均值

```javascript
R.mean([2, 7, 9]); // => 6
R.mean([]); // => NaN
```

### median

> 中位数 <br>
> 奇数就是中间那个数，偶数是中间两个数的平均数

```javascript
R.median([2, 9, 7]); // => 7
R.median([7, 2, 10, 9]); // => 8
R.median([]); // => NaN
```

### negate

> 取负数

```javascript
R.negate(20); // => -20
```

### product

> 阶乘

```javascript
R.product([2, 4, 6]); // => 48
```

### sum

> 累加

```javascript
R.sum([2, 4, 6, 8]); // => 20
```


## 比较关系（ Relation ）

### equals

> 相等

```javascript
R.equals(1, 1); // => true
R.equals(1, '1'); // => false
R.equals([1, 2, 3], [1, 2, 3]); // => true

const a = {}; a.v = a;
const b = {}; b.v = b;
R.equals(a, b); // => true
```

### identical

> 参数相同或引用内存地址位置一样则返回 `true`

```javascript
const o = {};
R.identical(o, o); // => true
R.identical(1, 1); // => true
R.identical(NaN, NaN); // => true
```

### gt

> 大于

```javascript
R.gt(2, 1); // => true
R.gt('a', 'z'); // => false
```

### gte

> 大于等于

```javascript
R.gte(2, 1); // => true
R.gte('a', 'z'); // => false
```

### lt

> 小于

```javascript
R.lt(2, 1); // => false
R.lt('a', 'z'); // => true
```

### lte

> 小于等于

```javascript
R.lte(2, 1); // => false
R.lte('a', 'z'); // => true
```

### eqBy

> 经过函数处理后值相等则返回 `true`

```javascript
R.eqBy(Math.abs, 5, -5); // => true
```

### clamp

> 限制在一个范围内 <br>
> 超出取最接近的限界值

```javascript
R.clamp(1, 10, -5); // => 1
R.clamp(1, 10, 15); // => 10
R.clamp(1, 10, 4); // => 4
```

### countBy

> 数组列表经过函数处理以后，生成 {值： 个数} 的对象

```javascript
const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
R.countBy(Math.floor)(numbers); // => {'1': 3, '2': 2, '3': 1}

const letters = ['a', 'b', 'B', 'B'];
R.countBy(R.toLower)(letters); // => {'a': 2, 'b': 2}
```

### max

> 从两数中取最大值

```javascript
R.max(789, 123); // => 789
R.max('a', 'b'); // => 'b'
```

### maxBy

> 与 `max` 类似，根据函数处理完以后判断值

```javascript
const square = n => n * n;

R.maxBy(square, -3, 2); // => -3

R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); // => -5
R.reduce(R.maxBy(square), 0, []); // => 0
```
### min

> 两数取小值

```javascript
R.min(789, 123); // => 123
R.min('a', 'b'); // => 'a'
```

### minBy

> 与 `min` 类似，根据函数处理完以后判断值

```javascript
const square = n => n * n;
R.minBy(square, -3, 2); // => 2

R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); // => 1
R.reduce(R.minBy(square), Infinity, []); // => Infinity
```


### pathEq

> 取对象值判断是否相等

```javascript
const user1 = { address: { zipCode: 90210 } };
const user2 = { address: { zipCode: 55555 } };
const user3 = { name: 'Bob' };
const user = [ user1, user2, user3 ];
const isFamouse = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamouse, users); // => [ user1 ]
```

### propEq

> 根据属性值过滤对象

```javascript
const abby = { name: 'Abby', hair: 'blond' };
const fred = { name: 'Fred', hair: 'brown' };
const kids = [abby, fred];
const hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair)(kids); // => [fred, rusty]
```

### sortWith

> 根据多个条件排序

```javascript
const alice = { name: 'alice', age: 40, };
const bob = { name: 'bob', age: 30, }
const clara = { name: 'clara', age: 40, }
const people = [clara, bob, alice];
const ageNameSort = R.sortWith([
    R.descend(R.prop('age')),
    R.ascend(R.prop('name'))
]);

ageNameSort(people); // => [alice, clara, bob]
```

### difference

> 取第一个数组中值不在第二个数组中的集合。

```javascript
R.difference([1, 2, 3], [6, 5, 4, 3]); // => [1, 2]
R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]); // => [{b: 2}]
```

### differenceWith

> 与 `difference` 类似， 根据函数确定值

```javascript
const cmp = (x, y) => x.a === y.a;
const l1 = [{a: 1}, {a: 2}, {a: 3}];
const l2 = [{a: 3}, {a: 4}];

R.differenceWith(cmp, l1, l2); // => [{a: 1}, {a: 2}]
```

### intersection

> 取两个数组中共同值

```javascript
R.intersection([1, 2, 3, 4], [7, 6, 5, 4, 3]); // => [4, 3]
```

### symmetricDifference

> 取不重复的值

```javascript
R.symmetricDifference([1, 2, 3, 4], [7, 6, 5, 4, 3]); // => 【1, 2, 7, 6, 5】
```

### symmetricDifferenceWith

> 与 `symmetricDifference` 类似

```javascript
const eqA = R.eqBy(R.prop('a'));
const l1 = [{a: 1}, {a: 3}];
const l2 = [{a: 3}, {a: 4}];
R.symmetricDifferenceWith(eqA, l1, l2); // => [{a: 1}, {a: 4}]
```

### union

> 并集

```javascript
R.union([1, 2, 3], [2, 3, 4]); // => [1, 2, 3, 4]
```

### unionWith

> 对象数组并集

```javascript
const l1 = [{a: 1}, {a: 2}];
const l2 = [{a: 1}, {a: 4}];
R.unionWith(R.eqBy(R.prop('a')), l1, l2); // => [{a: 1},{a: 2}, {a: 4}]
```

### innerJoin

> 根据函数判断源数组对象中值符合条件的成员

```javascript
R.innerJoin(
    (record, id) => record.id === id,
)([
    { id: 824, name: 'Richie Furay' },
    { id: 956, name: 'Dewey Martin' },
    { id: 313, name: 'Bruce Palmer' },
    { id: 456, name: 'Stephen Stills' },
    { id: 177, name: 'Neil Young' },
])([
    177, 456, 999
]);

// => [{id: 456, name: 'Stephen Stills'},{id: 177, name: 'Neil Young'}]

```

## 逻辑判断（ Logic ）

### allPass

> 全部满足条件返回 `true`

```javascript
const isQueen = R.propEq('rank', 'R');
const isSpade = R.propEq('suit', 'S');
const isQueenOfSpades = R.allPass([isQueen, isSpade]);

isQueenOfSpades({rank: 'R', suit: 'A'}); // => false
isQueenOfSpades({rank: 'R', suit: 'S'}); // => true
```

### and

> 相同于 `&&`，两个都为 `true` 则返回 `true`

```javascript
R.and(true, true); // => true
R.and(true, false); // => false
```

### anyPass

> 正确匹配一个，返回 `true`

```javascript
const isClub = R.propEq('suit', 'A');
const isSpade = R.propEq('suit', 'B');
const isBlackCard = R.anyPass([isClub, isSpade]);

isBlackCard({rank: '10', suit: 'A' }); // => true
isBlackCard({rank: 'Q', suit: 'B' }); // => true
isBlackCard({rank: 'Q', suit: 'C' }); // => false
```

### both

> 等同于 `&&`

```javascript
const gt10 = R.gt(R.__, 10);
const lt20 = R.lt(R.__, 20);

const f = R.both(gt10, lt20);
f(15); // => true
f(30); // => false
```

### complement

> 等同于 `!`，取反 

```javascript
const isNotNil = R.complement(R.isNil);
isNil(null); // => true
isNotNil(null); // => false
isNil(7); // => false
isNotNil(7); // => true
```

### cond

> 封装了 `if/else` `if/else`

```javascript
const fn = R.cond([
    [R.equals(0), R.always('0...')],
    [R.equals(100), R.always('100...')],
    [R.T, temp => `${temp}...`],
]);

fn(0);
fn(50);
fn(100);
```

### defaultTo

> 第二个参数为 `null` `undefined` `NaN`，返回默认值

```javascript
const defaultTo42 = R.defaultTo(42);

defaultTo42(null); // => 42
defaultTo42(undefined); // => 42
defaultTo42(parseInt('string')); // => 42

defaultTo42('Ramda'); // => 'Ramda'
```

### either

> 与 `||` 类似

```javascript
const gt10 = x => x > 10;
const even = x => x % 2 === 0;

const f = R.either(gt10, even);
f(101);
f(8);
```

### ifElse

> `if/else`

```javascript
const incCount = R.ifElse(
    R.has('count),
    R.over(R.lensProp('count'), R.inc),
    R.assoc('count', 1)
);

incCount({}); // => { count: 1 }
incCount({ count: 1 }); // => { count: 2 }
```

### isEmpty

> 是否为空

```javascript
R.isEmpty([1, 2, 3]); // => false
R.isEmpty([]); // => true
R.isEmpty(''); // => true
R.isEmpty(null); // => false
R.isEmpty({}); // => true
R.isEmpty({length: 0}); // => false
```

### not

> 逻辑非运算

```javascript
R.not(true); // => false
R.not(false); // => true
R.not(0); // => true
R.not(1); // => false
```

### or

> 逻辑或运算

```javascript
R.or(true, true); // => true
R.or(true, false); // => true
R.or(false, false); // => false
```

### pathStatisfiles

> 根据路径值，判断是否成立

```javascript
R.pathStatisfies(y => y > 0, ['x', 'y'], { x: { y: 2 }}); // => true
```

### propStatisfiles

> 根据属性值判断是否成立

```javascript
R.propSatisfies(x => x > 0, 'x', { x: 1, y: 2 }); // => true
```

### unless

> 不满足参数一条件则返回参数一，否则传入第二参数

```javascript
const safeInc = R.unless(R.isNil, R.inc);
safeInc(null); // => null
safeInc(1); // => 2
```

### until

> 第二参数进行计算，直到满足条件时，返回这个参数

```javascript
R.until(R.gt(R.__, 100), R.multiply(2))(1); // => 128  1、2、4、8、16、32、64、128
```

### when

> 满足一参数，则继续运行

```javascript
const truncate = R.when(
    R.propSatisfies(R.gt(R.__, 10), 'length'),
    R.pipe(R.take(10), R.append('...'), R.join(''))
);

truncate('12345'); // '12345'
truncate('0123456789ABC'); // => '0123456789...
```

## 函数（ Function ）

### addIndex

> 为迭代函数的回调函数添加当前索引和整个列表参数

```javascript
const mapIndexed = R.addIndex(R.map);
mapIndexed((val, idx) => idx + '-' + val, ['a', 'b', 'c']);
// => ['0-a', '1-b', '2-c']
```

### always

> 返回恒定的函数，类似 `const`

```javascript
const t = R.always('Tee');
t(); // => 'Tee'
```

### ap

> 将数组列表各自作用于函数上，最后连接起来

```javascript
R.ap([R.multiply(2), R.add(3)], [1, 2, 3]); // => [2, 4, 6, 4, 5, 6]
R.ap([R.concat('t '), R.toUpper], ['a', 'b']); // => ['t a', 't b', 'A', 'B']

R.ap(R.concat, R.toUpper)('Ramda'); // => 'RamdaRAMDA'
```

### apply

> 与原生类似

```javascript
const nums = [1, 2, 33, 4, 5];
R.apply(Math.max, nums); // => 33
```

### applySpec

> 接受一个属性值为函数的对象，返回结构相同的对象

```javascript
const getMetrics = R.applySpec({
    sum: R.add,
    nested: { nul: R.multiply }
});

getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
```

### applyTo

> 给定一个值，作用于不同函数

```javascript
const t10 = R.applyTo(10);
t10(R.identity); // => 10
t10(R.add(1)); // => 11
```

### ascend

> 创建升序函数

```javascript
const byAge = R.ascend(R.prop('age'));
const people = [
    // ...
];
const peopleByYoungestFirst = R.sort(byAge, people);
```

### binary

> 将多元函数转成二元函数

```javascript
const takesThreeArgs = function(a, b, c) {
  return [a, b, c];
};
takesThreeArgs.length; //=> 3
takesThreeArgs(1, 2, 3); //=> [1, 2, 3]

const takesTwoArgs = R.binary(takesThreeArgs);
takesTwoArgs.length; //=> 2
// Only 2 arguments are passed to the wrapped function
takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
```

### bind

> 创建一个绑定上下文的函数

```javascript
const log = R.bind(console.log, console);
R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
// logs {a: 2}
```

### call

> 第一个参数为函数，其他参数为函数的参数

```javascript
R.call(R.add, 1, 2); // 3
```

### comparator

> 首个参数是否小于第二个参数

```javascript
const byAge = R.comparator((a, b) => a.age < b.age );
```

### compose

> 从右到左执行

```javascript
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
```

### composeK

> 同 `compose` 类似，`R.composeK(h, g, f)` 等同于 `R.compose(R.chain(h)，R.chain(g)，f)`。

### composeP

> 最右边函数可以是任意元，其余函数必须是一元函数

### construct

> 将构造函数封装进柯里化函数，新函数与原构造函数的传入参数类型及返回值类型相同。


### constructN

### converge

### curry

### curryN

### descend

### empty

### F

### flip

### identity

### invoker

### juxt

### lift

### liftN

### memoize

### memoizeWith

### module.exports

### nAry

### nthArg

### o

### of

### once

### partial

### partialRight

### pipe

### pipeK

### pipeP

### T

### tap

### tryCatch

### unapply

### unary

### uncurryN

### useWith


## 数组列表（ List ）

### adjust

### all

### any

### aperture

### append

### chain

### concat

### contains

### drop

### dropLast

### dropLastWhile

### dropRepeats

### dropRepeatsWith

### dropWhile

### endsWith

### filter

### find

### findIndex

### findLast

### findLastIndex

### flatten

### forEach

### fromPairs

### groupBy

### groupWith

### head

### indexBy

### indexOf

### init

### insert

### insertAll

### intersperse

### into

### join

### last

### lastIndexOf

### length

### map

### mapAccum

### mapAccumRight

### mergeAll

### none

### nth

### pair

### partition

### pluck

### prepend

### range

### reduce

### reduceBy

### reduced

### reduceRight

### reduceWhile

### reject

### remove

### repeat

### reverse

### scan

### sequence

### slice

### sort

### splitAt

### splitEvery

### splitWhen

### startsWith

### tail

### take

### takeLast

### takeLastWhile

### takeWhile

### times

### transduce

### transpose

### traverse

### unfold

### uniq

### uniqBy

### uniqWith

### unnest

### update

### without

### xprod

### zip

### zipObj

### zipWith

## 对象（ Object ）

### keys

> 返回 `key` 的集合

```javascript
R.keys({ a: 1, b: 2, c: 3}); // => ['a', 'b', 'c']
```

### assoc

> 浅复制，然后设置或覆盖指定属性

```javascript
R.assoc('c', 3, { a: 1, b: 2 }); // { a: 1, b: 2, c: 3}
```

### assocPath

> 指定路径，设置或覆盖指定属性

```javascript
R.assocPath(['a', 'b', 'c'], 42, { a: { b: { c: 0}}}); // => {a: { b: { c: 42}}}
R.assocPath(['a', 'b', 'c'], 42, { a: 5 }); // => {a: { b: { c: 42}}}
```

### clone

> 深拷贝

```javascript
const o = [{}, {}, {}];
const OC = R.clone(o);

o === OC; // => false
o[0] === OC[0]; // => false
```

### dissoc

> 删除属性

```javascript
R.dissoc('b', { a: 1, b: 2, c: 3}); // => { a: 1, c: 3 }
```

### dissocPath

> 浅复制对象，删除指定路径上的属性

```javascript
R.dissocPath(['a', 'b', 'c'], { a: { b: { c: 42}}}); // => { a: { b: {}}}
```

### eqProps

> 通过 `R.equals` 判断属性值是否相等

```javascript
const o1 = { a: 1, b: 2 };
const o2 = { a: 3, b: 2};

R.eqProps('a', o1, o2); // => false
R.eqProps('b', o1, o2); // => true
```

### evolve

> 根据条件对对象进行处理

```javascript
const tomato = { firstName: ' Tomato ', data: { elapsed: 100, remaining: 1400}};

const transformations = {
    firstName: R.trim,
    lastName: R.trim,
    data: { elapsed: R.add(1), remaining: R.add(-1)}
}

R.evolve(transformations, tomato);
```

### forEachObjIndexed

> 遍历 `object` 函数接受三个参数：(value, key, obj)

```javascript
const print = (value, key) => console.log(key + ':' + value);
R.forEachObjIndexed(print, { x: 1, y: 2}); // => { x: 1, y: 2 }

// logs x: 1
// logs y: 2
```

### has

> 对象自身是否含有指定的属性

```javascript
const hasName = R.has('name');
hasName({ name: 'alice' }); // => true
hasName({}); // => false

const point = { x: 0, y: 0 };
const pointHas = R.has(R.__, point);

pointHas('x'); // => true
pointHas('y'); // => true
pointHas('z'); // => false
```

### hasIn

> 与 `has` 类似，不同在于 `hasIn` 包括原型链上

```javascript
function Test(width) {
    this.width = width;
}

Test.prototype.height = function(){
    return this.width * .5;
}

const T = new Test(2);
R.hasIn('width', T); // => true
R.hasIn('height', T); // => true
```

### invert

> 键值交换，多个值则放在数组中

```javascript
const race = {
    first: 'alice',
    second: 'jake',
    third: 'alice'
};

R.invert(race); 
// => { 'alice': ['first', 'third'], 'jake': ['second']}
```

### invertObj

> 与 `invertObj` 类似，键值交换，多个值取最后一个

```javascript
const race = {
    first: 'alice',
    second: 'jake',
    third: 'alice'
};

R.invertObj(race); 
// => { 'alice': 'third', 'jake': ['second']}
```

### keysIn

> 与 `keys` 类似，不同在于 `keysIn` 包括原型链

```javascript
const F = function() { this.x = 'X' };
F.prototype.y = 'Y';

const f = new F();
R.keysIn(f); // => ['x', 'y']
```

### lens

> 返回封装给定的 `getter` 和 `setter`

```javascript
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, {x: 1, y: 2});            //=> 1
R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
```

### lensIndex

> 返回聚集到指定索引的 `lens`

```javascript
const headLens = R.lensIndex(0);

R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
```

### lensPath

> 返回聚焦到指定路径的 `lens`

```javascript
const xHeadYLens = R.lensPath(['x', 0, 'y']);

R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> 2
R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
```

### lengsProp

> 返回聚焦到指定属性

```javascript
const xLens = R.lensProp('x');

R.view(xLens, {x: 1, y: 2});            //=> 1
R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
```

### mapObjIndexed

> 与 `map` 多 2 个参数，(value, key, obj)

```javascript
const values = { x: 1, y: 2, z: 3 };
const prependKeyAndDouble = (num, key, obj) => key + (num * 2);

R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
```

### merge

> 合并，不包括原型链，重复取后一个值

```javascript
R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
//=> { 'name': 'fred', 'age': 40 }

var resetToDefault = R.merge(R.__, {x: 0});
resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
```

### mergeDeepLeft

> 与 `merge` 类似，继续合并值为对象的，重复值取第一个

```javascript
R.mergeDeepLeft(
    { name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
    { age: 40, contact: { email: 'baa@example.com' }}
);
//=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
```

### mergeDeepRight

> 与 `merge` 类似，继续合并值为对象的，重复值取最后一个

```javascript
R.mergeDeepRight(
    { name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
    { age: 40, contact: { email: 'baa@example.com' }}
);
//=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
```

### mergeDeepWith

> 与 `merge` 类似，通过函数处理重复值

```javascript
R.mergeDeepWith(R.concat,
    { a: true, c: { values: [10, 20] }},
    { b: true, c: { values: [15, 35] }});
//=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
```

### mergeDeepWithKey

> 对 `key` 和对应的两个值进行处理

```javascript
const concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
R.mergeDeepWithKey(concatValues,
    { a: true, c: { thing: 'foo', values: [10, 20] }},
    { b: true, c: { thing: 'bar', values: [15, 35] }});
//=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
```

### mergeWith

> 类似 `mergeDeepWith`

```javascript
R.mergeWith(R.concat,
    { a: true, values: [10, 20] },
    { b: true, values: [15, 35] });
//=> { a: true, b: true, values: [10, 20, 15, 35] }
```

### mergeWithKey

> 类似 `mergeDeepWithKey`

```javascript
const concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
R.mergeWithKey(concatValues,
    { a: true, thing: 'foo', values: [10, 20] },
    { b: true, thing: 'bar', values: [15, 35] });
//=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
```

### objOf

> 包含单个键值对的对象

```javascript
const matchPhrases = R.compose(
  R.objOf('must'),
  R.map(R.objOf('match_phrase'))
);
matchPhrases(['foo', 'bar', 'baz']); 
//=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
```

### omit

> 批量删除属性

```javascript
R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
```

### over

> 对指定值进行函数变换

```javascript
const headLens = R.lensIndex(0);
R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); 
//=> ['FOO', 'bar', 'baz']
```

### path

> 取出给定路径上的值

```javascript
R.path(['a', 'b'], { a: { b: 2 }}); // => 2
R.path(['a', 'b'], { c: { b: 2}}); // => undefined
```

### pathEq

> 过滤列表中的值

```javascript
const user1 = { address: { zipCode: 90210 } };
const user2 = { address: { zipCode: 55555 } };
const user3 = [ name: 'Bob' ];
const users = [ user1, user2, user3 ];
const isFamous = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamous, users); // => [ user1 ]
```

### pathOr

> 不存在返回默认值

```javascript
R.pathOr('N/A', ['a', 'b'], { a: { b: 2}}); // => 2
R.pathOr('N/A', ['a', 'b'], { c: { b: 2}}); // => 'N/A'
```

### pick

> 返回对象部分拷贝，键不存在则忽略

```javascript
R.pick(['a', 'd'], { a: 1, b: 2, c: 3, d: 4}); // => { a: 1, d: 4}
R.pick(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4}); // => { a: 1 }
```

### pickAll

> 与 `pick` 类似，不存在用 `key: undeinfed` 返回

```javascript
R.pickAll(['a', 'd'], { a: 1, b: 2, c: 3, d: 4}); // => {a: 1, d: 4}
R.pickAll(['a', 'e', 'f' ], { a: 1, b: 2, c: 3, d: 4}); // => { a: 1, e: undefined, f: undefined}
```

### pickBy

> 与 `pick` 类似，满足条件返回

```javascript
const isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase, { a: 1, b: 2, A: 3, B: 4}); // => { A: 3, B: 4}
```

### project

> 模拟 SQL 中的 `select` 语句

```javascript
const abby = { name: 'abby', age: 7 };
const fred = { name: 'fred', age: 11};
const kids = [abby, fred];
R.project(['name'], kids);
// => [{ name: 'abby' }, {name: 'fred' }]
```

### prop

> 取出对象中指定属性的值，不存在返回 `undefined`

```javascript
R.prop('x', { x: 100 }); // => 100
R.prop('x', {}); // => undefined
```

### propOr

> 存在返回，不存在返回默认值

```javascript
const alice = {
    name: 'ALICE',
    age: 101
};

const favorite = R.prop('favoriteLibrary');
const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');

favorite(alice); // => undefined
favoriteWithDefault(alice); // => 'Ramda'
```

### props

> 返回 `prop` 的数组下的值

```javascript
R.props(['x', 'y'], {x: 1, y: 2}); // => [1, 2]
R.props(['c', 'a', 'b'], { b: 2, a: 1}); // => [undefined, 1, 2]

const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); // Tony Bullet-Tooth
```

### set

> 对指定值进行设置

```javascript
const xLens = R.lensProp('x');

R.set(xLens, 4, { x: 1, y: 2}); // => {x: 4, y: 2}
R.set(xLens, 8, { x: 1, y: 2}); // => {x: 8, y: 2}
```

### toPairs

> 将键值转成数组

```javascript
R.toPairs({a: 1, b: 2, c: 3});
// => [['a', 1], ['b', 2], ['c', 3]]
```

### toPairsIn

> 与 `toPairs` 类似，包括原型链上的值

```javascript
const F = function () { this.x = 'X'; };
F.prototype.y = 'Y';

const f = new F();
R.toPairsIn(f);
// => [['x', 'X'], ['y', 'Y']]
```

### values

> 值的集合

```javascript
R.values({a: 1, b: 2, c: 3}); // [1, 2, 3]
```

### valuesIn

> 与 `values` 类似，包括原型链上的值

```javascript
const F = function() { this.x = 'X'; };
F.prototype.y = 'Y';

const f = new F();
R.valuesIn(f); // => ['X', 'Y']
```

### view

> 返回数据中指定字段

```javascript
const xLens = R.lensProp('x');

R.view(xLens, {x: 1, y: 2}); // => 1
R.view(xLens, {x: 4, y: 2}); // => 4
```

### where

> 多条件满足则返回 `true`

```javascript
const pred = R.where({
    a: R.equals('foo'),
    x: R.gt(R.__, 10),
});

pred({a: 'foo', x: 11}); // true
```

### whereEq

> 多条件满足则返回 `true`， `where` 的一种特殊形式

```javascript
const pred = R.whereEq({a: 1, b: 2});

pred({a: 1}); // => false
pred({a: 1, b: 2}); // => true
```



