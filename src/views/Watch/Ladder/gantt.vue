<template>
	<div>
		<Modal
		title="查询时间"
		v-model="modal"
		@on-ok="ok"
		:mask-closable="false">
			<p>
				<DatePicker type="date" :options="options" :placeholder="$t('from date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="start_time" @on-change="changeDay()"></DatePicker>
				~
				<DatePicker type="date" :options="options" :placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="end_time" @on-change="changeDay()"></DatePicker>
			</p>
		</Modal>
		<Tabs value="today" :animated="false" @on-click="changetabs">
			<TabPane label="一天" name="day">
			</TabPane>
			<TabPane label="七天" name="week">
			</TabPane>
			<TabPane label="一个月" name="month">
			</TabPane>
			<TabPane label="自定义" name="customize">
			</TabPane>
			<DatePicker type="date" :options="options" :placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="endtime" @on-change="getoffline()"></DatePicker>
		</Tabs>
		<Row>
			<Col span="22">
				<div id="container" :style="{ 'overflow': 'auto', 'overflow-x': 'auto', 'overflow-y': 'auto', 'min-width': '900px', height: '600px'}"></div>
				<br/>
				<br/>
			</Col>
			<Col span="2">
				<Table border :row-class-name="rowClassName" :columns="columns1" :data="data" style="height: 550px;"></Table>
			</Col>
		</Row>
		<Page simple :total="offlinetotal" :page-size="offlinenum" :current="offlinepage" @on-change="pageChange" style="text-align:center;margin-top: 20px;"></Page>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data(){
			return{
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() ;
					}
				},
				columns1: [
					{
						title: '事件次数统计',
						key: 'times'
					},
				],
				data: [],
				event:[],
				modal:false,
				mylist:[],
				offlinetotal:0,
				start_:"",
				end_:"",
				seriesData:[],
				yAxisData_plant:[],
				timetabs:'today',
				start_time:'',
				end_time:'',
				endtime:'',
				offlinenum:10,
				offlinepage:1,
			}
		},
		props:{
			psMsg: String,
		},
		mounted(){
			this.getday()
			this.draw()
		},
		methods:{
			getday(){
				//this.starttime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
				this.endtime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
				var todayd=new Date();
				todayd.setDate(todayd.getDate());
				todayd.setHours(0)
				todayd.setMinutes(0)
				todayd.setSeconds(0)
				this.start_=this.$format(Date.parse(todayd),'YYYY-MM-DD HH:mm:ss')
				var tomorrowd=new Date();
				tomorrowd.setDate(tomorrowd.getDate()+1);
				tomorrowd.setHours(0)
				tomorrowd.setMinutes(0)
				tomorrowd.setSeconds(0)
				this.end_=this.$format(Date.parse(tomorrowd),'YYYY-MM-DD HH:mm:ss')
			},
			getoffline(){
				const t=new Date(this.endtime)
				console.log(this.endtime)
				switch(this.timetabs){
					case 'today':
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
					case 'week':
						t.setDate(t.getDate() - 6);
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
					case 'month':
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
				}
				this.draw()
			},
			changeDay(){
				if((this.start_time>=this.end_time)&&(this.end_time!="")){
					this.end_time=this.$format(Date.parse(this.start_time)+8640000,'yyyy-MM-dd')
					this.$Notice.warning({
						title:this.$t('tip'),
						desc:this.$t('The closing date must be later than the from date'),
					})
				}
			},
			p(s){
				return s<10 ? '0'+ s: s
			},
			pageChange(val){
				this.offlinepage=val
				this.draw()
			},
			changetabs(val){
				this.timetabs=val
				var time
				const t=new Date(this.endtime)
				t.setDate(t.getDate() + 1);
				this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
				console.log(this.end_)
				switch(val){
					case 'day':
						time= new Date(this.endtime)
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						this.draw()
						break;
					case 'week':
						time= new Date(this.endtime)
						time.setDate(time.getDate() - 6);
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						console.log(time)
						console.log(this.start_)
						this.draw()
						break;
					case 'month':
						time= new Date(this.endtime)
						time.setMonth(time.getMonth() - 1);
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						this.draw()
						break;
					case 'customize':
						this.start_time=''
						this.end_time=''
						this.modal=true
						break;
				}
			},
			ok(){
				if(this.start_time!=''&&this.end_time!='')
				{
					this.start_=this.start_time
					this.end_=this.end_time
					this.draw()
				}
				else{
					this.$Notice.warning({
						title: this.$t('tip'),
						desc: '必须输入完整日期',
					})
				}
			},
			async draw(){
				const id = this.$route.params.id;
				this.data=[]
				this.mylist=[]
				this.yAxisData_plant=[]
				this.seriesData=[]
				var _this = this
				let res = await this.$api.reLadder({num:1,page:1,search_info:this.$route.params.IMEI})
				// let eve = await this.$api.readLadderEvent({id:id,page:1,num:10,start:this.$format(this.start_,'YYYY-MM-DD'),end:this.$format(this.end_,'YYYY-MM-DD')})
				if(res.data.code ==0){
					if(res.data.data.list[0].ctrl!=null && res.data.data.list[0].crtl != ''){
						this.mylist.push({["plant"]:res.data.data.list[0].ctrl,["id"]:res.data.data.list[0].ctrl})
					}
					if (res.data.data.list[0].door1!=null && res.data.data.list[0].door1 != '') {
						this.mylist.push({["plant"]:res.data.data.list[0].door1,["id"]:res.data.data.list[0].door1})
					}
					if (res.data.data.list[0].door2!=null && res.data.data.list[0].door2 != '') {
						this.mylist.push({["plant"]:res.data.data.list[0].door2,["id"]:res.data.data.list[0].door2})
					}
				}
				//console.log(this.mylist.length)
				for (var i=0;i<this.mylist.length;i++){
					await this.readEvent(this.mylist[i].id,i)
				}
				//console.log(this.mylist)
				for(var i=0;i<this.mylist.length;i++) {
					let res = await this.$api.devices({IMEI:this.mylist[i].id})
					console.log(res)
					this.mylist[i].plant = res.data.data.list[0].device_name
				}
				console.log(this.mylist)
				this.mylist.forEach((item, index) => {
					_this.yAxisData_plant.push(item.plant)
					console.log(this.yAxisData_plant)
					console.log(item)
					let bgColor;
					console.log(item.list)
					item.list.forEach((listItem, listIndex) => {
						switch (listItem.colorNum) {
							case 0:
								bgColor = 'rgba(0,187,255,.4)';
								break;
							case 1:
								bgColor = 'rgba(80,227,194,.4)';
								break;
							case 2:
								bgColor = 'rgba(255,255,255,1)';
								break;
							case 3:
								bgColor = 'rgba(255,207,107,.4)';
								break;
							default:
								bgColor = 'rgba(0,187,255,.4)'
						}
						let startTime = new Date(listItem.startTime).getTime();
						console.log(listItem.endTime)
						let itemEndTime = new Date(listItem.endTime);
						//itemEndTime.setSeconds(itemEndTime.getMinutes() + 1);
						console.log(itemEndTime)
						let endTime = itemEndTime.getTime();
						console.log(listItem.item);
						_this.seriesData.push({
							name: listItem.item,
							value: [
								index,
								startTime,
								endTime,
								listItem.quantity,
							],
							itemStyle: {
								normal: {
									color: bgColor
								}
							}
						});
						console.log(_this.seriesData)
					})
				});

				let myCharts=this.$echarts.init(document.getElementById('container'));
				myCharts.resize()
				myCharts.setOption({
					backgroundColor: '#26263C',
					tooltip: {
						formatter: function (params) {
							return params.marker + params.name;
						}
					},
					grid: {
						top: 48,
						left: 100,
						right: 50,
						bottom: 50,
						height:500,
					},
					dataZoom: [{
						show: true,
						type: 'slider',
						filterMode: 'none',
						realtime: false,
						height: 10,
						top: 570,
						startValue:new Date(_this.start_).getTime(),
						endValue:new Date(_this.start_).getTime() + 3600 * 24 *  1000,
						minValueSpan: this.timetabs=='today' ? 3600*1000:3600*1000,
						handleIcon: 'path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0',
						handleSize: '120%',
						handleStyle: {
							color: "#fff",
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 4
						},
						textStyle: {
							color: "transparent"
						},
						borderColor: 'transparent',
						backgroundColor: '#D7F4FF',
						dataBackground: {
							lineStyle: {
								width: 0
							},
							areaStyle: {
								color: 'transparent'
							}
						},
						fillerColor: '#00EBFF',
						labelFormatter: ''
					}, {
						type: "inside",
						show: true,
						zoomOnMouseWheel: false,
						moveOnMouseWheel: true,
						moveOnMouseMove: true,
						preventDefaultMouseMove: true
					}],
					xAxis: {
						type: 'time',
						min: new Date(_this.start_).getTime(),
						max: new Date(_this.end_).getTime(),
						scale: true,
						position: 'top',
						splitNumber: 7,
						axisLabel: {
							show: true,
							textStyle: {color: '#ffffff'},
							interval: 0,
							margin: 15,
							fontSize: 14,
							formatter: (value, index) => {
								var date = new Date(value);
								var texts = [date.getFullYear(),(date.getMonth() + 1), date.getDate()].join('/')+"\n"+date.getHours()+":"+this.p(date.getMinutes());
								return texts;
							}
						},
						axisLine: {show: false,},
						splitLine: {
							show: true,
							lineStyle: {color: 'rgba(233,233,233,0.1)'}
						},
						axisTick: {
							lineStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: {
						axisLine: {
							onZero: false,
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {color: '#ffffff'},
							fontSize: 11
						},
						splitLine: {
							show: true,
							lineStyle: {color: 'rgba(233,233,233,0.1)'}
						},
						inverse: true,
						data: this.yAxisData_plant
					},
					series: [{
						type: 'custom',
						renderItem: function (params, api) {
							var categoryIndex = api.value(0);
							var start = api.coord([api.value(1), categoryIndex]);
							var end = api.coord([api.value(2), categoryIndex]);
							var height = api.size([0, 1])[1] * 0.6;
							var rectShape = echarts.graphic.clipRectByRect({
								x: start[0],
								y: start[1] - 5,
								width: end[0] - start[0],
								height: 10
							}, {
								x: params.coordSys.x,
								y: params.coordSys.y,
								width: params.coordSys.width,
								height: params.coordSys.height
							});
							return rectShape && {
								type: 'rect',
								shape: rectShape,
								style: api.style()
							};
						},
						encode: {
							x: [1, 2],
							y: 0
						},
						data: this.seriesData
					}]
				})
				//统计次数的表格
				var tr=document.getElementsByClassName("ivu-table-row")
				var trheight=520/tr.length+'px'
				for(var i=0;i<tr.length;i++){
					tr[i].style.height=trheight
				}
			},
			async readEvent(imei,i){
				let eve = await this.$api.eventImei({imei:imei,startTime:this.$format(this.start_,'YYYY-MM-DD'),endTime:this.$format(this.end_,'YYYY-MM-DD')})
				//console.log(eve)
				if(eve.data.code == 0) {
					this.data.push({times: eve.data.data.list.length})
					var singlelist = []
					var starttime
					var endtime
					var fakeendtime
					eve.data.data.list.forEach((item, index) => {
						//const duration = item.interval * item.length
						starttime = this.$format(Date.parse(new Date(item.start_time)), 'YYYY-MM-DD HH:mm:ss')
						endtime = this.$format(Date.parse(new Date(item.end_time)), 'YYYY-MM-DD HH:mm:ss')
						singlelist.push({
							["item"]: starttime + "—" + endtime,
							["startTime"]: starttime,
							["endTime"]: endtime,
							["quantity"]: item.id,
							["colorNum"]: 2
						})
					})
					console.log(singlelist.length)
					if(singlelist.length == 0)
						this.mylist[i].list = []
					else
						this.mylist[i].list = singlelist
					console.log(singlelist)
				}
				else console.log("error data")
			},
			rowClassName (row, index) {
				return 'demo-table-info-row';
			}
		}
	}
</script>

<style>
	.ivu-table .demo-table-info-row td{
		background-color: #26263c;
		color: #fff;
	}
</style>
