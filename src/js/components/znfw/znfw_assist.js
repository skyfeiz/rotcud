const zrender = require('zrender');
const PolygonShape = require('zrender/lib/graphic/shape/Polygon');
const IsogonShape = require('zrender/lib/graphic/shape/Isogon');
const LineShape = require("zrender/lib/graphic/shape/Line");
const TextShape = require("zrender/lib/graphic/Text");
const RectShape = require("zrender/lib/graphic/shape/Rect");
const LineGradient = require("zrender/lib/graphic/LinearGradient.js");
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const groupShape = require("zrender/lib/container/Group");

const lineLight = require('../lineLight.js');

function leadLine(dom) {
	let $dom = $(dom);
	let myZr = zrender.init(dom);
	let lineArr = [{
		percent:0,
		x1: 0,
		y1: 0,
		x2: 140,
		y2: 70
	}, {
		percent:0,
		x1: 786,
		y1: 0,
		x2: 649,
		y2: 70
	}, {
		percent:0,
		x1: 0,
		y1: 456,
		x2: 140,
		y2: 266
	}, {
		percent:0,
		x1: 786,
		y1: 456,
		x2: 658,
		y2: 245
	}, {
		percent:0,
		x1: 390,
		y1: 395,
		x2: 438,
		y2: 315
	}];

	var lines = [];
    var isogons = [];
	for (var i = 0; i < lineArr.length; i++) {
		var line = new LineShape({
			shape: lineArr[i],
			style: {
				stroke: 'rgba(102,255,255,0.2)',
				lineDash: [2, 2]
			}
		});
        lines.push(line);
		myZr.add(line);

		var isogon1 = new IsogonShape({
			shape: {
				x: lineArr[i].x2,
				y: lineArr[i].y2,
				r: 0,
				n: 6
			},
			style: {
				fill: '#66ffff'
			}
		});
        var isogon2 = new IsogonShape({
            shape: {
                x: lineArr[i].x2,
                y: lineArr[i].y2,
                r: 0,
                n: 6
            },
            style: {
                stroke: '#66ffff',
                fill: 'none'
            }
        });
        isogon1.hide();
        isogon2.hide();
        isogons.push(isogon1);
        isogons.push(isogon2);
        myZr.add(isogon1);
        myZr.add(isogon2);
	}
    var count = 0;
    for (var i = 0; i < lines.length; i++) {
        lines[i].animateShape().when(600,{percent:1}).delay(3000).start().done(function(){
            count++;
            if (count == 5) {
                for (var i = 0; i < isogons.length; i++) {
                    isogons[i].show();
                    isogons[i].animateShape().when(200,{r:(i%2==0?4:6)}).start();
                }
                for (var i = 0; i < lineArr.length; i++) {
					lineLight(myZr,lineArr[i].x1,lineArr[i].y1,lineArr[i].x2,lineArr[i].y2,2000,1000);
			    }
            }
        });

    }
}

$('.element-div').each(function(index, ele) {
	if (index == 3) {
		return
	}
	var clone = $('.z_clone').clone();
	clone.removeClass('z_clone');
	$(ele).prepend(clone);
})

var $centerNut, $nut1, mainTimeLine, $bgCover, $boxcenter;

function initAnimation() {
	$bgCover = $("#BG .bgCover");
	$centerNut = $("#BG .img1");
	$nut1 = $("#BG .img2");
	$boxcenter = $('#boxcenter');
	mainTimeLine = new TimelineMax();

	mainTimeLine.addLabel("t1", 0);
	mainTimeLine.addLabel("t3", 0.5);
	mainTimeLine.addLabel("t2", 1);
	mainTimeLine.addLabel("t5", 1);
	mainTimeLine.addLabel("t6", 1.4);

	enterAni();
	transformSet();
};

function enterAni() {
	var angle = {
		per: 0
	}
	var rotateSpeed = 0.1;
	var rotateAngle = 0;

	var t1 = new TweenMax(angle, 1, {
		per: 1,
		ease: Linear.easeNone,
		onUpdate: function() {
			rotateSpeed = Math.sin(angle.per);
			rotateAngle += rotateSpeed;

			$centerNut.css({
				transform: "rotate(" + rotateAngle + "deg)"
			});
			$nut1.css({
				transform: "rotate(-" + rotateAngle * 3 + "deg)"
			});
		}
	});

	var t2 = new TweenMax(angle, 5, {
		per: 0,
		ease: Linear.easeNone,
		onUpdate: function() {
			rotateAngle += rotateSpeed;

			$centerNut.css({
				transform: "rotate(" + rotateAngle + "deg)"
			});
			$nut1.css({
				transform: "rotate(-" + rotateAngle * 3 + "deg)"
			});
		},
		repeat: -1
	});

	var t3 = new TweenMax($bgCover, 0.5, {
		opacity: 1,
		ease: RoughEase.ease.config({
			template: Power0.easeNone,
			strength: 1.5,
			points: 20,
			taper: "none",
			randomize: true,
			clamp: false
		}),
		onComplete:function(){
			$('#znfw_chart4').trigger('initChart');
		}
	});


	mainTimeLine.add(t1, "t1");
	mainTimeLine.add(t2, "t2");
	mainTimeLine.add(t3, "t3");

	var t7 = new TweenMax($boxcenter, 1, {
		top: 150,
		opcity: 1,
		ease: Back.easeOut.config(3.5),
		delay: 2.4,
		onComplete: function() {
			$('.d-value').each(function(idx,ele){
				var json = {value:$(ele).html()};
				var end = $(ele).attr('data-end');
				new TweenMax(json,1,{
					value:end,
					ease:Linear.easeNone,
					onUpdate:function(){
						$(ele).html(Math.round(json.value));
					}
				})
			})
			$('#znfw_chart4').parent().find('.gridbg').show();
			$('#znfw_chart4').trigger('initChart');
		}
	})

	var zAngle = {
		per: 0
	};
	var zRotateAngle = 0;

	var t8 = new TweenMax(zAngle, 1, {
		per: 1,
		ease: Power4.easeOut,
		delay: 2.4,
		onUpdate: function() {
			zRotateAngle = 90 * (zAngle.per - 1);

			$boxcenter.css({
				transform: "perspective(500px) rotateX(" + zRotateAngle + "deg) scale(" + (zAngle.per * 0.3 + 0.7) + "," + (zAngle.per * 0.3 + 0.7) + ")"
			});
		}
	})

};

function transformSet() {
	$(".transformBG").each(function(i) {
		var curDelay = Math.random() * 0.4;
		var t6 = new TweenMax($(this).parent(), 1.2, {
			transform: "translate(0,0)",
			ease: Elastic.easeOut.config(0.5, 0.3),
			delay: curDelay,
			onCompleteParams: [$(this)],
			onStartParams: [i],
			onComplete: function(a) {
				if (a.hasClass('znfw_chart4')) {return}
				a.trigger('initChart');
			}
		});
		mainTimeLine.add(t6, "t6");

		$(this).find(".transformBox1").children().each(function(i, val) {
			$(this).css({
				left: $(this).attr("mark-Left") ? Math.random() * 400 : "auto",
				right: $(this).attr("mark-right") ? Math.random() * 400 : "auto",
				top: $(this).attr("mark-top") ? Math.random() * 280 : "auto",
				transform: $(this).attr("mark-top") ? "rotate(" + (parseInt($(this).attr("mark-rotate")) + (-0.5 + Math.random()) * 20) + "deg)" : "rotate(0deg)"
			});

			transformAni($(this), i, curDelay);
		});
		$(this).find(".transformBox2").children().each(function(i, val) {
			$(this).css({
				left: $(this).attr("mark-Left") ? Math.random() * 400 : "auto",
				right: $(this).attr("mark-right") ? Math.random() * 400 : "auto",
				top: $(this).attr("mark-top") ? Math.random() * 280 : "auto",
				transform: $(this).attr("mark-top") ? "rotate(" + (parseInt($(this).attr("mark-rotate")) + (-0.5 + Math.random()) * 90) + "deg)" : "rotate(0deg)"
			});

			transformAni($(this), i, curDelay);
		});
	});
};

function transformAni(element, index, baseDelay) {
	var curDelay = .03 * index + baseDelay;
	var t = new TimelineMax({
			delay: curDelay
		})
		.to(element, .3, {
			opacity: 1
		}, 0)
		.to(element, .3, {
			transform: "rotate(" + element.attr("mark-rotate") + "deg)"
		}, 0.1);

	if (element.attr("mark-Left")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "left") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			left: element.attr("mark-Left"),
			ease: ease
		}, delay);
	}
	if (element.attr("mark-top")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "top") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			top: element.attr("mark-top"),
			ease: ease
		}, delay);
	}
	if (element.attr("mark-right")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "right") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			right: element.attr("mark-right"),
			ease: ease
		}, delay);
	}

	mainTimeLine.add(t, "t5");
};
module.exports = {
	leadLine:leadLine,
	initAnimation:initAnimation
};