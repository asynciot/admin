<template lang="jade">
	div.layout-content-main
		Form.imr(ref="form" label-position="left" ,:label-width="100" @keydown.enter.native.prevent="search()")
			Row(:gutter=5)
				Col(span='2')
					Select.smr(v-model="show.state" style="width:100%;" placeholder="在线状态" @on-change="search()")
						Option(key="1" label="全部" value="all")
						Option(key="2" label="在线" value="online")
						Option(key="3" label="离线" value="offline")
						Option(key="4" label="长期离线" value="longoffline")
				Col(span=4)
					AutoComplete.handle-input(v-model="options.search_info" ,:data="menu" @on-search="handleSearch1"
					 placeholder="关键词" style="width:100%;" id="serch1")
				Col( span=2)
					Input( v-model="options.install_addr"  placeholder="安装地址" max=10)
				Col( span='10')
					Button(type="primary" icon="ios-search" @click="search()")|搜索
					Button.mr-10(type="success",icon="md-add",:loading="loading",@click="goLadder()")|添加电梯
		div( style="min-height: 450px; margin-top: 5px;")
			Table.mb-10( stripe :columns="columns" ,:data="list" size="small")
		Col( span="24" style="text-align: center;")
			Page( show-elevator :total="total" ,:page-size="options.num" ,:current="options.page" @on-change="pageChange"
			 show-total)
</template>

<script>
	export default {
		data() {
			return {
				showtag: false,
				show: {
					device_type: 'all',
					register: 'all',
					state: 'online',
				},
				menu: [],
				follow: [],
				list:[],
				username:window.localStorage.getItem('username'),
				options: {
					search_info: '',
					device_type: '',
					register: 'unregistered',
					page: 1,
					num: 10,
					isreg: '',
					tagcolor: '',
					install_addr:'',
				},
				total:0,
				loading: false,
				columns: [
					{
						title: '电梯名称',
						width: 120,
						key: 'name',
					},
					{
						title: '控制柜',
						key: 'ctrl',
						width: 138,
					},
					{
						title: '门机',
						key: 'door1',
						width: 138,
					},
					{
						title: '门机',
						key: 'door2',
						width: 138,
					},
					{
						title: 'IP定位',
						key: 'ipaddr',
// 						render: (h, params) => {
// 							return h('div', params.row.ip_country + params.row.ip_region + params.row.ip_city)
// 						}
					},
					{
						title: '安装地址',
						// width: 250,
						key: 'install_addr',
						render: (h, params) => {
							var addr = params.row.install_addr
							if (params.row.install_addr != null) {
								if (params.row.install_addr.length >= 30) {
									addr = params.row.install_addr.substring(0, 28) + "…"
								}
							}
							return h('Poptip', {
								props: {
									trigger: "hover",
									placement: "top-start",
									content: params.row.install_addr
								},
							}, addr)
						}
					},
// 					{
// 						title: '操作',
// 						render: (h, params) => {
// 							var follow = "关注电梯"
// 							this.follow.forEach(item => {
// 								if (params.row.IMEI == item.imei) {
// 									follow = '取消关注'
// 								}
// 							})
// 							return h('div', [
// 								h('Button', {
// 									props: {
// 										type: 'success',
// 										size: "small",
// 									},
// 									style: {
// 										marginRight: '10px',
// 									},
// 									on: {
// 										click: () => {
// 											if (follow == "关注电梯")
// 												this.addfl(params.row.IMEI)
// 											if (follow == "取消关注")
// 												this.delfl(params.row.id)
// 										},
// 									}
// 								}, follow),
// 								h('Button', {
// 									props: {
// 										type: 'primary',
// 										size: "small",
// 									},
// 									style: {
// 										marginRight: '10px',
// 									},
// 									on: {
// 										click: () => {
// 											this.$router.push({
// 												name: 'elevatorFiles',
// 												params: {
// 													IMEI: params.row.IMEI
// 												}
// 											})
// 										},
// 									}
// 								}, '查看/编辑'),
// 							])
// 						}
// 					}
				],
				refreshNum: 0,
				data: [],
				query:{
					page: 1,
					num: 10,
				},
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleSearch1(selectword) {
				this.menu = [];
				var str;
				for (var i = 0; i < this.data.length; i++) {
					str = this.data[i].IMEI;
					// if ((str != null)&&(selectword!= null)){
					if(str.indexOf(selectword) >= 0){
						this.menu.push(str)
					}
					// }
					str = this.data[i].device_name;
					// if ((str != null)&&(selectword!= null)){
					if(str.indexOf(selectword) >= 0){
						this.menu.push(str)
					}
					// } 
				}
			},
			pageChange(val) {
				this.options.page = val
				this.getList()
			},
			async getList() {
				let res = await this.$api.readLadder(this.query)
				this.list = res.data.data.list
				this.total = res.data.data.totalNumber
			},
			async search() {
				this.options.page = 1
				this.getList()
			},
			Onchange: function(val) {
				this.$router.push({
					name: val,
				})
			},
			async addfl(val) {
				let res = await this.$api.addfollow({
					imei: val
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: '成功',
						desc: '关注成功'
					});
					this.getList()
				} else {
					this.$Notice.error({
						title: '错误',
						desc: '关注失败'
					});
				}
			},
			async delfl(val) {
				let res = await this.$api.delfollow({
					device_id: val
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: '成功',
						desc: '不再关注该设备'
					});
					this.getList()
				} else {
					this.$Notice.error({
						title: '失败',
						desc: '发生错误'
					});
				}
			},
			goLadder(){
				this.$router.push({
					name: 'addladder',
				})
			},
		}
	}
</script>
<style scoped>
	.mb-10 {
		margin-bottom: 20px;
	}
	.img {
		width: 200px;
		height: 200px;
	}
	.tags-close-box {
		box-sizing: border-box;
		padding-top: 1px;
		text-align: center;
		width: 90px;
		height: 30px;
		background: #fff;
		box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
		z-index: 10;
	}
	.pagination {
		position: absolute;
		margin-left: 20%;
		margin-top: 3%;
	}
	.mr-10{
		margin-left: 5px;
	}
</style>
