var tap = require('../tap.js');

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