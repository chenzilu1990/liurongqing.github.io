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

> 将

## 数组列表（ List ）

## 对象（ Object ）



