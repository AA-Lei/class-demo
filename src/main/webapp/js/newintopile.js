//@ sourceURL=js/newintopile.js
// 上面的代码 后面路径写js文件的路径 保证浏览器在调试时 可以加载到该js页面
var vm = new Vue({
	el: "#intopile",  // 确定视图层对象
	data: {
		type: 1,
		list: [],
		pageInfo:{},
		bicycleIds: [],  // 保存选中的车辆的id
		pileIds:[],  // 保存选中的车桩的id
		bicycleStation: {}, //保存车点的查询条件
		stationList:[],
		stationPageInfo:{},
		pileList:[],
		errorInfo:""
	},
	methods: {
		// 分页查询订单数据
		goPage: function(pageNum){
			// get请求的请求参数
			var data = {
					params: {
						pageNum : pageNum
					}
			};
			
			this.$http.get("intopile/bicycleList",data).then(
				(resp) => {
					this.list = resp.body.list;
					this.pageInfo = resp.body;
				},
				(resp) => {
					console.error(resp);
				}
				
			);
			
		},
		
		showStations: function(pageNum){
			this.bicycleStation.pageNum = pageNum;
			
			// get请求的请求参数
			var data = {
					params: this.bicycleStation
			};
			
			this.$http.get("intopile/stationList",data).then(
				(resp) => {
					this.stationList = resp.body.list;
					this.stationPageInfo = resp.body;
				},
				(resp) => {
					console.error(resp);
				}
				
			);
		},
		
		showPiles : function(stationId){
			// get请求的请求参数
			var data = {
					params: {
						stationId : stationId
					}
			};
			
			this.$http.get("intopile/pileList",data).then(
				(resp) => {
					this.pileList = resp.body;
				},
				(resp) => {
					console.error(resp);
				}
				
			);
			
		},
		
		
		sureInpile : function(){
			if(confirm("确定要入桩吗 ？")){
				var params = {
						pileIds: this.pileIds,
						bicycleIds: this.bicycleIds
				};
				
				this.$http.post("intopile/intopile",params,{emulateJSON:true}).then(
					(resp) => {
						//关闭弹窗
						$("#pileList,#stationList").modal('hide');
						if(resp.body == "success"){
							this.type = 2;
							this.bicycleIds = [];
							this.pileIds = [];
							this.goPage(1); // 刷新页面
						}else{
							this.type = 3;
							this.errorInfo = resp.body;
						}
						// 5s后隐藏提示层内容
						setTimeout('vm.type = 1',5000);
					}
					
				
				);
//				
//				this.$http.post("intopile/intopile2",params).then(
//						
//						
//				);
//				
				
			}
			
		}
		
	}
});


// 请求第一页数据
vm.goPage(1);



