<template lang="jade">
div.layout-content-main
	div.form
		Row(:gutter="30")
			Col(span="16")
				Card()
					p(slot="title")|基本信息
					Row(:gutter="30")
						Col(span="12")|名称:
							input(v-model="list.device_name" style="border: 0" @input="update()")
						Col(span="12")|IMEI:
							input(v-model="list.IMEI" style="border: 0")
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|梯种:
							input( style="border: 0")
						Col(span="12")|品牌:
							input( style="border: 0")
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|型号:
							input( style="border: 0")
				Card(v-if="list.device_type == 15")
					p(slot="title")|参数信息
					Row(:gutter="30")
						Col(span="12")|报告时间:
							input(v-model="parameter.reporttime" style="border: 0" readonly)
						Col(span="12")|信号强度:
							input(v-model="parameter.rssi" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|最新事件ID:
							input(v-model="parameter.waveid" style="border: 0" readonly)
						Col(span="12")|缓存中的事件数:
							input(v-model="parameter.wavenumber" style="border: 0" readonly)
				Card(v-if="list.device_type == 240")
					p(slot="title")|参数信息
					Row(:gutter="30")
						Col(span="12")|报告时间:
							input(v-model="parameter.reporttime" style="border: 0" readonly)
						Col(span="12")|信号强度:
							input(v-model="parameter.rssi" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|累计运行次数:
							input(v-model="parameter.runcount" style="border: 0" readonly)
						Col(span="12")|累计运行时间:
							input(v-model="parameter.uptime" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|最近故障类型:
							input(v-model="parameter.faultcode" style="border: 0" readonly)
						Col(span="12")|最近故障楼层:
							input(v-model="parameter.faultfloor" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|最近故障时间:
							input(v-model="parameter.faulttime" style="border: 0" readonly)
				Card(style="margin-top:10px")
					p(slot="title")|生产
					Row(:gutter="30")
						Col(span="12")
							p()|出厂编号:
						Col(span="12")|出厂日期:
							input( style="border: 0")
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|生产批次:
							input( style="border: 0")
				Card(style="margin-top:10px")
					p(slot="title")|维保
					Row(:gutter="30")
						Col(span="12")|维保类型:
							input( style="border: 0")
						Col(span="12")|维保周期(天):
							input( style="border: 0")
				Card(style="margin-top:10px")
					p(slot="title")|系统
					Row(:gutter="30")
						Col(span="12")|入网状态:
							input( style="border: 0")
						Col(span="12")|使用单位:
							input( style="border: 0")
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|楼号:
							input( style="border: 0")
						Col(span="12")|梯号:
							input( style="border: 0")
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|安装地址::
							input(v-model="list.install_addr" style="border: 0" @input="update()")
						Col(span="12")|安装日期::
							input(v-model="list.install_date" style="border: 0" readonly)
			Col(span="7" )
				Card()
					img(src="../../../assets/ladder.jpg" width="100%")
				Col(span=2)
					span.pd(id="green" style="color:green;" class="fa fa-tag fa-2x",@click="checkcolor(0)")
				Col(span=2)
					span.pd(id="red" style="color:red;" class="fa fa-tag fa-2x",@click="checkcolor(1)")
				Col(span=2)
					span.pd(id="yellow" style="color:yellow;" class="fa fa-tag fa-2x",@click="checkcolor(2)")
				Col(span=2)
					span.pd(id="blue" style="color:blue;" class="fa fa-tag fa-2x",@click="checkcolor(3)")
				Col(span=2)
					span.pd(id="gray" style="color:gray;" class="fa fa-tag fa-2x",@click="checkcolor(4)")
				Col(span=2)
					span.pd(id="black" style="color:black;" class="fa fa-tag fa-2x",@click="checkcolor(5)")
				Col(span=24)
					Col(span=11)
						Button(@click="burn()" type="primary" v-if="list.commond !='contract'" style="margin-top: 20px; width: 100%")|强制注册
						Button(disabled= true type="primary" v-if="list.commond =='contract'" style="margin-top: 20px; width: 100%")|注册中
					Col(span=11)
						Button(@click="clear()" type="warning" style="margin-top: 20px;margin-left:20%; width: 100%" v-if="list.commond !='contract'")|强制解除
						Button(@click="clear()" type="warning" style="margin-top: 20px;margin-left:20%; width: 100%" v-if="list.commond =='contract'" disabled= true)|强制解除
</template>

<script>
	import {
		api,
		ladderApi,
		formatDate,
		array2obj,
		buffer2hex,
		parseBuffer,
		parseEvent,
		parseInfo,
		parseMsg
	} from '@/utils'
export default {
	data() {
		const type= {
		15: '控制器',
		240: '控制柜',
		};
		return {	
			color:[false,false,false,false,false,false],
			col:['green','red','yellow','blue','gray','black'],
			options: {
				page: 1,
				num: 10,
				total: 0,
				id:'',
				deviceName:'',
				typeId:'',
			},
			parameter:{
				reporttime: '',
				rssi: '',
				moment: '',
				wavenumber: '',
				waveid: '',	
				runcount: '',
				uptime: '',
				faultcode: '',
				faultfloor: '',
				faulttime: '',
			},
			refreshNum: 0,
			list: '',
			maintain:[],
			loading: false,
			columns: [
			{
				title: '设备类型',
				key: 'typeId',
				render: (h, params) => {
					return h('p',type[params.row.typeId]||'')
				}
			}]	
		}
	},
	created(){
		this.getData()		
	},
	mounted() {
		for (var i=0;i<6;i++){
			if(this.list.tagcolor.indexOf(this.col[i])>=0){
				document.getElementById(this.col[i]).className="fa fa-bookmark fa-2x"
				this.color[i]=true
			}	
		}
	},
	methods: {
		async update(){
			let res =await this.$api.setdevices(this.list)
		},
		async getData() {
			var buffer;
			var time;
			let res =await this.$api.devices({IMEI: this.$route.params.IMEI})
			this.list = res.data.data.list[0]
			let run =await this.$api.runtime({page:1,num:20,device_id:this.list.id})
			if (this.list.device_type == 15) {
				run.data.data.list.forEach(item=>{
					if (item.type == 4096) {
						buffer = base64url.toBuffer(item.data)
						time=buffer[0]*16777216+buffer[1]*65536+buffer[2]*256+buffer[3]
						if (time == 0) {this.parameter.reporttime=''} 
						else {this.parameter.reporttime=new Date(time*1000+1262275200000)}
						this.parameter.rssi=buffer[4]
						this.parameter.wavenumber=buffer[14]*256+buffer[15]
						this.parameter.waveid=buffer[16]*256+buffer[17]
					}
				})
			}
			if (this.list.device_type == 240) {
				run.data.data.list.forEach(item=>{
					if (item.type == 8192) {
						buffer = base64url.toBuffer(item.data)
						time=buffer[0]*16777216+buffer[1]*65536+buffer[2]*256+buffer[3]
						if (time == 0) {this.parameter.reporttime=''} 
						else {this.parameter.reporttime=new Date(time*1000+1262275200000)}
						time=buffer[20]*16777216+buffer[21]*65536+buffer[22]*256+buffer[23]
						if (time == 0) {this.parameter.faulttime=''} 
						else {this.parameter.faulttime=new Date(time*1000+1262275200000)}
						this.parameter.rssi=buffer[4]
						this.parameter.runcount=buffer[10]*16777216+buffer[11]*65536+buffer[12]*256+buffer[13]
						this.parameter.uptime=buffer[14]*16777216+buffer[15]*65536+buffer[16]*256+buffer[17]
						this.parameter.faultfloor=buffer[19]

					}
				})
			}
			console.log(buffer)	
		},
		async checkcolor(c) {
			this.color[c]=!this.color[c]
			if (this.color[c]) {
				document.getElementById(this.col[c]).className="fa fa-bookmark fa-2x"
			}
			else {
				document.getElementById(this.col[c]).className="fa fa-tag fa-2x"
			}
			this.list.tagcolor=''
			for (var i=0;i<6;i++) {
				if (this.color[i]) {
					if (this.list.tagcolor!='') {
						this.list.tagcolor=this.list.tagcolor+';'
						}
					this.list.tagcolor=this.list.tagcolor+this.col[i]
				}
			}
			let res = await this.$api.setdevices(this.list)
		},
		getlist(val){
			return val.split(';')
		},
		async burn() {
			this.$Modal.confirm({
				title: '确定要强制注册吗',
				content:'可能会生成错误信息！',
				onOk: () => {
					this.toburn()
				},
				onCancel: () => {
				}
			})	
		},
		async clear() {
			this.$Modal.confirm({
				title: '确定要强制解除注册吗',
				content:'可能会生成错误信息！',
				onOk: () => {
					this.toclear()
				},
				onCancel: () => {
				}
			})	
		},
		async toburn() {
			this.list.commond = "contract"
			let res = await this.$api.regdevices({id: this.list.id,IMSI: this.list.device_IMSI, IMEI: this.list.IMEI,op:"register"})
			if (res.data.code === 0) {
				this.refreshNum = 2
				this.refresh()
				this.$Notice.success({
					title: '成功',
					desc: '开始注册！稍后在运维界面显示该设备'
				});
			} else {
				let ress=await this.$api.setdevices
				({id: this.list.id,IMEI: this.list.IMEI,isreg: True})
				if (ress.data.code === 0){
					this.$Notice.success({
						title: '成功',
						desc: '注册异常，但已将该设备标为注册'
					});
				} else {
						this.list.commond = "ok"
						this.$Notice.error({
							title: '错误',
							desc: '注册失败'
						});
				}
			}
		},
		async toclear() {
			let res = await this.$api.regdevices({id: this.list.id,IMSI: this.list.device_IMSI, IMEI: this.list.IMEI,op:"unregister"})
			if (res.data.code === 0) {
				this.$Notice.success({
					title: '成功',
					desc: '开始清除'
				});
				this.list.commond = "contract"
			}  else {
				let ress=await this.$api.setdevices
				({id: this.list.id,IMEI: this.list.IMEI,IMSI: this.list.IMSI,isreg: False})
				if (ress.data.code === 0){
					this.$Notice.success({
						title: '成功',
						desc: '清除异常，但已将该设备标为未注册'
					});
				} else {
						this.list.commond = "ok"
						this.$Notice.error({
							title: '错误',
							desc: '清除失败'
						});
				}
			}
		},
		refresh() {
			setTimeout(()=>{
				this.getList()
				if (this.refreshNum > 0) {
					this.refresh()
					this.refreshNum--
				}
			}, 5000)
		},
	}
}
</script>

<style lang="css">
	.h1{
		position: absolute;
		padding-top: 13%;
	}
	.h2{
		position: absolute;
		padding-top: 27%;
	}
</style>
