<template>
	<div class="layout-content-main">
		<div>
		<Form class="imr" ref="form" label-position="left" :label-width="100">
		  <Row gutter="1">
		  <Col span='2'>
		  <Select class="smr" v-model="show.state" style="width:100%;" placeholder="状态" @on-change="search()">
		  <Option key="1" label="全部" value="all"></Option>
		  <Option key="2" label="未接单" value="treated"></Option>
		  <Option key="3" label="已接单" value="untreated"></Option>
		  </Select>
		  </Col>
		  <Col span='2'>
		  <Select class="smr" v-model="show.type" style="width:100%;" placeholder="故障类型" @on-change="search()">
		    <Option key="1" label="全部" value="all"></Option>
		    <Option key="2" label="输入电压过低" value="1"></Option>
			<Option key="3" label="输入电压过高" value="2"></Option>
			<Option key="4" label="开关门受阻" value="16"></Option>
			<Option key="5" label="飞车保护" value="32"></Option>
			<Option key="6" label="电机过载" value="64"></Option>
			<Option key="7" label="输出过流" value="128"></Option>
		  </Select>
		  </Col>
		  <Col span=4>
		  <AutoComplete class="handle-input mr10" v-model="options.search_info" :data="menu" @on-search="handleSearch1" placeholder="关键词" style="width:100%;" id="serch1"></AutoComplete>
		  </Col>
		  <Col span='1'>
		  <Button class="mr-10" type="default" icon="search" @click="search()"></Button>
		  </Col>
		
		  </Row>
		</Form>
		</div>
		<br></br>
		<div style="min-height: 450px;">
			<Table border class="mb-10" :columns="columns" :data="data" ></Table>
		</div>
		<Page class="pagination" show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>	  
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
					type:'',
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
								title: '设备名称',
								width: 120,
								key: 'device_name'
							},
							{
							title: '故障类型',
							width: 200,
							key: 'type',
							render: (h, params) => {
								var type=''
								var num = params.row.type
								for (var i=7;i>=0;i--){
									if (num>=Math.pow(2,i)) {
										num=num-Math.pow(2,i)
										if (i==7) {type=type+"输出过流;"}
										if (i==6) {type=type+"电机过载;"}
										if (i==5) {type=type+"飞车保护;"}
										if (i==4) {type=type+"开关门受阻;"}
										if (i==1) {type=type+"输入电压过高;"}
										if (i==0) {type=type+"输入电压过低;"}
									}
								}
								return h('div', type)
							}
							},{
							title: '状态',
							width: 80,
							key: 'state',	
							render: (h, params) => {
								var state
								if (params.row.state == "treated") {state = '已接单'}
								if (params.row.state == "untreated") {state = '未接单'}
								return h('div', state)
							}
							},
							{
								title: '报错时间',
								width: 160,
								key: 'createTime',
								render: (h, params) => {
									return h('p',this.$format(params.row.createTime, 'YYYY-MM-DD HH:mm:ss'))
								}
							},
							{
								title: 'IP定位',
								width: 120,
								key:'ipaddr'
							},
							{
								title: '基站定位',
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
								title: '操作',
								width: 100,
								render: (h, params) => {
									var order
									if (params.row.state == "untreated") {order = '接单'}
									if (params.row.state == "treated") {order = '已接单'}
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
												this.order(params.row)
											},
										}
									}, order),
// 										h('Button', {
// 											props: {
// 												type: 'primary',
// 												size: "small",
// 											},
// 											style: {
// 												marginRight: '10px',
// 											},
// 											on: {
// 												click: () => {
// 					
// 												},
// 											}
// 										}, '查看维保单位'),
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
			handleSearch1 () {
					this.menu=[];
					var str;
						for (var i=0;i<this.list.length;i++){
							str=this.list[i].IMEI;
							if (str != null){
								if (str.indexOf(this.options.search_info)>=0)
								this.menu.push(str)
							}
						}
						for (var i=0;i<this.list.length;i++){
						str=this.list[i].IMSI;
						if (str != null){
							if (str.indexOf(options.search_info)>=0)
							this.menu.push(str)
							}	        	
						}
						for (var i=0;i<this.list.length;i++){
						str=this.list[i].device_name;
						if (str != null){
							if (str.indexOf(options.search_info)>=0)
							this.menu.push(str)
							}	        	
						}
				},
					async getList() {
						var ech
						if (this.show.state=="all") {this.options.state=""}
						else {this.options.state=this.show.state}
						if (this.show.type=="all") {this.options.type=""}
						else {this.options.type=this.show.type}
						this.loading = true
						let res = await this.$api.fault(this.options)
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
					order(val){
						this.$Modal.confirm({
							title: '确定要接单吗',
							content:val.device_name,
							onOk: () => {
								this.toorder(val)
							},
							onCancel: () => {
							}
						})	
					},
					async toorder(val){
						let res = await this.$api.order({fault_id:val.id})
						if (res.data.code == 0) {
							this.$Notice.success({
							title: '成功',
							desc: '已接单，可在工单界面查看'
							});
							this.getList()
						}
						else {
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
