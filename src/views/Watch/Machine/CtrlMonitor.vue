<template lang="jade">
	div.layout-content-main
		div.form.mb-10.form-detail
			Card
				Form.status(:model="show",label-position="left",:label-width="80")
					Row(:gutter="16")
						Col(span="4")
							Form-item(:label="$t('creator')")
								p()
						Col(span="5")
							Form-item(:label="$t('creator')")
								p()
						Col(span="5")
							Form-item(:label="$t('Online Peaple')")|{{pernum}}
						Col(span="5")
							div()|{{loading}}
						Col(span="4")
							Button.mr-10(type="default" @click="modal1 = true")|{{$t('Stop')}}
							Modal(v-model="modal1", :title="$t('warning')"  @on-ok="closed")
								p()|{{$t('Stop this monitoring?')}}
			Row.mb-10(:gutter="8")
				Col.padding(span="8")
					Card.card
						p.clearfix(slot="title")|{{$t('Basic Information')}}
						Form.status(:model="show",label-position="left",:label-width="100")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('install address')+'：'")
										p(v-text="device.install_addr")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('device name')+'：'")
										p(v-text="device.device_name")
							Row(:gutter="16")
								Col(span="12")
									Form-item(:label="$t('Operation State')+'：'")
										p(v-text="show.run ? $t('Operating'):$t('Parking')")
								Col(span="10")
									Form-item(:label="$t('Door Lock Signal')+'：'",:label-width="100")
										p(v-text="show.lock ? $t('Open'):$t('Close')")
							Row(:gutter="16")
								Col(span="12")
									Form-item(:label="$t('Close Door Signal')+'：'")
										p(v-text="show.close ? $t('Active'):$t('Inactive')")
								Col(span="12")
									Form-item(:label="$t('Close Door Button Signal')+'：'",:label-width="100")
										i(v-bind:class="show.closeBtn ? styles.signal1 : styles.signal2")
							Row(:gutter="16")
								Col(span="12")
									Form-item(:label="$t('Elevator Mode')+'：'")
										p(v-text="parseModel(show)")
								Col(span="10")
									Form-item(:label="$t('Open Door Button Signal')+'：'",:label-width="100")
										i(v-bind:class="show.openBtn ? styles.signal1 : styles.signal2")
							Row(:gutter="16")
								Col(span="24")
									Form-item(:label="$t('Devices State')+'：'")
										p(v-text="parseStatus(show)")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('Upward Direction Signal')+'：'",:label-width="100")
										p(v-text="show.upCall ? $t('Existing'):$t('None')")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('Downward Direction Signal')+'：'",:label-width="100")
										p(v-text="show.downCall ? $t('Existing'):$t('None')")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('start time')+'：'")
										p(v-text="formatDate(this.t_start, 'yyyy-MM-dd HH:mm:ss')")
							Row(:gutter="16")
								Col(span="22")
									Form-item(:label="$t('end time')+'：'")
										p(v-text="formatDate(this.t_end, 'yyyy-MM-dd HH:mm:ss')")
								Col(span="22")
									Form-item(:label="$t('Monitor Remaining Time')+'：'")
										p(v-text="resttime+' s'")
					Card.card.animate
						p(slot="title")|{{$t('ctrl')}}
						div.doors
							div.outer
								div.inner
									section
									section
							div.info
								p
									i(v-text="floors[show.floor-1].name" style="margin-left: 10px;width:45px")
									span.pr(id="1" class="fa fa-sort-asc" v-if='show.upCall')
									span.pr(id="2" class="fa fa-sort-desc" v-if='show.downCall')
								Col(style="margin-left:10px")
									Col(span='6' v-for="(item, index) in floors" key='item')
										div(style="color:red" v-if="item.call == 1")|{{item.name}}
										div(v-if="item.call != 1")|{{item.name}}
				Col(span=16)
					draggable(:options="{animation: 60,handle:'.drag'}")
						Card(style="margin-bottom:10px")
							p.drag(slot="title")|{{$t('Operating Signal')}}
							div.ss(id="run" draggable=false)
						Card(style="margin-bottom:10px")
							p.drag(slot="title")|{{$t('Door Lock Signal')}}
							div.ss(id="lock" draggable=false)
						Card(style="margin-bottom:10px")
							p.drag(slot="title")|{{$t('Close Door Signal')}}
							div.ss(id="close" draggable=false)
						div(style="color:#f00")|{{$t('Note:Can not try again when monitoring end until 1 minute ago.')}}
						div
							Row
								Col(span="12" style="text-align:center")
									label|{{$t(state.tips)}}
								Col(span="12" style="text-align:center")
									i-switch(v-model="state.isIO" @on-change="change" size="large")
										span(slot="open")|切换
										span(slot="close")|切换
							div(class="Menu")
								div(v-if="state.isIO")
									Row
										Col(span="24" class="stylesdoor")
											Row(style="text-align:center")
												Col(span="5")|{{$t('Interface')}}
												Col(span="11")|{{$t('Signal Name')}}
												Col(span="4")|{{$t('Polarity')}}
												Col(span="4")|{{$t('State')}}
											div(v-for="item in IOMenu")
												div(v-for="prop in item.children")
													Row(style="text-align:center")
														Col(span="5")|{{prop.label}}
														Col(span="11")|{{$t(prop.value)}}
														Col(span="4")|{{$t(polarity(prop.Polarity))}}
														Col(span="4")
															i(class="signal")
								div(v-else)
									Row
										Col(span="24" class="stylesdoor")
											Row(style="text-align:center")
												Col(span="12")|{{$t('Signal Name')}}
												Col(span="8")|{{$t('Polarity')}}
												Col(span="4")|{{$t('State')}}
											div(v-for="item in Board")
												div(v-for="prop in item.children")
													div(v-if="item.value==0")
														Row(style="text-align:center")
															Col(span="12")|{{$t(prop.label)}}
															Col(span="8")|{{$t(polarity(prop.value))}}
															Col(span="4")
																i(class="signal")
													div(v-else)
														Row(style="text-align:center")
															Col(span="12")|{{$t(prop.label)}}
															Col(span="8")|{{$t(prop.value)}}
															Col(span="4")
																i(class="signal")
</template>
<script>
	const polarity =(val)=>{
		if(val==0)
			return "Normally open";
		else if(val==1)
			return "Normally closed";
		else
			return "None";
	}
	import echarts from 'echarts'
	import draggable from 'vuedraggable'
	import { IOMenu, Board } from './ctrlMenu.js';
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
		data () {
			return {
				polarity:polarity,
				IOMenu:IOMenu,
				Board:Board,
				state:{
					isIO:true,
					tips:'IO Watch',
				},
				loading:this.$t('Please wait patiently in connection equipment'),
				count: 0,
				pernum: 0,
				query:{
					device_type: 240,
					type: 0,
					address: '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1',
					segment: '0,0,0,0',
					IMEI: this.$route.params.IMEI,
					duration: this.$route.params.duration,
					threshold: this.$route.params.threshold,
					interval: this.$route.params.interval,
					op:'open',
				},
				callfloor:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				id:this.$route.params.id,
				t_start:'',
				t_end:'',
				interval:{},
				options:[],
				nums:'',
				modal1:false,
				event:{
					run:[],
					lock:[],
					close:[],
					model:[],
					status:[],
					upCall:[],
					downCall:[],
					openBtn:[],
					closeBtn:[],
					floor:[],
				},
				show:{
					run:'',
					lock:'',
					close:'',
					model:'',
					status:'',
					upCall:'',
					downCall:'',
					openBtn:'',
					closeBtn:'',
					floor:1,
				},
				styles:{
					signal1:'signal1',
					signal2:'signal2'
				},
				doorWidth: 4096,
				direction: {
					'01': 'fa fa-sort-up',
					'10': 'fa fa-sort-up',
					'00': '',
					'11': '',
				},
				nowFloor:'fa fa-sort',
				floors: [{name:1,call:0}],
				picture:{
					run:'',
					lock:'',
					close:'',
				},
				run:[],
				lock:[],
				close:[],
				end:50,
				device:[],
				resttime:0,
				submittime:0,
			}
		},
		created(){
			this.base();
			this.initWebsocket();
			this.deviceinfo();
		},
		components: {
			draggable,
		},
		methods: {
			async getrest(){
				let res =await this.$api.getMonitor({num:1,page:1,IMEI:this.device.IMEI})
				this.submittime=res.data.list[0].submit
				this.rest()
			},
			async rest(){
				this.resttime=parseInt((300000+this.submittime-Date.parse(new Date()))/1000)
				if (this.resttime<=0) {this.resttime=0}
				else{
					setTimeout(()=> {
						this.rest();
					}, 1000)
				}
			},
			async deviceinfo(){
				let res = await this.$api.devices({page: 1,num: 1,IMEI:this.$route.params.IMEI})
				if (res.data.code == 0){
				this.device =res.data.data.list[0]
				console.log('device'+this.device)
				}
			},
			async base(){
				var buffer
				let num =await this.$api.runtime({page:1,num:20,type: 8211,device_id:this.id})
				if (num.data.code == 0) {
					buffer = base64url.toBuffer(num.data.data.list[0].data)
					this.floors=[]
					for (var i=0;(i*3+3)<=buffer.length;i++){
						this.floors.push({
							name:String.fromCharCode(buffer[i*3])+String.fromCharCode(buffer[i*3+1])+String.fromCharCode(buffer[i*3+2]),
							call:0,
						})
					}
				}
			},
			async initWebsocket(){ //初始化weosocket	
				let res = await this.$api.monitor(this.query);
				if (res.data.code == 670) {alert(this.$t('The elevator has been monitored by others'))}
				this.person()
				if((res.data.code == 0)||(res.data.code == 670)){
					let wsurl ='ws://47.96.162.192:9006/device/Monitor/socket?deviceId='+this.id+'&userId='+window.localStorage.getItem('id')
					// let wsurl ='ws://lengxia.natapp1.cc/device/Monitor/socket?deviceId='+this.id+'&userId='+window.localStorage.getItem('id')
					this.websock = new WebSocket(wsurl);
					this.websock.onopen = this.websocketonopen;
					this.websock.onerror = this.websocketonerror;
					this.websock.onmessage = this.websocketonmessage;
				}
				else {
					this.loading=this.$t('Connection failed')
				}
			},
			async person(){
				let per = await this.$api.pernum({deviceId:this.id})
				if (per.data.code == 0) {this.pernum=per.data.nums}
				setTimeout(()=>{
					if (this.$route.meta.name == '控制柜监控'){this.person()}
					else {this.closed()}
				}, 4000)
			},
			websocketonopen() {
				console.log("WebSocket连接成功");
				this.getrest()
				this.loading=this.$t('WebSocket connection successful,please wait for data')
			},
			websocketonerror(e) {//错误
				console.log(this.id)
				console.log("WebSocket连接发生错误");
				this.loading=this.$t('WebSocket connection failed')
			},
			websocketonmessage(e){//数据接收
			this.loading=this.$t('Getting data')
				if(e.data=="closed"){
					
					// clearInterval(inte)
					this.loading=this.$t('The monitoring data is over')
				}else{
					var redata = JSON.parse(e.data)
					this.interval = redata.interval
					this.end = this.query.duration/this.query.interval
					this.getData(redata)
					// setTimeout(() => {
						this.drawLine();
					// },1000)
					console.log(redata)
				}
			},
			async closed(){//数据发送
				var duration=this.$route.params.duration
				var threshold=this.$route.params.threshold
				var	interval=this.$route.params.interval
				if (duration == null) duration=20
				if (threshold == null) threshold=1
				if (interval == null) interval=1000
				let res = await this.$api.monitor({
					IMEI:this.query.IMEI,
					op:'close',
					device_type: 240,
					type: 0,
					address: '1,1,1,1,1,1,1,1',
					segment: '0',
					duration: duration,
					threshold: threshold,
					interval: interval,
				});
				this.websock.close()
				this.submittime=this.submittime-300000
				this.loading=this.$t('The monitoring data is over')
			},
			//电梯数据展示
			getData(val) {
				let buffer = []
				buffer = base64url.toBuffer(val.data);	//8位转流
				console.log(buffer)
				var _this = this
				// this.count= 33
				if (_this.t_start == '') _this.t_start = val.time
				_this.t_end = _this.t_start+this.$route.params.duration*1000
// 				var inte = setInterval(function () {
// 					if((_this.count+33) <= buffer.length){
						_this.show.upCall   = buffer[0]&0x01
						_this.show.downCall = (buffer[0]&0x02)>>1
						_this.show.run      = (buffer[0]&0x04)>>2					//获取运行信号
						_this.show.lock     = (buffer[0]&0x08)>>3					//获取门锁信号
						_this.show.open     = (buffer[0]&0x10)>>4					//获取开门信号
						_this.show.close    = (buffer[0]&0x20)>>5					//获取关门信号
						_this.show.openBtn  = (buffer[0]&0x40)>>6					//获取开门按钮信号
						_this.show.closeBtn = (buffer[0]&0x80)>>7					//获取关门按钮信号
						_this.show.close    = (buffer[0]&0x10)>>4					//获取关门信号
						_this.show.model    = buffer[1]&0xff						//获取电梯模式
						_this.show.status   = buffer[2]&0xff						//获取电梯状态				
						_this.show.floor    = buffer[27]&0xff
						for (var i=0;i<8;i++) {
							if (_this.floors.length>(i*8+0))
							_this.floors[i*8+0].call = buffer[29-i]&0x01
							if (_this.floors.length>(i*8+1))
							_this.floors[i*8+1].call = (buffer[29-i]&0x02)>>1
							if (_this.floors.length>(i*8+2))
							_this.floors[i*8+2].call = (buffer[29-i]&0x04)>>2
							if (_this.floors.length>(i*8+3))
							_this.floors[i*8+3].call = (buffer[29-i]&0x08)>>3
							if (_this.floors.length>(i*8+4))
							_this.floors[i*8+4].call = (buffer[29-i]&0x10)>>4
							if (_this.floors.length>(i*8+5))
							_this.floors[i*8+5].call = (buffer[29-i]&0x20)>>5
							if (_this.floors.length>(i*8+6))
							_this.floors[i*8+6].call = (buffer[29-i]&0x40)>>6
							if (_this.floors.length>(i*8+7))
							_this.floors[i*8+7].call = (buffer[29-i]&0x80)>>7
						}
// 						if(_this.show.floor>=_this.floors.length){
// 							_this.show.floor = _this.floors.length-1
// 						}
						_this.getX()
						// _this.count+=33
// 					}
// 				}, _this.query.interval);
// 				if((_this.count+33) > buffer.length){
// 					clearInterval(inte)
// 				}
			},
			drawLine(){
				let run = this.$echarts.init(document.getElementById('run'))
				let lock = this.$echarts.init(document.getElementById('lock'))
				let close = this.$echarts.init(document.getElementById('close'))
				
				var _this = this
				var inte = setInterval(function () {
					_this.run.push(_this.show.run)
					_this.lock.push(_this.show.lock)
					_this.close.push(_this.show.close)
					_this.end-= 1
					if(_this.run.length > 10){
						_this.run.shift()
						_this.lock.shift()
						_this.close.shift()
					}
					run.setOption({
						tooltip: {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							data: _this.options,
						},
						yAxis: {
							data:[0,1]
						},
						series: [{
							type:'line',
							step: 'start',
							data:_this.run
						}]
					});
					lock.setOption({
						tooltip: {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							data: _this.options,
						},
						yAxis: {
							data:[0,1]
						},
						series: [{
							type:'line',
							step: 'start',
							data:_this.lock
						}]
					});
					close.setOption({
						tooltip: {
							trigger: 'axis'
						},
						grid: {
							left: '3%',
							right: '4%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							data: _this.options,
						},
						yAxis: {
							data:[0,1]
						},
						series: [{
							type:'line',
							step: 'start',
							data:_this.close
						}]
					});
				}, _this.query.interval);
				if(_this.end == 0){
					clearInterval(inte)
				}
			},			
			parseStatus(event) {//状态
				let statusName = '';
				if ((event.status&(0x01)) == 1) {
					statusName+= this.$t('Automatic')+' ';
				}
				if ((event.status&(0x02))>>1 == 1) {
					statusName+= this.$t('Overhaul')+' ';
				}
				if ((event.status&(0x04))>>2 == 1) {
					statusName+= this.$t('Driver')+' ';
				}
				if ((event.status&(0x08))>>3 == 1) {
					statusName+= this.$t('Firefighting')+' ';
				}
				if ((event.status&(0x10))>>4 == 1) {
					statusName+= this.$t('Lock body')+' ';
				}
				if ((event.status&(0x20))>>5 == 1) {
					statusName+= this.$t('Broken')+' ';
				}
				if ((event.status&(0x40))>>6 == 1) {
					statusName+= this.$t('Overload')+' ';
				}
				if ((event.status&(0x80))>>7 == 1) {
					statusName+= this.$t('Full load')+' ';
				}
				return statusName
			},
			parseModel(event) {
				let statusName = this.$t('None');
				if ((event.model&(0x01)) == 1) {
					statusName = this.$t('Single Ladder');
				}
				if ((event.model&(0x02))>>1 == 1) {
					statusName = this.$t('Parallel Connection');
				}
				if ((event.model&(0x04))>>2 == 1) {
					statusName = this.$t('Group Control');
				}
				return statusName
			},
			floorWidth(length) {
				const int = parseInt(length / 15);
				switch (int) {
					case 1:
						return '50%'
						break;
					case 2:
						return '30%'
						break;
					case 3:
						return '25%'
						break;
					case 4:
						return '20%'
						break;
					case 5:
						return '15%'
						break;
					default:
						return '50%'
						break;
				}
			},
			formatDate(val, format) {
				return formatDate(val, format)
			},
			getX(){
				for(var i=0; i< this.nums ;i++){
					this.options[i] = i
				}
			},
			change (status) {
                //开关事件，有用
            }
		}
	}
</script>

<style lang="scss" scoped>
	.pr{
		padding-top: 8px;
		padding-left: 20px;
		margin-right: 8px;
	}
	.ss{
		width: 100%;
		height: 80px;
	}
	.ss1{
		width: 100%;
		height: 150px;
	}
	.card {
		min-height: 250px;
		.fr {
			font-style: normal;
			color: #289efc;
		}
	}
	.status {
		p {
			color: #289efc;
		}
	}
	.control {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 6px;
		& > span {
				font-size: 12px;
		}
	}
	.doors {
		width: 100%;
		height: 340px;
		display: flex;
		flex-flow: row;
		background-color: #EEEEEE;
	}
	.outer {
		background: url("../../../assets/ladder-bg.jpg") repeat;
		width: 45%;
		height: 100%;
		padding: 15px;
		box-shadow: 0 0 20px rgba(0, 0, 0, .5) inset;
	}
	.inner {
		position: relative;
		height: 310px;
		border: 1px solid #333;
		section {
			position: absolute;
			width: 50%;
			height: 100%;
			left: 0;
			background: url('../../../assets/ladder-bg.jpg') repeat;
		}
		& > section:nth-child(2) {
			left: 50%;
			right: 0;
			border-left: 1px solid #666;
		}
	}
	.info {
		width: 50%;
		display: flex;
		flex-flow: column;
		padding-bottom: 2px;
		p {
			margin: 0;
			padding: 0;
			display: flex;
			flex-flow: row wrap;
			color: #D72800;
			font-size: 26px;
			font-weight: bold;
			height: 40px;
			line-height: 40px;
			i {
				font-style: normal;
				width: 50%;
				text-align: left;
			}
			.icon {
				height: 40px;
				line-height: 40px;
			}
		}
		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			width: 100%;
			height: 100px;
			display: flex;
			flex-flow: row wrap;
			li {
				font-size: 12px;
				margin: 0;
				padding: 0;
				width: 100%;
				text-align: center;
				color: #999;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	canvas {
		width: 85%;
	}
	.shaft {
		max-width: 320px;
		margin-top: 10px;
		border: 2px solid #aaa;
		border-bottom: 1px solid #aaa;
		height: 56px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		position: relative;
		section {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			border: 1px solid #666;
			padding: 11px 11px 0;
		}
		div {
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 1px solid #666;
		}
		.noborder {
			border-color: transparent;
		}
		& > p {
			position: absolute;
			top: 19px;
			left: 29px;
			right: 29px;
			border: 1px solid #666;
			height: 16px;
		}
		.shaftinfo {
			border: 0;
			position: absolute;
			left: 0;
			bottom: 3px;
			width: 100%;
			p {
				display: inline-block;
				width: 45%;
				font-size: 11px;
				line-height: 12px;
				margin: 0;
				text-align: right;
			}
			.signal {
				display: inline-block;
				width: 8px;
				height: 8px;
				line-height: 12px;
				background: #828081;
				border-radius: 50%;
			}
			.ready {
				background: #21B923;
			}
		}
	}
	.realdoors {
		max-width: 320px;
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		border: 3px solid #C6C6C6;
		height: 220px;
		justify-content: space-between;
		overflow: hidden;
		.doorbox {
			position: absolute;
			width: 50%;
			height: 100%;
			background: url("../../../assets/ladder-bg.jpg") repeat;
			background-size: 100% 100%;
		}
		& > .doorbox:first-child {
			left: 0;
			border-right: 1px solid #B8B8B8;
		}
		& > .doorbox:last-child {
			right: 0;
			border-left: 1px solid #B8B8B8;
		}
		.doorstitle {
			width: 16%;
			height: 100%;
			background: transparent;
			position: absolute;
			left: 42%;
			z-index: 8;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			div {
				width: 6px;
				max-width: 10px;
				height: 60%;
				margin: auto;
				border: 1px solid #eaeaea;
				background: #fff;
			}
			.screen {
				background: #21B923;
			}
		}
		p {
			position: absolute;
			width: 10px;
			top: 70px;
			right: 6px;
			font-size: 11px;
		}
	}
	.ul {
		list-style: none;
		display: inline-block;
		padding: 0;
		width: 40%;
		text-align: center;
		z-index: 5;
		margin-top: 8px;
		li {
			position: relative;
			display: inline-block;
		}
		& > li:nth-child(1),
		& > li:nth-child(3) {
			width: 36px;
			height: 36px;
			border: 1px solid #eaeeea;
			background: #fff;
			vertical-align: middle;
			text-align: center;
			// word-spacing: 8px;
			letter-spacing: 1px;
			line-height: 36px;
			font-size: 16px;
		}
		& > li:nth-child(2) {
			display: inline-block;
			width: 20px;
			height: 36px;
			line-height: 36px;
			vertical-align: middle;
			text-align: center;
			font-size: 18px;
		}
	}
	.offsets {
		.ul {
			width: 33%;
		}
	}
	.detail {
		width: 50%;
	}
	.addr {
		padding: 0;
		margin-bottom: 0;
	}
	.input {
		// color: transparent;
		// transform: scale(0);
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		// opacity: 0;
		z-index: 10;
		font-size: 14px;
		outline: none;
		border: 0;
		text-align: center;
		background: transparent;
		letter-spacing: 1px;
	}
	.center {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
	.debug {
		margin-top: 8px;
		border-radius: 3px;
		border: 1px solid #ccc;
		padding-bottom: 8px;
	}
	.debug-card {
		max-width: 460px;
	}
	input[disabled] {
		color: #999;
	}
	.chart-title {
		font-size: 12px;
		padding-left: 8px;
	}
	.layout-content-main{
		overflow-y: scroll;
	}
	.Menu{
		height: 287px;
		overflow: auto;
	}
	.shishi{
		margin: 5px;
	}
	.signal1 {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-right: 7px;
		margin-top: -3px;
		background: #21B923;
		vertical-align: middle;
		border-radius: 50%;
	}
	.signal2 {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-right: 7px;
		margin-top: -3px;
		background: #828081;
		vertical-align: middle;
		border-radius: 50%;
	}
	.stylesdoor {
		// background: #FEFCFD;
		// border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
		// border-radius: 5px;
		padding: 0 20px 10px;
		section {
			display: flex;
			flex-flow: row wrap;
			// justify-content: space-between;
			// align-items: center;
		}
		i {
			font-style: normal;
			display: inline-block;
			text-align: right;
			padding-right: 14px;
		}
		.pd{
			width: 100%;
		}
		.pd1{
			width: 100%;
		}
		p {
			width: 50%;
			font-size: 12px;
			vertical-align: middle;
			margin: 0;
			text-align: left;
			line-height: 24px;
			height: 24px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
		.status {
			font-size: 12px;
			color: #289EFC;
		}
		.status1 {
			width: 100%;
			font-size: 12px;
			color: #289EFC;
		}
		.signal {
			display: inline-block;
			width: 14px;
			height: 14px;
			margin-right: 7px;
			margin-bottom: 5px;
			background: #828081;
			vertical-align: middle;
			border-radius: 50%;
		}
	  .signal1 {
	  	display: inline-block;
	  	width: 14px;
	  	height: 14px;
	  	margin-right: 7px;
	  	margin-top: -3px;
	  	background: #21B923;
	  	vertical-align: middle;
	  	border-radius: 50%;
	  }
	  .signal2 {
	  	display: inline-block;
	  	width: 14px;
	  	height: 14px;
	  	margin-right: 7px;
	  	margin-top: -3px;
	  	background: #828081;
	  	vertical-align: middle;
	  	border-radius: 50%;
	  }
		.ready {
			background: #21B923;
		}
	}
</style>