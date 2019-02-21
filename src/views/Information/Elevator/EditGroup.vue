<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=9)
					Card
						Row
							Form(ref="form",:model="form",:rules="rules",:label-width="80")
								Col(span=22)
									Form-item(label="电梯组名:" v-model="form.groupname")
										Input(:value="form.groupname")
									Form-item(label="创建人:" v-model="form.username")
										Input(:value="form.user")
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
										Input(:value="form.phone")
									Col.ta(span="12")
										Button(type="success",icon="plus",@click="" ,:loading="loading")|提交
									Col.ta(span="12")
										Button(icon="close",@click="$router.back(-1)")|取消
				Col(span=15)
					Card
						Row
							div.minheight
								Table(border,:columns="columns",:data="list",size="small" stripe)
						Row
							Col.ta(span="24")
								Page(show-elevator :total="list.length",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
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
				options:{
					total:10,
					num:10,
					page:1,
				},
				query:{
					page:'',
				},
				form:{
					groupname:'你好',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
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
				list:[{
					groupname:'你好',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				},{
					groupname:'测试',
					user:'王云辉',
					iddr:'浙江省宁波市高新区',
					phone:'15743415321',
				}],
				columns: [
				{
					title: '电梯别名',
					key: 'groupname',
				},
				{
					title: '安装地址',
					key: 'iddr',
				},
				{
					title: '联系电话',
					key: 'phone',
				},
				{
					title: '操作',
					key: 'IMEI',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.$router.push({
											name: 'editgroup',
											params:{
												id: params.row.id
											}
										})
									}
								}
							}, '删除'),
						]);
					}
				}],
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
			pageChange(val) {
				this.query.page = val
			},
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
	.ta{
		text-align: center;
	}
	.minheight{
		min-height: 450px;
	}
</style>
