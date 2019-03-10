<template lang="jade">
div.layout-content-main
	div.form
		Row(:gutter="30")
			Col(span="16")
				Card()
					p(slot="title")|基本信息
					Row(:gutter="30")
						Col(span="12")|名称:
							input(v-model="list.device_name" style="border: 0" @input="" maxlength='10')
							span.pd(style="color:gray;margin-left:5px" class="fa fa-pencil fa-1x")
						Col(span="12")|设备ID:
							input(v-model="list.device_id" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|IMEI:
							input(v-model="list.IMEI" style="border: 0" maxlength='15' readonly)
						Col(span="12")|IMSI:
							input(v-model="list.device_IMSI" style="border: 0" maxlength='15' readonly)
					Row(:gutter="30" style="padding-top:10px" )
						Col(span="12" v-if="list.device_type==15")|设备类型:控制器
						Col(span="12" v-if="list.device_type==240")|设备类型:控制柜
						Col(span="12" v-if="list.device_model==1")|型号:NSFC01-01B
						Col(span="12" v-if="list.device_model==2")|型号:NSFC01-02T
				Card(v-if="list.device_type == 15" style="margin-top:5px")
					p(slot="title")|参数信息
					Row(:gutter="30")
						Col(span="12")|报告时间:
							input(v-model="parameter.reporttime" style="border: 0" readonly)
						Col(span="12")|信号强度:
							input(v-model="parameter.rssi" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|最新事件ID:
							input(v-model="parameter.waveid" style="border: 0" readonly)
						Col(span="8")|缓存中的事件数:
							input(v-model="parameter.wavenumber" style="border: 0;;width:50%" readonly)
						Col(span="4")
							Button(type='cancel' @click="getList();history=true")|查看历史故障
				Card(v-if="list.device_type == 240" style="margin-top:5px")
					p(slot="title")|参数信息
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|累计运行次数:
							input(v-model="parameter.runcount" style="border: 0" readonly)
						Col(span="12")|累计运行时间(s):
							input(v-model="parameter.uptime" style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|信号强度:
							input(v-model="parameter.rssi" style="border: 0" readonly)
						Col(span="8")|最近故障楼层:
							input(v-model="parameter.faultfloor" style="border: 0;width:50%" readonly)
						Col(span="4")
							Button(type='cancel' @click="getList();history=true")|查看历史故障
				//Card(style="margin-top:5px")
					p(slot="title")|生产
					Row(:gutter="30")
						Col(span="12")
							p()|出厂编号:
						Col(span="12")|出厂日期:
							input( style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|生产批次:
							input( style="border: 0" readonly)
				Card(style="margin-top:5px")
					p(slot="title")|维保
					Row(:gutter="30")
						Col(span="12")|下次维保:
							DatePicker(type="date" placeholder="下次维保日期" format="yyyy-MM-dd" v-model="options.maintenance_nexttime" style='width: 50%; margin-left:20px')
							span.pd(style="color:gray;margin-left:5px" class="fa fa-pencil fa-1x")
						Col(span="12")|早几日提醒:
							input( style="border: 0" v-model="options.maintenance_remind")
							span.pd(style="color:gray;margin-left:5px" class="fa fa-pencil fa-1x")
					Row(:gutter="30")
						Col(span="12")|维保类型:
							Select(v-model="list.maintenance_type" style="width:50%; margin-left:20px" placeholder="类型" @on-change="search()")
								Option(key="1" label="故障" value='1')
								Option(key="2" label="保养" value="2")
								Option(key="3" label="校检" value="3")
							span.pd(style="color:gray;margin-left:5px" class="fa fa-pencil fa-1x")
						Col(span="12")|上次维保:{{options.maintenance_lasttime}}
				Card(style="margin-top:5px")
					p(slot="title")|系统
					Row(:gutter="30")
						Col(span="12")|入网状态:
							input( style="border: 0" readonly)
						Col(span="12")|使用单位:
							input( style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|楼号:
							input( style="border: 0" readonly)
						Col(span="12")|梯号:
							input( style="border: 0" readonly)
					Row(:gutter="30" style="padding-top:10px")
						Col(span="12")|安装地址:
							input(v-model="list.install_addr" style="border: 0" @input="" maxlength='18')
							span.pd(style="color:gray;margin-left:5px" class="fa fa-pencil fa-1x")
						Col(span="12")|安装日期:
							input(v-model="options.install_date" style="border: 0" readonly)
			Col(span="7" )
				Card()
					img(src="../../../assets/ladder.jpg" width="100%")
				Col(span = 12 style="margin-top:5px")
					Col(span=4)
						span.pd(id="green" style="color:green;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(0)")
					Col(span=4)
						span.pd(id="red" style="color:red;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(1)")
					Col(span=4)
						span.pd(id="yellow" style="color:yellow;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(2)")
					Col(span=4)
						span.pd(id="blue" style="color:blue;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(3)")
					Col(span=4)
						span.pd(id="gray" style="color:gray;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(4)")
					Col(span=4)
						span.pd(id="black" style="color:black;cursor: pointer;" class="fa fa-tag fa-2x",@click="checkcolor(5)")
				Col(span=24)
					Col(span=12)
						Button(@click="burnn()" type="primary" v-if="(list.register != 'registered')&&(list.commond !='contract')" style="margin-top: 20px; width: 92%" ,:disabled='upsuccess')|注册设备
						Button(@click="clearr()" type="primary" v-if="(list.register == 'registered')&&(list.commond !='contract')" style="margin-top: 20px; width: 92%" ,:disabled='upsuccess')|解除注册
						Button(disabled= true type="primary" v-if="list.commond =='contract'" style="margin-top: 20px; width: 92%")|注册中
					Col(span=11)
						Button(@click="burn()" type="warning" v-if="(list.register != 'registered')&&(list.commond !='contract')" style="margin-top: 20px; width: 100%" ,:disabled='upsuccess')|强制注册
						Button(@click="clear()" type="warning" v-if="(list.register == 'registered')&&(list.commond !='contract')" style="margin-top: 20px;width: 100%" ,:disabled='upsuccess')|强制解除
						Button(disabled= true type="primary" v-if="list.commond =='contract'" style="margin-top: 20px; width: 100%")|注册中
				Col(span=24)
					Col(span=12)
						Button(@click="update()" type="success" style="margin-top: 20px; width: 92%" v-if='!sent' ,:disabled='upsuccess')|提交信息
						Button(@click="update()" type="success" style="margin-top: 20px; width: 92%" v-if='sent' disabled)|提交信息
					Col(span=11)
						Button(@click="del()" type="error" style="margin-top: 20px;width: 100%" ,:disabled='upsuccess')|信息重置
	el-dialog(title="历史故障", :visible.sync="history" width="50%")
		Table(:columns="column",:data="data",:stripe="true")
		div(style="margin: 0 auto")
			Page(show-elevator :total="total", :page-size="fault.num",:current="fault.page" @on-change="pageChange" show-total style="margin-left:60px;margin-top:10px" simple)
		span(slot="footer" class="dialog-footer")
			el-button(type="primary" @click="history = false")|确 定
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
			column: [
				{
					title: '工单编号',
					key: 'order_id',
					width:90,
					render: (h, params) =>
						h('div',[
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
										this.$router.push({
											name: 'finish',
											params: {
												id: params.row.id										
											}
										})
									}
								}
							}, params.row.order_id)],
							)
				},{
					title: '维保人员电话',
					key: 'phone',
					width: 140,
				},{
					title: '接单时间',
					key: 'create_time',
					// width:150,
					render: (h, params) => {
						return h('p',this.$format(parseInt(params.row.create_time), 'YYYY-MM-DD HH:mm:ss'))
					}
				},{
					title: '完成时间',
					key: 'finish_time',
					// width:150,
					render: (h, params) => {
						return h('p',this.$format(parseInt(params.row.finish_time), 'YYYY-MM-DD HH:mm:ss'))
					}
				},
				],
				
			history:false,
			sent:false,
			color:[false,false,false,false,false,false],
			col:['green','red','yellow','blue','gray','black'],
			options: {
				page: 1,
				num: 10,
				total: 0,
				id:'',
				deviceName:'',
				typeId:'',
				maintenance_lasttime:'',
				maintenance_nexttime:'',
				maintenance_remind:'',
				install_date:'',
			},
			total:'',
			fault:{
				page: 1,
				num: 1,
				state:'',
				device_id:'',
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
			data: '',
			maintain:[],
			loading: false,
			username:window.localStorage.getItem('username'),
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
		this.getList()
		if(this.username=="demo"){
			this.upsuccess = true 
		}
	},

	methods: {
		pageChange(val) {
			this.fault.page = val
			this.getList()
		},
		async getList() {
			this.fault.device_id=this.list.device_id
			let res = await this.$api.getRepair(this.fault)
			var length=res.data.data.list.length
			var ech
				if (res.data.code === 0) {
					for (var i=0;i<length;i++) {
						ech = await this.$api.devices({device_id:res.data.data.list[i].device_id,num:10,page:1}),
						res.data.data.list[i].device_name = ech.data.data.list[0].device_name
						res.data.data.list[i].IMEI = ech.data.data.list[0].IMEI
						res.data.data.list[i].install_addr = ech.data.data.list[0].install_addr
						res.data.data.list[i].cell_address = ech.data.data.list[0].cell_address
						res.data.data.list[i].ipaddr = ech.data.data.list[0].ip_country+ech.data.data.list[0].ip_region+ech.data.data.list[0].ip_city
					}
					console.log(res.data.data.list)
					this.data = res.data.data.list
					this.total = res.data.data.totalNumber
				} else {
					this.$Notice.error({
						title: '错误',
						desc: '获取列表失败'
					});
				}
			},
		async update(){
			this.sent=true
			this.list.maintenance_nexttime=Date.parse(this.options.maintenance_nexttime)
			this.list.maintenance_remind=this.options.maintenance_remind*86400000
			
			let res =await this.$api.setdevices(this.list)
			this.sent=false
			if (res.data.code == 0){
				this.$Notice.success({
					title: '成功',
					desc: '已提交信息'
				});
			}
			else {
				this.$Notice.error({
					title: '失败',
					desc: '更新信息失败'
				});
			}
		},
		async getData() {
			var buffer;
			var time;
			let res =await this.$api.devices({IMEI: this.$route.params.IMEI})
			this.list = res.data.data.list[0]
			setTimeout(()=>{
				this.showcolor()
			}, 300)
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
			this.options.install_date=this.$format(this.list.install_date, 'YYYY-MM-DD')
			this.list.maintenance_nexttime=parseInt(this.list.maintenance_nexttime)
			this.list.maintenance_lasttime=parseInt(this.list.maintenance_lasttime)
			this.options.maintenance_nexttime=this.$format(this.list.maintenance_nexttime, 'YYYY-MM-DD')
			this.options.maintenance_lasttime=this.$format(this.list.maintenance_lasttime, 'YYYY-MM-DD')
			this.options.maintenance_remind=this.list.maintenance_remind/86400000
		},
		showcolor(){
			var getcolor=this.list.tagcolor.split(';')
			for (var i=0;i<getcolor.length;i++){
				for (var j=0;j<6;j++){
					if (getcolor[i]==this.col[j]) {
						this.color[j]=true
						document.getElementById(this.col[j]).className="fa fa-bookmark fa-2x"
						}
				}
			}
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
			// let res = await this.$api.setdevices(this.list)
		},
		getlist(val){
			return val.split(';')
		},
		async burnn() {
			this.$Modal.confirm({
				title: '确定要注册这台设备吗',
				content:'',
				onOk: () => {
					this.toburnn()
				},
				onCancel: () => {
				}
			})	
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
		async clearr() {
			this.$Modal.confirm({
				title: '确定要解除注册吗',
				content:'',
				onOk: () => {
					this.toclearr()
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
		async toburnn() {
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
				this.list.commond = "ok"
				this.$Notice.error({
					title: '错误',
					desc: '注册失败'
				});
			}
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
		async toclearr() {
			let res = await this.$api.regdevices({id: this.list.id,IMSI: this.list.device_IMSI, IMEI: this.list.IMEI,op:"unregister"})
			if (res.data.code === 0) {
				this.$Notice.success({
					title: '成功',
					desc: '开始清除'
				});
				this.list.commond = "contract"
			}  else {
				this.list.commond = "ok"
				this.$Notice.error({
					title: '错误',
					desc: '清除失败'
				});
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
				let ress=await this.$api.setdevices({id: this.list.id,IMEI: this.list.IMEI,IMSI: this.list.IMSI,isreg: False})
				if (ress.data.code === 0){
					this.list.commond = "contract"
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
		async del() {
			this.$Modal.confirm({
				title: '确定要删除这台设备吗',
				content:'',
				onOk: () => {
					this.todel()
				},
				onCancel: () => {
				}
			})	
		},
		async todel(){
			let res =await this.$api.deldevices({id: this.list.id,IMEI: this.list.IMEI})
			if (res.data.code === 0){
				this.$Notice.success({
					title: '成功',
					desc: '已经删除此设备'
				});
				this.$router.back(-1)
			} else {
					this.$Notice.error({
						title: '错误',
						desc: '删除失败'
					});
			}
		},
		formatDate(val, format) {
			return formatDate(val, format)
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
	.layout-content-main{
		overflow-y: scroll !important;
	}
</style>
