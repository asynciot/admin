<template>
	<div>
		<Modal
		title="查询时间"
		v-model="modal"
		@on-ok="ok"
		:mask-closable="false">
			<p>
				<DatePicker type="date" :placeholder="$t('from date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="start_time" @on-change="getofflineofday()"></DatePicker>
				~
				<DatePicker type="date" :placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="end_time" @on-change="getofflineofday()"></DatePicker>
			</p>
		</Modal>
		<Tabs value="today" :animated="false" @on-click="changetabs">
			<TabPane label="当天" name="today">
			</TabPane>
			<TabPane label="七天" name="week">
			</TabPane>
			<TabPane label="一个月" name="month">
			</TabPane>
			<TabPane label="自定义" name="customize">
			</TabPane>
			<DatePicker type="date" :options="options1" :placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="endtime" @on-change="getoffline()"></DatePicker>
		</Tabs>
		<Row>
			<Col span="22">
				<div id="container" :style="{'min-width': '1050px', height: '600px'}"></div>
			</Col>
			<Col span="2">
				<Table border :row-class-name="rowClassName" :columns="columns1" :data="data1" style="height: 550px;"></Table>
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
				options1: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() ;
					}
				},
				columns1: [
					{
						title: '掉线次数统计',
						key: 'times'
					},
				],
				data1: [],
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
				offlinedevicename:'',
				offlinenum:10,
				offlinepage:1,
			}
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
				switch(this.timetabs){
					case 'today':
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
					case 'week':
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()-6)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
					case 'month':
						this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						this.start_=t.getFullYear()+'-'+this.p((t.getMonth()))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
						break;
				}
				this.draw()
			},
			getofflineofday(){
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
				var d
				const t=new Date(this.endtime)
				this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
				switch(val){
					case 'today':
						d= new Date(this.endtime)
						this.start_=d.getFullYear()+'-'+this.p((d.getMonth()+1))+'-'+this.p(d.getDate())+' '+this.p(d.getHours())+':'+this.p(d.getMinutes())+':'+this.p(d.getSeconds());
						this.draw()
						break;
					case 'week':
						d= new Date(this.endtime)
						this.start_=d.getFullYear()+'-'+this.p((d.getMonth()+1))+'-'+this.p(d.getDate()-6)+' '+this.p(d.getHours())+':'+this.p(d.getMinutes())+':'+this.p(d.getSeconds());
						this.draw()
						break;
					case 'month':
						d= new Date(this.endtime)
						this.start_=d.getFullYear()+'-'+this.p((d.getMonth()))+'-'+this.p(d.getDate())+' '+this.p(d.getHours())+':'+this.p(d.getMinutes())+':'+this.p(d.getSeconds());
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
				this.data1=[]
				this.mylist=[]
				this.yAxisData_plant=[]
				this.seriesData=[]
				var that=this
				let off = await this.$api.getoffline({starttime:this.$format(this.start_,'YYYY-MM-DD'),endtime:this.$format(this.end_,'YYYY-MM-DD'),num:this.offlinenum,page:this.offlinepage,search_info:this.offlinedevicename})
				off.data.data.list.forEach((item,index)=>{
					this.mylist.push({["plant"]:item.device_name,["id"]:item.id})
				})
				if (off.data.code == 0) {
					this.offlinetotal=off.data.data.totalNumber
					for (var i=0;i<this.mylist.length;i++){
						await this.singleoffline(this.mylist[i].id,i)
					}
				}
				this.mylist.forEach((item, index) => {
					this.yAxisData_plant.push(item.plant)
					console.log(item)
					let bgColor;
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
						let endTime = new Date(listItem.endTime).getTime();
						that.seriesData.push({
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
						startValue:new Date(that.start_).getTime(),
						endValue:new Date(that.start_).getTime() + 3600 * 24 *  1000,
						minValueSpan: this.timetabs=='today' ? 3600*1000:3600*24*1000,
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
						min: new Date(that.start_).getTime(),
						max: new Date(that.end_).getTime(),
						scale: true,
						position: 'top',
						splitNumber: 7,
						axisLabel: {
							show: true,
							textStyle: {color: '#ffffff'},
							interval: 0,
							margin: 15,
							fontSize: 14,
							formatter:function (value, index) {
								var date = new Date(value);
								var texts = [date.getFullYear(),(date.getMonth() + 1), date.getDate()].join('/')+"\n"+date.getHours()+":"+that.p(date.getMinutes());
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
						data: that.yAxisData_plant
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
						data: that.seriesData
					}]
				})
				//统计次数的表格
				var tr=document.getElementsByClassName("ivu-table-row")
				var trheight=520/tr.length+'px'
				for(var i=0;i<tr.length;i++){
					tr[i].style.height=trheight
				}

			},
			async singleoffline(val,val2){
				var that=this
				let off = await this.$api.singleoffline({starttime:this.$format(this.start_,'YYYY-MM-DD'),endtime:this.$format(this.end_,'YYYY-MM-DD'),id:val})
				console.log(off)
				this.data1.push({times:off.data.list.length})
				var singlelist=[]
				var starttime
				var endtime
				var fakeendtime
				off.data.list.forEach((item,index)=>{
					if(item.duration<0){
						item.duration=0
					}
					starttime=this.$format(Date.parse(new Date(item.t_logout)),'YYYY-MM-DD HH:mm:ss')
					endtime=this.$format(Date.parse(new Date(item.t_logout))+parseInt(item.duration),'YYYY-MM-DD HH:mm:ss')
					//为了能看清掉线时刻，时间宽度最少为20秒
					fakeendtime=this.$format(Date.parse(new Date(item.t_logout))+parseInt(item.duration)+20000,'YYYY-MM-DD HH:mm:ss')
					singlelist.push({["item"]:starttime+"—"+endtime,["startTime"]:starttime,["endTime"]:fakeendtime,["quantity"]:item.id,["colorNum"]:2})

				})
				that.mylist[val2].list=singlelist
				console.log(singlelist)
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
