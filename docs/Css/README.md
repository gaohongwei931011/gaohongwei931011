# 文字

## 长文本换行
::: tip 说明
有时候当一个容器里面的文字太多，而我们又不想让他折叠省略，更希望让它按我们的希望进行换行。
:::

```css
/* 关键性代码 */
word-wrap: break-word;
word-break: break-all;
```

<EmbedHTML :code="`wvGzzgw`"/>

## 文字溢出隐藏

与上面长本文换行相对，文字截断适用于文字可能会较多，但又不想让其还行折叠省略的情况。

### 单行文本溢出隐藏
::: tip 特点
单行文本截断有：实现简单，兼容性好的优点
:::

单行文本截断我们可能接触的比较多，使用`text-overflow:ellipsis`来处理文本的溢出，对于单行文本截断，我们只需要下面几行`css`代码就能实现。  

```css
/* 关键性代码 */
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
```

<EmbedHTML :code="`RwaGGxO`"/>

### 多行文本溢出隐藏
::: tip 特点
多行文本截断：有不容易实现，常见的多行文本截断方式浏览器兼容性一般的缺点。
:::
与单行文本截断相对，多行文本截断实现起来就不那么容易了，相信你一定见过如下实现多行文本截断的方式。
```css
/* 关键代码 */
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
-webkit-line-clamp: 2;
text-overflow:ellipsis; /*可选的属性*/
```

<EmbedHTML :code="`JjXRKBW`"/>

**实现分析**：
* 必须和`display`、`-webkit-box-orient`以及`overflow`配合一起使用。
* `-webkit-line-clamp`不是一个规范的标准属性，它只存在于`webkit`内核的浏览器，对于`Firefox`和`IE`是不支持的。
* 更适用于移动端的解决方案，因为移动端设备浏览器多基于`webkit`


## 两端对齐
::: tip
两端对齐可以适用`text-align:justify`属性来实现两端对齐，但这个属性只对多行有效，如果确定只有一行文字，可以使用`text-align-last:justify`来配合使用，此属性兼容性一般。
:::
下面是关键`html`结构
```html
<div class="box-item">
  <span class="title">姓名</span>：
  <span class="desc">这里是姓名的内容</span>
</div>
```
下面是关键的`css`代码
```css
.title {
  width: 100px;
  /* 关键代码 */
  display: inline-block;
  text-align:justify;
  text-align-last: justify;
}
```
<EmbedHTML :code="`ExKggEQ`"/>


## 首字母下沉
::: tip
首字母下沉效果可以使用`::first-letter`伪元素来实现
:::
下面是首字母下沉的代码：
```css
p::first-letter {
  float: left;
  margin-right: 16px;
  font-size: 25px;
  color: #58a;
}
```

<EmbedHTML :code="`VwaKmwJ`"/>

## 竖排文字
::: tip
竖排文字的实现很简单，它只需要设置`writing-mode`属性即可，下面是它属性值的介绍：
* `horizontal-tb`：默认值，表示水平排版，从上到下。
* `vertical-lr`：表示垂直排版，从左到右。
* `vertical-rl`：表示垂直排版，从右到左。
:::
下面是竖排文字的代码：
```css
writing-mode: horizontal-tb
```

<EmbedHTML :code="`LYNRbVv`"/>

## 汉语拼音

属于 `HTML` 范畴

<EmbedHTML :code="`KKzgNNZ`"/>

## 英文大小写

::: tip
英文大小写的实现很简单，它只需要设置`text-transform`属性即可，下面是它属性值的介绍：
* `none`：默认值。
* `capitalize`：表示首字母大写。
* `uppercase`：表示全部大写。
* `lowercase`：表示全部小写。
:::
```css
text-transform: none; /* 默认 */
text-transform: capitalize; /* 首字母大写 */
text-transform: uppercase; /* 全部大写 */
text-transform: lowercase; /* 全部小写 */
```

<EmbedHTML :code="`abNmBWM`"/>

## 首行缩进

::: tip
 `text-indent` 一般用于中文段落，首行缩进2个字符，这里我们需要了解长度单位 `em` ，`em` 是相对长度单位。相对于当前对象内文本的字体尺寸。  
我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。
:::

<EmbedHTML :code="`qBZaRaN`"/>


## 文字修饰线

::: tip
`text-decoration` 这个 CSS 属性是用于设置文本的修饰线外观的（下划线、上划线、贯穿线/删除线  或 闪烁）它是 `text-decoration-line`, `text-decoration-color`, `text-decoration-style`, 和新出现的 `text-decoration-thickness` 属性的缩写。
* `text-decoration-line`：文本修饰的位置, 如下划线underline，删除线line-through。
* `text-decoration-color`：文本修饰的颜色。
* `text-decoration-style`：文本修饰的样式, 如波浪线wavy实线solid虚线dashed。
* `text-decoration-thickness`：文本修饰线的粗细。
:::

<EmbedHTML :code="`mdPrRBX`"/>

## 文字特效

::: tip
有时候我们不得不设计一些特殊的文字效果来吸引用户的眼球，例如文字投影，3D文字以及文字外发光等，适当的使用一些文字特效，能有效提升网站的颜值。
:::

### 文字外发光
文字外发光的代码
```css
/* 关键代码text-shadow */
text-shadow: 0 0 2px, 0 0 6px;
font-size: 18px;
color: #fff;
```
<EmbedHTML :code="`RwaGGym`"/>

### 空心文字
::: tip
空心文字效果利用了多边偏移投影来实现，性能消耗较高，而且描边越大，效果越差。
:::
下面时候空心文字的代码
```css
/* 关键代码 */
text-shadow: 1px 1px black,
            -1px -1px black,
            1px -1px black,
            -1px 1px black;
```
<EmbedHTML :code="`abNmmjG`"/>

### 文字模糊
::: tip
文字模糊效果可用`text-shadow`或者`filter`来实现
:::
下面是文字模糊的代码
```css
/* filter方式关键代码 */
filter: blur(2px);

/* text-shadow方式关键代码 */
color:transparent;
text-shadow: 0 0 5px rgba(0,0,0,0.6);
```
你可以鼠标移入下面的文字，查看文字模糊效果！
<EmbedHTML :code="`yLOaaRX`"/>

### 文字阴影
::: tip
文字阴影效果可以使用多个`text-shadow`，通过偏移进行叠加
:::
下面是文字阴影的代码：
```css
/* 关键代码 */
text-shadow: 1px 1px rgba(0,0,0,0.3),
             2px 2px rgba(0,0,0,0.3),
             3px 3px rgba(0,0,0,0.3),
             4px 4px rgba(0,0,0,0.3);
```
文字阴影的效果：  

<EmbedHTML :code="`PoNGGVq`"/>

### 文字凸起/凹陷
::: tip
文字凸起/凹陷效果是利用多重偏移投影叠加或者相反的偏移，形成一个视觉差异实现的
:::
下面是文字凸起/凹陷的代码：
```css
.tu
  font-size: 25px;
  text-shadow: 0 1px rgba(0,0,0,0.2),
                0 2px rgba(0,0,0,0.3),
                0 3px rgba(0,0,0,0.4),
                0 4px rgba(0,0,0,0.5),
                0 5px rgba(0,0,0,0.6),
                0 5px 5px rgba(0,0,0,1);
.ao
  line-height: 0px;
  font-size: 45px;
  color: #ccc;
  text-shadow: -1px -1px 1px #000, 1px 1px 1px #fff;
```
文字凸起/凹陷的实时效果

<EmbedHTML :code="`JjXRRxm`"/>

### 文字颜色渐变
::: tip
文字颜色渐变要利用到`linear-gradient`和`-webkit-background-clip`属性
:::
下面是文字渐变的代码：
```css
font-size: 50px;
color: transparent;
background: linear-gradient(0, #58a 0%, #b60  100%);
-webkit-background-clip:text;
```
 
<EmbedHTML :code="`bGpwwyw`"/>