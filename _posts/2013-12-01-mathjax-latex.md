---
title: MathJax 使用 LaTeX 语法编写数学公式
keywords: mathjax, latex
tags: mathjax
published: false
---

:wolf: MathJax是一种可以在网页显示数学公式的插件，本章主要介绍 MathJax 如何使用 LaTeX 语法编写数学公式。
<!--more-->


## 如何插入公式
1. 行中公式
    `$数学公式$` 或 `\(数学公式\)`
2. 独立公式
    `$$数学公式$$` 或 `\[数学公式\]`


## 如何输入上下标
1. ^ 表示上标，_ 表示下标，上下标内容多于一个字符时，要用 {} 括成一个整体

```bash
$x^{y^z} = (1+{\rm e}^x)^{-2xy^w}$
```
2. 左右两边都有上下标，可以用 `\sideset` 命令

```bash
$\sideset{^1_2}{^3_4}\bigotimes$
```

## 如何输入括号和分隔符
1.`()` `[]` `|` 表示自己，`\{\}` 表示 `{}`，当要显示大号的括号或分隔符时，要用`\left` 和 `\right` 命令

```bash
$f(x,y,z) = 3y^2z\left( 3 + \frac{7x+5}{1+y^2}\right)$
```

2.用 `\left.` 或 `\right.` 进行匹配而不显示本身

```bash
$\left. \frac{{\rm d}u}{{\rm d}x} \right|_{x=0}$
```

## 如何输入分数

```bash
$\frac{1}{3}$ 或 $1 \over 3$
```

## 如何输入开方

```bash
\sqrt{2} 和 \sqrt[n]{3}
```

## 如何输入省略号
与文本底线对齐的省略号 `\ldots`，与文本中线对齐的省略号 `\cdots`

```bash
$(x_1,x_2,\ldots,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2$
```

## 如何输入矢量

```bash
$\vec{A} \cdot \vec{B} = 0$
```

## 如何输入积分

```bash
$\int_0^1 x^2{\rm d}x$
```

## 如何输入极限运算

```bash
$lim_{n \rightarrow + \infty} \frac{1}{n(n+1)}$
```

## 如何输入累加、累乘运算

```bash
$\sum_{i=0}^n \frac{1}{i^2}$ 和 $\prod_{i=0}^n \frac{1}{i^2}$
```

## 如何输入希腊字母

```bash
\alpha A \beta B \gamma \Gamma \delta \Delta \epsilon E
```
