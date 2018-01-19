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

//普通调用
tap('.button',function(){
	var e = "ontouchend" in document? 'tap':'click';
	alert(e+' : '+this.innerText);
})
// 事件委托 event delegation
tap('#test','.button2',function(){
	var e = "ontouchend" in document? 'tap':'click';
	alert(e+' : '+this.innerText);
})
tap('#test','.add',function(){
	var test = document.getElementById("test");
	var button = document.createElement("button");
	button.className = 'button2';
	button.innerHTML = "button text";
	test.insertBefore(button,test.childNodes[0]); 
})
/*
阻止冒泡 true stop propagation
在事件委托中仅能阻止委托元素对上层的冒泡
*/
tap('#parent',function(){
	console.log('parent');
})
//若在此使用alert等阻塞线程的方法，将会影响300ms判断而无法正常模拟冒泡，后续将调整,
//click无影响，可以正常冒泡
tap('.son',function(){
	console.log('son');
},true)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * tap.js
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
		els = document.querySelectorAll(arg[0]),
		isTouch = "ontouchend" in document,
		len = els.length,
		i = 0,
		isEntrust = typeof arg[1]== 'string';

	if(len == 0){return false;}
	while (i < len){
		if(isTouch){
			var o = {};
			els[i].addEventListener('touchstart',function(e){
				var t = e.touches[0];
				o.startX = t.clientX;
				o.startY = t.clientY;
				o.sTime = + new Date;
				if(arg[isEntrust ? 3:2]){e.stopPropagation();}
			});
			els[i].addEventListener('touchend',function(e){
				var t = e.changedTouches[0];
				o.endX = t.clientX;
				o.endY = t.clientY;
				if((+ new Date)-o.sTime<300){
					if(Math.abs(o.endX-o.startX)+Math.abs(o.endY-o.startY)<20){
						e.preventDefault();
						if(isEntrust){
							if(equal(e,arg[1])){
								arg[2].call(e.target);
							}
						}else{
							arg[1].call(this);
						}
					}
				}
				if(arg[isEntrust ? 3:2]){e.stopPropagation();}
				o = {};
			});
		}else{
			els[i].addEventListener('click',function(e){
				if(arg[isEntrust ? 3:2]){e.stopPropagation();}
				if(isEntrust){
					if(equal(e,arg[1])){
						arg[2].call(e.target);
					}
				}else{
					arg[1].call(this);
				}
			});
		}
		i ++;
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
}))


/***/ })
/******/ ]);