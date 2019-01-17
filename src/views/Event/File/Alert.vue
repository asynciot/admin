<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=7)| &nbsp;
				Col(span=10)
					Card(style="height:500px")
						Col(span=24)
							Form(ref="form",:model="form",:rules="rules",:label-width="120")
								Row(:gutter="5")
									Col(span="20",offset="2")
										Form-item(label="设备名称")|{{list.device_name}}
										Form-item(label="设备类型" v-if="list.device_type==240")|控制柜
										Form-item(label="设备类型" v-if="list.device_type==15")|控制器
										Form-item(label="IMEI号")|{{list.IMEI}}
										Form-item(label="工单类型")
											RadioGroup(v-model="form.type")
												Radio(key="1" label="故障" value='1')
												Radio(key="2" label="保养" value='2')
												Radio(key="3" label="校检" value='3')
										Form-item(label="故障原因" v-if="((form.type != '故障')&&(list.device_type==15))")
											Col(span=12)
												checkbox(disabled)|输入电压过低
											Col(span=12)
												checkbox(disabled)|输入电压过高
											Col(span=12)
												checkbox(disabled)|开关门受阻
											Col(span=12)
												checkbox(disabled)|飞车保护
											Col(span=12)
												checkbox(disabled)|电机过载
											Col(span=12)
												checkbox(disabled)|输出过流
										Form-item(label="故障原因" v-if="((form.type == '故障')&&(list.device_type==15))")
											Col(span=12)
												checkbox(v-model='fault[0]')|输入电压过低
											Col(span=12)
												checkbox(v-model='fault[1]')|输入电压过高
											Col(span=12)
												checkbox(v-model='fault[4]')|开关门受阻
											Col(span=12)
												checkbox(v-model='fault[5]')|飞车保护
											Col(span=12)
												checkbox(v-model='fault[6]')|电机过载
											Col(span=12)
												checkbox(v-model='fault[7]')|输出过流
										Form-item(label="故障代码" v-if="((form.type == '故障')&&(list.device_type==240))")
											input(style="width:50px" maxlength="2" v-model='ctrlfault' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
										Form-item(label="故障代码" v-if="((form.type != '故障')&&(list.device_type==240))")
											input(style="width:50px" maxlength="2" onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')" readonly)
						Col(span=24)
							Col(span=12 align="center")
								Button(type="success",icon="plus",@click="sentalert()")|创建工单
							Col(span=12 align='center')
								Button(icon="close",@click="$router.back(-1)")|取消
</template>

<script>
	export default{	
		data(){
			return{
				username:window.localStorage.getItem('username'),
				id:window.localStorage.getItem('id'),
				fault:[0,0,0,0,0,0,0,0],
				ctrlfault:'',
				form:{
					type:'故障',
				},
				faultcode:false,
				list:[],
				query:{
					username:window.localStorage.getItem('username'),
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
			async getData(){
				let res =await this.$api.devices({IMEI: this.$route.params.IMEI})
				if (0 === res.data.code) {
				this.list = res.data.data.list[0]
				}
				else{}
			},
			async sentalert(){
				var type=''
				var device_type=''
				var fault
				if (this.list.device_type == '15'){
					fault=this.fault[7]*128+this.fault[6]*64+this.fault[5]*32+this.fault[4]*16+this.fault[1]*2+this.fault[0]
				}
				if (this.list.device_type == '240'){
					fault=parseInt('0x'+this.ctrlfault)
				}
				if (this.list.device_type == '240') {device_type ='ctrl'}
				if (this.list.device_type == '15') {device_type ='door'}
				if (this.form.type=='故障') {type=1}
				if (this.form.type=='保养') {type=2}
				if (this.form.type=='校检') {type=3}
				let res = await this.$api.alert({code:fault,type:type,device_type:device_type,producer:this.username,device_id:this.list.device_id})
				if(res.data == 'ok'){
					this.$Notice.success({
						title: '成功',
						desc: '发送成功，等待处理'
					});
					this.$router.back(-1)
				}
				else{
					if (res.data == 'already in db') {
						this.$Notice.error({
							title: '失败',
							desc: '该设备已经告警'
						});
					}
					else{
						this.$Notice.error({
							title: '失败',
							desc: '发送失败'
						});
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
