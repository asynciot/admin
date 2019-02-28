<template lang="jade">
	div.layout-content-main
		div.form
			Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="search()")
				div(style="padding-bottom:5px")
					Row(:gutter=5)
						Col(span="19")
							Button.mr-10(type="success",icon="plus",:loading="loading",@click="goGroup()")|添加电梯组
						Col(span="5")
							Button.mr-10(type="primary",icon="search",:loading="loading",@click="options.page=1,search()")
							Input(v-model="options.username",placeholder="请输入搜索内容" style="width:75%;")
		div(style="min-height:450px")
			Table(:columns="columns",:data="list",size="small" stripe)
		Col(span="24" style="text-align:center;")
			Page(show-elevator :total="options.total",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
</template>

<script>
	export default {
		data() {
			return {
				options:{
					page:1,
					nums:10,
					total:7,
				},
				query:{
					
				},
				list:[{
					id:1,
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
				columns: [{
					title: '组名',
					key: 'groupname',
				},
				{
					title: '创建人',
					key: 'user',
				},
				{
					title: '地址',
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
									type: 'primary',
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
									}
								}
							}, '删除'),
						]);
					}
				}],
			}
		},
		methods:{
			async search() {
			},
			goGroup(){
				this.$router.push({
					name:'addgroup',
				})
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
