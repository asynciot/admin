<template lang="jade">
	div.layout-content-main(style="padding:0")
		Col(span='10' style="font-size : large;font-weight: bold;color:#333333")|控制柜常见故障TOP5
		Col(span='6')
			DatePicker(type="date" placeholder="开始日期" format="yyyy-MM-dd" v-model="starttime" style='' @on-change="search()")
		Col(span='1' align='center')|→
		Col(span='6')
			DatePicker(type="date" placeholder="截止日期" format="yyyy-MM-dd" v-model="endtime" style='' @on-change="search()")
		div.ch(id="freq" style="height:335px;width:100%")
</template>

<script>
	import echarts from 'echarts'
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				starttime:'',
				endtime:'',
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
				time:'',
				topcode:[],
				codelist:['维护','过流','母线过压','母线欠压','输入缺相',
						'输出缺相','输出过力矩','编码器故障','模块过热','运行接触器故障',
						'E10','E11','E12','E13','E14',
						'E15','层站召唤通讯故障','轿厢通讯故障','并联通讯故障','开门故障',
						'关门故障','开关门到位故障','平层信号异常','终端减速开关故障','下限位信号异常',
						'上限位信号异常','打滑故障','电梯速度异常','电机反转故障','磁极位置学习故障',
						'E30','停车速度检测','井道自学习故障','马达过热故障','制动力严重不足',
						  '制动力不足警告',]
			};
		},
		created(){
			// setTimeout(() => {
				this.getfaultfreq();
			// },500)
		},
		components: {
			draggable,
		},
		methods: {
			refresh(){
				this.OrderCharts();
				setTimeout(() => {
					this.refresh();
				},1000)
			},
			async search(){
				if ((this.starttime>this.endtime)&&(this.endtime !="")) {
					this.endtime=this.starttime
					this.$Notice.warning({
						title: '提示',
						desc: '截至日期必须大于开始日期',
						})
					}
				let res = await this.$api.faultfreq({starttime: Date.parse(this.starttime),
													endtime: Date.parse(this.endtime)+86400000})
				if (res.data.code == 0){
					this.topcode=res.data.list
				}
			},
			async getfaultfreq(){
				// var time=Date.parse(this.$format(new Date(), 'yyyy-MM-DD'))
				let res = await this.$api.faultfreq()
				if (res.data.code == 0){
					this.topcode=res.data.list
				}
				this.refresh()
			},
			OrderCharts() {

				let freq = this.$echarts.init(document.getElementById('freq'))
				freq.resize()
				freq.setOption({
					title: {
							show: false,
							padding:0,
							text: '控制柜常见故障TOP5',
							textStyle: {
				              color: '#333333',
				              fontSize:'1'
				              },
					},
					xAxis: {
						type: 'category',
						data: [this.codelist[parseInt(this.topcode[0].code.toString(16))], 
								this.codelist[parseInt(this.topcode[1].code.toString(16))], 
								this.codelist[parseInt(this.topcode[2].code.toString(16))], 
								this.codelist[parseInt(this.topcode[3].code.toString(16))], 
								this.codelist[parseInt(this.topcode[4].code.toString(16))], 
						],
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
	                            width:0.5,//这里是为了突出显示加上的，可以去掉
	                        }
	                    },                         
	                    //  改变x轴字体颜色和大小
	                    axisLabel: {
	                        textStyle: {
	//                             color: '#333333',
	                            fontSize:'13'
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
	                        barStyle:{
	                            color:'#007F00',
	                            width:0.5,//这里是为了突出显示加上的，可以去掉
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
							data: [this.topcode[0].counter,
									this.topcode[1].counter,
									this.topcode[2].counter,
									this.topcode[3].counter,
									this.topcode[4].counter,
							],
							type: 'bar',
							color:'#FF7F00',
							barWidth: 40,
							itemStyle: {
								normal: {
									//通过数组下标选择颜色
									color: function(params) {
											var colorList = [
											 '#D02000','#708000','#308040','#006090','#0000F0',
											 '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'
											 ];
										return colorList[params.dataIndex]
									},
								}
							}

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
