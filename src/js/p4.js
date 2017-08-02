require('../css/common.css');
require('../css/p4.css');
const YffzChart1 = require('./components/yffz/yffz_1_chart.js');
const YffzChart2 = require('./components/yffz/yffz_2_chart.js');
const YffzChart3 = require('./components/yffz/yffz_3_chart.js');
const YffzChart4 = require('./components/yffz/yffz_4_chart.js');

const initAnimation = require('./components/borderbg.js');

const ajaxUtil = new WBST.Controller(); 

let $yffzChart1box = $('#yffzChart1box');
let yffzChart1 = new YffzChart1($yffzChart1box[0]);
yffzChart1.setConfig({
	nameField: 'name',
	xField: 'xNum',
	yField: 'yNum',
	rField: 'rNum',
	typeField: 'type'
});
$yffzChart1box.parent().on('initChart',function(){
	ajaxUtil.getYffz_gzpc({},function(result){
		$yffzChart1box.parent().find('.charttitle').html(result.title);
		yffzChart1.setDataProvider(result.data);
	})
})


let $yffzChart2box = $('#yffzChart2box');
let yffzChart2 = new YffzChart2($yffzChart2box[0]);
yffzChart2.setConfig({
	xField: 'xNum',
	y3Field: '负荷系数',
	y1Field: '额定重量',
	y2Field: '实际重量'
});

$yffzChart2box.parent().on('initChart',function(){
	ajaxUtil.getYffz_jscl({},function(result){
		$yffzChart2box.parent().find('.charttitle').html(result.title);
		yffzChart2.setDataProvider(result.data);
	})
})


let $yffzChart3box = $('#yffzChart3box');
let yffzChart3 = new YffzChart3($yffzChart3box[0]);
yffzChart3.setConfig({
	xField: 'xNum',
	y1Field: '负荷值',
	y2Field: '负荷系数'
});
$yffzChart3box.parent().on('initChart',function(){
	ajaxUtil.getYffz_zqcl({},function(result){
		$yffzChart3box.parent().find('.charttitle').html(result.title);
		yffzChart3.setDataProvider(result.data);
	})
})

let $yffzChart4box = $('#yffzChart4box');
let $yffzChart4bg = $('#yffzChart4bg');
let yffzChart4 = new YffzChart4($yffzChart4box[0],$yffzChart4bg[0]);
yffzChart4.setConfig({
	xField: 'xNum',
	y1Field: '超载次数',
	y2Field: '负荷系数'
});
$yffzChart4box.parent().on('initChart',function(){
	ajaxUtil.getYffz_bccl({},function(result){
		$yffzChart4box.parent().find('.charttitle').html(result.title);
		yffzChart4.setDataProvider(result.data);
	})
})


initAnimation(function(){
	let $chart1box = $('.yffzChart1box');
	$('.rightStick4').attr('mark-top',55);
	$('.leftStick4').attr('mark-top',55);
	$('.rightBar4').attr('mark-top',90);
	$('.leftBar4').attr('mark-top',90);

	$chart1box.find('.leftStick4').attr('mark-top',96);
	$chart1box.find('.rightStick4').attr('mark-top',96);

	$chart1box.find('.leftBar4').attr('mark-top',154).css('height',185);
	$chart1box.find('.rightBar4').attr('mark-top',154).css('height',185);

	// $yffzChart1box.find('.rightBar3').attr('height',100);
	// $yffzChart1box.find('.leftBar3').attr('height',100);
});