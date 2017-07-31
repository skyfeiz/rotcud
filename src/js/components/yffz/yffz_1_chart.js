function ScatterChart(dom) {
	this._dom = dom;
	this._colorArray = ['rgba(67, 207, 110, 1)', 'rgba(183, 57, 65, 1)', 'rgba(90, 142, 207, 1)', 'rgba(222, 160, 39, 1)', 'rgba(0, 220, 255, 1)', 'rgba(41, 139, 237, 1)'];
	this._borderColorArray = ['rgba(67, 207, 110, 0.1)', 'rgba(183, 57, 65, 0.1)', 'rgba(90, 142, 207, 0.1)', 'rgba(222, 160, 39, 0.1)', 'rgba(0, 220, 255, 0.1)', 'rgba(41, 139, 237, 0.1)'];

	this._scatterChart = echarts.init(this._dom);

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			left: '13.5%',
			top: '20%',
			width: '73.5%',
			height: '65%'
		},
	    legend: {
	    	top: '25',
	        x: 'center',
	        data:[],
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 13,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 50,
	        selectedMode: false
	    },
	    xAxis: {
	    	name: '(模块负载率)',
	    	nameTextStyle: {
	    		color: '#50a7bd',
	    		fontSize: 13
	    	},
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	axisTick: {
	    		lineStyle: {
	    			color: '#cee1ff',
	    			width: 3
	    		},
	    		length: 3
	    	},
	    	axisLabel: {
	    		textStyle: {
	    			color: '#50a7bd',
	    			fontSize: 15,
	    			fontFamily: 'DIN MEDIUM'
	    		}
	    	},
	    	splitLine: {
	    		show: false
	    	}
	    },
	    yAxis: {
	    	name: '(次/每年)',
	    	nameTextStyle: {
	    		color: '#50a7bd',
	    		fontSize: 13
	    	},
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	axisTick: {
	    		lineStyle: {
	    			color: '#cee1ff',
	    			width: 3
	    		},
	    		length: 3
	    	},
	    	axisLabel: {
	    		textStyle: {
	    			color: '#50a7bd',
	    			fontSize: 15,
	    			fontFamily: 'DIN MEDIUM'
	    		}
	    	},
	    	splitLine: {
	    		show: false
	    	},
	    	splitArea:{
	    		show:true,
	    		areaStyle:{
	    			color:'rgba(72,118,175,0.1)'
	    		}
	    	}
	    },
	    series: [],
	    graphic: [{
            type: 'group',
            bounding: 'raw',
            right: '30%',
            top: '21%',
            z: 100,
            children: [{
	            	type: 'image',
	            	left: 'center',
	                top: -50,
	            	style: {
	            		image: './imgs/p4/leadTop.png'
	            	}
	            }, {
	            	type: 'text',
                    left: 0,
                    top: -75,
                    z: 100,
                    style: {
                        fill: '#fff',
                        text: '重点设计改进',
                        font: '18px Microsoft YaHei',
                        shadowBlur: 10,
                        shadowColor: '#3197d9'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            left: '30%',
            top: '21%',
            z: 100,
            children: [{
	            	type: 'image',
	            	left: 'center',
	                top: -50,
	            	style: {
	            		image: './imgs/p4/leadTop.png'
	            	}
	            }, {
	            	type: 'text',
                    left: -20,
                    top: -75,
                    z: 100,
                    style: {
                        fill: '#fff',
                        text: '修改设计/供应商替换',
                        font: '18px Microsoft YaHei',
                        shadowBlur: 10,
                        shadowColor: '#3197d9'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            left: '25%',
            bottom: '11%',
            z: 100,
            children: [{
	            	type: 'image',
	            	left: 'center',
	                top: -50,
	            	style: {
	            		image: './imgs/p4/leadBottom.png'
	            	}
	            }, {
	            	type: 'text',
                    left: -30,
                    bottom: -25,
                    z: 100,
                    style: {
                        fill: '#fff',
                        text: '降本设计',
                        font: '18px Microsoft YaHei',
                        shadowBlur: 10,
                        shadowColor: '#3197d9'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '30%',
            bottom: '11%',
            z: 100,
            children: [{
	            	type: 'image',
	            	left: 'center',
	                top: -50,
	            	style: {
	            		image: './imgs/p4/leadBottom.png'
	            	}
	            }, {
	            	type: 'text',
                    left: -30,
                    bottom: -25,
                    z: 100,
                    style: {
                        fill: '#fff',
                        text: '保持设计',
                        font: '18px Microsoft YaHei',
                        shadowBlur: 10,
                        shadowColor: '#3197d9'
                    }
	            }
            ]
        }]
	};

	// this._scatterChart.setOption(this._option);
}

ScatterChart.prototype = {
	constructor: ScatterChart,

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

	creationContent: function() {
		var current = this;
		if (current._config == null || current._dataProvider == null) return;

		// 统计数据中的最大半径值，为了下面设置borderWidth时使用
		var maxR = 0;
		current._dataProvider.map(function(item) {
			maxR = maxR > item[current._config.rField] ? maxR : item[current._config.rField];
		});

		var legendArr = [];
		var seriesArr = [];
		current._dataProvider.map(function(item, index) {
			var name = item[current._config.nameField];
			var xNum = item[current._config.xField];
			var yNum = item[current._config.yField];
			var rNum = item[current._config.rField];

			var legendItem = {name: name, icon: 'circle'};
			legendArr.push(legendItem);

			var colorIndex = index % current._colorArray.length;
			var borderWidth = 60 * rNum / maxR;
			
			var seriesItem = {
				data: [[xNum, yNum, rNum, name]],
				type: 'effectScatter',
				name: name,
				symbolSize: function(params) {
					return params[2] / 3.5;
				},

				markLine: {
					data: [[{coord: [xNum, 0]}, {coord: [xNum, yNum]}], [{coord: [0, yNum]}, {coord: [xNum, yNum]}]],
					symbolSize: 0,
					silent: true
				},

				itemStyle: {
					normal: {
						color: current._colorArray[colorIndex],
						borderColor: current._borderColorArray[colorIndex],
						borderWidth: borderWidth,
						shadowBlur: 10,
						shadowColor: current._colorArray[colorIndex]
					}
				}
			};

			seriesArr.push(seriesItem);
		});

		seriesArr.push({
			type: 'scatter',
			markLine: {
				data: [[{
					x: '15%',
					y: '50%'
				}, {
					x: '85%',
					y: '50%'
				}], [{
					x: '50%',
					y: '88%'
				}, {
					x: '50%',
					y: '18%'
				}]],
				symbolSize: 0,
				silent: true,
				lineStyle: {
					normal: {
						color: '#146077',
						type: 'solid'
					}
				}
			}
		});

		current._option.legend.data = legendArr;

		current._option.series = seriesArr;
		current._scatterChart.setOption(current._option);
	},

	resize: function() {

	},

	dispose: function() {

	}
}

module.exports = ScatterChart;