<template>
	<div class="layout-content-main">
		<div>
			<Form class="imr" ref="form" label-position="left" :label-width="100">
				<Row gutter="1">
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
						 placeholder="按设备名称,安装地址查询" style="width:100%;" id="serch1"></AutoComplete>
					</Col>
					<Col span='1'>
						<Button class="mr-10" type="default" icon="search" @click="search()"></Button>
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
			<Table border class="mb-10" :columns="columns" :data="data" size="small"></Table>
		</div>
		<Col span='6'>&nbsp;</Col>
		<Col span='18'>
		<Page show-elevator :total="data.length" :page-size="options.num" :current="options.page" @on-change="pageChange" class="fonts"
		 show-total></Page>
		</Col>
	</div>
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
				data: [{
						IMEI: "868998030425132",
						device_name: "01B-N0001",
						install_addr: "门机实验室",
						code: 2,
						createTime: "1550121375478",
						device_id: 3,
						device_type: "door",
						id: 149,
						islast: 1,
						producer: "admin",
						state: "untreated",
						type: 1,
					}
				],
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
							var order
							if (params.row.state == "untreated") {
								order = '同意'
							}
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: "small",
										disabled: (params.row.state != 'untreated'),
									},
									style: {
										marginRight: '10px',
									},
									on: {
										click: () => {
											this.$router.push({
												name: 'auditing',
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

			pageChange(val) {
				this.options.page = val
				// this.getList()
			},
			async search() {
				this.options.page = 1
				// this.getList()
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
