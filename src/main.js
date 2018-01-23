var tap = require('../tap.js');

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
阻止冒泡 true stop propagation
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
*/
tap('.a1',function(e){
	e.preventDefault();
	console.log('无法跳转');
})
//快速跳转-事件委托
tap(document,'a2',function(){
	window.location = this.href;
});