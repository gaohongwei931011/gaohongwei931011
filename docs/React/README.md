# 从零搭建一个React项目

## create-react-app

`create-react-app` 是一个官方支持的创建 `React` 单页应用程序的方法。  
它提供了一个零配置的现代构建设置。

### 初始化 

``` sh
npx create-react-app my-app  
cd my-app  
npm start  
```


![](./images/screencast.svg)

### 目录结构调整

下面是`create-react-app`生成的目录结构

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

我们需要简单调整一下


``` js
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets // 资源
    │    ├── style
    │    └── images
    ├── component // 组件
    │    ├── header
    │    └── footer
    ├── pages  // 页面
    │    ├── home
    │    │    ├── home.jsx
    │    │    └── home.scss
    │    ├── detail
    │    │    ├── detail.jsx
    │    │    └── detail.scss
    │    └── list
    │        ├── list.jsx
    │        └── list.scss
    ├── utils // 工具 
    ├── index.js
    └── serviceWorker.js
```

## 引入 antd-mobile

### 安装

``` sh
npm install antd-mobile --save
```

### 基本应用
引入 `react-app-rewired` 并修改 `package.json` 里的启动配置。由于新的 `react-app-rewired@2.x` 版本的关系，你还需要安装 `customize-cra`。

``` sh
npm install react-app-rewired customize-cra --save-dev
```

``` json {4,6,8}
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
}
```

然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

``` js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

使用 `babel-plugin-import`, `babel-plugin-import` 是一个用于按需加载组件代码和样式的 `babel` 插件（原理），现在我们尝试安装它并修改 `config-overrides.js` 文件。

``` sh
npm install babel-plugin-import --save-dev
```

``` js {1,7,8,9,10,11,12}
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd-mobile',
+     style: 'css',
+   }),
+ );
```

引用方式

``` js
import { Button } from 'antd-mobile';
```

## 使用 Sass

安装 `node-sass`

``` sh
npm install node-sass --save
# or
yarn add node-sass
```

现在你可以将 `src/pages/home.css` 重命名为 `src/pages/home.scss`

## 使用 Fastclick

移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件  

安装  

``` sh
npm install fastclick --save
```
使用  

``` js
import FastClick from 'fastclick';

FastClick.attach(document.body);
```


## vw适配

参考手淘大漠老师的vw适配方案：[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html),做一个React版本的vw布局方案。

对于Flexible或者说vw的布局，其原理不在这篇文章进行阐述。如果你想追踪其中的原委，强烈建议你阅读早前整理的文章《[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)》和《[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)》。

### 安装

- `postcss-aspect-ratio-mini`  
- `postcss-px-to-viewport`  
- `postcss-write-svg`  
- `postcss-cssnext`   
- `postcss-viewport-units`  
- `cssnano`  

``` sh
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S   
```

在`cssnano`的配置中，使用了`preset: "advanced"`，所以我们需要另外安装：

``` sh
npm i cssnano-preset-advanced --save-dev  
```

### 配置

还记得根目录下的 `config-overrides.js` 吗？，我们接着为vw适配添加配置：  

``` js
const path = require('path')
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addPostcssPlugins } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars:{'@primary-color':'#1DA57A'},
    }),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, './src'),
    }),
    addPostcssPlugins([
        require('postcss-import'),
        require('postcss-url'),
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        }),
        require('postcss-aspect-ratio-mini')({}),
        require('postcss-px-to-viewport')({
            viewportWidth: 750, // (Number) The width of the viewport.
            viewportHeight: 1334, // (Number) The height of the viewport.
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw', // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
            mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // 排除node_modules文件中第三方css文件
        }),
        require('postcss-write-svg')({
            utf8: false
        }),
        require('postcss-viewport-units')({
            filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1 // 过滤伪类content使用
        }),
        require('cssnano')({
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        })
    ])
);
```

### vw兼容方案

使用`viewport`的`polyfill`：[Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)。使用`viewport-units-buggyfill`主要分以下几步走：  

第一步，引入JavaScript文件  

`viewport-units-buggyfill`主要有两个JavaScript文件：`viewport-units-buggyfill.js`和`viewport-units-buggyfill.hacks.js`。你只需要在你的HTML文件中引入这两个文件。

``` html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

第二步，在HTML文件中调用`viewport-units-buggyfill`，比如：  

``` html
<script>
    window.onload = function () {
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

在`src/utils`工具文件夹下添加 `vw.js`

``` js
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
viewportUnitsBuggyfill.init({
    hacks,
});
```

然后，在`src/index.js`中引用

``` js
import './utils/vw';
```

## setupProxy

### 安装 `http-proxy-middleware`

``` sh
npm install http-proxy-middleware
```

### 配置代理

在`src`下建立`setupProxy.js`文件

``` js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://www.v2ex.com',
            changeOrigin: true, // needed for virtual hosted sites
            pathRewrite: {
            '^/api': '',
            }
        })
    )
}

```
## Api 

`src`目录下新建：

```
src
├── api
│   ├── api.js
│   └── server.js

```
### 接口

集中管理api接口, `src/api/api.js`

``` js
import Server from './server';

class API extends Server{
  /**
   *  用途：最热主题
   *  @url https://www.v2ex.com/api/topics/hot.json
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */
  async getHot(params = {}){
    try{
      let result = await this.axios('get', '/api/topics/hot.json', params); 
      console.log(result)
      if(result || result.status === 1){
        return result;
      }else{
        let err = {
          tip: '获取最热主题失败',
          response: result,
          data: params,
          url: '//www.v2ex.com/api/topics/hot.json',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();
```

### axios封装

 `src/api/server.js`

``` js
import axios from 'axios';
import envconfig from '@/envconfig/envconfig';
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
*/

export default class Server {
  axios(method, url, params){
    return new Promise((resolve, reject) => {
      if(typeof params !== 'object') params = {};
      let _option = params;
      _option = {
        method,
        url,
        baseURL: envconfig.baseURL,
        timeout: 30000,
        params: null,
        data: null,
        headers: null,
        withCredentials: true, //是否携带cookies发起请求
        validateStatus:(status)=>{
            return status >= 200 && status < 300;
        },
        ...params,
      }
      axios.request(_option).then(res => {
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
      },error => {
        if(error.response){
            reject(error.response.data)
        }else{
            reject(error)
        }
      })
    })
  }
}

```

`src/envconfig/envconfig.js`  

``` js
/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//www.v2ex.com';
if(process.env.NODE_ENV === 'development'){
  baseURL = '/';
}else{
  baseURL = '//www.v2ex.com';
}


export default {imgUrl, baseURL}

```

## 使用 Router(路由)

### 安装 
安装 `react-router-dom`  

``` sh
npm install react-router-dom
# or
yarn add react-router-dom
```
### 基本应用

`src`目录下创建`router`文件夹，`router`文件夹下创建`index.js`

```
src
├── router
│   └── index.js

```

``` jsx
// index.js
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';

// import home from "@/pages/home/home";
const home = asyncComponent(() => import("@/pages/home/home"));
const detail = asyncComponent(() => import("@/pages/detail"));
const list = asyncComponent(() => import("@/pages/list"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
class RouteConfig extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/list" component={list} />
          <Route path="/detail" component={detail} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RouteConfig
```
这里有一个实现按需加载的工具 `asyncComponent.jsx` 


``` jsx
// asyncComponent.jsx
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({component});
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
```

添加到 `src/index.js` 

``` jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import FastClick from 'fastclick';

FastClick.attach(document.body);

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

## 使用 Redux(状态管理)

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

### 安装

安装稳定版

``` sh
npm install --save redux 
```

多数情况下，你还需要使用 React 绑定库和开发者工具。

``` sh
npm install --save react-redux  
npm install --save-dev redux-devtools  
```

### 基本应用 

`src`目录下创建`store`文件夹，`store`文件夹下创建`store.js`

```
src
└── store
   ├── home
   │     ├── action.js
   │     ├── action-type.js
   │     └── reducer.js
   └── store.js

```

``` jsx
// store.js
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as home from './home/reducer';
import * as production from './production/reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

let store = createStore(
  combineReducers({...home, ...production}),
  enhancer
);

export default store;

```

``` jsx
// action.js
import * as home from './action-type';
// 保存列表数据
export const saveList = list => {
  return {
    type: home.SAVELIST,
    list
  }
}
// 请客数据
export const clearData = () => {
  return {
    type: home.CLEARDATA,
  }
}

```

``` jsx
// action-type.js
// 保存列表数据
export const SAVELIST = 'SAVELIST';
// 清空数据
export const CLEARDATA = 'CLEARDATA';

```

``` jsx
// reducer.js
import * as home from './action-type';

let defaultState = {
  list: [], //主题列表
}
// 首页表单数据
export const list = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.SAVELIST:
      console.log(action)
      return {...state, ...{list: action.list}};
    case home.CLEARDATA:
      return {...state, ...defaultState};
    default:
      return state;
  }
}

```

添加到 `src/index.js` 

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import FastClick from 'fastclick';
import * as serviceWorker from './serviceWorker';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from '@/store/store';
// import './utils/setRem';
import './utils/vw';
import './style/base.css';

FastClick.attach(document.body);

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

`React-redux`使用，`connect`

``` jsx {3,43}
import React, {Component} from 'react'
import API from '@/api/api';
import { connect } from 'react-redux';
import { saveList, clearData } from '@/store/home/action';
// import PropTypes from 'prop-types';
import './home.scss';
import { Button } from 'antd-mobile';

class Home extends Component {
  state = {
    count: 999
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.getHot()
  }
  getHot = async () => {
    let result = await API.getHot({t: 123456});
    // console.log(result)
    this.props.saveList(result);
  }
  goList = () => {
    this.props.history.push({
      pathname: '/list',
      query: {
        name: 1
      },
      state: {
        id: 1
      }
    })
  }
  render() {
    return (
    <div className="home-container">
      <div className="box">Home-{this.state.count}</div>
      {/* <Button></Button> */}
    </div>
    )
  }
}

export default connect(state => (
  {
  list: state
}), {
  saveList, 
  clearData,
})(Home);
```

## 最后 :pushpin:

:dog: 开始快乐的写页面吧！