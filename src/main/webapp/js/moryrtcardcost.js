var vm = new Vue({
	el: "#moryrtcardcost",
	data: {
		params: { //查询条件
			starttime: '',
			endtime:''
		},
		month:{
			startmonth:'',
			endmonth:''
		},
		year:{
			startyear:'',
			endyear:''
		},
		order: {}, //保存查看详情的信息
		cardPage: { //分页数据
			list: [], //所有卡的集合
			pageNum: 0, //当前页
			pages: 0, //总页数
			hasPreviousPage: false, //是否有前一页
			hasNextPage: false //是否有下一页
		},
		page: 0,
		cardStatistics: {}, //保存该卡的统计信息
		cardRecordPage: { //保存该卡所有费用流水
			list: [], //所有卡流水的集合
			pageNum: 0, //当前页
			pages: 0, //总页数
			hasPreviousPage: false, //是否有前一页
			hasNextPage: false //是否有下一页
		},
		cardId: 0,
		cardCost: {} //保存所有卡实时统计信息
	},
	methods: {
		//获得卡信息（所有数据和分页）
		queryPage: function(p) {
			this.page = p;
			var map = {};
			map.card = JSON.stringify(this.params);
			map.page = this.page;
			this.$http.post("../main/card/getAllCard", JSON.stringify(map)).then(
				(resp) => {
					this.cardPage = resp.body;
				}
			);

		},
		//通过卡id获得卡信息（查看详情）
		openDetail: function(cardId) {
			this.$http.get("../main/card/getCardBycardId/" + cardId).then(
				(resp) => {
					this.order = resp.body;
				}
			);

		},
		//添加卡
		addNewCard: function() {
			this.newcard.status = 0;
			var time = new Date();
			this.newcard.cardId = (time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth()) + "" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + "" + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + "" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + "" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds());
			if(this.newcard.cardType == 1) {
				this.newcard.cardCode = this.newcard.idcard;
			} else {
				this.newcard.cardCode = time.getFullYear() + "" + (time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth()) + "" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + "" + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + "" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + "" + (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds());
			}
			this.$http.post("../main/card/addcard", JSON.stringify(this.newcard)).then(
				(resp) => {
					var result = resp.bodyText;
					if(result == "success") {
						this.newcard.cardType = 1;
						this.newcard.name = '';
						this.newcard.idcard = '';
						this.newcard.sex = '';
						this.newcard.telphone = '';
						this.newcard.mobile = '';
						this.newcard.email = '';
						this.newcard.address = '';
						this.newcard.work = '';
						alert("办卡成功！");
					} else {
						alert(result);
					}
				}
			);
		},
		//获得该卡统计的数据
		getsStatistics: function(cardId) {
			this.$http.get("../main/card/getsStatistics/" + cardId).then(
				(resp) => {
					this.cardStatistics = resp.body;
				}
			);

		},
		//获得该卡费用流水的数据
		getcardRecordBycardId: function(p, cardId) {
			if(cardId != 0) {
				this.cardId = cardId;
			}
			var map = {};
			map.cardId = this.cardId;
			map.page = p;
			this.$http.post("../main/card/getcardRecordBycardId", JSON.stringify(map)).then(
				(resp) => {
					this.cardRecordPage = resp.body;
				}
			);

		},
		//获得所有卡统计
		getrtcardcost: function(id) {
			var map={};
			if(id==1){//月度查询
				map.starttime = this.month.startmonth;
				map.endtime = this.month.endmonth;
			}else if(id==2){//年度查询
				map.starttime = this.year.startyear;
				map.endtime = this.year.endyear;
			}
			alert(document.getElementById("startDate").value);
			this.$http.post("../main/card/getcardCostBytime", JSON.stringify(map)).then(
				(resp) => {
					this.cardCost = resp.body;
				}
			);

		}

	},
	mounted: function() {
		//页面一加载就调用方法，获取所有卡的数据
		this.queryPage(1);
	}
});