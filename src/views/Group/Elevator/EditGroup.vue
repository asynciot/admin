<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=5)
				Col(span=9)
					Card
						Row
							Form(ref="form",:data="form",:rules="rules",:label-width="80")
								Col(span=22)
									Form-item(:label="$t('Elevator Group Name')" v-model="form.name")
										Input(v-model="form.name")
									Form-item(:label="$t('Group Creator')" v-model="form.leader")
										Input(v-model="form.leader" disabled)
									Form-item(:label="$t('Region')",prop="location",data-toggle="distpicker")
										Cascader(:data="region" v-model="form.region")
									Form-item(:label="$t('phone number')" v-model="form.mobile")
										Input(v-model="form.mobile")
									Col.ta(span="8")
										Button(type="success" @click="upGroup()" ,:loading="loading")|{{$t('OK')}}
									Col.ta(span="8")
										Button(type="primary" @click="dislist=true,getList2()")|{{$t('Device List')}}
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
											Col(span="9" style="margin-bottom:5px")
												Input(v-model="options.install_addr",:placeholder="$t('install address')" style="width:60%")
												Button.ml-10(type="primary",icon="ios-search",:loading="loading",@click="options.page=1,search()")
							div.minheight
								Table(border,:columns="columns1",:data="list",size="small" stripe)
						Row
							Col.ta(span="24")
								Page(show-elevator :total="total",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
		el-dialog(:visible.sync="dislist")
			Row(:gutter=5)
				Col.list(span="24")|{{$t('Device List')}}
			Table(border,:columns="columns2",:data="list1",size="small" stripe height="600")
</template>

<script>
	import region from '@/views/region.json'
	export default{
		data(){
			return{
				region: region,
				dislist:false,
				cityList: [],
				districtList: [],
				loading:false,
				IMEI:'',
				total:'',
				total2:'',
				options:{
					group_id:this.$route.params.id,
					install_addr:'',
					search_info:'',
					num:10,
					page:1,
				},
				query:{
					group_id:this.$route.params.id,
					install_addr:'',
					search_info:'',
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
					title: this.$t('Elevator Name'),
					key: 'name',
				},
				{
					title: this.$t('install address'),
					key: 'install_addr',
				},
				{
					title: this.$t('handle'),
					key: 'IMEI',
					render: (h, params) => {
						var show=''
						var type=''
						if (params.row.follow=="yes") {
							show='delete'
							type='error'
						}else{
							show='Add'
							type='success'
						}
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
											name: 'ladderInfo',
											params: {
												id: params.row.id
											}
										})
									}
								}
							}, this.$t('watch')),
							h('Button', {
								props: {
									type: type,
									size: 'small',
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										if (type=='success'){
											this.updateLadder(params)
										}
										else {
											this.rmLadder(params)
										}
									}
								}
							}, this.$t(show))
						]);
					}
				}],
				columns2: [
				{
					title: this.$t('Elevator Name'),
					key: 'name',
					// width:150,
				},
				{
					title: this.$t('install address'),
					key: 'install_addr',
					// width:350,
				},
				{
					title: this.$t('handle'),
					// width:250,
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
											name: 'ladderInfo',
											params: {
												id: params.row.id
											}
										})
									}
								}
							}, this.$t('watch')),
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
										this.rmLadder(params.row.id)
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
			this.getGroup()
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
			async getGroup(){
				const res = await this.$api.readGroup({
					id:this.$route.params.id,
					nums:1,
					page:1,
				})
				this.form = res.data.data.list[0]
				this.form.region = this.form.region.split(',')
				delete this.form.t_create
			},
			async getList() {
				const res = await this.$api.readLadderSimple(this.options)
				this.list = res.data.data.list
				this.total = res.data.data.totalNumber
			},
			async getList2() {
				const res = await this.$api.readLadderSimpleS(this.query)
				if (res.data.code === 0) {
					this.list1 = res.data.data.list
					this.total2 = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Fail to get List')
					});
				}
			},
			async upGroup(){
				this.loading = true
				if (this.form.region[2] !=null){
					this.form.region = this.form.region[0].toString()+','+this.form.region[1].toString()+','+this.form.region[2].toString()
				}
				const res = await this.$api.updateGroup(this.form)
				if (res.data.code == 0) {
					this.loading = false
					this.$Notice.success({
						title: this.$t('success'),
						desc: ''
					});
				}else{
					this.loading = false
					this.$Notice.error({
					title: this.$t('error'),
					desc: ''
					});
				}
			},
			async updateLadder(val){
				let res = await this.$api.upLadderGroup({
					id:this.$route.params.id,
					ladder_id:val.row.id,
                    imei : val.row.ctrl
				})
				if (res.data.code == 0) {
					this.loading = false
					this.$Notice.success({
						title: this.$t('Successfully add'),
						desc: ''
					});
					this.getList2()
				}else{
					this.loading = false
					this.$Notice.error({
					title: this.$t('Fail to add'),
					desc: ''
					});
				}
			},
			async rmLadder(val){
				let res = await this.$api.rmLadderGroup({
					ladder_id:val.row.id,
                    imei : val.row.ctrl
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: this.$t('Successfully delete'),
						desc: ''
					});
					this.getList2()
				}else{
					this.$Notice.error({
					title: this.$t('Fail to delete'),
					desc: ''
					});
				}
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
