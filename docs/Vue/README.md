# 从零搭建一个Vue项目

## Vue CLI

::: warning 关于旧版本
Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
:::

::: tip Node 版本要求
Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。
:::

### 安装  

``` sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 创建项目

``` sh
vue create hello-world
```

### 拉取 2.x 模板 (旧版本)

Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：  

``` sh
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

## 使用Sass

### 安装

安装 `sass`  `sass-loader`

``` sh
yarn add sass sass-loader -dev
```

### 基本使用

``` sass
<style lang="scss" scoped>
.app{
  color: blue;
}
</style>
```

## 使用 Fastclick

移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件  

安装  

``` sh
npm install fastclick --save
```

使用, `main.js`

``` js
import FastClick from 'fastclick';

FastClick.attach(document.body);
```

## vw适配

参考手淘大漠老师的vw适配方案：[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html), 做一个React版本的vw布局方案。

对于Flexible或者说vw的布局，其原理不在这篇文章进行阐述。如果你想追踪其中的原委，强烈建议你阅读早前整理的文章《[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)》和《[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)》。

### 安装

* `postcss-aspect-ratio-mini`
* `postcss-px-to-viewport`
* `postcss-write-svg`
* `postcss-cssnext`
* `postcss-viewport-units`
* `cssnano`

``` sh
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S   
```

在 `cssnano` 的配置中，使用了 `preset: "advanced"` ，所以我们需要另外安装：

``` sh
npm i cssnano-preset-advanced --save-dev  
```

### 配置

根目录下新建 `.postcssrc.js` 接着为vw适配添加配置：  

``` js
module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-aspect-ratio-mini": {},
        "postcss-write-svg": {
            utf8: false
        },
        "postcss-cssnext": {},
        "postcss-px-to-viewport": {
            viewportWidth: 750, // (Number) 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
            viewportHeight: 1334, // (Number) 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3, // (Number) 指定 `px` 转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // (String) 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // (Number) 小于或等于 `1px` 不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // (Boolean) 允许在媒体查询中转换 `px`
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // 排除node_modules文件中第三方css文件
        },
        "cssnano": {
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }
    }
}
```

::: tip Error: Loading PostCSS Plugin failed: Unknown browser query dead
解决方法： `package.json` 中 `browserslist` 的 `not dead` 删掉即可。
:::

### vw兼容方案

使用 `viewport` 的 `polyfill` ：[Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)。使用 `viewport-units-buggyfill` 主要分以下几步走：  

第一步，引入JavaScript文件  

`viewport-units-buggyfill` 主要有两个JavaScript文件： `viewport-units-buggyfill.js` 和 `viewport-units-buggyfill.hacks.js` 。你只需要在你的HTML文件中引入这两个文件。

``` html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

第二步，在HTML文件中调用 `viewport-units-buggyfill` ，比如：  

``` html
<script>
    window.onload = function() {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
    }
</script>
```

#### 或者

``` sh
npm install viewport-units-buggyfill
```

在 `src/utils` 工具文件夹下添加 `vw.js`

``` js
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
viewportUnitsBuggyfill.init({
    hacks,
});
```

然后，在 `main.js` 中引用

``` js
import '@/utils/vw';
```

## vue.config.js

根目录下新建 `vue.config.js`
可配置 `proxy` 、 `publicPath` 、 `SourceMap` ...

详细配置参考：[vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js)

``` js
// vue.config.js
module.exports = {
    // 选项...
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    }
}
```

## Api 

`src` 目录下新建：

``` 
src
├── api
│   ├── api.js
│   └── server.js

```

### 接口

集中管理api接口, `src/api/api.js`

``` js
/*
 * @Description: 
 * @Author: GaoHongwei
 * @LastEditors: GaoHongwei
 * @Date: 2019-02-21 16:17:23
 * @LastEditTime: 2020-04-24 12:02:03
 */
import {
    GET,
    POST,
    PUT,
    DELETE
} from './server.js'

const API_PATH = '/cmmc'

export default {
    //发送验证码
    getMCode(params) {
        return GET(API_PATH + '/passport/?l=reg.getMCode', params)
    },
    home(params) {
        return GET(API_PATH + '/seller/?l=usershop.home', params)
    },
}
```

### axios封装

 `src/api/server.js`

``` js
import axios from 'axios';
import store from '../store'

const service = axios.create({
    withCredentials: true, //请求是否携带本地cookies信息
});

//http request 拦截器
service.interceptors.request.use(
    config => {
        //token
        let signature = store.getters.signature
        if (signature) {
            config.headers.signature = signature
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
service.interceptors.response.use(
    response => {
        let res = response.data
        return res;
    },
    error => {
        return Promise.reject(error)
    }
)

//封装get请求
export function GET(url, params = {}) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
        url: url,
        method: 'get',
        headers: {},
        params
    })
}
//封装post请求
export function POST(url, data = {}, config) {
    //默认配置 
    let sendObject = {
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    };
    Object.assign(sendObject, config);
    return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function PUT(url, data = {}) {
    return service({
        url: url,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}
//删除方法(resfulAPI常用)
export function DELETE(url) {
    return service({
        url: url,
        method: 'delete',
        headers: {}
    })
}
```

### 基本应用

``` js
import Api from "@/service/api";

let data = {
    id: 1
}
Api.home(data)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
```

## 使用 [vue-router(路由)](https://router.vuejs.org/zh/)

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 IE9 中自动降级
* 自定义的滚动条行为

### 安装 

安装 `vue-router`

``` sh
npm install vue-router
# or
yarn add vue-router
```

### 基本应用

`src` 目录下创建 `router` 文件夹， `router` 文件夹下创建 `index.js`

``` 
src
├── router
│   └── index.js

```

``` js
// index.js
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
//路由懒加载
const Home = () => import('@/pages/home')
const My = () => import('@/pages/my')

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/my',
            name: 'My',
            component: My,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            component: Home
        }
    ]
})
//全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(from)
    // console.log(to)
    // meta字段中添加配置信息
    if (to.meta.requiresAuth && !store.getters.signature) {
        next({
            name: 'Login',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
})

export default router
```

添加到 `main.js`

``` js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

```

## 使用 [Vuex(状态管理)](https://vuex.vuejs.org/zh/)

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### 安装

安装稳定版

``` sh
npm install vuex --save
# or
yarn add vuex
```

### 基本应用 

`src` 目录下创建 `store` 文件夹， `store` 文件夹下创建 `store.js`

``` 
src
└── store
   ├── modules
   │     ├── app.js
   │     └── user.js
   ├──  getters.js
   └──  index.js
```

``` js
// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
})

export default store
```

``` js
// getters.js
const getters = {
  device: state => state.app.device,
  location: state => state.app.location,
  signature: state => state.user.signature,
  uid: state => state.user.uid,
}
export default getters
```

``` js
// modules/app.js
const app = {
  state: {
    device: 'h5',
    location: null
  },
  mutations: {
    SET_DEVICE: (state, str) => {
      state.device = str
    },
    SET_LOCATION: (state, obj) => {
      state.location = obj
    },
  },
  actions: {
    SetDevice({ commit }, str) {
      commit('SET_DEVICE', str)
    },
    SetLocation({ commit }, obj) {
      commit('SET_LOCATION', obj)
    }
  }
}

export default app
```

添加到 `main.js`

``` js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

```

组件中使用`getter`  

``` js
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  created() {
    //
  },
  computed: {
    ...mapGetters([
      "location",
      "device"
      // ...
    ])
  },
  mounted() {
    //
  },
  methods: {
    //
  }
};
```

组件中使用`dispatch`  

``` js {21}
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  created() {
    //
  },
  computed: {
    ...mapGetters([
      "location",
      "device"
      // ...
    ])
  },
  mounted() {
    this.$store.dispatch('SetDevice', 'ios')
  },
  methods: {
    //
  }
};
```

## 最后 :pushpin:

:dog: 开始快乐的写页面吧！
