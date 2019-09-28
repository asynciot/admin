<template>
	<div class="layout-content-main">
		<div style="min-height: 450px; margin-top: 20px;">
			<Table stripe class="mb-10" :columns="columns" :data="data" size="small"></Table>
			<Page show-total :total="total" :page-size="num" :current="page" @on-change="pageChange" style="text-align:center;margin-top: 20px;"></Page>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			const type = {
				15: this.$t('door'),
				240: this.$t('ctrl'),
			};
			return{
				total:0,
				num:10,
				page:1,
				columns: [
					{
						title: this.$t('order ID'),
						key: 'order_id',
						width:90,
					},
					{
						title: this.$t('device name'),
						key: 'device_name',
						width:120,
					},
					{
						title: this.$t('IMEI'),
						key: 'IMEI',
						width:150,
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
					},
					{
						title: this.$t('state'),
						key: 'state',
						width:140,
						render: (h, params) => {
							var state
							if (params.row.state == "treated") {state = this.$t('finished')}
							if (params.row.state == "treating"){state = this.$t('treating')}
							if (params.row.state == "untreated") {state = this.$t('untreated')}
							if (params.row.state == "examined") {state = this.$t('examined')}
							if (params.row.state == "prepare") {state = this.$t('reprieve')}
							return h('div', state)
						}
					},
					{
						title: this.$t('type'),
						key: 'device_type',
						width: 80,
						render:(h,params)=>{
							return h('p',type[params.row.device_type])
						}
					},
					{
						title: this.$t('install address'),
						key: 'install_addr',
					},
					{
						title: this.$t('accept time'),
						key: 'create_time',
						width:150,
						render: (h, params) => {
							return h('p',this.$format(parseInt(params.row.create_time), 'YYYY-MM-DD HH:mm:ss'))
						}
					},
					{
						title: this.$t('finish time'),
						key: 'finish_time',
						width:170,
						render: (h, params) => {
							var time=''
							var color='#000'
							if (params.row.expect_time != null){
								time=this.$t('About ') + this.$format(parseInt(params.row.expect_time), 'YYYY-MM-DD HH:mm:ss')
								if (parseInt(params.row.expect_time)+86400000<Date.parse(new Date())){color='#f00'}
								}
							if (params.row.finish_time != null){time=this.$format(parseInt(params.row.finish_time), 'YYYY-MM-DD HH:mm:ss');color="#000"}
							return h('div',{style:{color: color}},time)
						}
					},
					{
						title: this.$t('handle'),
						key: 'companyName',
						width: 115,
						align: 'center',
						render: (h, params) => {
							var state
								if (params.row.state == "treated") {state = this.$t('treated')}
								if (params.row.state == "untreated") {state = this.$t('finish')}
								var show=this.$t('watch')
								if (params.row.state=="treating"){show=this.$t('confirm')}
								return h('div', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small',
											},			
											on: {
												click: () => {
													this.$router.push({
														name: 'finish',
														params: {
															id: params.row.id										
														}
													})
												}
											}
									}, show)
								]);
						}
					}
				],
                data: [],
				mydata:[],
				counter:0,
			}
		},
		created(){
			this.getList()
		},
		methods:{
			pageChange(val) {
				this.page = val
				this.getList()
			},
			async getList(){
				this.counter=0
				let res = await this.$api.dispatchhistory({num:this.num,page:this.page,id:this.$route.params.id})
				this.mydata=res.data.data.list
				this.total = res.data.data.totalNumber
				console.log(this.total)
				if(res.data.code===0){
					for(var i=0;i<res.data.data.list.length;i++){
						
						this.getname(i)
					}
				}else {
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Fail to get List')
					});
				}
			},
			async getname(val) {
				var ech = await this.$api.devices({
					device_id: this.mydata[val].device_id,
					num: 1,
					page: 1
				})
				if (ech.data.data.list.length == 1) {
					this.mydata[val].device_name = ech.data.data.list[0].device_name
					this.mydata[val].IMEI = ech.data.data.list[0].IMEI
					this.mydata[val].cell_address = ech.data.data.list[0].cell_address
					this.mydata[val].ipaddr = ech.data.data.list[0].ip_country + ech.data.data.list[0].ip_region + ech.data.data.list[0].ip_city
					this.mydata[val].install_addr = ech.data.data.list[0].install_addr
					this.mydata[val].device_type=ech.data.data.list[0].device_type
				}
				this.counter++
				if (this.counter == this.mydata.length) {
					this.data=this.mydata
					}
			}
		}
	}
</script>

<style>
</style>
