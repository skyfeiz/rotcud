var bars = function(dom, opt) {
	if (dom == undefined) {
		console.error("Need a Container!");
		return false;
	}

	var dom1 = $(dom).clone()[0];
	$(dom).before($(dom1));

	this._privateVars = {
		myEcharts: echarts.init(dom, "", opt ? {
			width: opt.width || 442,
			height: opt.height || 322
		} : {}),
		myEcharts2: echarts.init(dom1, "", opt ? {
			width: opt.width || 442,
			height: opt.height || 322
		} : {}),
		type: opt.type || 1
	};
};

var p = bars.prototype;

p.setConfig = function(config) {
	this._privateVars.configData = config;

	if (this._privateVars.data)
		this.createContent();
};

p.setDataProvider = function(data) {
	this._privateVars.data = data;

	if (this._privateVars.configData)
		this.createContent();
};

p.createContent = function() {

	this._privateVars.data1 = [];
	this._privateVars.data2 = [];
	this._privateVars.bottomData = [];
	this._privateVars.bgData = [];
	this._privateVars.textData = [];

	var data = this._privateVars.data[this._privateVars.configData["value"]];

	var sum = 0;
	for (var i = 0; i < data.length - 1; i++) {
		this._privateVars.data1.push(data[i]);
		this._privateVars.data2.push(0);
		this._privateVars.bottomData.push(sum);
		sum += data[i];
		this._privateVars.bgData[i] = 1;
		this._privateVars.textData.push(sum);
	}

	this._privateVars.bgData.push(1);

	if (this._privateVars.type == 2) {
		this._privateVars.sum = data[data.length - 1];
		this._privateVars.data1.push(0);
		this._privateVars.data2.push(data[data.length - 1]);
		this._privateVars.bottomData.push(0);
		this._privateVars.textData.push(sum);
	} else {
		this._privateVars.data2.push(0);
		this._privateVars.data1.push(data[data.length - 1]);
		this._privateVars.bottomData.push(sum);
		this._privateVars.sum = sum + data[data.length - 1];
		this._privateVars.textData.push(sum + data[data.length - 1]);
	}


	// console.log(this._privateVars.data1)
	// console.log(this._privateVars.data2)
	console.log(this._privateVars.bgData)

	this.createContent1();
	this.createContent2();
};

p.createContent1 = function() {
	var cur = this;

	var option = {
		// animation: false,
		grid: {
			top: "15%",
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		legend: {
			show: !!(this._privateVars.type == 2),
			itemWidth: 20,
			itemHeight: 8,
			textStyle: {
				color: "#50a7bd"
			},
			data: this._privateVars.type == 2 ? [{
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][0]
			}, {
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][1]
			}] : [{
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][0]
			}]
		},
		xAxis: {
			type: 'category',
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#00dcff"
				}
			},
			axisLabel: {
				textStyle: {
					color: "#50a7bd"
				},
				interval: 0
			},
			axisTick: {
				length: 2,
				lineStyle: {
					color: "#c7daf7",
					width: 2
				}
			},
			data: this._privateVars.data[this._privateVars.configData["label"]]
		},
		yAxis: {
			type: 'value',
			name: "(%)        ",
			nameTextStyle: {
				color: "#50a7bd"
			},
			nameGap: 12,
			splitNumber: 3,
			max: Math.round(this._privateVars.sum * 1.1),
			axisLine: {
				lineStyle: {
					color: "#00dcff"
				}
			},
			axisLabel: {
				textStyle: {
					color: "#50a7bd"
				}
			},
			axisTick: {
				length: 2,
				lineStyle: {
					color: "#c7daf7",
					width: 2
				}
			},
			splitLine: {
				lineStyle: {
					color: "rgba(0,220,255,0.2)"
				}
			}
		},
		series: [{
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				},
				emphasis: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				}
			},
			data: this._privateVars.bottomData
		}, {
			name: this._privateVars.data[this._privateVars.configData["legend"]][0],
			type: 'bar',
			stack: '总量',
			barWidth: 46,
			label: {
				normal: {
					show: false,
					position: 'inside'
				}
			},
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(4,111,132,0.6)',
					color: '#00dcff'
				}
			},
			data: this._privateVars.data1
				// {value: 2900, itemStyle: { normal: {color: "#7eb2e6"} }}
		}, {
			name: this._privateVars.data[this._privateVars.configData["legend"]][1],
			type: 'bar',
			stack: '总量',
			barWidth: 46,
			label: {
				normal: {
					show: false,
					position: 'inside'
				}
			},
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(4,111,132,0.6)',
					color: '#7eb2e6'
				}
			},
			data: this._privateVars.data2
		}, {
			data: this._privateVars.textData,
			type: 'scatter',
			symbol: 'image://imgs/barLabelBG.png',
			symbolSize: [34, 19],
			label: {
				normal: {
					show: true,
					fontSize: 14,
					offset: [0, -5],
					textStyle: {
						color: "#0f1535"
					},
					formatter: function(p) {
						return (p.value - cur._privateVars.bottomData[p.dataIndex]) + "%";
					}
				}
			},
			symbolOffset: [0, -12]
		}]
	};

	this._privateVars.myEcharts.setOption(option, true);
};

p.createContent2 = function() {
	var option = {
		grid: {
			top: "15%",
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			show: false,
			data: this._privateVars.data[this._privateVars.configData["label"]]
		},
		yAxis: {
			type: 'value',
			// max: Math.round(this._privateVars.sum*1.2),
			show: false
		},
		series: [{
			name: '背景',
			type: 'bar',
			barWidth: 57,
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(90,142,207,0.15)',
					color: 'rgba(90,142,207,0.15)'
				},
				emphasis: {
					barBorderColor: 'rgba(90,142,207,0.15)',
					color: 'rgba(90,142,207,0.15)'
				}
			},
			data: this._privateVars.bgData
		}]
	};

	this._privateVars.myEcharts2.setOption(option, true);
};

module.exports = bars;