const LineGradient = require("zrender/lib/graphic/LinearGradient.js");
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const groupShape = require("zrender/lib/container/Group");
const LineShape = require("zrender/lib/graphic/shape/Line");
/**
 * 生成光线的类
 * @param  {[zrender]} zr        zrender init实例
 * @param  {[int]} x         线起点x值
 * @param  {[int]} y         线起点y值
 * @param  {[int]} tX        线终点x值
 * @param  {[int]} tY        线终点y值
 * @param  {[int]} during    运动持续时间
 * @param  {[int]} delay     运动间隔时间
 * @param  {[string]} rgbaColor   default值 'rgba(255,255,255,1)'
 * @return {[zrender]}       lineShape 实例
 */

function lineAnimate(zr,x,y,tX,tY,during,delay,rgbaColor){
	let lineW = Math.sqrt((x-tX)*(x-tX)+(y-tY)*(y-tY));
	delay = delay || 0;
	rgbaColor = rgbaColor || 'rgba(255,255,255,1)';
	let color = new LineGradient(0,0,0,1,[{
		offset:0,
		color:rgbaColor
	},{
		offset:0.5,
		color:rgbaColor.substring(0,rgbaColor.lastIndexOf(','))+',0)'
	},{
		offset:1,
		color:rgbaColor.substring(0,rgbaColor.lastIndexOf(','))+',0)'
	}],false);

	let LimitGroup = new groupShape();
	let circle = new CircleShape({
		shape:{
			cx:x,
			cy:y,
			r:lineW
		}
	});
	LimitGroup.setClipPath(circle);
	zr.add(LimitGroup);
	
	let Line = new LineShape({
		shape:{
			x1:x,
			y1:y,
			x2:x,
			y2:y-lineW*2,
			percent:0
		},
		origin:[x,y],
		rotation:Math.acos((y-tY)/lineW)*(tX-x>0?-1:1),
		style:{
			stroke: color,
			lineWidth:2
		}
	})

	callSelft(Line,during,delay);

	function callSelft(Line,during,delay){
		Line.animateShape().when(during,{percent:1}).delay(delay).start().done(function(){
			Line.shape.percent = 0;
			callSelft(Line,during,delay);
		});
	}

	LimitGroup.add(Line);
	zr.add(Line);

	return Line;
}

module.exports = lineAnimate;