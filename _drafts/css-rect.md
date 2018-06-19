原理：
padding的百分比值是以父元素宽度为基准
1.百分比宽度的正方形
2.显示方式：背景图
3.显示方式：图片

百分比宽度的正方形
<!DOCTYPE html>  
<html lang="en">  
    <head>
    <meta charset="UTF-8">
    <title>正方形的图片</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <style>
        /* padding必须是width的一半，因为padding有上下 */
        div {    
            width: 40%;
            padding: 20% 0;
            background: red;
        }
    </style>
</head>  
<body>  
    <div></div>    
</body>  
</html> 
这样子就能看到一个红色的矩形了

显示方式：背景图
/* 修改样式，将红色背景改成图片就是一个正方形的图片了*/
div {  
  background: url(xxx.jpg);
  background-size: 100% 100%;
}
显示方式：图片
<style>  
div {  
  position: relative;
  width: 40%;
  padding: 20% 0;
}
div img {  
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
}
</style>

<div>  
    <img src="xxx.jpg">
</div>