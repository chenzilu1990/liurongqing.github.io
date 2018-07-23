---
title: React + Webpack + TypeScript 搭建可持续项目（二、hello world ）
keywords: react, webpack, es6, javascript
tags: react
published: false
---

:dog: 安装相关 npm 包、搭建本地开发环境、通过 babel 解析 ES6 及 react jsx 语法，运行本地开发环境。
<!--more-->

## 安装 npm 包
```shell
yarn add react react-dom webpack-dev-server babel-loader babel-core babel-preset-env babel-preset-react --dev # or npm i react react-dom webpack-dev-server babel-loader babel-core babel-preset-env babel-preset-react --save-dev
```

## npm 包说明
- react react-dom react 包
- webpack-dev-server 本地开发服务器
- babel-loader babel-core babel-preset-env babel-preset-react 解析 es6 及 react jsx 语法

## 修改 index.html
添加元素 id="app"
```html
<div id="app"></div>
```

## 修改 index.js
```javascript
import React from 'react'
import { render } from 'react-dom'

render(
    <h1>Hello, world</h1>,
    document.getElementById('app')
)
```

## 修改 package.json
修改里面的 `scripts` 内容
```json
"scripts": {
    "start": "webpack-dev-server --config config/webpack.dev.js"
}
```

## 修改 config/webpack.dev.js
添加 js 解析规则 <br>
添加 webpack-dev-server 本地开发服务器
```javascript
module.exports = {
    module: {
        rules: [
            { 
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        compress: true, // 服务器 Gzip 压缩
        historyApiFallback: true, // 所有路径都执行 index.html，唯一入口
        port: 9000
    }
};
```

## 添加文件 .babelrc
在根目录下创建 `.babelrc` 配置文件
```json
{
    "presets": ["env", "react"]
}
```

## 查看效果
```shell
yarn start

# 访问
http://127.0.0.1:9000 # 看到 hello world 则配置成功
```





<!-- 1的内容 -->
## 创建目录结构
```shell
config
    webpack.dev.js # 开发配置
    webpack.common.js # 公共配置
    webpack.prod.js # 生产配置
src
    controllers # 逻辑处理页面
    components # 组件 UI 页面，Stateless 无状态组件
    services # 请求后端数据操作
    index.html # 首页
    index.js # 入口
package.json # npm 包管理文件
TODO.md   # 开发计划
README.md # 说明文档
tsconfig.js # ts 配置文件
```

## 生成 package.json 文件

```shell
npm init
```


## 安装基本 npm 包
```shell
yarn add webpack webpack-cli html-webpack-plugin --dev # or npm install  webpack webpack-cli html-webpack-plugin --save-dev
```

## npm 包说明
- webpack webpack-cli 使用 webpack 打包工具
- html-webpack-plugin 处理 html 文件

## 配置 `config/webpack.dev.js` 
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.[hash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
    mode: 'development'
};
```

## 配置 `package.json` 的 `scripts`
```json
{
    "scripts": {
        "start": "webpack --config config/webpack.dev.js"
    }
}
```

## 运行生成查看
运行后查看根目录下的 `dist` 目录，会生成一个js、一个html文件
```shell
yarn start # or npm start
```
