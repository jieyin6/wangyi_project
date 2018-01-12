// 顶部通知栏操作
//检查是否提醒
(function(){
	if(tools.getCookie("notTip") == "yes"){
		tools.addClass(tools.$("headerTop"),"hide");
	}
//不在提醒
	tools.addEvent(tools.$("topRight"),"click",function(){
		tools.setCookie("notTip","yes",30);
		tools.addClass(tools.$("headerTop"),"hide");
	});
})(tools);
//关注模块
(function(){
	var focus = tools.$("focus");
	var focusedCancle = tools.$("focused-cancel");
	var focused = tools.$("focused");
	//检查关注状态和登录状态
	if(tools.getCookie("loginSuc") && tools.getCookie("followSuc") == "yes"){
		tools.addClass(tools.$("focus"),"hide");
		tools.addClass(tools.$("focused"),"show");
	}
	//关注
	tools.addEvent(focus,"click",function(){
		//判断是否登录
		if(tools.getCookie("loginSuc") == "1"){
			tools.ajax(
				{
					url: "http://study.163.com/webDev/attention.htm",
                    type: "GET",
                    data: {},
                    dataType: "json",
                    success:function(response,xml){
                    	tools.setCookie("followSuc","yes",30);
						tools.addClass(focus,"hide");
						tools.addClass(focused,"show");
					},
					fail:function(response,xml){
						console.log(responseText);
					},
			});
		}else{

			tools.removeClass(tools.$("loginBg"),"hide");
			tools.removeClass(login,"animate-out");
			tools.addClass(tools.$("login"),"animate-in");
		}
	});
	
	//取消关注
	tools.addEvent(focused,"click",function(e){
		e.stopPropagation();//阻止冒泡
		tools.deleteCookie("followSuc");
		tools.addClass(focused,"hide");
		tools.addClass(focus,"show");
	});
})(tools);

//登录模块
(function(){
	var username = tools.$("username");
	var passWord = tools.$("password");
	var Form = tools.$("Form");
	var loginBg = tools.$("loginBg");
	var close = tools.$("close");
	var loginIn = tools.$("loginIn");
	var alertTe = tools.$("alertText");
	var login = tools.$("login");
	
	
	  //关闭登陆弹窗
	  tools.addEvent(close,"click",function(){
	  	
	  	tools.removeClass(login,"animate-in");
	  	tools.addClass(login,"animate-out");
	    var timer = setTimeout(function(){
	  		tools.addClass(loginBg,"hide");
	  		username.value="";
	  		passWord.value="";
	  	},500);
	  	
	    });
	  //登陆
	  tools.addEvent(loginIn,"click",function(){
	  	var usern =username.value;
	  	var passw =passWord.value;
	  	//判断输入框是否为空
	  	if(usern == "" || passw == ""){
	  		alertTe.innerHTML="请输入账号及密码";
	  	}else{
	  		var focus = tools.$("focus");
	  		var focused = tools.$("focused");
	  		var  mdusern = md5(usern);
	  		var  mdpassw = md5(passw);
	  		tools.ajax(
	  			{
	  			type:"GET",
	  			dataType:"json",
	  			data:{
	  				userName:mdusern,
	  				password:mdpassw,
	  			},
	  			success:function(response,xml){
	  				if(response=="1"){
	  				close.click();
	  				tools.setCookie("loginSuc",usern,30);
	  				tools.addClass(focus,"hide");
	  				tools.addClass(focused,"show");
	  				}else{
	  					alertTe.innerHTML="账号或密码错误";
	  				}
	  			},
	  			fail:function(response,xml){
	  				console.log("错误"+ response);
	  			},
	  			
	  	
	  		});
	  	}
	  });
	 tools.addEvent(passWord,"keydown",function(e){
	 	if(e.keyCode==13){
	 		close.click();
	 	}
	 });
})(tools);

//轮播图模块
(function(){
	var sliderPic = tools.$("sliderPic");
		sliders = sliderPic.getElementsByTagName("li");
		control = tools.$("control");
		spanC = control.getElementsByTagName("li");
		index = -1;
		interval = 5000;
		timer = null;
		//一张图不轮播
		if(sliders.length == 1 ){
			next();
			return;
		}
		//显示slide
		function show(j){
			var imgCur = sliderPic.getElementsByClassName("img-cur");
			var spanCur = control.getElementsByClassName("span-cur");
			for(var i = 0; i < imgCur.length ; i++){
				tools.removeClass(imgCur[i],"img-cur");
				tools.removeClass(spanCur[i],"span-cur");
			}
			tools.addClass(sliders[j],"img-cur");
			spanC && tools.addClass(spanC[j],"span-cur");
		}
		//下一张图
		function next(){
			index++;
			index = index > sliders.length - 1 ? 0 : index;
			show(index);
		}
		//自动播放
		function autoPlay(){
			if(timer){
				clearInterval(timer);
			}
			timer = setInterval(function(){
				next();
			},interval);
		}
		//鼠标移入移出
		tools.addEvent(sliderPic,"mouseenter",function(){
			if(timer) clearInterval(timer);
		});
		tools.addEvent(sliderPic,"mouseleave",function(){
			autoPlay();
		});
		//指示器添加索引
		for(var i = 0 ;i < spanC.length ; i++){
			spanC[i].index = i;
		}
		//点击圆点切换图片
		tools.addEvent(control,"click",function(){
			var e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() == "li"){
				if(tools.haveClass(target,"img-cur")) return;
				var i = target.index;
				index = i;
				show(i);
			}
		});
		
		next();
		autoPlay();
})(tools);

//照片墙模块
(function(){
	var picBox = tools.$("picBox");
		target = 0;
		timer = null;
	function autoPlay(){
		if(timer) clearInterval(timer);
		timer = setInterval(function(){
			target++;
			picBox.style.left = -target + "px";
			if(target == 1620){
				target = 0;
			}
		},60);
	}
	autoPlay();
})(tools);

//课程模块
(function(){
	var tab =tools.$("content-tab");
		tabBtn = tab.getElementsByTagName("li");
		courseList = tools.$("courseList");
		coursebox = tools.$("coursebox");
		courseLists = courseList.getElementsByClassName("class");
		coursePage = tools.$("coursePage");
		liPage = coursePage.getElementsByTagName("li");
		prePage = tools.$("prePage");
		nextPage = tools.$("nextPage");
		curtab = 0 ;//当前tab 10为产品 20为编程
		curPage = 1;//当前页码
		//添加索引
		for(var i = 0 ; i < tabBtn.length ; i++){
			tabBtn[i].index = i;
		}
		for(var i = 0 ;i < liPage.length ;i++){
			liPage[i].index = i + 1; //页码从1开始
		}
		//tab切换事件
		
		tools.addEvent(tab,"click",function(e){
			e = e || window.target;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase()=="li"&& !tools.haveClass(target,"z-cur")){
				settab(target,target.index);
			}
		});
		//设置当前的tab
		function settab(obj,index){
			for(var i = 0 ; i < tabBtn.length ;i++){
				tools.removeClass(tabBtn[i],"z-cur");
				tools.addClass(courseLists[i],"hide");
			}
			tools.addClass(obj,"z-cur");
			tools.addClass(courseLists[index],"show");
			curtab = index == 0? 10 : 20;
			console.log(curtab);
			pageLoad(curtab,1);
		}
		
		//课程页面加载
		function pageLoad(type,pageNo){
			var curlist = type == 10 ? courseLists[0] :courseLists[1];
			tools.ajax({
				 url: "http://study.163.com/webDev/couresByCategory.htm",
                 type: "GET",
                 dataType:"json",
                 data:{
                 	pageNo:pageNo,
                 	psize:20,
                 	type:type,
                 },
                 success:function(response,xml){
                 	//将pageNo设置为当前页
                 	curPage = pageNo;
                 	build(response);
                 	buildPage(response);
                 	if(curPage) tools.removeClass(liPage[curPage-1],"z-cur");
                 	tools.addClass(liPage[pageNo - 1],"z-cur");
                 },
                 fail:function(response,xml){
                 	console.log("错误"+response);
                 },
			});
		}
		//创建课程模板
		function build(para){
			var info = JSON.parse(para).list;
			coursebox.innerHTML ="";
			for(var i = 0 ;i < info.length ;i++){
				//创建外部容器li
			var li = document.createElement("li");
			li.setAttribute("id",info[i].id);
			//创建盒子
			var box = document.createElement("div");
			//创建图片
			var img = document.createElement("img");
			img.setAttribute("src",info[i].bigPhotoUrl);
				//设置课程名称
			var courseName = document.createElement("h1");
			courseName.setAttribute("class","course-name");
			courseName.innerHTML=info[i].name;
				//设置机构
			var company = document.createElement("h2");
			company.setAttribute("class","company");
			company.innerHTML=info[i].provider;
				//设置关注人数
			var people = document.createElement("p");
			people.setAttribute("class","people");
			people.innerHTML=info[i].learnerCount;
			var icon =document.createElement("i");
			icon.setAttribute("class","icon");
				//设置价格
			var price = document.createElement("p");
			price.setAttribute("class","price");
			price.innerHTML=info[i].price?"￥"+info[i].price:"免费";
			//添加节点
			people.appendChild(icon);
			box.appendChild(img);
			box.appendChild(courseName)
			box.appendChild(company);
			box.appendChild(people);
			box.appendChild(price);
			li.appendChild(box);
			coursebox.appendChild(li);
			//搭建hover盒子
			var div1 = document.createElement("div");
			div1.setAttribute("class","courseDetails");
			var div2 = document.createElement("div");
			div2.setAttribute("class","detailsTop");
			var img = document.createElement("img");
			img.setAttribute("src",info[i].bigPhotoUrl);
			var div3 = document.createElement("div");
			div3.setAttribute("class","detailsRight");
			var p1 = document.createElement("p");
			p1.setAttribute("class","course-title");
			p1.innerHTML = info[i].name;
			var p2 = document.createElement("p");
			p2.setAttribute("class","learner");
			p2.innerHTML = info[i].learnerCount+"人在学";
			var p2icon = document.createElement("i");
			p2icon.setAttribute("class","icon learner-icon");
			var p3 = document.createElement("p");
			p3.setAttribute("class"," publish");
			p3.innerHTML = "发布者："+info[i].provider;
			var p4 = document.createElement("p");
			p4.setAttribute("class","classify");
			p4.innerHTML = "分类："+info[i].learnerCount;
			var div4 = document.createElement("div");
			div4.setAttribute("class","detailsBottom");
			div4.innerHTML = info[i].description;
			//添加
			li.appendChild(div1);
			div1.appendChild(div2);
			div1.appendChild(div4);
			div2.appendChild(img);
			div2.appendChild(div3);
			div3.appendChild(p1);
			div3.appendChild(p2);
			p2.appendChild(p2icon);
			div3.appendChild(p3);
			div3.appendChild(p4);
			}
		}
		//创建页数模板
		function buildPage(dat){
			var pagedata = JSON.parse(dat).pagination;
			console.log(pagedata);
			var totalPage = pagedata.totlePageCount;
			console.log(totalPage);
			for(var i = 0 ; i < totalPage;i++){
				var buildli = document.createElement("li");
				buildli.innerHTML = i+1;
				coursePage.appendChild(buildli);
				
			}
		}
		/*
		//滑过课程卡片显示课程详情
		tools.addEvent(coursebox,"mouseover",function(e){
			e = e || window.target;
			var l = e.target || e.srcElement;
			while(l.tagName!=="LI"){
				if( l === coursebox){
					l = null;
					break;
				}
				l = l.parentNode; 
			}
			if(l){
				console.log(l);
			}
		});
		//滑出卡片隐藏课程详情
		tools.addEvent(coursebox,"mouseout",function(e){
			e = e || window.target;
			var l = e.target || e.srcElement;
			var curCourse = document.querySelectorAll(".courseDetails");
			while(l.tagName !== "LI"){
				if( l === coursebox){
					l = null;
					break;
				}
				l = l.parentNode; 
			}
			if(l){
				for(var i = 0 ; i < curCourse.length ;i++){
					var target = curCourse[i];
					if(l.id == target.parentNode.id){
						l.removeChild(target);
					}
				}
			}
		});
		*/
		//翻页器
		tools.addEvent(coursePage,"click",function(e){
			var e = e || e.target;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() == "li" && !tools.haveClass(target,"z-cur")){
				pageLoad(curtab,target.index);
			}
		});
		tools.addEvent(prePage,"click",function(e){
			var e = e || e.target;
			var target = e.target || e.srcElement;
			if(curPage>1){
				pageLoad(curtab,curPage-1);
			}
		});

		tools.addEvent(nextPage,"click",function(e){
			var e = e || e.target;
			var target = e.target || e.srcElement;
			if(curPage < liPage.length){
				pageLoad(curtab,curPage + 1);
			}
		});
		//初始化时加载第一页
		pageLoad(10,1);
})(tools);



//视频模块
(function(){
	var video = tools.$("video");
		popupVideo = tools.$("popupVideo");
		closeVideo = tools.$("closeVideo");
		imgVideo = video.getElementsByTagName("img")[0];
		//点击图片打开视频页面
		tools.addEvent(imgVideo,"click",function(){
			tools.removeClass(popupVideo,"hide");
			tools.addClass(popupVideo,"show");
		});
		//关闭视频页面
		tools.addEvent(closeVideo,"click",function(){
			tools.removeClass(popupVideo,"show");
			tools.addClass(popupVideo,"hide");
			playWindow.pause();//暂停播放
		});
})(tools);

//热门排行
 (function(){
 	var roll = tools.$("roll");
 		rollbox = tools.$("rollbox");
 		total = null;
 		count = -1;
 		timer = null;
 		interval = 5000;
 		//数据加载
 		tools.ajax({
 			type:"GET",
 			url:"http://study.163.com/webDev/hotcouresByCategory.htm",
 			dataType:"json",
 			success:function(response,xml){
 				contentLoad(response);
 			},
 			fail:function(response,xml){
 				console.log("错误"+response);
 			}
 		});
 		function contentLoad(para){
 			var info = JSON.parse(para);
 			total = info.length;
 			console.log(total);
 			for(var i = 0 ; i < total ;i++ ){
 				var a =document.createElement("a");
 				var img = document.createElement("img");
 				img.src = info[i].smallPhotoUrl;
 				var p = document.createElement("p");
 				p.innerHTML = info[i].name;
 				var span =document.createElement("span");
 				span.innerHTML = info[i].learnerCount;
 				a.appendChild(img);
 				a.appendChild(p);
 				a.appendChild(span);
 				rollbox.appendChild(a);
 			}
 		}
 		
 	//列表滚动
 	
 	function play(){
 		if(timer) clearInterval(timer);
 		timer = setInterval(function(){
 			next();
 		},interval);
 	}
 	function next(){
 		count++;
 		count = count > total - 10 ? 0 : count;
 		var target =  -(count * 70 ) + 19;
 		startroll(target);
 	}
 	function startroll(t){
 		tools.move(rollbox,"top",t);
 	}
 	tools.addEvent(roll,"mouseenter",function(){
 		clearInterval(timer);
 	});
 	tools.addEvent(roll,"mouseleave",function(){
 		play();
 	});
 	next();
 	play();
 })(tools);
