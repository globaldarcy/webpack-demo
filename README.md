# 简单的打包配置

## 软件要求

> * NodeJS 8.xx.xx LTS 或者 最新 LTS
> * Git客户端

## 用法

```shell
npm i
```

安装完成执行

```bash
npm start
```

## 打包

```bash
npm run build
```

## 目录结构

```text
project
│   node_modules    // 项目依赖包
│
└───src    // 前端的主要文件
        static    // 静态资源文件夹
        common    // 公共样式和脚本
        components    // header和footer
        pages    // 页面
        main.js    // js文件入口
        style.scss    // scss文件入口

```
