<template lang="jade">
	div.layout-content-main
		div
			Form(ref='form', label-position='left', :label-width='100' @keydown.enter.native.prevent="search()")
				Row(:gutter=5)
					Col(span="2")
						Select.smr(v-model='show.type', style='width:100%;', placeholder='事件类型', @on-change='search()')
							Option(key='1', label='全部', value='all')
							Option(key='2', label='故障', value='1')
							Option(key='3', label='保养', value='2')
							Option(key='4', label='校检', value='3')
					Col(span="2")
						Select.smr(v-model='show.device_type', style='width:100%;', placeholder='设备类型', @on-change='search()')
							Option(key='1', label='全部', value='all')
							Option(key='2', label='控制器', value='door')
							Option(key='3', label='控制柜', value='ctrl')
					Col(span="2")
						Select.smr(v-model='show.list_type', style='width:100%;', placeholder='设备类型', @on-change='getList()')
							Option(key='2', label='工单审核', value='order')
							Option(key='3', label='维保审核', value='dispatch')
					Col(span="4")
						Input(v-model="options.search_info" ,:data="menu" , placeholder="设备地址和名称" max=15)
					Col(span="5")
						Button.mr-10(type='primary', icon='ios-search', @click='search()')|搜索
						Button(type='default', icon='', @click='code()')|控制柜故障代码
		el-dialog(title='故障提示', :visible.sync='ctrl', width='30%')
			img#c(width='100%', src='')
			span.dialog-footer(slot='footer')
				Button(type='primary', @click='ctrl = false') 确 定
		el-dialog(title='故障提示', :visible.sync='door', width='30%')
			img#d(width='100%', src='')
			span.dialog-footer(slot='footer')
				Button(type='primary', @click='door = false') 确 定
		div(style='min-height: 450px; margin-top: 20px;')
			Table.mb-10(:columns='columns', :data='list' stripe, size='small')
		Col(span="24" style="text-align:center;")
			page.fonts(show-elevator='', :total='totalNumber', :page-size='options.num', :current='options.page', @on-change='pageChange', show-total='')
</template>

<script>
	export default {
		data() {
			return {
				ctrl: false,
				door: false,
				last: true,
				color: [false, false, false, false, false, false],
				col: ['green', 'red', 'yellow', 'blue', 'gray', 'black'],
				menu: [],
				list:[],
				totalNumber:0,
				show: {
					state: 'untreated',
					type: 'all',
					device_type: 'all',
					list_type:'order',
				},
				options:{
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state:'examined',
					type: '',
					device_type: '',
					device_id: '',
					islast: 1,
				},
				columns: [{
						title: '设备名称',
						width: 100,
						key: 'device_name'
					}, {
						title: 'IMEI(设备识别码)',
						width: 150,
						key: 'IMEI',
						sortable: true
					}, {
						title: '设备类型',
						width: 90,
						key: 'device_type',
						render: (h, params) => {
							var type = ''
							if (params.row.device_type == "ctrl") type = "控制柜"
							if (params.row.device_type == "door") type = "控制器"
							return h('div', type)
						},
					}, {
						title: '事件类型',
						width: 90,
						key: 'device_type',
						render: (h, params) => {
							var type = ''
							if (params.row.type == "1") type = "故障"
							if (params.row.type == "2") type = "保养"
							if (params.row.type == "3") type = "校检"
							return h('div', type)
						}
					}, {
						title: '发起人',
						width: 90,
						key: 'producer',
						sortable: true
					}, {
						title: '故障代码',
						width: 100,
						key: 'type',
						render: (h, params) => {
							var type = ''
							var e = ''
							if ((params.row.type == '1') && (params.row.code != null)) {
								type = params.row.code.toString(16)
								if (type.length == 1) {
									type = '0' + type
								}
								e = 'E' + type
							}
							return h('div', [
								h('Button', {
									props: {
										type: 'text',
										size: "small",
									},
									style: {
										paddingRight: '4px',
										paddingLeft: '4px',
									},
									on: {
										click: () => {
											if (params.row.device_type == "ctrl") {
												setTimeout(() => {
													document.getElementById('c').src = '../../../static/c' + type + '.png'
												}, 200)
												this.ctrl = true
											}
											if (params.row.device_type == "door") {
												setTimeout(() => {
													document.getElementById('d').src = '../../../static/d' + type + '.png'
												}, 200)
												this.door = true
											}
										}
									}
								}, e)
							], )
						}
					},
					{
						title: '安装地址',
						key: 'install_addr'
					},{
						title: '说明',
						key: 'remarks'
					},
					{
						title: '提交时间',
						key: 'createTime',
						render: (h, params) => {
							return h('p', this.$format(parseInt(params.row.createTime), 'YYYY-MM-DD HH:mm:ss'))
						}
					},
					{
						title: '操作',
						width: 100,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: "small",
									},
									style: {
										marginRight: '10px',
									},
									on: {
										click: () => {
											if(this.show.list_type=="dispatch"){
												this.$router.push({
													name: 'dispatchadopt',
													params: {
														id: params.row.id
													}
												})
											}else{
												this.$router.push({
													name: 'orderadopt',
													params: {
														id: params.row.id
													}
												})
											}
										},
									}
								}, "查看"),
							])
						}
					}
				],
			}

		},
		created() {
			this.getData()
		},
		methods: {
			getList(){
				if(this.show.list_type=='order'){
					this.getData()
				}else{
					this.getDipatch()
				}
			},
			async getData(){
				if (this.show.type == "all") {
					this.options.type = ""
				} else {
					this.options.type = this.show.type
				}
				if (this.show.device_type == "all") {
					this.options.device_type = ""
				} else {
					this.options.device_type = this.show.device_type
				}
				let res = await this.$api.fault(this.options)
				if(res.data.code==0){
					for (var i = 0; i < res.data.data.list.length; i++) {
						var ech = await this.$api.devices({
							device_id: res.data.data.list[i].device_id,
							num: 10,
							page: 1
						})
						if (ech.data.data.list.length == 1) {
							res.data.data.list[i].device_name = ech.data.data.list[0].device_name
							res.data.data.list[i].IMEI = ech.data.data.list[0].IMEI
							res.data.data.list[i].cell_address = ech.data.data.list[0].cell_address
							res.data.data.list[i].ipaddr = ech.data.data.list[0].ip_country + ech.data.data.list[0].ip_region + ech.data.data
								.list[0].ip_city
							res.data.data.list[i].install_addr = ech.data.data.list[0].install_addr
						}
						ech = await this.$api.runtime({
							page: 1,
							num: 20,
							type: 8195,
							device_id: res.data.data.list[i].device_id
						})
					}
					this.list = res.data.data.list
					this.totalNumber = res.data.data.totalNumber
				}
			},
			async getDipatch(){
				if (this.show.type == "all") {
					this.options.type = ""
				} else {
					this.options.type = this.show.type
				}
				if (this.show.device_type == "all") {
					this.options.device_type = ""
				} else {
					this.options.device_type = this.show.device_type
				}
				let res = await this.$api.getRepair(this.options)
				if(res.data.code==0){
					for (var i = 0; i < res.data.data.list.length; i++) {
						var ech = await this.$api.devices({
							device_id: res.data.data.list[i].device_id,
							num: 10,
							page: 1
						})
						if (ech.data.data.list.length == 1) {
							res.data.data.list[i].device_name = ech.data.data.list[0].device_name
							res.data.data.list[i].IMEI = ech.data.data.list[0].IMEI
							res.data.data.list[i].cell_address = ech.data.data.list[0].cell_address
							res.data.data.list[i].ipaddr = ech.data.data.list[0].ip_country + ech.data.data.list[0].ip_region + ech.data.data
								.list[0].ip_city
							res.data.data.list[i].install_addr = ech.data.data.list[0].install_addr
						}
						ech = await this.$api.runtime({
							page: 1,
							num: 20,
							type: 8195,
							device_id: res.data.data.list[i].device_id
						})
					}
					this.list = res.data.data.list
					this.totalNumber = res.data.data.totalNumber
				}
			},
			pageChange(val) {
				this.options.page = val
				if(this.show.list_type=='order'){
					this.getData()
				}else{
					this.getDipatch()
				}
			},
			async search() {
				this.options.page = 1
				if(this.show.list_type=='order'){
					this.getData()
				}else{
					this.getDipatch()
				}
			},
			code() {
				this.$router.push({
					name: 'ctrlcode',
					params: {}
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.box-header {
		font-size: 20px;
	}

	.el-row {
		margin-bottom: 20px;
	}

	.grid-content {
		display: flex;
		align-items: center;
		height: 100px;
	}

	.grid-cont-right {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #999;
	}

	.grid-num {
		font-size: 30px;
		font-weight: bold;
	}

	.grid-con-icon {
		font-size: 50px;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		color: #fff;
	}

	.click {
		cursor: pointer;
	}

	.grid-con-1 .grid-con-icon {
		background: rgb(45, 140, 240);
	}

	.grid-con-1 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-2 .grid-con-icon {
		background: rgb(100, 213, 114);
	}

	.grid-con-2 .grid-num {
		color: rgb(145, 40, 240);
	}

	.grid-con-3 .grid-con-icon {
		background: rgb(242, 94, 67);
	}

	.grid-con-3 .grid-num {
		color: rgb(242, 94, 67);
	}

	.user-info {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 2px solid #ccc;
		margin-bottom: 20px;
	}

	.user-avator {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.user-info-cont {
		padding-left: 50px;
		flex: 1;
		font-size: 14px;
		color: #999;
	}

	.user-info-cont div:first-child {
		font-size: 30px;
		color: #222;
	}

	.user-info-list {
		font-size: 14px;
		color: #999;
		line-height: 25px;
	}

	.user-info-list span {
		margin-left: 70px;
	}

	.mgb20 {
		margin-bottom: 20px;
	}

	.todo-item {
		font-size: 14px;
	}

	.todo-item-del {
		text-decoration: line-through;
		color: #999;
	}

	.schart {
		width: 95%;
		height: 300px;
	}

	.pagination {
		position: absolute;
		margin-left: 30%;
		margin-top: 3%;
	}
	.fonts{
		font-size: 12px;
	}
</style>
