能用代码解决的，决不去下载视图编辑工具
系统本身提供的些模块

pixi.js [pixi.js]
p2.js [物理引擎]
phaser-arcade-physics.js [包括主要物理引擎，下面会说]
phaser-no-physics.js [不包括物理引擎]
phaser-minimum.js [最简洁版本]
那就自己来定制一份吧！

克隆 Phaser 代码
# 官方最后发布phaser是2.6.2版本，不再维护，人力资源全使用在 Phaser 3 上
# 我们使用的是CE(Community Edition)社区版本，由开源社区维护更新及升级
git clone https://github.com/photonstorm/phaser-ce.git
安装 Grunt
官网

npm install -g grunt-cli  
npm install --save-dev grunt
安装所有依赖模块
npm install
使用自定义命令
# 直接输入 grunt custom，将输出帮助信息，及可选模块列表
grunt custom

# 不需要游戏手柄及键盘的话，可不打包这模块
grunt custom --exclude gamepad,keyboard
默认将生成 dist 目录，里面有 phaser.js 与 phaser.min.js

自定义名称 [--filename]
# 假如：生成文件名为：phaser-plane, 
# 注意：文件名不要加 .js 后缀
grunt custom --exclude gamepad --filename phaser-plane
是否需要 sourcemap 文件 [--sourcemap]
# 需要 sourcemap 文件
grunt custom --exclude gamepad --sourcemap true
是否需要压缩版本 [--uglify]
# 默认为 false
grunt custom --exclude gamepad --uglify true
是否需要分割文件 [--split]
# 分割 Phaser、PIXI、p2 和 Creature
# 默认为 false
grunt custom --exclude gamepad --split true
系统自带的 4 个构建方式
# 完整版本包括所有功能
grunt full

# 包括 Arcade Physics、Tilemaps、Particle的支持
# 不包括 P2 Physics 与 Ninja Physics 的支持
grunt arcadephysics

# 不包括任何物理引擎、Tilemap 与 Particle
grunt nophysics

# 最基本的架构部分及 PIXI 和 UMD 封装，经过 js 压缩 及 gzip 压缩以后，只有 `85kb` 左右
grunt minimum 
模块列表（phaser 2.7.8版本）
必需、可选是根据自己项目需求

名称	说明
[必需] intro	Phaser UMD wrapper
[必需] pixidefs	Pixi 默认
[必需] graphics	Graphics 和 PIXI 支持
[必需] rendertexture	RenderTexture 对象
[必需] text	文本
[必需] tweens	tweens 动画
[必需] scale	缩放 与 屏幕适配
[必需] create	Create 支持
[必需] flexgrid	flex 网络与flex 层
[可选] outro	Phaser UMD closure
[可选] gamepad	游戏手柄
[可选] keyboard	键盘输入
[可选] bitmapdata	BitmapData 对象
[可选] bitmaptext	BitmapText 字体文本对象
[可选] retrofont	Retro Fonts 字体渲染
[可选] rope	Rope and Strip
[可选] tilesprite	Tile Sprite
[可选] net	网络请求
[可选] sound	音频
[可选] video	视频
[可选] debug	debug 类
[可选] dom	常用 dom 操作
[可选] color	颜色函数
[可选] arcade	arcade 物理引擎
[可选] ninja	ninja 物理引擎
[可选] p2	P2 物理引擎
[可选] tilemaps	地图
[可选] particles	Arcade 粒子物理系统
[可选] weapon	Arcade 粒子物理系统插件
[可选] creature	Creature 动画工具支持