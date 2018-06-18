---
title: phaser3 Loader（）
---

phaser 3 loader
<!--more-->

## 加载进度条
preload 中操作
```javascript
let progress = this.add.graphics();

this.load.on('progress', function (value) {
    progress.clear();
    progress.fillStyle(0xffffff, 1);
    progress.fillRect(0, 270, 800 * value, 60);
});

this.load.on('complete', function () {
    progress.destroy();
})
```

## 图片的加载与显示
preload 中操作
```javascript

// 设置根路径
this.load.setBaseURL('https://labs.phaser.io');

// 设置公共路径
this.load.path = 'assets/';

// 加载图片
this.load.image('bg','sprites/phaser3-logo.png');
```

create 中操作
```javascript
// 显示图片
this.add.image(400, 300, 'bg')
```


## 图片点击回调
preload 方法
```javascript
// 加载 2 个图片
this.load.image('buttonBG', 'sprites/button-bg.png');
this.load.image('buttonText', 'sprites/button-text.png');
```

create 方法
```javascript
// 图片放在容器中一块放在中间
// 添加 setInteractive() 方法才可添加事件
let bg = this.add.image(0, 0, 'buttonBG').setInteractive();
let text = this.add.image(0, 0, 'buttonText');

// 放在容器中统一放中间
this.add.container(400, 300, [bg, text]);

// 点击 bg 精灵，触发回调函数 loadImage
bg.once('pointerup', this.loadImage, this);
```

loadImage 方法
```javascript
// 加载完成则触发回调函数 addSprites 
this.load.once('complete', this.addSprites, this);

// 加载图片
this.load.image('pic', 'pics/turkey-1985086.jpg');
this.load.image('titan', 'pics/titan-mech.png');
this.load.start();
```

addSprites 方法
```javascript
// 显示精灵
this.add.image(400, 300, 'pic');
this.add.image(400, 300, 'titan');
```

## 图片以对象方式加载
```javascript
this.load.image({
    key: 'taikodrummaster',
    url: 'pics/taikodrummaster.jpg'
});
```

## 多图重叠剪切
preload 方法
```javascript
// 简洁加载方式
this.load.image('robot', ['assets/pics/equality-by-ragnarok.png','assets/normal-maps/equality-by-ragnarok_n.png']);

// 以对象方式加载
this.load.image({
    key: 'robot', 
    url: 'assets/pics/equality-by-ragnarok.png',
    normalMap: 'assets/normal-maps/equality-by-ragnarok_n.png'
});
```

create 方法
```javascript

// 截取第一张图片前300px之后，设置坐标点为左上角，默认中间
let robot = this.add.image(-300,0,'robot').setOrigin(0);

// 创建 canvas 宽度400，高度600
let canvasTexture = this.textures.createCanvas('normalMap', 400, 600);

// 画第二张图片，前300px之后
canvasTexture.context.drawImage(robot.texture.getDataSourceImage(), -300, 0);

canvasTexture.refresh();

// 显示出来，设置坐标点为左上角
var robotMap = this.add.image(400, 0, 'normalMap').setOrigin(0);
```

## 图片照明效果
create 方法
```javascript
// 设置 light2d
this.add.image(-300, 0, 'robot').setOrigin(0).setPipeline('Light2D');

// 200 为高亮范围
let light  = this.lights.addLight(0, 0, 200);

// 0x555555 整体暗的程度
this.lights.enable().setAmbientColor(0x555555);

// 鼠标移动时
this.input.on('pointermove', function (pointer) {
    light.x = pointer.x;
    light.y = pointer.y;
});
```