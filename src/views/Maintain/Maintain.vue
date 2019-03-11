<template>
	<div class="layout-content-main">
		<div>
			<Form class="imr" ref="form" label-position="left" :label-width="100" @keydown.enter.native.prevent="search()">
				<Row :gutter=5>
					<Col span='3'>
						<Select class="smr" v-model="show.state" style="width:100%;" placeholder="状态" @on-change="search()">
							<Option key="1" label="全部" value="all"></Option>
							<Option key="2" label="未接单" value="untreated"></Option>
							<Option key="3" label="已接单" value="treated"></Option>
						</Select>
					</Col>
					<Col span='3'>
						<Select class="smr" v-model="show.type" style="width:100%;" placeholder="事件类型" @on-change="search()">
							<Option key="1" label="全部" value="all"></Option>
							<Option key="2" label="故障" value="1"></Option>
							<Option key="3" label="保养" value="2"></Option>
							<Option key="4" label="校检" value="3"></Option>
						</Select>
					</Col>
					<Col span='3'>
						<Select class="smr" v-model="show.device_type" style="width:100%;" placeholder="设备类型" @on-change="search()">
							<Option key="1" label="全部" value="all"></Option>
							<Option key="2" label="控制器" value="door"></Option>
							<Option key="3" label="控制柜" value="ctrl"></Option>
						</Select>
					</Col>
					<Col span='4'>
						<AutoComplete class="handle-input mr10" v-model="options.device_id" :data="menu" @on-search="handleSearch1"
						 placeholder="按设备ID查询" style="width:100%;" id="serch1"></AutoComplete>
					</Col>
					<Col span='2'>
						<Button class="mr-10" type="primary" icon="ios-search" @click="search()">搜索</Button>
					</Col>
					<Col span='5'>
						<checkbox style="margin-top:10px" v-model="last" @on-change="search()">只显示每个设备最后一个工单</checkbox>
					</Col>
					<Col span='4'>
						<Button type="default" icon="" @click="code()">
							控制柜故障代码
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
		<el-dialog title="故障提示" :visible.sync="ctrl" width="30%">
			<img id='c' width="100%" src=''></img>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ctrl = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="故障提示" :visible.sync="door" width="30%">
			<img id='d' width="100%" src=''></img>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="door = false">确 定</el-button>
			</span>
		</el-dialog>
		<div style="min-height: 450px; margin-top: 20px;">
			<Table stripe class="mb-10" :columns="columns" :data="data" size="small"></Table>
		</div>
		<Col span='24' style="text-align: center;">
			<Page show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange"
			 show-total></Page>
		</Col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username:window.localStorage.getItem('username'),
				ctrl: false,
				door: false,
				last: true,
				color: [false, false, false, false, false, false],
				col: ['green', 'red', 'yellow', 'blue', 'gray', 'black'],
				menu: [],
				data: [],
				show: {
					state: 'untreated',
					type: 'all',
					device_type: 'all',
				},
				options: {
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state: '',
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
						title: '故障类型',
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
					}, {
						title: '状态',
						width: 80,
						key: 'state',
						render: (h, params) => {
							var state
							if (params.row.state == "treating") {
								state = '已接单'
							}
							if (params.row.state == "untreated") {
								state = '未接单'
							}
							if (params.row.state == "treated") {
								state = '已完成'
							}
							return h('div', state)
						}
					},
					{
						title: '安装地址',
						key: 'install_addr'
					},
					{
						title: '报错时间',
						key: 'createTime',
						render: (h, params) => {
							return h('p', this.$format(parseInt(params.row.createTime), 'YYYY-MM-DD HH:mm:ss'))
						}
					},
					{
						title: '操作',
						width: 100,
						render: (h, params) => {
							var order
							if (params.row.state == "untreated") {
								order = '接单'
							}
							if (params.row.state == "treating") {
								order = '已接单'
							}
							if (params.row.state == "treated") {
								order = '已完成'
							}
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: "small",
										disabled: (params.row.state != 'untreated' ||this.username == "demo"),
									},
									style: {
										marginRight: '10px',
									},
									on: {
										click: () => {
											// this.order(params.row)
											this.$router.push({
												name: 'order',
												params: {
													id: params.row.id
												}
											})
										},
									}
								}, order),
							])
						}
					}
				],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleSearch1() {
				this.menu = [];
				var str;
				for (var i = 0; i < this.list.length; i++) {
					str = this.list[i].device_id;
					if (str != null) {
						if (str.indexOf(this.options.search_info) >= 0)
							this.menu.push(str)
					}
				}
			},
			async getList() {
				if (this.show.state == "all") {
					this.options.state = ""
				} else {
					this.options.state = this.show.state
				}
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
				if (this.last) {
					this.options.islast = 1
				} else {
					this.options.islast = ''
				}
				this.loading = true
				let res = await this.$api.fault(this.options)
				this.loading = false
				if (res.data.code === 0) {
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
					this.data = res.data.data.list
					this.options.total = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: '错误',
						desc: '获取列表失败'
					});
				}
			},
			pageChange(val) {
				this.options.page = val
				this.getList()
			},
			async search() {
				this.options.page = 1
				this.getList()
			},
			code() {
				this.$router.push({
					name: 'ctrlcode',
					params: {}
				})
			},
			async checkcolor(c) {
				this.color[c] = !this.color[c]
				if (this.color[c]) {
					document.getElementById(this.col[c]).className = "fa fa-bookmark fa-2x"
				} else {
					document.getElementById(this.col[c]).className = "fa fa-tag fa-2x"
				}
				this.options.tagcolor = ''
				for (var i = 0; i < 6; i++) {
					if (this.color[i]) {
						if (this.options.tagcolor != '') {
							this.options.tagcolor = this.options.tagcolor + ';'
						}
						this.options.tagcolor = this.options.tagcolor + this.col[i]
					}
				}
				this.search()
			},
			// 					order(val){
			// 						this.$Modal.confirm({
			// 							title: '确定要接单吗',
			// 							content:val.device_name,
			// 							onOk: () => {
			// 								this.toorder(val)
			// 							},
			// 							onCancel: () => {
			// 							}
			// 						})	
			// 					},
			async toorder(val) {
				let res = await this.$api.order({
					order_id: val.id
				})
				if (res.data.code == 0) {
					this.$Notice.success({
						title: '成功',
						desc: '已接单，可在工单界面查看'
					});
					this.getList()
				} else {
					this.$Notice.error({
						title: '失败',
						desc: '接单失败'
					});
				}
			}
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

	.mr-10 {
		margin-left: 5px;
	}
</style>
