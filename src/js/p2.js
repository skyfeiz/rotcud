require('../css/common.css');
require('../css/p2.css');
const Dashboard = require('./components/ycbx/ycbx_chart1.js');
const animation = require('./components/ycbx/yffz_assist.js');

var $lists = $(".box1 .contentBox");
var $list1Prominent = $(".chartBox1 .prominentBorder");
var $list3Prominent = $(".chartBox3 .prominentBorder");
var $rollBox = $("#rollBox");
var $prominentBorder = $rollBox.next("li.prominentBorder");
var $hideList = $("#hideList");
var mainTimeLine = new TimelineMax();
mainTimeLine.addLabel("t1",0);

var dashboard = new Dashboard({ dom: document.getElementById('box1') });

var canClick = true;
var controller = new WBST.Controller();
function init(){

	initList();
	
};

function initList(){
	controller.getYcbx_xzsb({},function(json){
		buildList1(json);
	});
	controller.getYcbx_sbdcgs({},function(json){
		buildList2(json);
	});
	controller.getYcbx_xzbxcp({},function(json){
		buildList3(json);
	});
	controller.getYcbx_bjjs({},function(json){
		buildList4(json);

		beginAni();
	});
};

function beginAni(){
	$(".box1").each(function(i){
		TweenMax.to($(this),.6,{
			transform: "translate(0,0)",
			opacity: 1,
			ease: Back.easeOut.config(1.7),
			delay: i*.2
		});
	});
};

function buildList1(json){
	$(".chartBox1 .chartTitle").text(json.title);
	for(var i=0; i<10; i++){
		var Odd = !(i%2) ? "" : " Odd";
		var $li = $("<li class='clearfix clickBar"+Odd+"'>"+
			"<p>"+json.data[i].number+"</p><p>"+json.data[i].name+"</p>"+
		"</li>").data({ "belong": json.data[i].belong, "sub": json.data[i].sub });

		$(".chartBox1 .prominentBorder").before($li);
	}

	
	
};

function buildList2(json){

	$(".chartBox2 .chartTitle").text(json.title);
	var ulList = [];
	for(var i=0; i<json.data.length; i++){
		var Odd = !(i%2) ? "" : " Odd";
		var $li = $("<li class='clearfix clickBar"+Odd+"'>"+
			"<p>"+json.data[i].name+"</p><p>"+/*json.data[i].value*/i+"</p>"+
		"</li>");

		$hideList.append($li.data("index",i));
		if(i<10){
			ulList.push(i);
			$rollBox.append($li.clone().css({ top: i*27 }).data("index",i));
		}
	}

	$rollBox.data("liIndex",ulList);
};

function buildList3(json){
	$(".chartBox3 .chartTitle").text(json.title);
	for(var i=0; i<10; i++){
		var Odd = !(i%2) ? "" : " Odd";
		console.log(Odd)
		var $li = $("<li class='clearfix clickBar"+Odd+"'>"+
			"<p class='p1'><span></span></p><p class='p2'>"+json.data[i].name+"</p><p class='p3'>"+(json.data[i].value || 0)+"</p>"+
		"</li>");

		$(".chartBox3 .prominentBorder").before($li.data("value",json.data[i].value || 0));
	}

};

function buildList4(json){
	$(".chartBox4 .chartTitle").text(json.title);
	$("#box1").data("countP",json.result);
    dashboard.setConfig({ label: "name", value: "value" });
    dashboard.setDataProvider({ name: "", value: 1 });

    beginingShow();
	bindClick1();
	bindClick3();
};

function beginingShow(){
	$lists.each(function(i){
		$(this).find("li").each(function(j){
			var t = TweenMax.to($(this),0.3,{
				opacity: 1,
				delay: j*.07,
				ease: Power2.easeInOut
			});

			mainTimeLine.add(t,i*.3);
		});
	});
};

function bindClick1(){

	$(".chartBox1 li.clickBar").each(function(i){
			$(this).click(function(){
				if(canClick){
					canClick = false;
					var parent = $(this).parent();
					if(parent.data("clickTween")){
						parent.data("clickTween").kill();
					}

					$(".chartBox4 p.p1").text($(this).data("belong"));
					$("#box1").data("per",$("#box1").data("countP")[$(this).data("belong")]);
					$(".offerUp .offerNum2").text($("#box1").data("per"));
					dashboard.setDataProvider({ name: "", value: $(this).data("belong").match(/\d/g) });

					$(".chartBox1 li.clickBar").css("background-color","rgba(5,169,233,0)").removeClass("onClick");
					$(".chartBox1 .Odd").css("background-color","rgba(5,169,233,0.1)");
					$(this).addClass("onClick");
					var top = $(this).offset().top-$(this).parent().offset().top;
					TweenMax.to($list1Prominent.addClass("hide"),.4,{
						top: parseInt(top)-2,
						ease: Back.easeOut.config(1.7),
						onCompleteScope: this,
						onComplete: function(){
							$list1Prominent.removeClass("hide");
							var t = clickBgAni($(this));
							$(this).parent().data("clickTween",t);
							shiftList2($(this));
						}
					});

					countDiscount();
				}
			});
	});
};

function bindClick3(){
	$(".chartBox3 li.clickBar").data("isClick",false).click(function(){
		

		if(!$(this).data("isClick")){
			$(this).find("span").css("background-position", "0px -17px");
			$(this).data("isClick" ,true);
		}
		else{
			$(this).data("isClick" ,false);
			$(this).find("span").css("background-position", "0px 0px");
		}
		console.log($(this).data("isClick"));
		var disCount = 0;
		$(".chartBox3 li.clickBar").each(function(){
			if($(this).data("isClick"))
				disCount += $(this).data("value");
			else
				$(this).removeClass("onClick");
		});
		$(".chartBox3").data("disCount",disCount);

		$(".chartBox3 li.clickBar").css("background-color","rgba(5,169,233,0)");
		$(".chartBox3 .Odd").css("background-color","rgba(5,169,233,0.1)");
		$(this).addClass("onClick");

		if($(this).data("isClick")){
			var parent = $(this).parent();
			if(parent.data("clickTween")){
				parent.data("clickTween").kill();
			}

			var top = $(this).offset().top-$(this).parent().offset().top;
			TweenMax.to($list3Prominent.addClass("hide"),.4,{
				top: parseInt(top)-2,
				ease: Back.easeOut.config(1.7),
				onCompleteScope: this,
				onComplete: function(){
					$list3Prominent.removeClass("hide");
					var t = clickBgAni($(this));
					$(this).parent().data("clickTween",t);
				}
			});
		}
		else{
			var parent = $(this).parent();
			if(parent.data("clickTween")){
				parent.data("clickTween").kill();
			}

			$list3Prominent.addClass("hide");
		}
		

		countDiscount();
	});
};

function countDiscount(){
	var disCount = $(".chartBox3").data("disCount") || 0;
	var per = $("#box1").data("per") || 0;

	$(".offerDown .offerNum2").text(Math.round(disCount*per*0.005));
};

function clickBgAni(element,delay){

	var index = element.index();

	var loopA = { per: 0 };
	var t = TweenMax.to(loopA, 1, {
		per: Math.PI,
		ease: Power2.In,
		onUpdate: function(){
			element.css({ backgroundColor: "rgba(5,169,233,"+Math.sin(loopA.per)*0.3+")" })
		},
		repeat: -1,
		repeatDelay: 1,
		delay: delay || 0
	});

	return t;
};

function shiftList2(element){
	if($rollBox.data("tweenAry") && $rollBox.data("tweenAry").length){
		for(var i=0; i<$rollBox.data("tweenAry").length; i++){
			$rollBox.data("tweenAry")[i].kill();
		}
		$rollBox.data("tweenAry").splice(0,$rollBox.data("tweenAry").length);
	}
	else
		$rollBox.data("tweenAry",[]);

	$rollBox.find("li.prominentBorder").remove();
	// $rollBox.children().css("background-color","rgba(5,169,233,0)");

	TweenMax.to($rollBox.children(),.2,{
		backgroundColor: "rgba(5,169,233,0)"
	});

	var ary = $rollBox.data("liIndex").slice(0);

	var list = element.data("sub");
	var len = list.length;

	$rollBox.children().removeClass("onClick");

	var delay = 0;
	for(var i=0; i<len; i++){
		var index = $rollBox.data("liIndex").indexOf(list[i]);
		var liIndex = -1;
		for(var x=0; x<$rollBox.children().length; x++){
			if($rollBox.children().eq(x).data("index")==list[i]){
				liIndex = x;
			}
		}

		var $p = $prominentBorder.clone();
		$p.css({ top: index==-1 ? 275:$rollBox.find("li.clickBar").eq(liIndex).css("top") });
		$rollBox.append($p);

		if(index!=-1){
			var aryIndex = ary.indexOf(list[i]);
			ary.splice(aryIndex,1);

			TweenMax.to($rollBox.find("li.clickBar").eq(liIndex),.2,{ opacity: 0, delay: delay });
			for(var j=0; j<$rollBox.children().length; j++){
				var $li = $rollBox.find("li.clickBar").eq(j);
				if($rollBox.data("liIndex").indexOf($li.data("index"))>index){
					TweenMax.to($li,.2,{ top: "-=27", delay: delay+.1 });
				}
			}
		}

		var $addLi = $hideList.find("li.clickBar").eq(list[i]).clone();
		$addLi.data("index",list[i]).addClass("onClick");

		$rollBox.append($addLi.css({top: -27*i-27}));

		ary.splice(0,0,list[i]);
		$rollBox.data("liIndex").splice(index,1,"");

		TweenMax.to($p,.4,{ top: -27*i-27, delay: delay+.1, ease: Back.easeOut.config(1), onCompleteParams: [$p], onComplete: function(a){
			a.removeClass("hide");
		} });
		TweenMax.to($rollBox,.3,{ top: "+=27", delay: delay+.1 });
		TweenMax.to($addLi,.3,{ opacity: 1, delay: delay+.3, onCompleteParams: [$addLi,i], onComplete: function(a,index){
			var t = clickBgAni(a);
			$rollBox.data("tweenAry").push(t);

			if(index==len-1)
				orderList(ary);
		} });

		
		delay+=0.3;
	}
};

function orderList(ary){
	canClick = true;

	if(ary.length>10)
		ary.splice(10,ary.length-10);
	

	$rollBox.data("liIndex",ary);
	$rollBox.css("top","-=135px");

	$rollBox.children().each(function(i){

		$(this).css("top","+=135px");

		var index = parseInt($(this).css("top"))/27;

		if($(this).css("opacity")==0 || index>9){
			$(this).remove();
		}

		if(index%2==1 && $(this).attr("class")!="prominentBorder"){
			TweenMax.to($(this),.2,{
				backgroundColor: "rgba(5,169,233,0.1)"
			});
		}
	});
};

init();
animation();