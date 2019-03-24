<template lang="jade">
	div
		div.box
			div.box-header.with-border
				p.box-title 添加到已有电梯
			div.form
				Row(:gutter="30")
					Col(span="8")
						Card()
							p(slot="title")|基本信息
							Form(:label-width="120")
								Row(:gutter="5")
									Col(span="20")
										Form-item(label="电梯名称：")
											Input(type='text', v-model="ladder.name" placeholder='请输入电梯名称' disabled)
										Form-item(label="安装地址：")
											Input(type='text', v-model="ladder.install_addr" placeholder='请输入安装地址' disabled)
						Card(style="margin-top:10px;")
							p(slot="title")|设备替换
							Form(:label-width="120")
								Row(:gutter="5")
									Col(span="20")
										Form-item(label="请选择要替换的设备")
							Row(:gutter=5)
								Col(span=6 offset=3)
									Button(type="primary" @click='cover(1)')|控制柜
								Col(span=10)
									Input(type='text' v-model='ladder.ctrl' placeholder='控制柜IMEI')
							Row.mt-1(:gutter=5)
								Col(span=6 offset=3)
									Button(type="primary"  @click='cover(2)')|门机
								Col(span=10)
									Input(type='text' v-model='ladder.door1' placeholder='门机IMEI')
							Row.mt-1(:gutter=5)
								Col(span=6 offset=3)
									Button(type="primary"  @click='cover(3)')|门机
								Col(span=10)
									Input(type='text' v-model='ladder.door2' placeholder='门机IMEI')
							Row.mt-1(:gutter=5 style="text-align:center")
									Button(@click='NewLadder()' type='success')|完成
									Button.ml-5(@click="$router.back(-1)")|返回
					Col(span="16")
						Card()
							Row
								Row(:gutter=5)
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
			return {
				list: [],
				show:{
					state: 'online',
				},
				query:{
					search_info: '',
					page: 1,
					num: 10,
				},
				columns: [
					{
						title: '设备名称',
						key: 'name',
                        fixed: 'left',
                        width: 100,
					},
					{
						title: '控制柜',
						key: 'ctrl',
                        width: 150,
					},
					{
						title: '门机',
						key: 'door1',
                        width: 150,
					},
					{
						title: '门机',
						key: 'door2',
                        width: 150,
					},
					{
						title: '安装地址',
						key: 'install_addr',
                        width: 200,
					},
					{
						title: '操作',
						key: 'companyName',
						align: 'center',
                        width: 100,
                        fixed: 'right',
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
											this.ladder.name = params.row.name
											this.ladder.install_addr = params.row.install_addr
											this.ladder.ctrl = params.row.ctrl
											this.ladder.door1 = params.row.door1
											this.ladder.door2 = params.row.door2
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
				coverladder:'',
			}
		},
		created() {
			this.getList()
		},
		methods: {
			async getList() {
				let res = await this.$api.readLadder(this.query);
				this.list=res.data.data.list;
				this.options.total = res.data.data.totalNumber
			},
			cover(item){
				const i =  this.$route.params.IMEI
				if(item == 1){
					this.coverladder = this.ladder.ctrl
				}else if(item == 2){
					this.coverladder = this.ladder.door1
				}else if(item == 3){
					this.coverladder = this.ladder.door2
				}
				this.$Modal.confirm({
					title: '设备替换',
					content:'你确定要将 '+this.coverladder+' 替换成 '+i+' 设备么？',
					onOk: () => {
						if(item == 1){
							this.ladder.ctrl = i
						}else if(item == 2){
							this.ladder.door1 = i
						}else if(item == 3){
							this.ladder.door2 = i
						}
					},
					onCancel: () => {
					}
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
