this.WBST = this.WBST || {};
(function(win,doc){
	function Controller (){
		var baseUrl = '';
		var hostUrl = 'http://' + win.location.host+'/2-2screen/rootCloud/debug/';
		var api = {

			/*  ----------------------------- 智能服务 ------------------------------------  */
			znfw_6box: hostUrl+'znfw_6box.json',		// 	6边形
			znfw_gzl: hostUrl+'znfw_gzl.json', 			//	故障率
			znfw_gzl_act: hostUrl+'znfw_gzl_act.json', 	//	故障率降低举措

			znfw_hsbl: hostUrl+'znfw_hsbl.json', 			//	回收比例
			znfw_hsbl_act: hostUrl+'znfw_hsbl_act.json', 	//	旧件回收比例提高举措

			znfw_kyl: hostUrl+'znfw_kyl.json', 			//	常用备件可用率
			znfw_kyl_act: hostUrl+'znfw_kyl_act.json', 	//	提高备件可用率举措

			znfw_xfl: hostUrl+'znfw_xfl.json', 			//	一次性修复率
			znfw_xfl_act: hostUrl+'znfw_xfl_act.json', 	//	一次性修复率提高举措

			znfw_xysj: hostUrl+'znfw_xysj.json', 			//	工程师响应时间
			znfw_xysj_act: hostUrl+'znfw_xysj_act.json', 	//	高效响应举措

			/*  ----------------------------- 延长保修 ------------------------------------  */

			ycbx_xzsb: hostUrl+'ycbx_xzsb.json', 			//	选择设备
			ycbx_sbdcgs: hostUrl+'ycbx_sbdcgs.json', 		//	设备档次归属
			ycbx_xzbxcp: hostUrl+'ycbx_xzbxcp.json', 		//	选择保修产品
			ycbx_bjjs: hostUrl+'ycbx_bjjs.json', 			//	报价计算

			/*  ----------------------------- 绣花机工况 ------------------------------------  */

			xhj_dkbfb: hostUrl+'xhj_dkbfb.json', 			//	打卡百分比
			xhj_fll: hostUrl+'xhj_fll.json', 				//	废料率
			xhj_jf: hostUrl+'xhj_jf.json', 				//	降费举措
			xhj_jjq: hostUrl+'xhj_jjq.json', 				//	降交期举措
			xhj_kgl: hostUrl+'xhj_kgl.json', 				//	开工率对比
			xhj_sjbd: hostUrl+'xhj_sjbd.json',				//	售价波动

			/*  ----------------------------- 研发辅助 ------------------------------------  */

			yffz_sdt: hostUrl+'yffz_sdt.json', 			//	散点图
			yffz_fhqxt: hostUrl+'yffz_fhqxt.json', 		//	负荷曲线图  特定设备
			yffz_czrtjt: hostUrl+'yffz_czrtjt.json', 		//	超载日统计图
			yffz_sbfhqxt: hostUrl+'yffz_sbfhqxt.json'	 	//	设备负荷曲线图
		}

		// 异步请求方法
		var requestAsk = function(opt){
			$.ajax({
				type: opt.type || "GET",
				data: opt.data || {},
				url: baseUrl + opt.url,
				success: function(json) {
					if (opt.callback instanceof Function)
						opt.callback(json);
				},
				error: function() {
					throw new Error(baseUrl + opt.url + " 接口");
				}
			})
		}

		//	============================== 接口请求函数 ====================================

		/*  ----------------------------- 智能服务 ------------------------------------  */
		this.getZnfw_6box = function(data, callback) {
			requestAsk({
				url: api.znfw_6box,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_gzl = function(data, callback) {
			requestAsk({
				url: api.znfw_gzl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_gzl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_gzl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_hsbl = function(data, callback) {
			requestAsk({
				url: api.znfw_hsbl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_hsbl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_hsbl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_kyl = function(data, callback) {
			requestAsk({
				url: api.znfw_kyl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_kyl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_kyl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xfl = function(data, callback) {
			requestAsk({
				url: api.znfw_xfl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xfl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_xfl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xysj = function(data, callback) {
			requestAsk({
				url: api.znfw_xysj,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xysj_act = function(data, callback) {
			requestAsk({
				url: api.znfw_xysj_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 延长保修 ------------------------------------  */

		this.getYcbx_xzsb = function(data, callback) {
			requestAsk({
				url: api.ycbx_xzsb,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_sbdcgs = function(data, callback) {
			requestAsk({
				url: api.ycbx_sbdcgs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_xzbxcp = function(data, callback) {
			requestAsk({
				url: api.ycbx_xzbxcp,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_bjjs = function(data, callback) {
			requestAsk({
				url: api.ycbx_bjjs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 绣花机工况 ------------------------------------  */

		this.getXhj_dkbfb = function(data, callback) {
			requestAsk({
				url: api.xhj_dkbfb,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_fll = function(data, callback) {
			requestAsk({
				url: api.xhj_fll,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_jf = function(data, callback) {
			requestAsk({
				url: api.xhj_jf,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_jjq = function(data, callback) {
			requestAsk({
				url: api.xhj_jjq,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_kgl = function(data, callback) {
			requestAsk({
				url: api.xhj_kgl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_sjbd = function(data, callback) {
			requestAsk({
				url: api.xhj_sjbd,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 研发辅助 ------------------------------------  */

		this.getYffz_sdt = function(data, callback) {
			requestAsk({
				url: api.yffz_sdt,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_fhqxt = function(data, callback) {
			requestAsk({
				url: api.yffz_fhqxt,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_czrtjt = function(data, callback) {
			requestAsk({
				url: api.yffz_czrtjt,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_sbfhqxt = function(data, callback) {
			requestAsk({
				url: api.yffz_sbfhqxt,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};
	}

	WBST.Controller = Controller;
})(window,document)