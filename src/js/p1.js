import '../css/p1.css';
import '../css/common.css';
const ZnfwXysj = require('./components/znfw_xysj.js');
const ZnfwRadar = require('./components/znfw_radar.js');
const ZnfwGzl = require('./components/znfw_gzl.js');
const ZnfwHsbl = require('./components/znfw_hsbl.js');
const ZnfwXfl = require('./components/znfw_xfl.js');
const Znfw6Box = require('./components/znfw_6box.js');
const ZnfwAssist = require('./components/znfw_assist.js');
//act
const ZnfwXysjAct = require('./components/znfw_xysj_act.js');   //1
const bar1 = require('./components/bars.js');                   // 2 3   
const ZnfwGzlAct = require('./components/znfw_gzl_act.js');     //4
const ZnfwHsblAct = require('./components/znfw_hsbl_act.js');   //5

const ajaxUtil = new WBST.Controller(); 

//  6边形
let $boxcenter = $('#boxcenter');
let znfw6Box = new Znfw6Box($boxcenter[0]);
ajaxUtil.getZnfw_6box({},function(result){
    znfw6Box.setDataProvider(result.data);
    ZnfwAssist.initAnimation();
});



// 工程师响应时间
let $znfw_chart1_01 = $('#znfw_chart1_01');
let $znfw_chart1_02 = $('#znfw_chart1_02');
let znfwXysj01 = new ZnfwXysj($znfw_chart1_01[0]);
znfwXysj01.setConfig({ label: "name", value: "value" });
let znfwXysj02 = new ZnfwXysj($znfw_chart1_02[0]);
znfwXysj02.setConfig({ label: "name", value: "value" });
$znfw_chart1_01.parent().parent().on('initChart',function(){
	ajaxUtil.getZnfw_xysj({},function(result){
		$znfw_chart1_01.parent().parent().find('.charttitle').html(result.title);
		znfwXysj01.setDataProvider(result.data[0]);
		znfwXysj02.setDataProvider(result.data[1]);
	});
})

// 雷达图
let $znfw_chart2 = $('#znfw_chart2');
let znfwRadar = new ZnfwRadar($znfw_chart2[0]);
$znfw_chart2.parent().on('initChart',function(){
	ajaxUtil.getZnfw_kyl({},function(result){
		$znfw_chart2.parent().find('.charttitle').html(result.title);
		znfwRadar.setDataProvider(result.data);
	});
})

//一次性修复率
let $znfw_chart3 = $('#znfw_chart3');
let znfwXfl = new ZnfwXfl($znfw_chart3[0]);
$znfw_chart3.parent().on('initChart', function () {
    ajaxUtil.getZnfw_xfl({}, function (result) {
    	$znfw_chart3.parent().find('.charttitle').html(result.title);
        let config = {
            "nameField": [],
            "seriesName": "seriesName",
            "name": "name",
            "value": "value",
            "dataList": "dataList"
        };
        znfwXfl.setConfig(config);
        znfwXfl.setDataProvider(result.data);
        znfwXfl.resize({ width: 1, height: 1 });
    });
});

// 故障率
let $znfw_chart4 = $('#znfw_chart4');
$znfw_chart4.on('initChart',function(){
    let znfwGzl = new ZnfwGzl($znfw_chart4[0]);
    ajaxUtil.getZnfw_gzl({},function(result){
        $znfw_chart4.parent().find('.charttitle').html(result.title);
        znfwGzl.setDataProvider(result.data);
    });
})


//	旧件回收比例
let $znfw_chart5 = $('#znfw_chart5');
$znfw_chart5.parent().on('initChart',function(){
    let znfwHsbl = new ZnfwHsbl($znfw_chart5[0]);
    ajaxUtil.getZnfw_hsbl({}, function (result) {
    	$znfw_chart5.parent().find('.charttitle').html(result.title);
        znfwHsbl.setDataProvider(result.data);
    });
})


//  指引线
ZnfwAssist.leadLine(document.getElementById('canvaslines'));

/*  反面*/
var $znfw_chart21 = $(".znfw_chart21_box");
var barChart1 = new bar1($znfw_chart21[0], {type: 1});
barChart1.setConfig({ label: "category", legend: "name", value: "data" });
barChart1.setDataProvider({
    category: ['备件预测准确率','仓库合理分布','备件周转速度','关键备件保障','制度保障'],
    data: [55,35,30,17,35],
    name: []
});

var $znfw_chart31 = $(".znfw_chart31_box");
var barChart2 = new bar1($znfw_chart31[0], {type: 2});
barChart2.setConfig({ label: "category", legend: "name", value: "data" });
barChart2.setDataProvider({
    category: ['故障监控','故障远程诊断','备件可用率','工程师技能','工具可用',"汇总"],
    data: [35,23,17,12,13,100],
    name: ["增加","汇总"]
});

/*let $znfw_chart11 = $('.znfw_chart11_box');
let znfwXysjAct = new ZnfwXysjAct($znfw_chart11[0]);
znfwXysjAct.setConfig({
    nameField: 'name',
    valueField: 'value'
})
ajaxUtil.getZnfw_xysj_act({}, function (result) {
    $znfw_chart11.parent().find('.charttitle').html(result.title);
    znfwXysjAct.setDataProvider(result.data);
});*/

//  旧件回收比例 措施
let $znfw_chart41 = $('.znfw_chart41_box');
let znfwGzlAct = new ZnfwGzlAct($znfw_chart41[0]);
znfwGzlAct.setConfig({
    nameField: 'name',
    valueField: 'value'
})
ajaxUtil.getZnfw_hsbl_act({}, function (result) {
    $znfw_chart41.parent().find('.charttitle').html(result.title);
    znfwGzlAct.setDataProvider(result.data);
});

//  旧件回收比例 措施
let $znfw_chart51 = $('.znfw_chart51_box');
let znfwHsblAct = new ZnfwHsblAct($znfw_chart51[0]);
ajaxUtil.getZnfw_hsbl_act({}, function (result) {
    $znfw_chart51.parent().find('.charttitle').html(result.title);
    znfwHsblAct.setDataProvider(result.data);
});