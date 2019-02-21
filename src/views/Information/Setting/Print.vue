<template>
<div class="layout-content-main">
	<Tabs value="name1" :animated="false" @on-click="Onchange">
		<TabPane label="烧录" name="setting"></TabPane>
		<TabPane label="打印" name="print"></TabPane>
	</Tabs>
	<div class="form" padding-top="100">
		<AutoComplete v-model="query.search_info" :data="menu" @on-search="handleSearch1" placeholder="input here" style="width:200px"></AutoComplete>
		<Button class="mr-10" type="default" icon="search" @click="search()"></Button>
		<br> </br>
	<Table class="mb-10" :columns="columns" :data="data" ></Table>
	<Page style="padding-right: 38%;" class="pagination" show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>
	<div id="capture"></div>
	<div id="printer">
		<img :src="dataUrl">
		<p v-text="id"></p>
		<p>微信扫码</p>
	</div>
	</div>
</div>
</template>

<script>
	// import html2canvas from 'html2canvas'
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			const type = {
				15: '控制器',
				240: '控制柜',
			};
			const netWork = {
				3: '联通3G',
				40: '移动4G',
				41: '联通4G',
			};
			return {
				menu: [],
				loading: false,
				url: '',
				id: '',
				dataUrl: '',
				query: {
					search_info: '',
					page: 1,
					num: 10,
					select_type:'',
					select_status:'',
		    	},
				options: {
					page: 1,
					num: 10,
					total: 0,
				},
				columns: [{
						title: '编号',
						key: 'id'
					}, {
						title: 'IMEI',
						key: 'IMEI'
					},{
						title: 'IMSI',
						key: 'IMSI'
					},{
						title: '设备名称',
						key: 'device_name'
					},
					{
						title: '网络类型',
						key: 'networkType',
						render: (h, params) => {
							return h('p', netWork[params.row.networkType] || '')
						}
					},
					{
						title: '创建时间',
						key: 'createTime',
						render: (h, params) => {
							return h('p', this.$format(params.row.createTime, 'YYYY-MM-DD HH:mm:ss'))
						}
					},
					{
						title: '操作',
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'primary',
									size: "small",
								},
								on: {
									click: () => {
										this.print(params.row)
									}
								}
							}, '打印')
						}
					}
				],
				data: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleSearch1 (selectword) {
		  		this.menu=[];
		  		var str;
		        for (var i=0;i<this.data.length;i++){
		        	str=this.data[i].IMEI;
		        	if (str != null){
		        		if (str.indexOf(selectword)>=0)
		        		this.menu.push(str)
		        	}
		  	    	str=this.data[i].device_name;		  	    	
		        	if (str != null){
		        		if (str.indexOf(selectword)>=0){
		        		this.menu.push(str)
		        		}
		        	}  
		        }
		    },
			pageChange(val) {
				this.options.page = val
				this.getList()
			},
			async getList() {
				this.loading = true
				let res = await this.$api.devices(this.options)
				this.loading = false
				if (res.data.code === 0) {
					this.data = res.data.data.list
					this.options.total = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: '错误',
						desc: '获取列表失败'
					});
				}
			},
			async search() {
				this.loading = true
				let res = await this.$api.devices(this.query)
				this.loading = false
				if (0 === res.data.code) {
					this.data = res.data.data.list
					// this.options.total = res.data.data.totalNumber
				}
			},	
			async print(item) {
				$("#capture").empty();
				this.id = item.id
				this.url = `http://ladder.asynciot.com/company/follow/${item.id}`
				// $('#capture').qrcode({
				//   // render: "table",
				//   text: this.url
				// });
				let code = new QRCode(document.getElementById("capture"), {
					text: `http://ladder.asynciot.com/company/follow/${item.id}`,
					// width: '4cm',
					// height: '4cm',
				})
				let canvas = document.querySelector("#capture canvas")
				const data = canvas.toDataURL("image/png")
				this.dataUrl = data;

				$('#printer').printThis({
					debug: false,
					importCSS: true,
					importStyle: true,
					loadCSS: "",
					pageTitle: `宁波申菱电梯${item.id}二维码`,
				})
			},
			Onchange: function(val) {
				this.$router.push({
					name: val,
				})
			}
		}
	}
</script>
<style scoped>
	.mb-10 {
		margin-bottom: 20px;
	}

	#capture,
	#printer {
		display: none;
	}

	#printer {
		width: 5cm;
		height: 5cm;
		text-align: center;
	}

	#printer img {
		height: 4cm;
		width: 4cm;
	}

	#printer p {
		height: 0.5cm;
		width: 100%;
		text-align: center;
	}

	@media print {
		#printer {
			display: block;
		}
	}
</style>
