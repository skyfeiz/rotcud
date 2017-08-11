(function(){
	var XhjBox1Chart1 = CHARTS.XhjBox1Chart1;
	var XhjBox1Chart2 = CHARTS.XhjBox1Chart2;
	var XhjBox1Chart3 = CHARTS.XhjBox1Chart3;
	var XhjBox2Chart = CHARTS.XhjBox2Chart;
	var XhjBox3Chart = CHARTS.XhjBox3Chart;
	var XhjBox4Chart = CHARTS.XhjBox4Chart;
	var initAnimation = CHARTS.animation;
	var ajaxUtil = new WBST.Controller();

	var $xhjbox1 = $('.xhjbox1');
	$xhjbox1.on('initChart', function() {
		$xhjbox1.find('.chartTitle').html('工业互联网大数据');
		//	刺绣行业经济指数
		var $xhjBox1Chart1 = $('#xhjbox1chart1');
		var xhjBox1Chart1 = new XhjBox1Chart1($xhjBox1Chart1[0]);
		ajaxUtil.getXhj_jjzs({}, function(result) {
			$('#liChartTitle1').html('刺绣经济行业指数');
			xhjBox1Chart1.setDataProvider(result.data);
		})

		//	花样流行趋势
		var $xhjBox1Chart2 = $('#xhjbox1chart2');
		var xhjBox1Chart2 = new XhjBox1Chart2($xhjBox1Chart2[0]);
		ajaxUtil.getXhj_lxqs({}, function(result) {
			$('#liChartTitle2').html('花样流行趋势');
			xhjBox1Chart2.setDataProvider(result.data);
		})

		//	绣花机由售转租	
		$('#xhjbox1chart3li').html('<p class="liChartTitle">绣花机由售转租</p>' + '<div class="xhjbox1chart xhjbox1chart3box">' + '<div class="w100p100" id="xhjbox1chart3"></div>' + '<span class="pointbg ab_lt"></span>' + '<span class="pointbg ab_rt"></span>' + '<span class="pointbg ab_rb"></span>' + '<span class="pointbg ab_lb"></span>' + '</div>')
		var $xhjBox1Chart3 = $('#xhjbox1chart3');
		var xhjBox1Chart3 = new XhjBox1Chart3($xhjBox1Chart3[0]);
	})

	//	生产效率提升
	var $xhjBox2Chart = $('#xhjbox2chart');
	var $xhjBox2Parent = $xhjBox2Chart.parent();
	$xhjBox2Chart.parent().on('initChart', function() {
		var xhjBox2Chart = new XhjBox2Chart($xhjBox2Chart[0]);
		ajaxUtil.getXhj_xlts({}, function(result) {
			$xhjBox2Parent.find('.chartTitle').html(result.title);
			createLeftBox($xhjBox2Parent, 'box2icon.png', '生产效率', '25', '%', '100', '万针/台天', '80', 'add');
			xhjBox2Chart.setDataProvider(result.data);
		})
	})


	//	设备运营成本
	var $xhjBox3Chart = $('#xhjbox3chart');
	var $xhjBox3Parent = $xhjBox3Chart.parent();
	$xhjBox3Chart.parent().on('initChart', function() {
		var xhjBox3Chart = new XhjBox3Chart($xhjBox3Chart[0]);
		ajaxUtil.getXhj_yycb({}, function(result) {
			$xhjBox3Parent.find('.chartTitle').html(result.title);
			createLeftBox($xhjBox3Parent, 'box3icon.png', '设备运营成本', '20', '%', '150', '元/台天', '120', 'fall');
			xhjBox3Chart.setDataProvider(result.data);
		})
	})


	//	产品不良率
	var $xhjBox4Chart = $('#xhjbox4chart');
	var $xhjBox4Parent = $xhjBox4Chart.parent();
	$xhjBox4Parent.on('initChart', function() {
		var xhjBox4Chart = new XhjBox4Chart($xhjBox4Chart[0]);
		ajaxUtil.getXhj_bll({}, function(result) {
			$xhjBox4Parent.find('.chartTitle').html(result.title);
			createLeftBox($xhjBox4Parent, 'box4icon.png', '产品不良率', '20', '%', '30', '件/万件', '24', 'fall');
			xhjBox4Chart.setDataProvider(result.data);
		})
	})

	function createLeftBox($obj, img, iName, iValue, iUnit, sValue1, sUnit, sValue2, trend) {
		var str = '<div class="leftbox">' + '<div class="iconimg">' + '<img src="imgs/p3/' + img + '" alt="">' + '</div>' + '<div class="icontext">' + '<p class="i_name">' + iName + '</p>' + '<p class="i_value ' + trend + '">' + iValue + '<span>' + iUnit + '</span></p>' + '<span class="iconlight"></span>' + '</div>' + '<div class="l_details">' + '<p class="s_data clearfix">' + '<span class="s_value '+(trend=='add'?'numAnimate':'')+' fl" data-end="'+sValue1+'">' + (trend=='add'?sValue2:sValue1) + '</span>' + '<span class="s_unit fl">' + sUnit + '</span>' + '</p>' + '<span class="c_icon ' + trend + '"></span>' + '<p class="s_data clearfix">' + '<span class="s_value '+(trend=='fall'?'numAnimate':'')+' fl" data-end="'+sValue2+'">' + (trend=='fall'?sValue1:sValue2) + '</span>' + '<span class="s_unit fl">' + sUnit + '</span>' + '</p>' + '</div>' + '<span class="pointbg ab_lt"></span>' + '<span class="pointbg ab_rt"></span>' + '<span class="pointbg ab_rb"></span>' + '<span class="pointbg ab_lb"></span>' + '</div>';
		$obj.prepend(str);
		$('.numAnimate').each(function(idx,ele){
			var json = {
				value: $(ele).html()
			};
			var end = $(ele).attr('data-end');
			new TweenMax(json, 1, {
				value: end,
				ease: Linear.easeNone,
				delay:0.5,
				onUpdate: function() {
					$(ele).html(Math.round(json.value));
				}
			})
		})
	}
	initAnimation();
})();