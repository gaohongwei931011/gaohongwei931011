# 常用插件

## 图片相关

### Lozad.js

Lozad.js 是一款基于 IntersectionObserver API 的高性能、轻量级（〜0.5kb）和可配置的懒加载器

* [Lozad.js](https://github.com/ApoorvSaxena/lozad.js)

### cropperjs

cropperjs是一款非常强大却又简单的图片裁剪工具

* [cropperjs](https://github.com/fengyuanchen/cropperjs)

### html2canvas

“屏幕快照”、网页截屏

* [html2canvas](https://github.com/niklasvh/html2canvas)

### PhotoSwipe

实现类似朋友圈图片查看功能，新浪微博移动web端的图片查看就是使用此插件

#### 安装

```sh
npm install photoswipe
# or
yarn add photoswipe
```

#### 使用

这里以 `vue` 应用为例

```vue
<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div v-else class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
    It's a separate element as animating opacity is faster than rgba().-->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
      Don't modify these 3 pswp__item elements, data is added later on.-->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->
          <!-- <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> -->
          <!-- <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe/dist/photoswipe";
import UI from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

export default {
  name: "PhotoSwipe",
  data() {
    return {
      msg: "PhotoSwipe",
    };
  },
  mounted() {},
  methods: {
    imagePreview(e,currentIndex, imageArray) {
      let items = [];
      imageArray.map((item, index, array) => {
        items.push({
          src: item.picUrl,
          w: item.width,
          h: item.height,
        });
      });

      let options = {
        index: currentIndex,
        // showAnimationDuration: 0,
        // hideAnimationDuration: 0,
        showHideOpacity: true,
        getThumbBoundsFn: function (index) {
          // find thumbnail element
          let thumbnail
          if(e.target.nodeName === 'IMG'){
            thumbnail = e.target
          }else if(e.target.nodeName === 'DIV'){
            thumbnail = e.target.firstChild
          }
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        },
      };

      let pswpElement = this.$refs.pswb;
      let gallery = new PhotoSwipe(pswpElement, UI, items, options);
      gallery.init();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

```

* [PhotoSwipe文档](https://photoswipe.com/documentation/getting-started.html)

## 视频相关

### flv.js

B站开源视频播放器

* [flv.js](https://github.com/Bilibili/flv.js)

### video.js

Video.js - HTML5 Video Player

* [video.js](https://github.com/videojs/video.js)

### xgplayer

`xgplayer` 字节跳动所属

#### 使用

```html
<div id="xgplayer"></div>
```

```js
import Player from "xgplayer";
//视频
let url = '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
//封面
let poster = '//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg'
//初始化
let player = new Player({
    id: 'xgplayer',
    autoplay: false,
    volume: 0.3,
    url: url,
    poster: poster,
    playsinline: true,
    height: "100%",
    width: "100%"
});
```

* [xgplayer文档](http://h5player.bytedance.com/gettingStarted/)

## 动效

### Animate.css

跨浏览器的CSS3动画库，使用方便

* [Animate.css](https://github.com/animate-css/animate.css)

### fullPage.js

通过调用本库可轻易创建全屏滚动网站(也称为单页网站)。 本库可创建全屏滚动网站，同时也可在网站中添加横向滚动条

* [fullPage.js](https://github.com/alvarotrigo/fullPage.js)

### WOW.js

网页滚动动画，制作花里胡哨的官网

> WOW.js 依赖 animate.css

* [WOW.js](https://github.com/matthieua/WOW)

### impress.js

轻松创建杀手级在线演示PPT

[效果预览](https://impress.js.org/) 

* [impress.js](https://github.com/impress/impress.js)

### parallax.js

轻量级的的视差引擎Parallax.js

* [parallax.js](https://github.com/wagerfield/parallax)

### reveal.js

一个专门用来做 HTML 演示文稿的框架

* [reveal.js](https://github.com/hakimel/reveal.js)

## Http

### Axios

易用、简洁且高效的http库

* [Axios](https://github.com/axios/axios)

## Event

### fastclick

一个消除移动端浏览器上的点击事件的 300ms 的延迟

* [fastclick](https://github.com/ftlabs/fastclick)

### hammer.js

实现多点触控的javascript库

* [hammer.js](https://github.com/hammerjs/hammer.js)

### interactjs

拖拽插件

* [interactjs](https://github.com/taye/interact.js)

### sortablejs

拖动排序

* [sortablejs](https://github.com/SortableJS/Sortable)

## 工具

### clipboard.js

Clipboard.js 实现了纯JavaScript （无Flash）的浏览器内容复制到系统剪贴板的功能

* [clipboard.js](https://github.com/zenorocha/clipboard.js)

### js-cookie

js-cookie是一个简单的, 轻量级的处理cookies的js API

* [js-cookie](https://github.com/js-cookie/js-cookie)

### qrcode

qrcode

* [qrcode](https://github.com/soldair/node-qrcode)

### md5

a JavaScript function for hashing messages with MD5

* [md5](https://github.com/pvorb/node-md5)

### pdf.js

JavaScript 的 PDF 查看器

* [pdf.js](https://github.com/mozilla/pdf.js)

## 时间&日期

### Moment.js

JavaScript 日期处理类库

* [Moment.js](https://github.com/moment/moment/)

### Day.js

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样

* [Day.js](https://github.com/iamkun/dayjs)

### timeago.js

用来将datetime时间转化成类似于*** 时间前的描述字符串，例如：“3小时前”。

* [timeago.js](https://github.com/hustcc/timeago.js)

## 编辑器

### Highlight.js

代码高亮

* [Highlight.js](https://github.com/highlightjs/highlight.js)

### quill

Quill ———— 个人认为的最佳富文本编辑器

> 微信小程序富文本组件的Api和Quill的Api极其相似，个人认为微信小程序的富文本组件就是基于Quill封装的

* [quill](https://github.com/quilljs/quill/)

## 轮播

### Swiper

Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端

* [Swiper中文网](https://www.swiper.com.cn/)
* [Swiper](https://github.com/nolimits4web/swiper)

## 滚动

### better-scroll

BetterScroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化

BetterScroll 是使用纯 JavaScript 实现的，这意味着它是无依赖的

* [better-scroll](https://github.com/ustbhuangyi/better-scroll)

## 数据可视化

### ECharts

ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

* [ECharts](https://github.com/apache/echarts)

## WebGL

### three.js

JavaScript 3D Library

* [three.js](https://github.com/mrdoob/three.js/)
