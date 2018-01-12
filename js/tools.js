var tools = {
	//获取元素
	$: function (id) {
		return document.getElementById(id);
	},
	//设置cookie
	setCookie:function(c_name,value,expiredays){
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie = c_name+ "="+ escape(value)+";expiredays="+exdate.toGMTString();
	},
	//获取cookie
	 getCookie:function(c_name){
	 	var arr1 = document.cookie.split(";");
	 	for(var i = 0 ;i < arr1.length ;i++){
	 		var arr2 = arr1[i].split("=");
	 		if(arr2[0] == c_name){
	 			return decodeURI(arr2[1]);
	 		}
	 	}
	 	return "";
	 },
	 //删除cookie
	 deleteCookie:function(c_name){
	 	this.setCookie(c_name,value,-1);
	 },
	 //ajax
	 ajax:function(options){
	 	options = options || {};
	 	options.type = (options.type || "GET").toUpperCase();
	 	options.dataType = options.dataType || "json";
	 	var params = formatParams(options.data);
	 	
	 	//创建 
	 	  //非IE6
	 	if(window.XMLHttpRequest){
	 		var xhr = new XMLHttpRequest();
	 	}else{ //IE6及以下
	 		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	 	}
	 	
	 	//接收
	 	xhr.onreadystatechange = function(){
	 		if(xhr.readyState == 4){
	 			var status = xhr.status;
	 			if(status >= 200 && status < 300){
	 				options.success && options.success(xhr.responseText,xhr.responseXML);
	 			}else{
	 				options.fail && options.fail(status);
	 			}
	 		}
	 	}
	 	// 连接和发送
	 	 if(options.type == "GET"){
	 	 	xhr.open("GET",options.url +"?"+params,true);
	 	 	xhr.send(null);
	 	 }else if(options.type == "POST"){
	 	 	xhr.open("POST",options.url,true);
	 	 	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 	 	xhr.send(params);
	 	 }
	 	 
	 	 function formatParams(data){
	 	 	var arr = [];
	 	 	for(var name in data){
	 	 		arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
	 	 	}
	 	 	arr.push(("v="+Math.random()).replace("."," "));
	 	 	return arr.join("&");
	 	 }
	 },
	 
	 //运动函数
	 move:function(obj,attr,itarget){
	 	clearInterval(obj,timer);
	 	obj.timer = setInterval(function(){
	 		if(attr == "opacity"){
	 			var cur = parseFloat(tools.getStyle(obj,attr))*100;
	 			var speed = 5;
	 			if(cur == itarget){
	 				clearInterval(obj.timer);
	 			}else{
	 				cur += speed;
	 				obj.style.opacity = cur/100;
	 				obj.style.filter = "alpha(opacity:"+cur+")";
	 			}
	 		}else{
	 			var cur = parseFloat(tools.getStyle(obj,attr));
	 			var speed = (itarget - cur)/20;
	 			speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
	 			if(cur == itarget){
	 				clearInterval(obj.timer);
	 			}else{
	 				obj.style[attr] = cur + speed +"px";
	 			}
	 		}
	 		
	 	},25);
	 	
	 },
	 
	 //获取样式
	 getStyle:function(obj,attr){
	 	if(obj.currentStyle){
	 		return obj.currentStyle[attr];
	 	}else{
	 		return window.getComputedStyle(obj,false)[attr];
	 	}
	 },
	 
	 //时间注册
	 addEvent:function(obj,ev,fn){
	 	if(obj.attachEvent){//IE78
	 		obj.attachEvent("on"+ev,fn);
	 	}else{//chrome
	 		obj.addEventListener(ev,fn,false);
	 	}
	 },
	 //class操作
	 haveClass:function(obj,cla){
	 	return obj.className.match(new RegExp("(\\s|^)"+cla+"(\\s|$)"));
	 },
	 addClass:function(obj,cla){
	 	if(!tools.haveClass(obj,cla)) obj.className += " " + cla;
	 },
	removeClass:function(obj,cla){
		if(tools.haveClass(obj,cla)){
			var reg = new RegExp("(\\s|^)"+cla+"(\\s|$)");
			obj.className = obj.className.replace(reg," ");
		}
	},
}
