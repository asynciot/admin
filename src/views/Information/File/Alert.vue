<template lang="jade">
	div
		div.form
			Row(:gutter=30)
				Col(span=7)| &nbsp;
				Col(span=10)
					Card(style="height:500px")
						Col(span=24)
							Form(ref="form",:model="form",:rules="rules",:label-width="120")
								Row(:gutter="5")
									Col(span="20",offset="2")
										Form-item(:label="$t('device name')")|{{list.device_name}}
										Form-item(:label="$t('device type')" v-if="list.device_type==240")|{{$t('ctrl')}}
										Form-item(:label="$t('device type')" v-if="list.device_type==15")|{{$t('door')}}
										Form-item(:label="$t('IMEI')")|{{list.IMEI}}
										Form-item(:label="$t('Order Type')")
											RadioGroup(v-model="form.type")
												Radio(key="1", :label="$t('fault')" value='1')
												Radio(key="2", :label="$t('maintain')" value='2')
												Radio(key="3", :label="$t('check')" value='3')
										Form-item(:label="$t('fault code')" v-if="(form.type == $t('fault'))&&(list.device_type==15)" prop="door")
											Select(v-model="doorCode" style="width:200px")
												Option(v-for="item in dcode" ,:value="item.value" ,:key="item.value")|{{item.label}}
										Form-item(:label="$t('fault code')" v-if="(form.type != $t('fault'))&&(list.device_type==15)")
											Select(v-model="doorCode" style="width:200px" disabled)
												Option(v-for="item in dcode" ,:value="item.value" ,:key="item.value")|{{item.label}}
										Form-item(:label="$t('fault code')" v-if="(form.type == $t('fault'))&&(list.device_type==240)" prop="ctrl")
											Input(style="width:50px;" maxlength="2" v-model='ctrlfault')
										Form-item(:label="$t('fault code')" v-if="(form.type != $t('fault'))&&(list.device_type==240)")
											Input(style="width:50px" maxlength="2" readonly)
						Col(span=24)
							Col(span=12 align="center")
								Button(type="success",icon="plus",@click="sentalert()" v-if="up != true" disabled="false")|{{$t('Create order')}}
								Button(type="success",icon="plus",@click="sentalert()" v-else)|{{$t('Create order')}}
							Col(span=12 align='center')
								Button(icon="close",@click="$router.back(-1)")|{{$t('Cancel')}}
</template>

<script>
	export default{	
		data(){
			return{
				username:this.global.username,
				id:window.localStorage.getItem('id'),
				fault:[0,0,0,0,0,0,0,0],
				ctrlfault:'',
				form:{
					type:this.$t('fault'),
				},
				code:'',
				doorCode:'',
				dcode:[
					{
						value:'1',
						label:this.$t('dE1')
					},{
						value:'2',
						label:this.$t('dE2')
					},{
						value:'16',
						label:this.$t('dE10')
					},{
						value:'32',
						label:this.$t('dE20')
					},{
						value:'64',
						label:this.$t('dE40')
					},{
						value:'128',
						label:this.$t('dE80')
					},
				],
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
				file:'',
				filename:'',
				up:this.global.functions.work_up,
				
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
		methods:{
			async getData(){
				let res =await this.$api.devices({IMEI: this.$route.params.IMEI})
				if (0 === res.data.code) {
					this.list = res.data.data.list[0]
				}
			},
			async sentalert(){
				var type=''
				var device_type=''
				var fault=parseInt('0x'+this.ctrlfault)
				if (this.list.device_type == '240') {
					device_type ='ctrl'
				}
				if (this.list.device_type == '15') {
					device_type ='door'
				}
				if (this.form.type==this.$t('fault')) {
					type=1
					if(this.list.device_type == '15'){
						fault=this.doorCode
					}
				}else if (this.form.type==this.$t('maintain')) {
					type=2
					fault=''
				}else if (this.form.type==this.$t('check')) {
					type=3
					fault=''
				}
				let res = await this.$api.alert({code:fault,type:type,device_type:device_type,producer:this.username,device_id:this.list.device_id})
				let ret = await this.$api.fault({
					page: 1,
					num:10,
					search_info: '',
					isreg: "True",
					state: 'untreated',
					type: type,
					device_type: device_type,
					device_id: this.list.device_id,
					islast: 1,
				})
				this.id = ret.data.data.list[0].id
				let thr = await this.$api.orderExamine({id:this.id})
				if(res.data == 'ok'){
					this.$Notice.success({
						title: this.$t('success'),
						desc: ''
					});
					this.$router.back(-1)
				}else{
					if (res.data == 'already in db') {
						this.$Notice.error({
							title: this.$t('warning'),
							desc: this.$t('This device is in alert')
						});
						this.$router.back(-1)
					}
					else{
						if (res.data.code != 605){
							this.$Notice.error({
								title: this.$t('error'),
								desc: ''
							});
							this.$router.back(-1)
						}
					}
				}
			}
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
