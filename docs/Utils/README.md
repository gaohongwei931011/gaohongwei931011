# 不要重复造轮子

## 视频类

常用的视频类插件应用实例

### xgplayer

`xgplayer` 字节跳动所属，以下是 `xgplayer` 背景简介：

> 字节跳动的视频业务大多数是短视频，早期的时候我们在 video.js 基础上做二次开发。后来发现很多功能达不到我们的要求，比如自定义UI的成本、视频的清晰度无缝切换、视频流量的节省。考虑到当前点播依旧是mp4居多，我们做了个大胆的假设：在播放器端加载视频、解析视频、转换格式，让不支持分段播放的mp4动态支持，这样就无须转换源视频的格式，服务器端也无其他开销。在这个动力下，我们在2017年年底完成了这项开发任务，并与2018年年初测试了稳定性和经济收益。  
>   
> 在这个背景下，我们一次解析了 hls、flv 等视频，这样我们不再简单的依赖第三方的视频库，只有掌握了底层技术才有优化的可能性。在不断攻克 hls、flv 解析的背景下，我们增强了产品体验，比如交互效果、进场动画等。直到最近，我们想完善文档并把播放器源代码开源出来给更多的视频从业者一个参考，我们一起交流学习，共同进步。

#### 安装

``` sh
npm install xgplayer
# or
yarn add xgplayer
```

#### 使用

``` html
<div id="xgplayer"></div>
```

``` js
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

## 图片类

常用的视频类插件应用实例

### PhotoSwipe

实现类似朋友圈图片查看功能，新浪微博移动web端的图片查看就是使用此插件。

#### 安装

``` sh
npm install photoswipe
# or
yarn add photoswipe
```

#### 使用

这里以`vue`应用为例

``` vue
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
