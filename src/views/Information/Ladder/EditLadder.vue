<template lang="jade">
	div
		div.box
			div.box-header.with-border
				p.box-title 电梯编辑
			div.form
				Row(:gutter="30")
					Col(span="8")
						Card()
							p(slot="title")|基本信息
							Form(:label-width="120")
								Row(:gutter="5")
									Col(span="20")
										Form-item(label="电梯名称：")
											Input(type='text', v-model="ladder.name" placeholder='请输入电梯名称')
										Form-item(label="安装地址：")
											Input(type='text', v-model="ladder.install_addr" placeholder='请输入安装地址')
						div.form-group
							Card()
								p(slot="title")|设备绑定
								Row(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary" @click='getList("240")')|控制柜
									Col(span=10)
										Input(type='text' v-model='ladder.ctrl' placeholder='控制柜IMEI')
								Row.mt-1(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary"  @click='getList("15")')|门机
									Col(span=10)
										Input(type='text' v-model='ladder.door1' placeholder='门机IMEI')
								Row.mt-1(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary"  @click='getList("15")')|门机
									Col(span=10)
										Input(type='text' v-model='ladder.door2' placeholder='门机IMEI')
								Row.mt-1(:gutter=5 style="text-align:center")
										Button(@click='NewLadder()' type='success')|完成
										Button.ml-5(@click="$router.back(-1)")|返回
					Col(span="16")
						Card()
							Row
								Row(:gutter=5)
									Col(span=3)
										Select.smr(v-model="show.state" style="width:100%" placeholder="状态" @on-change="getList()")
											Option(key="1" label="全部" value='all')
											Option(key="2" label="在线" value="online")
											Option(key="3" label="离线" value="offline")
											Option(key="4" label="长期离线" value="longoffline")
									Col(span=6)
										AutoComplete(name="inpSer" v-model="query.search_info" placeholder="关键词" max=15 style="width:100%" class="handle-input mr10" id="serch1")
									Col(span=4)
										Input(v-model="query.install_addr"  placeholder="安装地址" max=10)
									Col(span=10)
										Button.mr-10(type="primary",icon="ios-search",@click="search()" style="margin-left:1px")|搜索
								div.ssa
									Table(:columns="columns",:data="list",size="small" stripe)
								Col(span='24' style="text-align:center;")
									Page(show-elevator :total="options.total",:page-size="options.num",:current="query.page",@on-change="pageChange",show-total)
						
</template>

<script>
	export default {
		data () {
			const type = {
				15: '门机',
				240: '控制柜',
			};
			const model = {
				'online': '在线',
				'offline': '离线',
				'longoffline': '长期离线',
			};
			return {
				list: [],
				show:{
					state: 'online',
				},
				query:{
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state: 'online',
					device_type:"240",
					register: "registered",	
					install_addr:'',
				},
				columns: [
					{
						title: '设备名称',
						key: 'device_name',
						align:'left',
					},
					{
						title: 'IMEI(设备识别码)',
						key: 'IMEI',
					},
					{
						title: '设备类型',
						key: 'device_type',
						render: (h, params) => {
							return h('p', type[params.row.device_type] || '-')
						}
					},
					{
						title: '状态',
						key: 'state',
						render: (h, params) => {
							return h('p',model[params.row.state]||'')
						}
					},
					{
						title: '操作',
						key: 'companyName',
						align: 'center',
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
										click: () => {
											if(this.query.device_type == "240"){
												this.ladder.ctrl = params.row.IMEI
											}else if(this.query.device_type == "15" && this.ladder.door1 == ''){
												this.ladder.door1 = params.row.IMEI
											}else if(this.ladder.door1 != ''){
												this.ladder.door2 = params.row.IMEI
											}
										}
									}
								}, '选择'),
							]);
						}
					}
				],
				options: {
					name:'',
					page: 1,
					num: 10,
					total: 0,
					isreg: "True",
					model:'login',
					register: "registered",	
				},
				ladder:{
					name:'',
					ctrl:'',
					door1:'',
					door2:'',
					install_addr:'',
				},
			}
		},
		created() {
			this.getList("240")
		},
		methods: {
			async getList(item) {
				console.log(item)
				if(item!=null){
					this.query.device_type= item
				}
				if(this.show.state != "all"){
					this.query.state = this.show.state
				}else{
					this.query.state = ''
				}
				let res = await this.$api.devices(this.query);
				this.list=res.data.data.list;
				this.options.total = res.data.data.totalNumber
			},
			goRole(){
				this.$router.push({
					name: 'editrole',
				})
			},
			pageChange(val) {
				this.query.page = val
				this.getList()
			},
			async NewLadder(){
				let res = await this.$api.newLadder(this.ladder);
				if (res.data.code == 0) {
					this.$Notice.success({
						title: '成功',
						desc: '创建成功，可在电梯信息查看！'
					});
					this.$router.back(-1)
				}else{
					this.$Notice.error({
					title: '失败',
					desc: '创建失败'
					});
				}
			},
		}
	}
</script>

<style lang="css">
	.content{
		overflow: auto;
	}
	.lp{
		margin-right: 5px;
	}
	.layout-content-main{
		overflow-y: scroll !important;
	}
	.ssa{
		margin-top: 5px;
		min-height: 450px;
	}
</style>
