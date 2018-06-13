---
title: phaser3 Loader（）
---

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

