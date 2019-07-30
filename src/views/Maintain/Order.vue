<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=7)| &nbsp;
				Col(span=10)
					Card(style="height:540px")
						Col(span=24)
							Form(ref="form",:model="form",:rules="rules",:label-width="120")
								Row(:gutter="5")
									Col(span="20",offset="2")
										Form-item(:label="$t('device name')+':'")|{{list.device_name}}
										Form-item(:label="$t('device type')+':'" v-if="list.device_type==240")|{{$t('ctrl')}}
										Form-item(:label="$t('device type')+':'" v-if="list.device_type==15")|{{$t('door')}}
										Form-item(label="IMEI:")|{{list.IMEI}}
										Form-item(:label="$t('maintenance type')+':'")|{{list.type}}
										Form-item(:label="$t('fault code')+':'" v-if="list.type == $t('fault')")|{{list.code}}
										Form-item(:label="$t('base station')+':'")|{{list.cell_address}}
										Form-item(:label="$t('install address')+':'")|{{list.install_addr}}
										Form-item(:label="$t('Expect time')+':'")
											DatePicker(type="date", :placeholder="$t('Expect time')" format="yyyy-MM-dd" v-model="expect" style='' @on-change="check()")

						Col(span=24)
							Col(span=12 align="center")
								Button(type="success",icon="plus",@click="order()")|{{$t('receive')}}
							Col(span=12 align='center')
								Button(icon="close",@click="$router.back(-1)")|{{$t('cancel')}}
</template>

<script>
	export default{	
		data(){
			return{
				username:this.global.username,
				id:window.localStorage.getItem('id'),
				mobile:window.localStorage.getItem('mobile'),
				fault:[0,0,0,0,0,0,0,0],
				form:{
					type:'1',
				},
				faultcode:false,
				list:[],
				query:{
					username:this.global.username,
					name:'',
				},
				ladList:[],
				ladder:{
					name:'',
					page: 1,
					num: 300,
					total: 0,
				},
				expect:'',
				file:'',
				filename:'',
				upsuccess:false,
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
			//document.getElementById('image').src=this.file
		},
		methods:{
			code(){
				if (this.form.type == '1'){
					this.faultcode=false;
				}
				else {
					this.faultcode=true;
				}
			},
			check(){
				if (Date.parse(this.expect)+86400000<Date.parse(new Date())){
					this.$Notice.warning({
						title: this.$t('Today or after today.'),
						desc: this.$t('This item can be empty.'),
						})
					this.expect=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
				}
			},
			async getData(){
				let res = await this.$api.fault({num:1,page:1,id:this.$route.params.id})
				if (0 === res.data.code) {
					let ech = await this.$api.devices({device_id:res.data.data.list[0].device_id,num:10,page:1})
					res.data.data.list[0].device_name = ech.data.data.list[0].device_name
					res.data.data.list[0].device_type = ech.data.data.list[0].device_type
					res.data.data.list[0].IMEI = ech.data.data.list[0].IMEI
					if(res.data.data.list[0].type == 1){
						res.data.data.list[0].type = this.$t('fault')
					}
					if(res.data.data.list[0].type == 2){
						res.data.data.list[0].type = this.$t('maintain')
					}
					if(res.data.data.list[0].type == 3){
						res.data.data.list[0].type = this.$t('check')
					}
					res.data.data.list[0].cell_address = ech.data.data.list[0].cell_address
					res.data.data.list[0].ipaddr = ech.data.data.list[0].ip_country+ech.data.data.list[0].ip_region+ech.data.data.list[0].ip_city
					res.data.data.list[0].install_addr = ech.data.data.list[0].install_addr
					if((res.data.data.list[0].type == this.$t('fault'))&&(res.data.data.list[0].code != null)){
						if (res.data.data.list[0].device_type=='15') {res.data.data.list[0].code=this.$t('dE'+res.data.data.list[0].code.toString(16))}
						if (res.data.data.list[0].device_type=='240') {res.data.data.list[0].code=this.$t('E'+res.data.data.list[0].code.toString(16))}
					}
					this.list = res.data.data.list[0]
				}
				else{}
			},
			async order(){
				var time = ''
				if (this.expect != '') {time =Date.parse(this.expect).toString()}
				let res = await this.$api.order({order_id:this.list.id,mobile:this.mobile,expect_time:time})
				if (res.data.code == 0) {
					this.$Notice.success({
					title: this.$t('success'),
					desc: ''
					});
					this.$router.back(-1)
				}
				else {
					this.$Notice.error({
					title: this.$t('fail'),
					desc: ''
					});
				}
			},
		}
	}	
</script>

<style lang="scss" scoped>
	.inline{
		display: inline-block;
	}
	.username{
		font-size: 30px;
		color: #222;
		display: inline-block;
	}
	.role{
		font-size: 14px;
		color: #999;
		display: inline-block;
	}
	
</style>
