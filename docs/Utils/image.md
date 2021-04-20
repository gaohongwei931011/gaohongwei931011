# 图片处理代码块

## 获取图片实际宽高

``` js
// 图片地址
let url = 'xxxxxxxxxxxxxxx.jpg'

// 创建对象
let img = new Image()

// 改变图片的src
img.src = url

// 判断是否有缓存
if(img.complete){
    // 打印
    console.log(img.naturalWidth)
    console.log(img.naturalHeight)
}else{
    // 加载完成执行
    img.onload = () => {
        // 打印
        console.log(img.naturalWidth)
        console.log(img.naturalHeight)
    }
}
```

## 上传图片(压缩)

总体流程

- 用户通过 `input` 框选择图片
- 使用 `FileReader` 进行图片预览
- 将图片绘制到 `canvas` 画布上
- 使用 `canvas` 画布的能力进行图片压缩
- 将压缩后的 `Base64(DataURL)` 格式的数据转换成 `Blob` 对象进行上传

### 上传 
`multiple` 多图上传

``` html
<input 
  v-show="false" 
  id="photo" 
  ref="file" 
  multiple 
  @change="upload($event)" 
  accept="image/*" 
  type="file" />

<label for="photo" class="add">
    点击上传
</label>
```

``` js
// input change事件
upload(event) {
    console.log(event.target.files);
    // 单图上传,获取第一个即可，不需要for循环
    // let file = event.target.files[0];
    // 多图上传
    let fileList = event.target.files;
    if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].size > 1 * 1024 * 1024) {
                // 图片大于1MB,进行压缩
                let reader = new FileReader();
                reader.onload = () => {
                    // 获取base64字符串
                    this.compressImage(reader.result);
                };
                reader.readAsDataURL(fileList[i]);
            } else {
                // 小于1MB不压缩
                this.uploadImg(fileList[i])
            }
        }
    }else{
      console.log('未选择图片')
    }
},
// 上传
uploadImg(file) {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: false,
    };
     // 创建form对象
    let formData = new FormData();
    formData.append("file", file);
    formData.append("key", "6");
    Api.uploadImg(formData, config)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
},
```

### 压缩

这是图片上传压缩的核心所在，我们先使用 `CanvasRenderingContext2D.drawImage()` 方法将上传的图片文件在画布上绘制出来，再使用 `Canvas.toDataURL()` 将画布上的图片信息转换成 `base64(DataURL)` 格式的数据。

- [.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)
- [.toDataURl()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)

``` js
//图片压缩
compressImage(base64URL) {
  let img = new Image();
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  img.src = base64URL;

  img.onload = () => {
    // 图片原始尺寸
    let originWidth = img.width;
    let originHeight = img.height;
    // 最大尺寸限制
    let maxWidth = 1024,
      maxHeight = 1024;
    // 目标尺寸
    let targetWidth = originWidth,
      targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        //更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);

    //canvas直接转blob二进制文件，但是大部分浏览器不支持
    // canvas.toBlob(function (blob) {
    //   console.log(blob)
    //   resolve(blob)
    // }, 'image/png');

    let base64Data = canvas.toDataURL("image/png", 0.8);

    let blob = this.dataURItoBlob(base64Data);

    //上传图片
    this.uploadImg(blob);
  };
},
/**
 * base64 转二进制文件
 * @param {*} base64Data
 */
dataURItoBlob(base64Data) {
  let bytes = window.atob(base64Data.split(",")[1]); //去掉url的头，并转换为byte

  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: "image/png",
  });
},
```

### 清空input file的值
::: tip 清空input file的值
选择和上次一样的图片，会导致file不会触发onchange事件：
* `file.value = ''`
* `file.outerHTML = file.outerHTML`
:::

``` js
let file = document.getElementById('file');
file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空值
//或者
file.outerHTML = file.outerHTML; //重新初始化了file的html
```
