<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=4)| &nbsp
				Col(span=16)
					Card()
						Form(ref="form",:model="form",:rules="rules",:label-width="120")
							Row(:gutter="5")
								Col(span="10",offset="2")
									Form-item(label="名称",prop="name")
										Input(v-model="form.username",placeholder="请输入名称")
									Form-item(label="权限")|{{role}}						
									Form-item(label="所属单位",prop="unit") 
										Input(v-model="form.unit",placeholder="所属单位")
									Form-item(label="联系电话",prop="mobile") 
										Input(v-model="form.mobile",placeholder="手机号码")
									Form-item(label="邮箱",prop="email") 
										Input(v-model="form.email",placeholder="请填写邮箱地址")
									Form-item(label="备注",prop="remark")
										textarea(v-model="form.introduction" style="font-size:20px; width:400px;height:70px")
						Button(style="margin-left:150px" type="primary" icon="",@click="getData()")|重置
						Button(style="margin-left:30px" type="success",icon="plus",@click="create('form')",:loading="loading")|提交
						Button(style="margin-left:30px" icon="close",@click="$router.back(-1)")|取消 
</template>

<script>
	export default{	
		data(){
			return{
				username:window.localStorage.getItem('username'),
				id:window.localStorage.getItem('id'),
				form:{
					id:'',
					nicname:'',
					sex:'保密',
					profession:'',
					authority:'',
					unit:'',
					email:'',
					mobile:'',
					introduction:'',
				},
				rules: {
					name: [{
						required: true,
						type: 'string',
						message: '请填写名称',
						trigger: 'blur'
					}],
					unit: [{
						required: false,
						type: 'string',
						message: '请填写所属单位',
						trigger: 'blur'
					}],
					mobile: [{
						required: false,
						type: 'string',
						message: '请填写正确的手机号',
						pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
						trigger: 'blur'
					}],
					email: [{
						required: false,
						type: 'string',
						message: '请填写正确的email',
						pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
						trigger: 'blur'
					}],
				},
				list:[],
				userList:{
					username:window.localStorage.getItem('username'),
				},
				query:{
					id:window.localStorage.getItem('id'),
					name:'',
				},
				ladList:[],
				ladder:{
					name:'',
					page: 1,
					num: 300,
					total: 0,
				}
			}
		},
		computed: {
			role() {
				return this.userList.username === 'admin' ? '超级管理员' : '普通用户';
			}
		},
		created(){
			this.getData();
		},
		methods:{
			async getData(){
				let res = await this.$api.people({id:this.id,num:1,page:1})
				if (0 === res.data.code) {
					this.form = res.data.data.list[0]
					if (this.form.sex == 'male') {this.form.sex = '男'}
					if (this.form.sex == 'female') {this.form.sex = '女'}
					if (this.form.sex == 'secret') {this.form.sex = '保密'}
				}
				let lad = await this.$api.devices(this.ladder)
				if (0 === lad.data.code) {
					this.ladList = lad.data.data.list
					this.ladder.total = lad.data.data.totalNumber
				}
			},
			go(name){
				console.log(name);
				this.$router.push({
					name: name,
				})
			},
			async create(){
				var sex
				if (this.form.sex == '男') {sex = 'male'}
				if (this.form.sex == '女') {sex = 'female'}
				if (this.form.sex == '保密') {sex = 'secret'}
				let res = await this.$api.updatepeople({id:this.form.id,username:this.form.username,
														profession:this.form.profession,email:this.form.email,
														mobile:this.form.mobile,
														introduction:this.form.introduction})
				if (res.data.code ==0) {
					this.$Notice.success({
					title: '成功',
					desc: '更改信息成功'
					});
				}
				else {
					this.$Notice.error({
					title: '失败',
					desc: '提交错误'
					});
				}
			},
			newpassword(){
				this.$router.push({
					name: 'newpassword',
					params: {
						// id: this.form.id									
					},
				})
			}
		}
	}	
</script>

<style lang="scss" scoped>
	.inline{
		display: inline-block;
	}
	.username{
		font-size: 30px;
		color: #222;
		display: inline-block;
	}
	.role{
		font-size: 14px;
		color: #999;
		display: inline-block;
	}
	
</style>
