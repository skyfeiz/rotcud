require('../css/common.css');
require('../css/p3.css');

const XhjBox1Chart1 = require('./components/xhj/xhj_box1Chart1.js');
const XhjBox1Chart2 = require('./components/xhj/xhj_box1Chart2.js');
const XhjBox1Chart3 = require('./components/xhj/xhj_box1Chart3.js');
const XhjBox2Chart = require('./components/xhj/xhj_box2Chart.js');
const XhjBox3Chart = require('./components/xhj/xhj_box3Chart.js');
const XhjBox4Chart = require('./components/xhj/xhj_box4Chart.js');
const initAnimation = require('./components/borderbg.js');
const ajaxUtil = new WBST.Controller();

let $xhjbox1 = $('.xhjbox1');
$xhjbox1.on('initChart', function() {
	$xhjbox1.find('.chartTitle').html('工业互联网大数据');
	//	刺绣行业经济指数
	let $xhjBox1Chart1 = $('#xhjbox1chart1');
	let xhjBox1Chart1 = new XhjBox1Chart1($xhjBox1Chart1[0]);
	ajaxUtil.getXhj_jjzs({}, function(result) {
		$('#liChartTitle1').html('刺绣经济行业指数');
		xhjBox1Chart1.setDataProvider(result.data);
	})

	//	花样流行趋势
	let $xhjBox1Chart2 = $('#xhjbox1chart2');
	let xhjBox1Chart2 = new XhjBox1Chart2($xhjBox1Chart2[0]);
	ajaxUtil.getXhj_lxqs({}, function(result) {
		$('#liChartTitle2').html('花样流行趋势');
		xhjBox1Chart2.setDataProvider(result.data);
	})

	//	绣花机由售转租	
	$('#xhjbox1chart3li').html('<p class="liChartTitle">绣花机由售转租</p>' + '<div class="xhjbox1chart xhjbox1chart3box">' + '<div class="w100p100" id="xhjbox1chart3"></div>' + '<span class="pointbg ab_lt"></span>' + '<span class="pointbg ab_rt"></span>' + '<span class="pointbg ab_rb"></span>' + '<span class="pointbg ab_lb"></span>' + '</div>')
	let $xhjBox1Chart3 = $('#xhjbox1chart3');
	let xhjBox1Chart3 = new XhjBox1Chart3($xhjBox1Chart3[0]);
})

//	生产效率提升
let $xhjBox2Chart = $('#xhjbox2chart');
let $xhjBox2Parent = $xhjBox2Chart.parent();
$xhjBox2Chart.parent().on('initChart', function() {
	let xhjBox2Chart = new XhjBox2Chart($xhjBox2Chart[0]);
	ajaxUtil.getXhj_xlts({}, function(result) {
		$xhjBox2Parent.find('.chartTitle').html(result.title);
		createLeftBox($xhjBox2Parent, 'box2icon.png', '生产效率', '25', '%', '80', '万针/台天', '100', 'add');
		xhjBox2Chart.setDataProvider(result.data);
	})
})


//	设备运营成本
let $xhjBox3Chart = $('#xhjbox3chart');
let $xhjBox3Parent = $xhjBox3Chart.parent();
$xhjBox3Chart.parent().on('initChart', function() {
	let xhjBox3Chart = new XhjBox3Chart($xhjBox3Chart[0]);
	ajaxUtil.getXhj_yycb({}, function(result) {
		$xhjBox3Parent.find('.chartTitle').html(result.title);
		createLeftBox($xhjBox3Parent, 'box3icon.png', '设备运营成本', '20', '%', '150', '元/台天', '120', 'fall');
		xhjBox3Chart.setDataProvider(result.data);
	})
})


//	产品不良率
let $xhjBox4Chart = $('#xhjbox4chart');
let $xhjBox4Parent = $xhjBox4Chart.parent();
$xhjBox4Parent.on('initChart', function() {
	let xhjBox4Chart = new XhjBox4Chart($xhjBox4Chart[0]);
	ajaxUtil.getXhj_bll({}, function(result) {
		$xhjBox4Parent.find('.chartTitle').html(result.title);
		createLeftBox($xhjBox4Parent, 'box4icon.png', '产品不良率', '20', '%', '30', '件/万件', '24', 'fall');
		xhjBox4Chart.setDataProvider(result.data);
	})
})

function createLeftBox($obj, img, iName, iValue, iUnit, sValue1, sUnit, sValue2, trend) {
	let str = '<div class="leftbox">' + '<div class="iconimg">' + '<img src="imgs/p3/' + img + '" alt="">' + '</div>' + '<div class="icontext">' + '<p class="i_name">' + iName + '</p>' + '<p class="i_value ' + trend + '">' + iValue + '<span>' + iUnit + '</span></p>' + '<span class="iconlight"></span>' + '</div>' + '<div class="l_details">' + '<p class="s_data clearfix">' + '<span class="s_value fl">' + sValue1 + '</span>' + '<span class="s_unit fl">' + sUnit + '</span>' + '</p>' + '<span class="c_icon ' + trend + '"></span>' + '<p class="s_data clearfix">' + '<span class="s_value fl">' + sValue2 + '</span>' + '<span class="s_unit fl">' + sUnit + '</span>' + '</p>' + '</div>' + '<span class="pointbg ab_lt"></span>' + '<span class="pointbg ab_rt"></span>' + '<span class="pointbg ab_rb"></span>' + '<span class="pointbg ab_lb"></span>' + '</div>';
	$obj.prepend(str);
}
initAnimation();