<template lang="jade">
	div.layout-content-main(style="padding:0")
		div.ch(id="activedoor" style="height:360px;width:100%")
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
				topdevice:[],
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
				},2000)
			},
			async getfaultfreq(){
				let res = await this.$api.activedoor()
				var ech
				if (res.data.code == 0){
					for (var i=0;i<5;i++){
						ech = await this.$api.devices({num:1,page:1,search_info:res.data.list[i].device_id,isreg: ''})			
						if (ech.data.data.code == 0){if (ech.data.list[0].device_name != null) {res.data.list[i].name=ech.data.list[0].device_name}}
					}
					this.topdevice=res.data.list
					// console.log(res.data)
				}
				this.refresh()
			},
			OrderCharts() {

				let activedoor = this.$echarts.init(document.getElementById('activedoor'))
				activedoor.resize()
				activedoor.setOption({
					title: {
							text: '设备使用次数TOP5',
							textStyle: {
				              color: '#333333',
				              fontSize:'16'
				              },
					},
					xAxis: {
						type: 'category',
						data: [this.topdevice[0].device_id, 
								this.topdevice[1].device_id, 
								this.topdevice[2].device_id, 
								this.topdevice[3].device_id, 
								this.topdevice[4].device_id, 
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
							data: [this.topdevice[0].counter,
									this.topdevice[1].counter,
									this.topdevice[2].counter,
									this.topdevice[3].counter,
									this.topdevice[4].counter,
							],
							type: 'bar',
							color:'#FF7F00',
							barWidth: 40,
							itemStyle: {
								normal: {
									//通过数组下标选择颜色
									color: function(params) {
											var colorList = [
											 '#FF7F00','#FF7F00','#FF7F00','#FF7F00','#FF7F00',
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
