<template lang="jade">
	div.layout-content-main(style="padding:0")
		div.ch(id="freq" style="height:360px;width:100%")
</template>

<script>
	import echarts from 'echarts'
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				LastWeek:'',
				LastWeekend:'',
				NowWeek:'',
				NowWeekend:'',
				Lastlist:{
					monday:'0',
					tuesday:'0',
					wensday:'0',
					thursday:'0',
					friday:'0',
					saturday:"0",
					sunday:"0",
				},
				list:{
					monday:'0',
					tuesday:'0',
					wensday:'0',
					thursday:'0',
					friday:'0',
					saturday:"0",
					sunday:"0",
				},
				topcode:[],
				codelist:[]
			};
		},
		created(){
			this.LastWeek = this.getWeek(7)
			this.LastWeekend = this.getWeek(1)
			this.NowWeek = this.getWeek(0)
			this.NowWeekend = this.getWeek(-6)
			this.getLastData(this.LastWeek,this.LastWeekend)
			this.getData(this.NowWeek,this.NowWeekend)
			// setTimeout(() => {
				this.getfaultfreq();
			// },500)
		},
		components: {
			draggable,
		},
		methods: {
			async getLastData(val,item){
				let res = await this.$api.orderCount({
					starttime:val,
					endtime:item,
				})
				this.Lastlist.monday = res.data.data.monday
				this.Lastlist.tuesday = res.data.data.tuesday
				this.Lastlist.wensday = res.data.data.wensday
				this.Lastlist.thursday = res.data.data.thursday
				this.Lastlist.friday = res.data.data.friday
				this.Lastlist.saturday = res.data.data.saturday
				this.Lastlist.sunday = res.data.data.sunday
			},
			async getData(val,item){
				let res = await this.$api.orderCount({
					starttime:val,
					endtime:item,
				})
				this.list.monday = res.data.data.monday
				this.list.tuesday = res.data.data.tuesday
				this.list.wensday = res.data.data.wensday
				this.list.thursday = res.data.data.thursday
				this.list.friday = res.data.data.friday
				this.list.saturday = res.data.data.saturday
				this.list.sunday = res.data.data.sunday
			},
			getWeek(n){
				var now = new Date()
				var year = now.getFullYear()
				var month = now.getMonth()+1
				var date = now.getDate()
				var day = now.getDay()
				if(day !== 0){
					n =n+day-1
				}else{
					n =n+day
				}
				if(day){
					if(month>1){
						month=month
					}else{
						year=year-1
						month=12
					}
				}
				now.setDate(now.getDate()-n);	
				year=now.getFullYear();
				month=now.getMonth()+1;
				date=now.getDate();
				var s=year+"-"+(month<10?('0'+month):month)+"-"+(date<10?('0'+date):date);
				return s
			},
			async getfaultfreq(){
				let res = await this.$api.faultfreq()
				
				if (res.data.code == 0){
					this.topcode=res.data.list
					// console.log(res.data)
				}
				this.OrderCharts()
			},
			OrderCharts() {
				let freq = this.$echarts.init(document.getElementById('freq'))
				freq.setOption({
					title: {
							text: '出现最多的故障TOP5',
							textStyle: {
				              color: '#333333',
				              fontSize:'16'
				              },
					},
					xAxis: {
							type: 'category',
							data: [code[this.topcode[0].code]||'', '2', '3', '4', '5'],
							splitLine: {
							               			show: false, 
							                    //  改变轴线颜色
							                    lineStyle: {
							                        // 使用深浅的间隔色
							                        color: ['white']
							                        }                            
							                    },
							                    //  改变x轴颜色
							                    axisLine:{
							                        lineStyle:{
							                            color:'#224488',
							                            width:0.5,//这里是为了突出显示加上的，可以去掉
							                        }
							                    },                         
							                    //  改变x轴字体颜色和大小
							                    axisLabel: {
							                        textStyle: {
							//                             color: '#333333',
							                            fontSize:'16'
							                        },
							                    },
					},
					yAxis: {
							type: 'value',
							splitLine: {
							               			show: false, 
							                    //  改变轴线颜色
							                    lineStyle: {
							                        // 使用深浅的间隔色
							                        color: ['white']
							                        }                            
							                    },
							                    //  改变x轴颜色
							                    axisLine:{
							                        lineStyle:{
							                            color:'#333333',
							//                            width:8,//这里是为了突出显示加上的，可以去掉
							                        }
							                    },                         
							                    //  改变x轴字体颜色和大小
							                    axisLabel: {
							                        textStyle: {
							                            color: '#333333',
							                            fontSize:'16'
							                        },
							                    },
					},
					series: [{
							data: [120, 200, 150, 80, 70],
							type: 'bar',
							color:'#8B2252',
					}]
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ch{
		width: 100%;
		height: 500px;
	}
</style>
