安装与使用
安装 Ruby
# MAC下的安装方式
brew install ruby  
vim ~/.bash_profile

# 如果是安装到/usr/local/bin下，且这个还没配置的话
export PATH=/usr/local/bin:$PATH

# 检测ruby是否安装成功
ruby --version 
安装 sass
gem install sass
使用
sass test.scss  
sass test.scss test.css  
sass --style compressed test.sass test.css
监听使用
# watch a file
sass --watch input.scss:output.css

# watch a directory
sass --watch app/sass:public/stylesheets
sass 编译风格
nested: 嵌套缩进的css代码，它是默认值
expanded: 没有缩进的、扩展的css代码
compact: 简洁格式的css代码
compressed: 压缩后的css代码
基本用法
变量
// 变量以 $ 开头
$blue: blue;
div {  
    color: blue;
}

// 变量在字符串中，就必须写在#{}中
$side: left;
.rounded {
    border-#{$side}-radius: 5px;
}
计算功能
$width: 100px;
div {  
    margin: (14px / 2);
    top: 50px + 100px;
    left: $width * 10%;
}
嵌套
// 嵌套方式一
span a,div a {  
    color: red;
}
// 可以写成
span,div {  
    a {
        color: red;
    }
}

// 嵌套方式二
#content span, #content div {
  color: red;
}
// 可以写成
#content {
  span,div {
      color: red;
  }
}

// 嵌套方式三
p {  
  border-width: 1px;
  border-color: red;
  border-style: solid;
}
// 可以写成
p {  
  border: {
      width: 1px;
      color: red;
      style: solid;
  }
}

// 引用父元素
a {  
  &:hover {
      color: red;
  }
}
// 编译以后的效果是
a:hover {  
  color: red;
}
导入外部文件
// sass文件，如果不生成独立的文件，则文件名以_开头，导入时可省略_与后缀名
// 有个_head.sass
@import "head";

// css文件
// 有个head.css
@import "head.css";
颜色函数
lighten(#cc3,10%) // #d6d65c  
darken(#cc3,10%) // #a3a329  
grayscale(#cc3) // #808080  
complement(#cc3) // 33c  
注释
# SASS共有3种注释方式
/ 注释内容 / 保留到编译后的文件中
// 注释内容 不保存在编译后的文件中
/! 重要注释内容 / 保留到编译后的文件中，哪怕是压缩版本也会保留的
混合器
// 简洁版 mixin
@mixin rounded-corners{
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
// 调用
.notice{
  border: 1px solid red;
  @include rounded-corners;
}

// 带参数的 mixin
@mixin link-colors($normal,$hover,$visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
// 调用
a {  
  @include link-colors(blue,red,green);
}
// 也可以这样调用
a {  
  @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}

// 带默认参数值的 mixin
@mixin link-colors($normal,$hover: $normal,$visited: $normal) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
// 调用
a {  
  @include link-colors(blue);
}
继承
简单选择器的继承
.serious-error 继承 .error 以 class="serious-error" 修饰的 html，最终展示的效果是 class="serious-error error"
.error {
    border: 1px solid red;
    background-color: #fdd;
}
.serious-error {
    @extend .error;
    border-width: 3px;
}
一条样式继承复杂选择器
.serious-error @extend .important.error
.important.error 和 h1.important.error 的样式都会被 .serious-error 继承
.important 和 .error 的样式不会被 .serious-error 继承

完全命中才继承
( #main .serious-error) @extend .error
#main .error 这种选择器是不能被继承的

高级用法
条件语句
@if
p {  
   @if 1 + 1 == 2 { border: 1px solid red; }
   @if 5 < 3 { border: 2px solid blue; }
}
@if...else
@if lightness($color) > 30% {
   background-color: #000;
} @else {
   background-color: #fff;
}
循环语句
@for 循环
//  第一种方式包括end
@for $i from 1 to 10 { .border-#{$i} {
  border: #{$i}px solid blue;
} }

// 第二种方式不包括end
@for $i from 1 through 10 { .border-#{$i} { 
  border: #{$i}px solid blue; 
} }
@while 循环
$i: 6;
@while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
}
自定义函数
@function double($n){
    @return $n * 2;
}

#sidebar {
    width: double(5px);
}