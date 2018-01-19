# tap [![npm](https://img.shields.io/npm/v/js-tap.svg)](https://www.npmjs.com/package/js-tap)
> a tap plugin
# Install
```js
$ npm install --save js-tap
```
# Usage
```js
var tap = require('js-tap');

tap('.test',function(){
  console.log(this);
})

//event delegation
tap('#test','.test',function(){
  console.log(this);
})

//stop propagation args/true
tap('.test',function(){
  console.log(this);
},true)
```
# Demo
[demo page](https://weijhfly.github.io/tap-demo.html "demo")
## Update
### 2018.1.17(publish)

> * 发布至github及npm(js-tap).
> * 可以直接调用及通过事件委托调用.
> * 增加阻止事件冒泡功能.
