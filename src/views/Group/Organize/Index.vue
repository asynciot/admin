<template lang="jade">
	div.layout-content-main
		div.form
			Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="search()")
				div(style="padding-bottom:5px")
					Row(:gutter=5)
						Col(span="19")
							Button.mr-10(type="success",icon="md-add",:loading="loading",@click="goOrganize()")|添加群组
						Col(span="5")
							Button.mr-10(type="primary",icon="ios-search",:loading="loading",@click="options.page=1,search()")
							Input(v-model="options.username",placeholder="请输入搜索内容" style="width:75%;")
		div(style="min-height:450px")
			Table(:columns="columns",:data="list",size="small" stripe)
		Col(span="24" style="text-align:center;")
			Page(show-elevator :total="options.total",:page-size="options.num",:current="options.page" on-change="pageChange",show-total)
</template>

<script>
	export default {
		data() {
			return {
				options:{
					page:1,
					nums:10,
					total:0,
				},
				query:{
					page:1,
					nums:10,
				},
				list:[],
				loading:false,
				columns: [{
					title: '组名',
					key: 'name',
				},
				{
					title: '创建人',
					key: 'leader',
				},
				{
					title: '地址',
					key: 'region',
				},
				{
					title: '操作',
					key: 'IMEI',
					render: (h, params) => {
						return h('div', [
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
										this.$router.push({
											name: 'editOrganize',
											params:{
												id: params.row.id
											}
										})
									}
								}
							}, '加入'),
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
											name: 'editOrganize',
											params:{
												id: params.row.id
											}
										})
									}
								}
							}, '编辑'),
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
										this.rmOrganize(params.row.id)
									}
								}
							}, '删除'),
						]);
					}
				}],
			}
		},
		created() {
			this.getOrganize()
		},
		methods:{
			async search() {
			},
			goOrganize(){
				this.$router.push({
					name:'addOrganize',
				})
			},
			async getOrganize(){
				this.loading = true
				const res = await this.$api.readOrganize(this.query)
				if(res.data.code == 0){
					this.list = res.data.data.list
					this.options.total = res.data.data.totalNumber
					this.loading = false
				}
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
						this.getOrganize()
				}else{
					this.$Notice.error({
					title: '失败',
					desc: '删除失败'
					});
				}
				this.loading = false
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
</style>
