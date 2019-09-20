<template>
	<div>
		<DatePicker type="date" :placeholder="$t('from date')" format="yyyy-MM-dd" v-model="starttime"  style='color:#000' @on-change="getoffline()"></DatePicker>
		<DatePicker type="date" :placeholder="$t('closing date')" format="yyyy-MM-dd" v-model="endtime" style='color:#000' @on-change="getoffline()"></DatePicker>
		<div id="container" :style="{'min-width': '1280px', height: '400px'}"></div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data(){
			return{
				data:[
					{
                "list": [
							{
								"colorNum":2,
								"endTime":"2019-09-17 14:00:00",
								"item":"item1",
								"quantity":1960,
								"startTime":"2019-09-17 8:00:00",
							},
							{
								"colorNum":1,
								"endTime":"2018-08-04 12:00:00",
								"item":"item2",
								"quantity":492,
								"startTime":"2018-08-04 08:00:00",
							},
							{
								"colorNum":2,
								"endTime":"2018-08-04 18:00:00",
								"item":"item3",
								"quantity":20837,
								"startTime":"2018-08-04 14:00:00",
							},
							{
								"colorNum":3,
								"endTime":"2018-08-05 12:00:00",
								"item":"item4",
								"quantity":3620,
								"startTime":"2018-08-04 20:00:00",
							},
							{
								"colorNum":0,
								"endTime":"2018-08-05 24:00:00",
								"item":"item5",
								"quantity":7200,
								"startTime":"2018-08-05 14:00:00",
							},
						],
						"plant": "工厂1"
					},
					{
						"list": [
							{
								"startTime": "2018-08-03 12:00:00",
								"endTime": "2018-08-04 12:00:00",
								"quantity": 20,
								'colorNum':0,
								'item':'item6',
							}
						],
						"plant": "工厂2"
					},
					{
						"list": [
							{
								"startTime": "2018-08-04 12:00:00",
								"endTime": "2018-08-06 00:00:00",
								"quantity": 30,
								'colorNum':0,
								'item':'item7',
							},
							{
								"startTime": "2018-08-06 08:00:00",
								"endTime": "2018-08-06 12:00:00",
								"quantity": 20,
								'colorNum':1,
								'item':'item8',
							},
							{
								"startTime": "2018-08-06 14:00:00",
								"endTime": "2018-08-08 12:00:00",
								"quantity": 10,
								'colorNum':2,
								'item':'item9',
							},
							{
								"startTime": "2018-08-08 20:00:00",
								"endTime": "2018-08-10 12:00:00",
								"quantity": 10,
								'colorNum':3,
								'item':'item10',
							}
						],
						"plant": "工厂3"
					},
					{
						"list": [
							{
								"startTime": "2018-08-02 20:00:00",
								"endTime": "2018-08-03 12:00:00",
								"quantity": 20,
								'colorNum':1,
								'item':'item11',
							},
							{
								"startTime": "2018-08-03 20:00:00",
								"endTime": "2018-08-04 12:00:00",
								"quantity": 15,
								'colorNum':2,
								'item':'item12',
							},
							{
								"startTime": "2018-08-04 20:00:00",
								"endTime": "2018-08-05 12:00:00",
								"quantity": 15,
								'colorNum':3,
								'item':'item13',
							},
						],
						"plant": "工厂4"
					},
				],
				// start_:"2018-08-02 00:00:00",
				// end_:"2018-11-05 24:00:00",
				mylist:[],
				offlinetotal:"",
				start_:"",
				end_:"",
				seriesData:[],
				yAxisData_plant:[],
				starttime:'',
				endtime:'',
				offlinedevicename:'',
				offlinenum:20,
				offlinepage:1,
			}
		},
		mounted(){
			this.gettoday()
			this.draw()
		},
		methods:{
			gettoday(){
				this.starttime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
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
				const d=new Date(this.starttime)
				const resDate=d.getFullYear()+'-'+this.p((d.getMonth()+1))+'-'+this.p(d.getDate())+' '+this.p(d.getHours()+':'+this.p(d.getMinutes())+':'+this.p(d.getSeconds()));
				this.start_=resDate
				
				const t=new Date(this.endtime)
				const resTime=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate()+1)+' '+this.p(t.getHours()+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds()));
				this.end_=resTime
				this.draw()
			},
			p(s){
				return s<10 ? '0'+ s: s
			},
			async draw(){
				this.mylist=[]
				this.yAxisData_plant=[]
				this.seriesData=[]
				var that=this
				let off = await this.$api.getoffline({starttime:this.$format(this.starttime,'YYYY-MM-DD'),endtime:this.$format(Date.parse(this.endtime)+86400000,'YYYY-MM-DD'),num:this.offlinenum,page:this.offlinepage,search_info:this.offlinedevicename})
				off.data.data.list.forEach((item,index)=>{
					that.mylist.push({["plant"]:item.device_name,["id"]:item.id})
				})
				if (off.data.code == 0) {
					this.offlinetotal=off.data.data.totalNumber
					for (var i=0;i<this.mylist.length;i++){
						await this.singleoffline(this.mylist[i].id,i)
					}
				}
				console.log(this.mylist)
				console.log(this.data)
				this.mylist.forEach((item, index) => {
					that.yAxisData_plant.push(item.plant)
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
							//console.log(params)
							return params.marker + params.name;
						}
					},
					grid: {
						top: 48,
						left: 100,
						right: 50,
						bottom: 50,
						height:300,
					},
					dataZoom: [{
						show: true,
						type: 'slider',
						filterMode: 'none',
						realtime: false,
						height: 10,
						top: 370,
						startValue:new Date(that.start_).getTime(),
						endValue:new Date(that.start_).getTime() + 3600 * 24 * 1000 * 7,
						minValueSpan: 3600 * 24 * 1000 * 7,
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
								var texts = [date.getFullYear(),(date.getMonth() + 1), date.getDate()].join('/')+"  "+date.getHours()+":00";
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
							fontSize: 14
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
			},
			async singleoffline(val,val2){
				var that=this
				let off = await this.$api.singleoffline({starttime:this.$format(this.starttime,'YYYY-MM-DD'),endtime:this.$format(Date.parse(this.endtime)+86400000,'YYYY-MM-DD'),id:val})
				var singlelist=[]
				var starttime
				var endtime
				var fakeendtime
				off.data.list.forEach((item,index)=>{
					if(item.duration<=0){
						item.duration=1
					}
					starttime=this.$format(Date.parse(new Date(item.t_logout)),'YYYY-MM-DD HH:mm:ss')
					endtime=this.$format(Date.parse(new Date(item.t_logout))+parseInt(item.duration),'YYYY-MM-DD HH:mm:ss')
					//为了能看清掉线时刻，持续时间宽度最少为三分钟
					fakeendtime=this.$format(Date.parse(new Date(item.t_logout))+parseInt(item.duration),'YYYY-MM-DD HH:mm:ss')
					singlelist.push({["item"]:starttime+"————"+endtime,["startTime"]:starttime,["endTime"]:fakeendtime,["quantity"]:item.id,["colorNum"]:2})
					
				})
				that.mylist[val2].list=singlelist
			},
		}
	}
</script>

<style>
</style>
