<template lang="jade">
	div.layout-content-main
		div
			Form(ref='form', label-position='left', :label-width='100' @keydown.enter.native.prevent="search()")
				Row(:gutter=5)
					Col(span="2")
						Select.smr(v-model='show.type', style='width:100%;', :placeholder='$t("maintenance type")', @on-change='search()')
							Option(key='1', :label="$t('all')", value='all')
							Option(key='2', :label="$t('fault')", value='1')
							Option(key='3', :label="$t('maintain')", value='2')
							Option(key='4', :label="$t('check')", value='3')
					Col(span="2")
							<!-- Select.smr(v-model='show.device_type', style='width:100%;', :placeholder='$t("device type")', @on-change='search()') -->
							<!-- Option(key='1', :label="$t('all')", value='all') -->
							<!-- Option(key='2', :label="$t('door')", value='door') -->
							<!-- Option(key='3', :label="$t('ctrl')", value='ctrl') -->
					Col(span="2")
							<!-- Select.smr(v-model='show.list_type', style='width:100%;', :placeholder='$t("type")', @on-change='getList()') -->
							<!-- Option(key='2', :label="$t('order auditing')", value='order') -->
							<!-- Option(key='3', :label="$t('dispatch auditing')", value='dispatch') -->
					Col(span="4")
						Input(v-model="options.search_info" ,:data="menu" ,:placeholder='$t("device name")+"、"+$t("install address")' max=15)
					Col(span="5")
						Button.mr-10(type='primary', icon='ios-search', @click='search()')|{{$t('search')}}
						Button(type='default', icon='', @click='code()')|{{$t('fault code')}}

		el-dialog(:title='$t("tip")',:visible.sync="showinfo",width="30%")
			div(style="margin-top:-30px")|{{showcode}}
			table(border='1' style="border-color: #000;width:100%;text-align: center;")
				tr(style="width:100%;height:16px;font-size:12px")
					td(style="color:#FF0000")|{{$t('Possible Reasons')}}
					td(style="color:#0000FF")|{{$t('Solution')}}
				tr(style="width:100%;height:16px;font-size:12px" v-for="item in codeinfo")
					td()|{{item.reason}}
					td()
						tr(v-for="ans in item.answer" style="border-color: #fff;width:100%")
							td(style="width:99%")|{{ans}}
		div(style='min-height: 450px; margin-top: 20px;')
			Table.mb-10(:columns='columns', :data='list2' stripe, size='small')
		Col(span="24" style="text-align:center;")
			page.fonts(show-elevator='', :total='totalNumber', :page-size='options.num', :current='options.page', @on-change='pageChange', show-total='')
</template>

<script>
	export default {
		data() {
			return {
				last: true,
				showinfo:false,
				showcode:'',
				codeinfo:[],
				color: [false, false, false, false, false, false],
				col: ['green', 'red', 'yellow', 'blue', 'gray', 'black'],
				menu: [],
				list:[],
				list2:[],
				totalNumber:0,
				show: {
					state: 'untreated',
					type: 'all',
					device_type: 'all',
					list_type:'dispatch',
				},
				options:{
					follow:'yes',
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state:'examined',
					type: '',
					device_type: '',
					device_id: '',
					islast: 1,
					item: window.localStorage.getItem('item'),
				},
				columns: [{
						title: this.$t('device name'),
						width: 110,
						key: 'device_name'
					}, {
						title: this.$t('IMEI'),
						width: 150,
						key: 'IMEI',
						sortable: true,
						render: (h, params) => {
							var sub='';
							if (params.row.IMEI !=null) {
								for (var j=0;j<params.row.IMEI.length;j++){
									if (params.row.IMEI.substring(j,j+1).charCodeAt()>1)
									sub=sub+params.row.IMEI.substring(j,j+1)
								}
							}	
							return h('div', sub)
						}
					}, {
						title: this.$t('device type'),
						width: 110,
						key: 'device_type',
						render: (h, params) => {
							var type = ''
							if (params.row.device_type == "240") type = this.$t('ctrl')
							if (params.row.device_type == "15") type = this.$t('door')
							return h('div', type)
						},
					}, {
						title: this.$t('maintenance type'),
						width: 140,
						key: 'device_type',
						render: (h, params) => {
							var type = ''
							if (params.row.type == "1") type = this.$t('fault')
							if (params.row.type == "2") type = this.$t('maintain')
							if (params.row.type == "3") type = this.$t('check')
							return h('div', type)
						}
					}, {
						title: this.$t('creator'),
						width: 100,
						key: 'producer',
						sortable: true
					}, {
						title: this.$t('fault code'),
						width: 100,
						key: 'type',
						render: (h, params) => {
							var type = ''
							var e = ''
							if ((params.row.type == '1') && (params.row.code != null)) {
								type = params.row.code.toString(16)
								if (params.row.device_type == "15"){
									if (type == '1') type='04'
									if (type == '2') type='07'
									if (type == '10') type='08'
									if (type == '20') type='03'
									if (type == '40') type='LV'
									if (type == '80') type='OV'
									if (type == 'b3') type='MO'
									e=type
								}
								else{
									if (type.length == 1) {
										type = '0' + type
									}
									e = 'E' + type
								}
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
											this.showcode=e+' '+this.$t(e)
											this.showinfo=true
											this.getcode(e)
										}
									}
								}, e)
							], )
						}
					},{
						title: this.$t('install address'),
						key: 'install_addr'
					},{
						title: this.$t('remarks'),
						key: 'remarks'
					},
					{
						title: this.$t('create time'),
						key: 'createTime',
						render: (h, params) => {
							return h('p', this.$format(parseInt(params.row.createTime), 'YYYY-MM-DD HH:mm:ss'))
						}
					},
					{
						title: this.$t('handle'),
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
								},this.$t('watch')),
							])
						}
					}
				],
			}

		},
		created() {
			this.getDipatch()
		},
		methods: {
			async getcode(val){
				let res= await this.$api.ordercode({code:val})
				if (res.data.code == 0){
					this.codeinfo=res.data.list
					this.codeinfo.forEach(item=>{
						item.answer=item.answer.split(';')
					})
				}
			},
			getList(){
				if(this.show.list_type=='order'){
					this.getData()
				}else{
					this.getDipatch()
				}
			},
			async getData(){
				if(this.show.type == "all"){
					this.options.type = ""
				}else{
					this.options.type = this.show.type
				}
				if(this.show.device_type == "all"){
					this.options.device_type = ""
				}else{
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
							res.data.data.list[i].device_type = ech.data.data.list[0].device_type
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
				}else{
					this.options.type = this.show.type
				}
				if(this.show.device_type == "all"){
					this.options.device_type = ""
				}else{
					this.options.device_type = this.show.device_type
				}
				let res = await this.$api.getRepair(this.options)
				if(res.data.code==0){
					this.list = res.data.data.list
					this.totalNumber = res.data.data.totalNumber
					if (this.list.length==0) {this.list2=this.list}
					for (var i = 0; i < res.data.data.list.length; i++) {
						this.getinfo(i)
					}
				}
			},
			async getinfo(i){
				var ech = await this.$api.devices({
					device_id: this.list[i].device_id,
					num: 10,
					page: 1
				})
				if (ech.data.data.list.length == 1) {
					this.list[i].device_name = ech.data.data.list[0].device_name
					this.list[i].IMEI = ech.data.data.list[0].IMEI
					this.list[i].device_type = ech.data.data.list[0].device_type
					this.list[i].cell_address = ech.data.data.list[0].cell_address
					this.list[i].ipaddr = ech.data.data.list[0].ip_country + ech.data.data.list[0].ip_region + ech.data.data.list[0].ip_city
					this.list[i].install_addr = ech.data.data.list[0].install_addr
				}
				var ord = await this.$api.fault({
					id: this.list[i].order_id,
					num: 10,
					page: 1
				})
				if (ord.data.code == 0){
					if (ech.data.data.list.length == 1) {
						this.list[i].type = ord.data.data.list[0].type
						this.list[i].producer = ord.data.data.list[0].producer
					}
				}
				if ((i+1)==this.list.length) {
					this.list2=this.list
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
