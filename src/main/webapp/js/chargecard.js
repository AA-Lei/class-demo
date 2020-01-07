var vm = new Vue({
	el:"#chargecard",
	data:{
		params:{//查询条件
			cardCode:'',
			idCard:''
		},
		order:{},//保存查看详情的信息
		cardPage:{//分页数据
			list:[],//所有卡的集合
			pageNum:0,//当前页
			pages:0,//总页数
			hasPreviousPage:false,//是否有前一页
			hasNextPage:false//是否有下一页
		},
		page:0,
		newcard:{},
		monthlyMoney:0,
		walletMoney:0
	},
	methods:{
		//获得卡信息（所有数据和分页）
		queryPage:function(p){
			this.page = p;
			var map = {};
			map.card=JSON.stringify(this.params);
			map.page = this.page;
			this.$http.post("../main/card/getAllCard",JSON.stringify(map)).then(
				(resp)=>{
					this.cardPage = resp.body;
				}
			);
			
		},
		//通过卡id获得卡信息（查看详情）
		openDetail:function(cardId){
			this.$http.get("../main/card/getCardBycardId/"+cardId).then(
					(resp) => {
						this.order = resp.body;
					}
			);
			
		},
		//添加卡
		addNewCard:function(){
			this.newcard.status=0;
			var time = new Date();
			this.newcard.cardId=(time.getMonth()<10?"0"+time.getMonth():time.getMonth())+""+(time.getDate()<10?"0"+time.getDate():time.getDate())+""+(time.getHours()<10?"0"+time.getHours():time.getHours())+""+(time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+""+(time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
			if(this.newcard.cardType==1){
				this.newcard.cardCode=this.newcard.idcard;
			}else{
				this.newcard.cardCode=time.getFullYear()+""+(time.getMonth()<10?"0"+time.getMonth():time.getMonth())+""+(time.getDate()<10?"0"+time.getDate():time.getDate())+""+(time.getHours()<10?"0"+time.getHours():time.getHours())+""+(time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes())+""+(time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
			}
			this.$http.post("../main/card/addcard",JSON.stringify(this.newcard)).then(
					(resp) => {
						var result = resp.bodyText;
						if(result=="success"){
							this.newcard.cardType=1;
							this.newcard.name='';
							this.newcard.idcard='';
							this.newcard.sex='';
							this.newcard.telphone='';
							this.newcard.mobile='';
							this.newcard.email='';
							this.newcard.address='';
							this.newcard.work='';
							alert("办卡成功！");
						}else{
							alert(result);
						}
					}
			);
		},
		//修改卡信息（提交）
		updateCard: function(){
			this.$http.post("../main/card/updateCard",JSON.stringify(this.order)).then(
					(resp) => {
						var result = resp.bodyText;
						if(result=="success"){
							alert("修改成功！");
						}else{
							alert("修改失败");
						}
					}
			);
			
		},
		//挂失
		reportLoss: function(cardId,status){
			var map = {};
			map.cardId=cardId;
			if(status==0){
				map.status=2;
			}else if(status==2){
				map.status=0;
			}else{
				alert("此卡已注销，不得操作");
				return;
			}
			var conf = "";
			if(status==0){
				conf="确定要挂失吗？";
			}else{
				conf="确定要取消挂失吗？";
			}
			if(confirm(conf)){
				this.$http.post("../main/card/reportLoss",JSON.stringify(map)).then(
					(resp) => {
						var result = resp.bodyText;
						if(result=="success"){
							if(status==0){
								alert("已挂失");
							}else{
								alert("已恢复");
							}
							this.queryPage(1);
						}else{
							alert(result);
						}
					}
			);
			}
		},
		logout:function(cardId,status){
			var map = {};
			map.cardId=cardId;
			if(status==0){
				map.status=1;
			}else if(status==2){
				map.status=1;
			}else{
				alert("此卡已注销，不得操作");
				return;
			}
			if(confirm("确定要注销吗？")){
				this.$http.post("../main/card/logout",JSON.stringify(map)).then(
					(resp) => {
						var result = resp.bodyText;
						if(result=="success"){
							alert("已注销");
							this.queryPage(1);
						}else{
							alert(result);
						}
					}
			);
			}
		},
		//js校验充值金额
		test:function(){
			var jstest = /^[1-9]+[0-9]*$/;
			if(!jstest.test(this.monthlyMoney) || !jstest.test(this.walletMoney)){
				alert("请输入正确的金额");
				this.monthlyMoney=0;
				this.walletMoney=0;
				return;
			}
			this.order.monthlyMoney=this.monthlyMoney;
			this.order.walletMoney=this.walletMoney;
		},
		//充值提交
		chargeCard:function(){
			if(!this.order.monthlyMoney>=0 || !this.order.walletMoney>=0){
				alert("充值金额不正确");
				return;
			}
			this.$http.post("../main/card/charge",JSON.stringify(this.order)).then(
					(resp) => {
						var result = resp.bodyText;
						if(result=="success"){
							alert("充值成功！");
						}else{
							alert(result);
						}
					}
			);
		}
		
	},
	mounted:function(){
			//页面一加载就调用方法，获取所有卡的数据
			this.queryPage(1);
		}
});

