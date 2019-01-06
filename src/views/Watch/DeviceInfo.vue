<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=1)
				Col(span=12)
					card(style="height: 280px")
						Col(span="24" style="height: 35px;font-size:20px")|基础信息
							i(class="fa fa-bookmark" ,:style="{color:cardcolor}" v-for="cardcolor in getlist(data.tagcolor)" style="margin-left: 10px")
						Form.status(label-position="left",:label-width="70")
							Row
								Col(span="20")
									Form-item.fontsize(label="设备名称:")
										p()|{{data.device_name}}
								Col(span="12")
									Form-item(label="id:")
										p()|{{data.id}}
								Col(span="12")
									Form-item(label="IMEI:")
										p()|{{data.IMEI}}
								Col(span="12")
									Form-item(label="类型:")
										p(v-if="data.device_type=='15'")|控制器
										p(v-if="data.device_type=='240'")|控制柜
								Col(span="12")
									Form-item(label="状态:")
										p()|{{data.state}}
								Col(span="12")
									Form-item(label="ip定位:")
										p()|{{data.ipaddr}}
								Col(span="12" v-if="data.device_type=='15'")
									Form-item(label="型号:")
										p()|{{data.device_model}}
								Col(span="24")
									Form-item(label="基站定位:")
										p()|{{data.cell_address}}
								Col(span="20")
									Form-item(label="安装地址:")
										p()|{{data.install_addr}}
								Col(span="4")
									Button(type="primary" @click="parameter()")|查看参数
					Col(span=12)
						card.card(style='height: 220px')
							img(src='../../assets/wave.gif', width='100%', height='200')
					Col(span=12)
						card.card(style='height: 220px')
							p.clearfix(slot='title' style="height: 20px", align='center')|状态监控
							Form.status(label-position="left",:label-width="70")
								Col(span="23")
									Form-item(label="监控时长(s):")
										Input(v-model='realtime.duration' maxlength="4")
								Col(span="23" style="")
									Form-item(label="采样周期(ms):")
										Select(v-model='realtime.interval')
											Option(key="1" label="100" value='100')
											Option(key="2" label="200" value='200')
											Option(key="3" label="500" value='500')
											Option(key="4" label="1000" value='1000')
											Option(key="5" label="2000" value='2000')
								Col(span="23" align='center' style="margin-top: 10px;margin-left: 10px")
									Button(type="success" @click="monitor('1')" style="width:100%")|状态监控
				Col(span=12)
					card.card(align='left' style='height: 500px',v-if='data.device_type == 240')
						Col(span="24" style="height: 35px;font-size:20px")|内存调试
						Row(style="margin-top:20px")|{{this.loading}}
						Row(style="margin-top:20px")
							Col(span=5 style="height: 30px;font-size:16px")|段地址:
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[0]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[1]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[2]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[3]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[4]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[5]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[6]')
							Col(span=2)
								Input(style="width:70%" maxlength="1" v-model='address[7]')
						Row(style="margin-top:75px")
							Col(span=5 style="height: 30px;font-size:16px")|偏移地址:
							Col(span=6)
								Input(style="width:80%" maxlength="8" v-model='segment')
							Col(span=5 style="height: 30px;font-size:16px")|监控时长(s):
							Col(span=6)
								Input(style="width:75%" maxlength="4" v-model='duration')
						Row(style="margin-top:75px")
							Col(span=5 style="height: 30px;font-size:16px")|结果:
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[0]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[1]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[2]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[3]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[4]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[5]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[6]' readonly)
							Col(span=2)
								Input(style="width:70%" maxlength="2" v-model='res[7]' readonly)
						Row(style="margin-top:75px")		
							Col(span="20" align='right' style="margin-top: 10px;margin-left: 10px")
								Button(type="success" @click="monitor('2')" style="width:25%")|内存监控
					card.card(align='center' style='height: 500px',v-if='data.device_type == 15')
						div( style="height: 35px;font-size:20px")
							Col(span=4)|事件记录
							Col(span=4)
								Select.smr(v-model="keyword"  placeholder="类型" style="width:100%")
									Option(key="1" label="id" value='id')
									Option(key="2" label="长度" value="length")
									Option(key="3" label="间隔" value="interval")
							Col(span=5)
								AutoComplete.mg(name="inpSer" v-model="search_info" ,:data="menu" , placeholder="关键词" max=15 style="width: 80%" class="handle-input mr10" id="serch1" @on-change="search()")
							Col(span=5)
								DatePicker(type="date" placeholder="开始日期" format="yyyy-MM-dd" v-model="options.starttime" style='width: 100%;' @on-change="search()")
							Col(span=1)|→
							Col(span=5)
								DatePicker(type="date" placeholder="截止日期" format="yyyy-MM-dd" v-model="options.endtime" style='width: 100%;' @on-change="search()")
						div(style='font-size: large;', v-if='total==0')| 这台设备没有事件记录
						Scroll(:on-reach-bottom='handleReachBottom', :distance-to-edge="0" , style="height: 360px; margin-top: 10px")
							card(v-bind:padding='4',v-for='item in list', :key='item.id', align='left', style='height: 80px; font-size: 16px; cursor: pointer;', @click.native='history(item.id)')
								Col(span=22)|  事件序号： {{item.id}}
								Col(span=2)
									div(style="color:red" v-if="(now-item.time)<300000")| New!
								Col(span=24)|  发生时间： {{formatDate(item.time,'yyyy-MM-dd HH:mm:ss')}}
								Col(span=24)|  结束时间： {{formatDate(item.time+item.interval*item["length"],'yyyy-MM-dd HH:mm:ss')}}
						div(style='font-size: large;') 共 {{total}} 条
</template>

<script>
	import {
		formatDate
	} from '../../utils.js'
	export default {
		data() {
			return {
				loading:'',
				websock:'',
				address:['0','0','0','0','0','0','0','0'],
				res:['0','0','0','0','0','0','0','0'],
				segment:0,
				ctn:false,
				duration:30,
				keyword:'time',
				search_info: '',
				door:true,
				now:[],
				time:'',
				data:[],
				menu:[],
				list:[],
				list2:[],
				total:'',
				realtime: {
					threshold:'1',
					duration:20,
					interval:'1000',
				},
				options: {
					id:'',
					IMEI:'',
					name:'',
					page: 1,
					num: 9,
					total: 0,
					isreg: "True",
					duration:'',
					interval:'',
					length:'',
					starttime:'',
					endtime:'',
				},
				columns: [ {
						title: ' ',
						key: 'device_name'
					},
					{
					title: ' ',
					key: 'IMEI',
					},],
			}
		},
		created() {
				this.getData()
		},
		methods: {
			handleSearch1 (selectword) {
				this.menu=[];
				var str;
					for (var i=0;i<this.list.length;i++){
						str=this.list[i].IMEI;
							if (str != null){
								if (str.indexOf(selectword)>=0)
								this.menu.push(str)
							}
						str=this.list[i].device_name;		  	    	
							if (str != null){
								if (str.indexOf(selectword)>=0){
								this.menu.push(str)
								}
							} 
						}
			},
			async getData() {
				this.options.IMEI=this.$route.params.IMEI
				let res = await this.$api.devices({num:1,page:1,IMEI:this.$route.params.IMEI})
				if(!res.data.code){					
					this.data = res.data.data.list[0]
					this.options.device_id=this.data.id
					if(this.data.state == "online"){
						this.data.state = "在线"
					}else if(this.data.state == "offline"){
						this.data.state = "离线"
					}else if(this.data.state == "dead"){
						this.data.state = "长期离线"
					}
					let eve = await this.$api.event(this.options)
					if(!eve.data.code){
						this.list = eve.data.data.list
						this.list2 = this.list
						this.total = eve.data.data.totalNumber
					}else{
						this.$Notice.error({
							title: '错误',
							desc: '获取事件信息错误！'
						})
					}									
				}else(
					this.$Notice.error({
						title: '错误',
						desc: '获取电梯数据错误！'
					})
				)
				this.now=Date.parse(new Date())
			},
			async search() {
				this.time=new Date(this.options.time)
				if (this.keyword=="id") {this.options.id=this.search_info}
				if (this.keyword=="length") {this.options["length"]=this.search_info}
				if (this.keyword=="interval") {this.options.interval=this.search_info}			
				if (this.options.search_info == "") {this.list=this.list2}
				else {
					this.options.starttime=formatDate(this.options.starttime,'yyyy-MM-dd')
					this.options.endtime=formatDate(this.options.endtime,'yyyy-MM-dd')
					if ((this.options.starttime>=this.options.endtime)&&(this.options.endtime !="")) {
						this.options.endtime=formatDate(Date.parse(this.options.starttime)+86400000,'yyyy-MM-dd')
						this.$Notice.warning({
							title: '提示',
							desc: '截至日期必须大于开始日期',
							})
						}	
					let res = await this.$api.event(this.options)
					this.total = res.data.data.totalNumber
					this.list = res.data.data.list
				}
			},
			parameter(){
				if (this.data.device_type == '15') {
					this.$router.push({
						name: 'doorparameter',
						params: {
							IMEI: this.data.IMEI,
							id: this.data.device_id,
							device_name:this.data.device_name,
						}
				})}
				
				if (this.data.device_type == '240') {
					this.$router.push({
						name: 'ctrlparameter',
						params: {
							IMEI: this.data.IMEI,
							id: this.data.device_id,
							device_name:this.data.device_name,
						}
				})}
			},
			getlist(val){
				if (val==null) {return null}
				else {return val.split(';')}
			},
			async handleReachBottom () {
				if ( this.list.length<this.total ) {
					var options2=this.options
					options2.page=Math.ceil(this.list.length/9)+1
					options2.num=9
					let eve= await this.$api.event(options2)
					for (var i=0;i<9;i++){
						this.list.push(eve.data.data.list[i])
					}
					this.list2=this.list
				}
				else {
					let eve= await this.$api.event(options2)
					this.$Notice.warning({
						title: '提示',
						desc: '已经到底了！',
					})
				}
				this.total = eve.data.data.totalNumber
					return new Promise(resolve => {			
						resolve();
					});
				},
			monitor(val) {
				if (!(/^\d+$/.test(this.realtime.duration)&&/^\d+$/.test(this.realtime.interval)&&/^\d+$/.test(this.realtime.threshold))){
					this.$Notice.error({
						title: '错误',
						desc: '所有参数都必须是数字！'
					})
				}
				else {			
				if ((this.realtime.interval*this.realtime.threshold>this.realtime.duration*1000)){
					this.$Notice.error({
						title: '错误',
						desc: '监控时长必须大于采样周期'
					})
				}
				else {
					if (this.data.device_type=='15'){
						this.$router.push({
							name: 'doormonitor',
							params: {			
								duration: this.realtime.duration,
								interval: this.realtime.interval,
								threshold: this.realtime.threshold,
								IMEI: this.data.IMEI,
								id: this.data.device_id,
							}
						})
					}
					if ((this.data.device_type=='240')&&(val=='1')){
						this.$router.push({
							name: 'ctrlmonitor',
							params: {
								duration: this.realtime.duration,
								interval: this.realtime.interval,
								threshold: this.realtime.threshold,
								IMEI: this.data.IMEI,
								id: this.data.device_id,
							}
						})
					}
					if ((this.data.device_type=='240')&&(val=='2')){
						this.initWebsocket()
					}
				}	
				}
			},
			history(val) {
				if (this.data.device_type=='15'){
					this.$router.push({
						name: 'doorhistory',
						params: {							
							id: val,
						}
					})
				}
				if (this.data.device_type=='240'){
					this.$router.push({
						name: 'ctrlhistory',
						params: {
							id: val
						}
					})
				}
				
			},
			formatDate(val, format) {
				return formatDate(val, format)
			},
			async initWebsocket(){ //初始化weosocket			
				let res = await this.$api.monitor({
					device_type: 240,
					type: 1,
					address: (this.address[0]+','+this.address[1]+','+this.address[2]+','+this.address[3]+
						  ','+this.address[4]+','+this.address[5]+','+this.address[6]+','+this.address[7]),
					segment: this.segment,
					IMEI: this.data.IMEI,
					duration: this.duration,
					threshold: 1,
					interval: 1000,
					op:'open',
				});
				if(res.data.code != 0){
					alert("该电梯已被其他人启动实时监控")
				}
				let wsurl ='ws://47.96.162.192:9006/device/Monitor/socket?deviceId='+this.data.id
				this.websock = new WebSocket(wsurl);
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onmessage = this.websocketonmessage;
			}, 
			websocketonopen() {
				console.log("WebSocket连接成功");
				this.loading='WebSocket连接成功'
			},
			websocketonerror(e) {//错误
				console.log("WebSocket连接发生错误");
				this.loading='WebSocket连接失败'
			},
			websocketonmessage(e){//数据接收
			this.loading='开始获取数据'
				if(e.data=="closed"){
					this.loading="此次实时数据已结束"
				}else{
					var redata = JSON.parse(e.data)
					var buffer = base64url.toBuffer(redata.data);
					console.log(buffer)
					for (var i=0;i<8;i++) {this.res[i]=buffer[i].toString(16)}
					
				}
			},
			async closed(){//数据发送
				let res = await this.$api.monitor({
					IMEI:this.query.IMEI,
					op:'close',
				});
			},
	 	}
	}
</script>

<style lang="scss">
	.mg{
		margin-left: 20px;
	}
	.status {
		p {
			color: #289efc;
		}
	}
	.asd{
		font-size: 20px;
	}
	.card {
		.fr {
			font-style: normal;
			color: #289efc;
		}
	}
	.detail {
		width: 50%;
	}
	.addr {
		padding: 0;
		margin-bottom: 0;
	}
	.center {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
</style>