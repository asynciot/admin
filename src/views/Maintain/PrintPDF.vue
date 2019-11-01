<template lang="jade">
	Card(style="min-height:1500px")
		Div(id="test")
			Col(span=24)
				Form(ref="form",:model="form",:label-width="120")
					Row(:gutter="0")
						Col(span="24",offset="0")
							Col(span="8" style="margin-top:10px")|{{$t('order ID')}}:{{list.order_id}}
							Col(span="8" style="margin-top:10px")|{{$t('device name')}}:{{list.device_name}}
							Col(span="8" style="margin-top:10px")|IMEI:{{list.IMEI}}
							Col(span="8" style="margin-top:10px" v-if="list.state == 'treated'")|{{$t('state')}}:{{list.result}}
							Col(span="8" style="margin-top:10px" v-if="list.state == 'untreated'")|{{$t('state')}}:{{$t('treating')}}
							Col(span="8" style="margin-top:10px")|{{$t('confirm time')}}:{{list.confirm_time}}
							Col(span='24' style="margin-top:10px")
								textarea(v-model='ps' style="width:100%;height:60px", :placeholder="$t('Description of maintenance')")
						Col(span=12 style="margin-top:10px")|{{$t('photo before treating')}}:
						Col(span=12 style="margin-top:10px")|{{$t('photo after treating')}}:
						Col(span=12)
							//upload(:before-upload='before1')
							img(id="before1" src='../../assets/add.jpg' style="height:100%; width:100%;")
						Col(span=12)
							//upload(:before-upload='after1')
							img(id="after1" src='../../assets/add.jpg' style="height:100%; width:100%;")

</template>

<script>
	export default {
		data() {
			return {
				form:{
					type:'1',
				},
				list:[],
				ps:'',
			}
		},
		computed: {
			role() {
				return this.username === 'admin' ? '超级管理员' : '普通用户';
			},
		},
		created(){
			this.getData();
		},
		mounted(){

		},
		methods:{
			async getData(){
				let res =await this.$api.getRepair({id:this.$route.params.id,page:1,num:1})
				if (res.data.code === 0) {
					let ech = await this.$api.devices({device_id:res.data.data.list[0].device_id,num:10,page:1})
					res.data.data.list[0].device_name = ech.data.data.list[0].device_name
					res.data.data.list[0].IMEI = ech.data.data.list[0].IMEI
					res.data.data.list[0].install_addr = ech.data.data.list[0].install_addr
					res.data.data.list[0].cell_address = ech.data.data.list[0].cell_address
					if (res.data.data.list[0].result == 'transfer') {
						res.data.data.list[0].result=this.$t('transferred')
					}else {
						res.data.data.list[0].result=this.$t('treated')
					}
					this.list = res.data.data.list[0]
					document.getElementById('before1').src='http://server.asynciot.com/getfile?filePath='+this.list.before_pic;
					document.getElementById('after1').src='http://server.asynciot.com/getfile?filePath='+this.list.after_pic;
					setTimeout(()=>{
						window.print();
					},1500)
				} else {
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Fail to get List')
					});
				}

			},
		}
	}
</script>

<style scoped>

</style>
