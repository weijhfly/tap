# tap [![npm](https://img.shields.io/npm/v/js-tap.svg)](https://www.npmjs.com/package/js-tap)
> a tap plugin
# Install
```js
$ npm install --save js-tap
```
# Usage
```js
var tap = require('js-tap');

//直接调用
tap('.test',function(){
  console.log(this);
})

//事件委托
tap(document,'.test',function(){
  console.log(this);
})

//阻止事件冒泡/默认动作
tap('.test',function(e){
  e.stopPropagation();
  e.preventDefault();
})

//同时指定多个事件
tap(document,{
 '.el1':function(){
   //事件1
 },
 '.el2':function(){
  //事件2
 },
 '.el3':function(){
  //事件3
 }
})

```
# Demo
[demo page](https://weijhfly.github.io/tap-demo.html "demo")