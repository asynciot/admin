<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=5)
				Col(span=9)
					Card(style="margin-top:0px;height:550px")
						Col(span=22)
							Form(ref="form",:data="form",:rules="rules",:label-width="80")
								Form-item(:label="$t('Group Name')" v-model="form.name")
									Input(:value="form.name")
								Form-item(:label="$t('Leader')" v-model="form.leader")
									Input(:value="form.leader" disabled)
								Form-item(:label="$t('Region')",prop="location",data-toggle="distpicker")
									Cascader(:data="region" v-model="value2")
						Col(span=12)
							Form(ref="form",:data="form",:rules="rules",:label-width="80")
								Col(span=22)
									Form-item(:label="$t('Background')+'1'")
										ColorPicker(v-model="color1")
									Form-item(:label="$t('Background')+'2'")
										ColorPicker(v-model="color2")
									Form-item(:label="$t('Background')+'3'")
										RadioGroup(v-model="color3")
											Radio(label="light")
											Radio(label="dark")
											Radio(label="primary")
						Col(span=12)
							upload(:before-upload='handleUpload' action='')
								img(:src="logo" onerror="src='../../static/logo-menu.png'" style="padding-left: 30%;cursor: pointer;width: 200px;height:150px")
						Col(span=24)
							Col.ta(span="8")
								Button(type="success" @click="upOrganize()" ,:loading="loading")|{{$t('OK')}}
							Col.ta(span="8")
								Button(type="primary" @click="getList2(),dislist=true")|{{$t('Member List')}}
							Col.ta(span="8")
								Button(@click="$router.back(-1)")|{{$t('cancel')}}

				Col(span=15)
					Card
						Row
							div.form
								Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="search()")
									div
										Row(:gutter=5)
											Col(span="9" style="margin-bottom:5px")
												Input(v-model="options.search_info",:placeholder="$t('keyword')" style="width:60%")
												Button.ml-10(type="primary",icon="ios-search",:loading="loading",@click="options.page=1,search()")
							div.minheight
								Table(border,:columns="columns1",:data="list",size="small" stripe)
						Row
							Col.ta(span="24")
								Page(show-elevator :total="list.length",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
		el-dialog(:visible.sync="dislist")
			Row(:gutter=5)
				Col.list(span="24")|{{$t('Member List')}}
			Table(border,:columns="columns2",:data="list1",size="small" stripe)
</template>

<script>
	import region from '@/views/region.json'
	export default{
		data(){
			return{
				region: region,
				dislist:false,
				cityList: [],
				value2:['','',''],
				districtList: [],
				loading:false,
				IMEI:'',
				logo:'',
				file:'',
				color1:'#19be6b',
				color2:'#19be6b',
				color3:'#19be6b',
				options:{
					install_addr:'',
					search_info:'',
					total:10,
					num:10,
					page:1,
					state:'',
				},
				query:{
					group_id:this.$route.params.id,
					num:10,
					page:1,
				},
				form:{},
				rules: {
					groupname: [{
						required: true,
							type: 'string',
							message: this.$t('Please fill in the group name'),
							trigger: 'blur'
					}],
					username: [{
						required: false,
						type: 'string',
						message: this.$t('Please fill in the group leader'),
						trigger: 'blur'
					}],
					phone: [{
						required: false,
						type: 'string',
						pattern:/^1(3|4|5|7|8)\d{9}$/,
						message: this.$t('Please fill in the legal number'),
						trigger: 'blur'
					}],
				},
				list:[],
				list1:[],
				columns1: [
				{
					title: this.$t('Group Name'),
					key: 'name',
				},
				{
					title: this.$t('install aedress'),
					key: 'region',
				},
				{
					title: this.$t('handle'),
					key: 'IMEI',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.$router.push({
											name: 'editElevator',
											params: {
												id: params.row.id
											}
										})
									}
								}
							}, this.$t('watch')),
							h('Button', {
								props: {
									type: 'success',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.bindGroup(params.row.id)
									}
								}
							}, this.$t('Bind'))
						]);
					}
				}],
				columns2: [
				{
					title: this.$t('Member'),
					key: 'username',
				},
				{
					title: this.$t('handle'),
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
										this.rmGroup(params.row.id)
									}
								}
							}, this.$t('delete'))
						]);
					}
				}],
			}
		},
		created(){
			this.getList()
			this.getOrganize()
		},
		methods:{
			async search() {
				this.options.page = 1
				this.getList()
			},
			pageChange(val) {
				this.options.page = val
				this.getList()
			},
			async getOrganize(){
				const res = await this.$api.readOrganize({
					id:this.$route.params.id,
					nums:1,
					page:1,
				})
				this.form = res.data.data.list[0]
				this.form.value2 = this.form.region.split(',')
				this.logo='http://server.asynciot.com/getfile?filePath='+res.data.data.list[0].logo
				delete this.form.t_create
			},
			async getList() {
				let res = await this.$api.readGroup({
					page:1,
					nums:10,
				})
				this.list = res.data.data.list
				this.total = res.data.data.totalNumber
			},
			async getList2() {
				const res = await this.$api.getOrganization(this.query)
				
				if (res.data.code === 0) {
					this.list1 = res.data.data.list
					this.total = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Fail to get List')
					});
				}
			},
			handleUpload (file) {
				var type = file.name.split('.')
				if (file.size<2097152){
				if ((type[1] == 'png')||(type[1] == 'gif')||(type[1] == 'jpg')||(type[1] == 'bmp')||(type[1] == 'jpeg')){
				this.file = new File([file], new Date().getTime()+".jpg",{type:"image/jpeg"});
				// this.filename = this.file.name;
				// this.upsuccess = true;
				
				  let url = null ;
				  if (window.createObjectURL!=undefined) { // basic
					url = window.createObjectURL(this.file) ;
				  }else if (window.webkitURL!=undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(this.file) ;
				  }else if (window.URL!=undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(this.file) ;
				  }
				this.logo=url;
				return false;
				}
				else{
					this.$Notice.warning({
						title: this.$t('warning'), 
						desc: this.$t('File type must be picture')
					})
				}
				}
				else{
					this.$Notice.warning({
						title: this.$t('warning'),
						desc: this.$t('File size must be less than 2M')
					})
				}
			},
			async upOrganize(){
				this.loading = true
				console.log('value2')
				console.log(this.form.region)
				this.form.region = this.value2[0]+','+this.value2[1]+','+this.value2[2]
				
				var formData = new FormData()
				var formData = new window.FormData()
				formData.append('logo',this.file)
				formData.append('bg1',this.color1)
				formData.append('bg2',this.color2)
				formData.append('bg3',this.color3)
				formData.append('id',this.form.id)
				formData.append('leader',this.form.leader)
				formData.append('name',this.form.name)
				formData.append('region',this.form.region)
				formData.append('organize_id',this.form.organize_id)
				formData.append('number',this.form.number)
				const res = await this.$api.updateOrganize(formData)
				if (res.data.code == 0) {
					this.loading = false
					this.$Notice.success({
						title: this.$t('success'),
						desc: this.$t('Successfully edit')
					});
					this.$router.back(-1)
				}else{
					this.loading = false
					this.$Notice.error({
					title: this.$t('error'),
					desc: this.$t('Fail to edit')
					});
				}
			},
			async rmGroup(val){
				const res = await this.$api.rmGroup({
					id:val,
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: this.$t('success'),
						desc: this.$t('Successfully delete')
					});
					this.getList2()
				}else{
					this.$Notice.error({
					title: this.$t('error'),
					desc: this.$t('Fail to delete')
					});
				}
			},
			async bindGroup(val){
				const res = await this.$api.bindGroup({
					id:this.$route.params.id,
					group_id:val,
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: this.$t('success'),
						desc: this.$t('successfully bind')
					});
					this.getList2()
				}else{
					this.$Notice.error({
					title: this.$t('error'),
					desc: this.$t('Fail to bind')
					});
				}
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
	.ml-10{
		margin-left: 5px;
	}
	.list{
		text-align: center;
		font-size: 20px;
		margin-bottom:20px;
	}
</style>
