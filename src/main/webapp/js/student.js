var vm = new Vue({
	el:"#student",
	data:{
		curricula:{
			list:{}
		},
		curriculaId:0,
		classList:{
			list:{}
		}
	},
	methods:{
		choiceclass:function(){
			this.$http.post("../class/getAllClass").then(
				(resp)=>{
					this.classList.list = resp.body;
				}
			);
		},
		addcv:function(){
			this.$http.post("../class/getAllClass",JSON.stringify(this.curriculaId)).then(
				(resp)=>{
					var result = resp.bodyTest;
					alert("result");
				}
			);
		}
	},
	mounted:function(){
			this.$http.post("../curricula/getStudentClass").then(
				(resp)=>{
					this.curricula.list = resp.body;
				}
			);
		}
});

