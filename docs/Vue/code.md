# Vue 指南

## 组件封装

### 函数式组件

```js
import Vue from "vue";
```

### Comment 组件

```js
import msgboxVue from "./index.vue";
// 定义插件对象
const MessageBox = {};
// vue的install方法，用于定义vue插件
MessageBox.install = function(Vue, options) {
    const MessageBoxInstance = Vue.extend(msgboxVue);
    let currentMsg;
    const initInstance = () => {
        // 实例化vue实例
        currentMsg = new MessageBoxInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        document.body.appendChild(msgBoxEl);
    };
    // 在Vue的原型上添加实例方法，以全局调用
    Vue.prototype.$msgBox = {
        showMsgBox(options) {
            if (!currentMsg) {
                initInstance();
            }
            if (typeof options === "string") {
                currentMsg.content = options;
            } else if (typeof options === "object") {
                Object.assign(currentMsg, options);
            }
            //  Object.assign方法只会拷贝源对象自身的并且可枚举的属性到目标对象
            return currentMsg
                .showMsgBox()
                .then((val) => {
                    currentMsg = null;
                    return Promise.resolve(val);
                })
                .catch((err) => {
                    currentMsg = null;
                    return Promise.reject(err);
                });
        }
    };
};
export default MessageBox;
```

## 动态&异步加载组件

```vue
<template>
  <div id="app">
    <img @click="addMod" alt="Vue logo" src="./assets/logo.png" width="25%" />
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
import Loading from "./components/Loading";
import Err from "./components/Err";
export default {
  name: "App",
  data() {
    return {
      currentTabComponent: "",
    };
  },
  methods: {
    addMod() {
      console.log(this);
      if (this.currentTabComponent) {
        alert("onready");
      } else {
        this.currentTabComponent = () => ({
          // 需要加载的组件。应当是一个 Promise
          component: import("./components/Demo"),
          // 加载中应当渲染的组件
          loading: Loading,
          // 出错时渲染的组件
          error: Err,
          // 渲染加载中组件前的等待时间。默认：200ms。
          delay: 200,
          // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
          timeout: 3000,
        });
      }
    },
  },
};
</script>
```
