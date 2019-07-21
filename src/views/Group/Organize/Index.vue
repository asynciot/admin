<template lang="jade">
	div.layout-content-main
		div.form
			Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="getOrganize()")
				div(style="padding-bottom:5px")
					Row(:gutter=5)
						Col(span="19")
							Button.mr-10(type="success",icon="md-add",:loading="loading",@click="goOrganize()")|{{$t('New')}} {{$t('Member Group')}}
						Col(span="5")
							Button.mr-10(type="primary",icon="ios-search",:loading="loading",@click="options.page=1,getOrganize()")
							Input(v-model="query.number",:placeholder="$t('keyword')" style="width:75%;")
		div(style="min-height:450px")
			Table(:columns="columns",:data="list",size="small" stripe)
		Col(span="24" style="text-align:center;")
			Page(show-elevator :total="options.total",:page-size="options.num",:current="options.page" @on-change="pageChange",show-total)
		el-dialog(:visible.sync="dislist" width="80%")
			Table.bt-10(border,:columns="columns2",:data="list1",size="large" stripe height="600")
</template>

<script>
	export default {
		data() {
			return {
				username:this.global.username,
				options:{
					page:1,
					nums:10,
					total:0,
				},
				query:{
					page:1,
					nums:10,
					number:'',
				},
				dislist:false,
				list:[],
				list1:[],
				loading:false,
				columns: [{
					title: this.$t('Group ID'),
					key: 'number',
				},{
					title: this.$t('Group Name'),
					key: 'name',
				},{
					title: this.$t('Leader'),
					key: 'leader',
				},{
					title: this.$t('Region'),
					key: 'region',
				},{
					title: this.$t('handle'),
					key: 'IMEI',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'success',
									size: 'small',
									disabled:this.username==params.row.leader,
									loading: this.loading,
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.joinGroup(params.row.number)
									}
								}
							}, this.$t('Join')),
							h('Button', {
								props: {
									type: 'primary',
									size: 'small',
									loading: this.loading,
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.$router.push({
											name: 'editOrganize',
											params:{
												id: params.row.id
											}
										})
									}
								}
							}, this.$t('edit')),
							h('Button', {
								props: {
									type: 'primary',
									size: 'small',
									loading: this.loading,
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.dislist=true
										this.getGroup(params.row.organize_id)
									}
								}
							}, this.$t('Device List')),
							h('Button', {
								props: {
									type: 'error',
									size: 'small',
									loading: this.loading,
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.rmOrganize(params.row.id)
									}
								}
							}, this.$t('delete')),
						]);
					}
				}],
				columns2: [{
					title: this.$t('device name'),
					key: 'name',
				},{
					title: this.$t('install address'),
					key: 'install_addr',
				},{
					title: this.$t('ctrl'),
					key: 'ctrl',
				},{
					title: this.$t('door'),
					key: 'door1',
				},{
					title: this.$t('door'),
					key: 'door2',
				},],
			}
		},
		created() {
			this.Organize()
		},
		methods:{
			goOrganize(){
				this.$router.push({
					name:'addOrganize',
				})
			},
			async pageChange(val) {
				this.query.page = val
				this.loading = true
				var query=''
				if (this.query.number==null||this.query.number==""){
					query={nums:this.query.nums,page:this.query.page}
				}
				else{
					query={nums:this.query.nums,page:this.query.page,number:this.query.number}
				}
				const res = await this.$api.readOrganize(query)
				if(res.data.code == 0){
					this.list = res.data.data.list
					this.options.total = res.data.data.totalNumber
				}
				this.loading = false
			},
			async Organize(){
				this.loading = true
				const res = await this.$api.readOrganize({
					username:this.global.username,
					nums:10,
					page:1,
				})
				if(res.data.code == 0){
					this.list = res.data.data.list
					this.options.total = res.data.data.totalNumber
				}
				this.loading = false
			},
			async getOrganize(){
				this.loading = true
				if(this.query.number==null||this.query.number==""){
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Please input keyword!')
					});
				}else{
					const res = await this.$api.readOrganize(this.query)
					if(res.data.code == 0){
						this.list = res.data.data.list
						this.options.total = res.data.data.totalNumber
					}
				}
				this.loading = false
			},
			async rmOrganize(val){
				this.loading = true
				const res = await this.$api.rmOrganize({
					id:val,
				})
				if(res.data.code == 0){
					this.$Notice.success({
						title: '成功',
						desc: '删除成功！'
					});
					
						this.loading = true
							var query=''
							if (this.query.number==null||this.query.number==""){
								query={nums:this.query.nums,page:this.query.page}
							}
							else{
								query={nums:this.query.nums,page:this.query.page,number:this.query.number}
							}
							const res = await this.$api.readOrganize(query)
							if(res.data.code == 0){
								this.list = res.data.data.list
								this.options.total = res.data.data.totalNumber
							}
						this.loading = false

				}else{
					this.$Notice.error({
						title: '失败',
						desc: '删除失败'
					});
				}
				this.loading = false
			},
			async joinGroup(val){
				this.loading = true
				const res = await this.$api.joinGroup({
					number:val,
				})
				if(res.data.code == 0){
					this.$Notice.success({
						title: '成功',
						desc: '加入成功！'
					});
					this.getOrganize()
				}else{
					this.$Notice.error({
						title: '失败',
						desc: '加入失败'
					});
				}
				this.loading = false
			},
			async getGroup(val){
				const res = await this.$api.reLadder({
					num:1000,
					page:1,
					group_id:val,
				})
				if (res.data.code === 0) {
					this.list1 = res.data.data.list
					this.total = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: '错误',
						desc: '获取列表失败'
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mr-10{
		margin-right: 10px;
	}
	.ta{
		text-align: center;
	}
	.bt-10{
		margin-top: 10px;
		width: 100%;
	}
</style>
