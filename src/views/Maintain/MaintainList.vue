<template>
	<div class="layout-content-main">
		<div>
		<Form class="imr" ref="form" label-position="left" :label-width="100">
		  <Row gutter="1">
		  <Col span='2'>
		  <Select class="smr" v-model="show.state" style="width:100%;" placeholder="状态" @on-change="search()">
		  <Option key="1" label="全部" value="all"></Option>
		  <Option key="2" label="维修中" value="untreated"></Option>
		  <Option key="3" label="已修复" value="treated"></Option>
		  </Select>
		  </Col>
		  <Col span='2'>
		  </Col>
		  <Col span='4'>
		  <AutoComplete class="handle-input mr10" v-model="options.search_info" :data="menu" @on-search="handleSearch1" placeholder="关键词" style="width:100%;" id="serch1"></AutoComplete>
		  </Col>
		  <Col span='1'>
		  <Button class="mr-10" type="default" icon="search" @click="search()"></Button>
		  </Col>
		  
		  </Row>
		</Form>
		</div>
		<div style="min-height: 450px; margin-top: 20px;">
			<Table border class="mb-10" :columns="columns" :data="data" size="small"></Table>
		</div>
		<Col span='6'>&nbsp;</Col>
		<Col span='18'>
		<Page  show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>	  
		</Col>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				color:[false,false,false,false,false,false],
				col:['green','red','yellow','blue','gray','black'],
				menu:[],
				data:[],
				show:{
					state:'',
				},
				options:{
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state:'',
					type:'',
				},
				columns: [ {
					title: '工单编号',
					key: 'id',
					width:90,
				},
				{
					title: '设备名称',
					key: 'device_name',
					width:120,
				},
				{
					title: '状态',
					key: 'state',
					width:80,
					render: (h, params) => {
						var state
						if (params.row.state == "treated") {state = '已修复'}
						if (params.row.state == "untreated") {state = '维修中'}
						return h('div', state)
					}
				},
				{
					title: '维保人员电话',
					key: 'phone',
					width: 140,
				},
				{
				title: '基站定位',
				// width: 260,
				key: 'cell_address',
				render: (h,params) => {
				var addr= params.row.cell_address
				if (params.row.cell_address !=null) {
				if(params.row.cell_address.length>=38){
					addr=item.cell_address.substring(0,38)+"…"
				}
				}
				return  h('Poptip',{
						props: {
							trigger:"hover",										
							placement:"top-start",
							content:params.row.cell_address
						},
					},addr)
				}
				},
				{
					title: '接单时间',
					key: 'create_time',
					width:150,
					render: (h, params) => {
						return h('p',this.$format(params.row.create_time, 'YYYY-MM-DD HH:mm:ss'))
					}
				},
				{
					title: '验收时间',
					key: 'finish_time',
					width:150,
					render: (h, params) => {
						return h('p',this.$format(params.row.finish_time, 'YYYY-MM-DD HH:mm:ss'))
					}
				},
				{
					title: '操作',
					key: 'companyName',
					width: 80,
					align: 'center',
					render: (h, params) => {
						var state
						if (params.row.state == "treated") {state = '已修复'}
						if (params.row.state == "untreated") {state = '完成'}
						return h('div', [
// 							h('Button', {
// 								props: {
// 									type: 'primary',
// 									size: 'small'
// 								},
// 								style: {
// 									marginRight: '5px'
// 								},
// 								on: {
// 									click: () => {
// 										this.$router.push({
// 											name: 'upkeepInfo',
// 											params: {
// 												id: params.row.id
// 											}
// 										})
// 									}
// 								}
// 							}, '查看'),
							h('Button', {
								props: {
									type: 'success',
									size: 'small',
									disabled: (params.row.state == "treated"),
								},			
								on: {
									click: () => {
										this.$Modal.confirm({
											title: '是否完成？',
											content: '<p>请确保设备功能恢复正常</p>',
											onOk: () => {
												params.row.state="treated"
												state='已修复'
												this.finish(params.row)											
											},
											onCancel: () => {
											}
										})	
									}
								}
							}, state)
						]);
					}
				}
				],
			}
			
		},
		created() {
			this.getList()
		},
		methods: {
			handleSearch1 (selectword) {
					this.menu=[];
					var str;
						for (var i=0;i<this.list.length;i++){
							str=this.list[i].IMEI;
							if (str != null){
								if (str.indexOf(selectword)>=0)
								this.menu.push(str)
							}
						}
						for (var i=0;i<this.list.length;i++){
						str=this.list[i].IMSI;
						if (str != null){
							if (str.indexOf(selectword)>=0)
							this.menu.push(str)
							}	        	
						}
						for (var i=0;i<this.list.length;i++){
						str=this.list[i].device_name;
						if (str != null){
							if (str.indexOf(selectword)>=0)
							this.menu.push(str)
							}	        	
						}
				},
				async finish(val) {
					let res = await this.$api.finish({id:val.fault_id})
					if (res.data.code == 0){
						this.$Notice.success({
							title: '成功',
							desc: '完成工单'
						});
						this.getList()
					}
					else{
						this.$Notice.error({
							title: '错误',
							desc: '发生错误'
						});
						this.getList()
					}
				},
				async getList() {
					this.loading = true
					if (this.show.state=="all") {this.options.state=""}
					else {this.options.state=this.show.state}
					let res = await this.$api.repair(this.options)
					var ech
						this.loading = false
						if (res.data.code === 0) {
							for (var i=0;i<res.data.data.list.length;i++) {
								ech = await this.$api.devices({device_id:res.data.data.list[i].device_id,num:10,page:1}),
								res.data.data.list[i].device_name = ech.data.data.list[0].device_name
								res.data.data.list[i].cell_address = ech.data.data.list[0].cell_address
								res.data.data.list[i].ipaddr = ech.data.data.list[0].ip_country+ech.data.data.list[0].ip_region+ech.data.data.list[0].ip_city
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
					async checkcolor(c) {
						this.color[c]=!this.color[c]
						if (this.color[c]) {
							document.getElementById(this.col[c]).className="fa fa-bookmark fa-2x"
						}
						else {
							document.getElementById(this.col[c]).className="fa fa-tag fa-2x"
						}
						this.options.tagcolor=''
						for (var i=0;i<6;i++) {
						if (this.color[i]) {
							if (this.options.tagcolor!='') {
								this.options.tagcolor=this.options.tagcolor+';'
								}
							this.options.tagcolor=this.options.tagcolor+this.col[i]
						}
						}
						this.search()
					},
		}
		
	}
</script>

<style lang="scss" scoped>
	.box-header{
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
	.click{
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
</style>
