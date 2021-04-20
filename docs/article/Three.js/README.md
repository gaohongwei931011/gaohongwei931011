---
sidebar: auto
---

# three.js基础

## three.js 程序结构树状图

![](./images/structure.jpg)

## 基础使用

``` js
//初始化场景
let scene = new THREE.Scene();
//初始化相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//初始化渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建几何体
let geometry = new THREE.BoxGeometry(1, 1, 1);
//初始化材质
let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
//生成模型
let cube = new THREE.Mesh(geometry, material);
//向场景添加已创建的几何体模型
scene.add(cube);

//设置相机位置
camera.position.z = 5;

let animate = function() {
    requestAnimationFrame(animate);
    // 旋转  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //渲染
    renderer.render(scene, camera);
};
//执行 animate
animate();
```
