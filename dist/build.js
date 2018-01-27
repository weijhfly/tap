/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var tap = __webpack_require__(2);

//直接调用
tap('.button',function(e){
	console.log(e);
	var event = "ontouchend" in document? 'tap':'click';
	layer.msg(event+' : '+this.innerText);
})
// 事件委托 event delegation
tap('#test','.button2',function(){
	var event = "ontouchend" in document? 'tap':'click';
	layer.msg(event+' : '+this.innerText);
})
var i = 0;
tap('#test','.add',function(e){
	console.log(e);
	i ++;
	var test = document.getElementById("test");
	var button = document.createElement("button");
	button.className = 'button2';
	button.innerHTML = "button "+i;
	test.insertBefore(button,test.childNodes[0]); 
})
tap(document,'.doc',function(){
	layer.msg('doc');
})
/*
阻止冒泡 stop propagation
在事件委托中仅能阻止委托元素对上层的冒泡
*/
tap('#parent',function(){
	setTimeout(function() {
		layer.msg('parent');
	}, 100);
})
tap('.son',function(){
	layer.msg('son');
})
// 阻止冒泡
tap('#parent2',function(){
	setTimeout(function() {
		layer.msg('parent2');
	}, 100);
})
tap('.son2',function(e){
	e.stopPropagation();
	layer.msg('son2');
})
/*
阻止默认动作
同上，事件委托中仅能阻止委托元素的默认动作
注意：在移动端默认执行e.preventDefault();
*/
tap('.submit',function(e){
	e.preventDefault();
	e.stopPropagation();
	layer.msg('无法提交');
})
/*
* 代码优化
*/
//跳转 **存在href属性
tap(document,'a');
// 通过委托实现多个事件 **默认不能重复，重复只执行第一个
tap(document,{
	'.e1':function(){
	   layer.msg(this.innerText);
	},
	'.e2':function(){
	   layer.msg(this.innerText);
	},
	'.e3':function(){
	   layer.msg(this.innerText);
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * tap.js v1.2.2
 * by weijianhua  https://github.com/weijhfly/tap
*/
;(function (factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return factory;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}else if (typeof exports == "object") {
		module.exports = factory;
	}else {
		window.tap = factory;
	}
}(function(){
	var arg = arguments,
		doc = window.document,
		els = arg[0] == doc ? [doc]:doc.querySelectorAll(arg[0]),
		isTouch = "ontouchend" in doc,
		len = els.length,
		i = 0,
		isEntrust = typeof arg[1]== 'string',
		isMulti = typeof arg[1]== 'object';

	if(len == 0){return false;}
	while (i < len){
		if(isTouch){
			var o = {};
			els[i].addEventListener('touchstart',function(e){
				var t = e.touches[0];
				o.startX = t.pageX;
				o.startY = t.pageY;
				o.sTime = + new Date;
			});
			els[i].addEventListener('touchend',function(e){
				var t = e.changedTouches[0];
				o.endX = t.pageX;
				o.endY = t.pageY;
				if((+ new Date)-o.sTime<300){
					if(Math.abs(o.endX-o.startX)+Math.abs(o.endY-o.startY)<20){
						handler(e,arg,this);
					}
				}
				o = {};
			});
		}else{
			els[i].addEventListener('click',function(e){
				handler(e,arg,this);
			});
		}
		i ++;
	}
	function handler(e,arg,that){
		if(e.target.href){
			return window.location = e.target.href;
		}
		if(isEntrust){
			if(equal(e,arg[1])){
				prevent(e);
				arg[2].call(e.target,e);
			}
		}else if(isMulti){
			for(key in arg[1]){
				if(equal(e,key)){
					prevent(e);
					arg[1][key].call(e.target,e);
					break;
				}
			}
		}else{
			prevent(e);
			arg[1].call(that,e);
		}
	}
	function equal(e,el){
		var flag = false;
		if(el.indexOf('.') != -1 && e.target.className == el.replace('.','')){
			flag = true;
		}else if(el.indexOf('#') != -1 && e.target.id == el.replace('#','')){
			flag = true;
		}else if(e.target.nodeName.toLocaleLowerCase() == el){
			flag = true;
		}
		return flag;
	}
	/*preventDefault不执行则会引起触发失效bug，
	 *但不必要则不执行。	
	*/
	function prevent(e){
		var tagName = e.target.tagName.toLocaleLowerCase();
		if(tagName != 'select' && tagName != 'input' && tagName != 'textarea'){
			doc.activeElement.blur();
			e.preventDefault();
		}
	}
}))

/***/ })
/******/ ]);