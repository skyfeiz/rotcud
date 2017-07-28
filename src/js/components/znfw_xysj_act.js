function ZnfwXysjAct(dom) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;
	this._centerX = this._domW / 2;
	this._centerY = this._domH / 2;
	this._outR = this._domW > this._domH ? this._domH * 0.7 : this._domW * 0.7;
	this._outR = this._outR / 2 + 50;


	var current = this;
	current._pieChart = echarts.init(current._dom);
	// 颜色序列
	current._colorArray = ['#00dcff', '#7eb2e6', '#ffffff'];

	current._option = {
	    // tooltip: {
	    //     trigger: 'item',
	    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
	    // },
	    graphic: [{
	    	type: 'ring',
            bounding: 'raw',
            left: 'center',
            top: 'center',
            shape: {
            	cx: current._centerX,
            	cy: current._centerY,
            	r: current._outR - 35,
            	r0: current._outR - 60
            },
            style: {
            	fill: 'rgba(73, 112, 164, 0.2)'
            }
	    }],
	    legend: {
	        x: 'center',
	        data:[],
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 26,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 50,
	        selectedMode: false
	    },
	    series: [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius: ['50%', '70%'],
	            selectedMode: 'single',
	            selectedOffset: 0,
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    textStyle: {
	                    	color: 'rgba(0,0,0,0)'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    length: 50,
	                    length2: 50,
	                    lineStyle: {
	                    	type: 'dotted'
	                    }
	                }
	            },
	            itemStyle: {
	            	normal: {
	            		color: function(params) {
	            			return current._colorArray[params.dataIndex % current._colorArray.length];
	            		}
	            	}
	            },
	            data:[]
	        }
	    ]
	};
}

ZnfwXysjAct.prototype = {
	constructor: ZnfwXysjAct,

	init: function() {

	},

	setConfig: function(value) {
		if (value == null) return;
		this._config = value;

		this.creationContent();
	},

	setDataProvider: function(value) {
		if (value == null || value.length == 0) return;
		this._dataProvider = value;

		this.creationContent();
	},

	creationContent() {
		var current = this;
		if (current._config == null || current._dataProvider == null) return;

		var sum = 0;
		current._dataProvider.map(function(item) {
			sum += Number(item[current._config.valueField]);
		});

		var legendArr = [];

		var startAngle = -90;
		current._dataProvider.map(function(item, index) {
			var num = Number(item[current._config.valueField]);
			var angle = 360 * num / sum;
			var middleAngle = startAngle + angle / 2;

			var x = current._centerX + current._outR * Math.cos(middleAngle * Math.PI / 180);
			var y = current._centerY + current._outR * Math.sin(middleAngle * Math.PI / 180);

			var text = item[current._config.nameField];
			num = num.toFixed(1);
			if (middleAngle < 90 || middleAngle > 270) {
				var textX = 20;
				x += 50;
			} else {
				textX = -170;
				x -= 50;
			}

			startAngle += angle;

			var color = current._colorArray[index % current._colorArray.length];

			// 生成labelLine末端的发光点和显示文本
			var element = {
	            type: 'group',
	            bounding: 'raw',
	            left: x,
	            top: y,
	            children: [
	                {
	                    type: 'rect',
	                    left: 'center',
	                    top: 'center',
	                    shape: {
	                        width: 3,
	                        height: 3
	                    },
	                    style: {
	                        fill: color
	                    }
	                },
	                {
	                    type: 'text',
	                    left: textX,	
	                    top: 'center',
	                    z: 100,
	                    style: {
	                        fill: '#66ffff',
	                        text: num + '%',
	                        font: '50px Microsoft YaHei'
	                    }
	                },
	                {
	                    type: 'text',
	                    left: textX,
	                    top: 30,
	                    z: 100,
	                    style: {
	                        fill: '#50a7bd',
	                        text: text,
	                        font: '30px Microsoft YaHei'
	                    }
	                }
	            ]
	        };
	        current._option.graphic.push(element);

	        // 生成图例
	        var legendItem = {name: item[current._config.nameField], icon: 'rect'};
	        legendArr.push(legendItem);
		});

		current._option.legend.data = legendArr;

		var seriesItem = current._option.series[0];
		seriesItem.data = current._dataProvider;
		current._pieChart.setOption(current._option);

		// 如需选中交互，可以通过以下代码实现
		// current._pieChart.on('pieselectchanged', function(params) {
		// 	console.log(params);
		// });

		// current._pieChart.dispatchAction({
	 //        type: 'highlight',
	 //        seriesIndex: 0,
	 //        dataIndex: 1
	 //    });
	},

	resize: function() {

	},

	dispose: function() {

	}
}

module.exports = ZnfwXysjAct;