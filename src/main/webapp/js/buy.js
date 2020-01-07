//@ sourceURL=js/buy.js
// 上面的代码 后面路径写js文件的路径 保证浏览器在调试时 可以加载到该js页面
var vm = new Vue({
	el: "#buy",  // 确定视图层对象
	data: {
		type: 1,
		bicycleOrder:{}, // 保存查询条件
		list: [],
		pageInfo:{},
		order: {}, // 保存查看详情对象
		addOrder: {details:[]},  // 保存新增的订单对象
		venderList: []
	},
	methods: {
		// 分页查询订单数据
		goPage: function(pageNum){
			// 给bicycleOrder对象添加pageNum的属性
			this.bicycleOrder.pageNum = pageNum;
			// get 请求的参数格式
			
			/*
			var params = {
				params:
					// 该对象中的属性和值会转换成键值发送至服务端  值必须是字符串或者数字 或者boolean
					{
						username: "lisi",
						password: "123"
					
					}
				
			};  //  =>   url?username=lisi&password=123
			
			*/
			
			this.$http.get("buy/selectOrder",{params: this.bicycleOrder}).then(
				(resp) => {
					// resp 是服务端响应的内容的对象 是一个形式参数 叫什么名字都可以的
						/*
						 * resp 对象的属性
						 * 	body 将服务端响应的数据转换成了json对象
						 *  bodyText 服务端响应的内容 字符串对象
						 *  status http请求的响应状态码 200、404、500
						 * */
					//console.log(resp);
					this.list = resp.body.list;
					this.pageInfo = resp.body;
				},
				(resp) => {
					console.error(resp);
				}
				
			);
			
		},
		
		openDetail: function(orderId){
			this.$http.get("buy/orderdetail?orderId="+orderId).then(
					(resp) => {
						this.order = resp.body;
					}
			);
			
		},
		// 点击 新增车辆购入信息 按钮
		addDiv: function(){
			// 查询供应商
			this.$http.get("buy/venderList").then(
					(resp) => {
						this.venderList = resp.body;
					}
			);
		} 
	}
});


// 请求第一页数据
vm.goPage(1);


var params = {
		orderCode:"GC0000100",
		venderId: 1,
		buyDate: "2019-10-10",
		personInCharge:"李四",
		invoiceNo:"no1992939323",
		remark: "新购车辆",
		details: [
			{
				catagoryId:1,
				batchNo: "1001",
				price: 120.6
			},
			{
				catagoryId:2,
				batchNo: "1002",
				price: 120.6
			},
			{
				catagoryId:1,
				batchNo: "1003",
				price: 125.6
			},
			{
				catagoryId:1,
				batchNo: "1004",
				price: 122.6
			}
			
		]
}
// 测试
vm.$http.post("buy/insertOrder",params).then(
		(resp) => {
			console.log(resp.bodyText);
			
		}
);

