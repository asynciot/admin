<template lang="jade">
div.layout-content-main
	div.form
		Form(ref='form',:model="options",label-position="left",:label-width="100")
			Row(:gutter="16")
				Col(span="6")
					Form-item(label="用户名称：")
						Input(v-model="options.username",placeholder="请输入用户名称")
				Col(span="6")
					Form-item(label="手机号码：")
						Input(v-model="options.mobile",placeholder="请输入手机号码")
				Col(span="6")
					Button.mr-10(type="primary",icon="search",:loading="loading",@click="options.page=1,search()")|搜索
	div(style="min-height: 450px")
		Table(:loading="loading",:stripe="true",:columns="column",:data="list",stripe size="small")
	Col(span=6)|&nbsp;
	Col(span=18)
		Page(show-elevator :total="options.total" ,:page-size="options.num" ,:current="options.page" ,@on-change="pageChange" show-total )
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			options: {
				username: '',
				mobile: '',
				name:'',
				id:'',
				page: 1,
				num: 10,
				total: 0
			},
			column: [
				{
					title: '用户名称',
					key: 'username',
				},
				{
					title: '用户描述',
					key: 'introduction',
				},
				{
					title: '职务',
					key: 'profession',
				},
				{
					title: '角色',
					render: (h, params) => {
						var authority;
						if (params.row.username=='admin') {authority='超级管理员'}
						else {authority='普通用户'}
						return h('div', authority)
					}
				},
				{
					title: '电话',
					key: 'mobile',
				},
				{
					title: '邮箱',
					key: 'email',
				},

				{
					title: '操作',
					key: 'userName',
					width: 300,
					align: 'center',
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
									click: () => {
										this.$router.push({
											name: 'writeInform',
											params: {
												id: params.row.id,
												username: params.row.username,
												title: '',
											}
										})
									}
								}
							}, '发送通知'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},			
								on: {
									click: () => {
										this.$Modal.confirm({
											title: '警告!',
											content: '<p>是否删除此项 ？</p>',
											onOk: () => {
												this.deleteRow(params)											
											},
											onCancel: () => {
											}
										})	
									}
								}
							}, '删除'),
						]);
					}
				}
			],
			list: [],
		}
	},
	created() {
		this.loading = false
		this.getList()
	},
	methods: {
		pageChange(val) {
			this.options.page = val
			this.getList()
		},
		async deleteRow(params) {
				let res = await this.$api.removePeople({id:params.row.id})
				this.$emit('on-custom-comp');
				if (0 === res.data.code) {
					this.$Message.info('操作成功');
					this.getList()
				}else {
					this.$Message.info('操作失败');
				}
		},
		async getList() {
			this.loading = true
			let res = await this.$api.people(this.options)
			this.loading = false
			if (0 === res.data.code) {
				this.list = res.data.data.list
				this.options.total = res.data.data.totalNumber
			}
		},
		async search() {
			this.loading = true
			let res = await this.$api.people(this.options)
			this.loading = false
			if (0 === res.data.code) {
				this.list = res.data.data.list
				// this.options.total = res.data.data.totalNumber
			}
		},
		adduser(){
			this.$router.push({
				name: 'usermanageDetail',
				params: {
				}
			})
		}
	}
}
</script>

<style lang="css">
</style>
