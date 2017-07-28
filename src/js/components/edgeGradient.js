var EdgeGradient = function(opt) {
	var borderAry = [];
	var cloneData;

	function init() {
		if (!opt.imageData || !opt.width || !opt.height) {
			throw new Error("参数传入错误!");
			return false;
		}
		// console.log(opt.imageData)

		opt.GradientW = opt.GradientW || 20;
		opt.borderW = 0;
		opt.color = opt.color || [255, 255, 255];

		getEdge();
	};

	//	边界获取
	function getEdge() {
		var data = opt.imageData;
		var startA = 0;
		for (var i = 0; i < opt.height; i++) {
			for (var j = 0; j < opt.width; j++) {
				if (data[(i * opt.width + j) * 4 + 3] != 0) {
					var isOut = false;
					for (var z = 0; z < 2 * Math.PI; z += Math.PI / 8) {
						var x = Math.round(opt.GradientW * Math.cos(z + startA));
						var y = Math.round(opt.GradientW * Math.sin(z + startA));
						if (data[((i + y) * opt.width + (j + x)) * 4 + 3] == 0) {
							startA += z;
							isOut = true;
							break;
						}
					}

					if (isOut) {
						colorAdd(data, i, j);
						borderAry.push({
							x: i,
							y: j
						});
					} else if (data[(i * opt.width + j) * 4] != 4 && data[(i * opt.width + j) * 4 + 1] != 32 && data[(i * opt.width + j) * 4 + 2] != 78) {
						data[(i * opt.width + j) * 4] = 16;
						data[(i * opt.width + j) * 4 + 1] = 68;
						data[(i * opt.width + j) * 4 + 2] = 130;
						// data[(i*opt.width+j)*4+3] = 17;
					}
				}

			}
		}

		// cloneData = opt.imageData.subarray(0);
		// for (var i = 0; i < borderAry.length; i++) {
		// 	GaussBlur(opt.imageData, borderAry[i]);
		// }
	};

	//	渐变色添加
	function colorAdd(data, i, j) {
		var r = opt.GradientW;
		for (var a = 0; a < opt.GradientW - opt.borderW; a++) {
			r = opt.GradientW - a;
			var isOut = false;
			for (var b = 0; b < 2 * Math.PI; b += Math.PI / 24) {
				var x = Math.round(r * Math.cos(b));
				var y = Math.round(r * Math.sin(b));
				if (data[((i + y) * opt.width + (j + x)) * 4 + 3] == 0) {
					isOut = true;
					break;
				}
			}

			if (!isOut) {
				data[(i * opt.width + j) * 4] = mix(opt.color[0], data[(i * opt.width + j) * 4], 1 - (r / opt.GradientW - 1) * (r / opt.GradientW - 1));
				data[(i * opt.width + j) * 4 + 1] = mix(opt.color[1], data[(i * opt.width + j) * 4 + 1], 1 - (r / opt.GradientW - 1) * (r / opt.GradientW - 1));
				data[(i * opt.width + j) * 4 + 2] = mix(opt.color[2], data[(i * opt.width + j) * 4 + 2], 1 - (r / opt.GradientW - 1) * (r / opt.GradientW - 1));
				// data[(i*opt.width+j)*4 + 3] = 255;
				// console.log((i*opt.width+j)*4 + 3)
				break;
			}
		}
	};

	//	高斯模糊处理
	function GaussBlur(Data, ary) {
		var rgb = [0, 0, 0];
		// var GaussAry = [
		// 	[0.014418818362460818, 0.028084023356349165, 0.035072700805593486, 0.028084023356349165, 0.014418818362460818],
		// 	[0.028084023356349165, 0.054700208300935874, 0.06831229327078019, 0.054700208300935874, 0.028084023356349165],
		// 	[0.035072700805593486, 0.06831229327078019, 0.08531173019012506, 0.06831229327078019, 0.035072700805593486],
		// 	[0.028084023356349165, 0.054700208300935874, 0.06831229327078019, 0.054700208300935874, 0.028084023356349165],
		// 	[0.014418818362460818, 0.028084023356349165, 0.035072700805593486, 0.028084023356349165, 0.014418818362460818]
		// ];
		var GaussAry = [[0.001341965359843281,0.004076530817923619,0.007939997843478291,0.009915857326703659,0.007939997843478291,0.004076530817923619,0.001341965359843281],[0.004076530817923619,0.012383407207635911,0.024119583762554287,0.03012171490265726,0.024119583762554287,0.012383407207635911,0.004076530817923619],[0.007939997843478291,0.024119583762554287,0.04697853435039661,0.05866908949084948,0.04697853435039661,0.024119583762554287,0.007939997843478291],[0.009915857326703659,0.03012171490265726,0.05866908949084948,0.07326882605600585,0.05866908949084948,0.03012171490265726,0.009915857326703659],[0.007939997843478291,0.024119583762554287,0.04697853435039661,0.05866908949084948,0.04697853435039661,0.024119583762554287,0.007939997843478291],[0.004076530817923619,0.012383407207635911,0.024119583762554287,0.03012171490265726,0.024119583762554287,0.012383407207635911,0.004076530817923619],[0.001341965359843281,0.004076530817923619,0.007939997843478291,0.009915857326703659,0.007939997843478291,0.004076530817923619,0.001341965359843281]];

		for (var i = 0; i < GaussAry.length; i++) {
			for (var j = 0; j < GaussAry[i].length; j++) {
				var x = i - 2,
					y = j - 2;
				if (cloneData[((ary.x + x) * opt.width + (ary.y + y)) * 4 + 3] != 0) {
					rgb[0] += cloneData[((ary.x + x) * opt.width + (ary.y + y)) * 4] * GaussAry[i][j];
					rgb[1] += cloneData[((ary.x + x) * opt.width + (ary.y + y)) * 4 + 1] * GaussAry[i][j];
					rgb[2] += cloneData[((ary.x + x) * opt.width + (ary.y + y)) * 4 + 2] * GaussAry[i][j];
				}
			}
		}

		Data[(ary.x * opt.width + ary.y) * 4] = rgb[0];
		Data[(ary.x * opt.width + ary.y) * 4 + 1] = rgb[1];
		Data[(ary.x * opt.width + ary.y) * 4 + 2] = rgb[2];
	};

	function mix(a, b, t) {
		if (t < 0)
			t = 0;
		return Math.round(b * t + (1 - t) * a);
	};

	init();
};
module.exports = EdgeGradient;