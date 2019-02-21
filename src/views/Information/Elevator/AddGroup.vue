<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=12)
					Card
						Row
							Col(span=20)
								Form(ref="form",:model="form",:rules="rules",:label-width="100")
									Row(:gutter="5")
										Col(span="20",offset="2")
											Form-item(label="电梯组名:" v-model="form.groupname")
												Input()
											Form-item(label="创建人:" v-model="form.username")
												Input()
											Form-item(label="所在区域",prop="location",data-toggle="distpicker")
												Col(span="8" style="padding-right:5px")
													Select(placeholder="请选择",v-model="form.province")
														Option(v-for="item in region",:key="item.value",:value="item.value")
												Col(span="8" style="padding-right:5px")
													Select(placeholder="请选择",v-model="form.city")
														Option(v-for="city in cityList",:key="city.value",:value="city.value")
												Col(span="8" style="padding-right:5px")
														Select(placeholder="请选择",v-model="form.district")
															Option(v-for="distric in districtList",:key="distric.value",:value="distric.value")
											Form-item(label="电话:" v-model="form.phone")
												Input()
											Col(span="12")
												Button(type="success",icon="plus",@click="" ,:loading="loading")|提交
											Col(span="12")
												Button(icon="close",@click="$router.back(-1)")|取消
</template>

<script>
	import region from '@/views/region.json'
	export default{
		data(){
			return{
				region: region,
				cityList: [],
				districtList: [],
				loading:false,
				form:{
					groupname:'',
					username:'',
					province:'',
					city:'',
					district:'',
				},
				rules: {
					groupname: [{
						required: true,
							type: 'string',
							message: '请填写电梯组名称',
							trigger: 'blur'
					}],
					username: [{
						required: false,
						type: 'string',
						message: '请填写电梯组负责人',
						trigger: 'blur'
					}],
					phone: [{
						required: false,
						type: 'string',
						pattern:/^1(3|4|5|7|8)\d{9}$/,
						message: '请填写正确的号码',
						trigger: 'blur'
					}],
				},
			}
		},
		computed: {
		},
		created(){
		},
		watch: {
			'form.province': function(val){
				let index = this.region.findIndex(item=>item.value==val)
				if(index > -1){
					this.cityList = this.region[index].children
					this.form.city = ''
					this.form.district = ''
				}
			},
			'form.city': function(val){
				let index = this.cityList.findIndex(item=>item.value==val)
				if(index > -1){
					this.districtList = this.cityList[index].children
					this.form.district = ''
				}
			},
		},
		mounted(){
			//document.getElementById('image').src=this.file
		},
		methods:{
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
