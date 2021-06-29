<div align="center">
<img src="https://i.loli.net/2018/08/06/5b6844efb1974.png" width = "400" height = "250" alt="vue-logo.png" align=center />
</div>

***

## 技术栈

实验平台： Svelte + Bundless + rxjs + konva

后台数据管理: Vue3 + vite2 + rxjs


## 说明

>  开发环境 mac 10+ chrome 91 nodejs 10+

>  这个项目主要为了学习svelte、Vue3等技术，同时临时参加比赛，做的一个开放式实验平台，用时1周多(1周上班闲暇+3天完整时间)，初次尝试技术栈，代码凌乱、实现简陋，还望理解。

>  后续会继续完善功能滴～    ⎛⎝≥⏝⏝≤⎠⎞


## 项目描述

### 前端部分

#### 项目结构
</br>

```shell
├── README.md
├── jenkins //jenkins流程控制文件
│   ├── jenkinsfile
├── nginx //ng配置文件
│   ├── nginx.conf
├── public
│   ├── index.html
├── Dockerfile
├── bundless.config.js
├── tscofnig.json
├── src 项目代码结构
└── package.json //项目的基本信息
```

#### src结构
</br>

```shell
src
├── assets          // 资源目录 图片，样式，iconfont
├── model	    // 模块类(药品、容器)
├── component      // svelte组件目录
├── store          // svelte store
├── styles          // 样式组件库的less文件
├── subjects	    // rxjs封装的http请求库
```

## 部分功能实现
* **实验平台**
***
<img src="https://user-images.githubusercontent.com/27653885/123867353-d47d4780-d960-11eb-9a98-db5057ea3954.png" width="600px">
<img src="https://user-images.githubusercontent.com/27653885/123867544-160df280-d961-11eb-8563-3bbb414cf8ea.png" width="600px">
</br>
</br>
</br>

* **侧边栏查询功能**
***
<img src="https://user-images.githubusercontent.com/27653885/123866687-fd510d00-d95f-11eb-88b2-29962de9585f.png" width=600px">
</br>
</br>
</br>


* **后台管理页面**
***
<img src="https://user-images.githubusercontent.com/27653885/123867657-32aa2a80-d961-11eb-8340-0477658d4760.png" width="600px">
</br>
</br>
</br>

