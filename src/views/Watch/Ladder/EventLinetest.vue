<template lang="jade">
	div
		div(:id="id" ,:style="{ 'width': '100%', height: '250px'}")
</template>

<script>
	export default {
		data(){
			return{
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() ;
					}
				},
				Echart:{
					TimeList:[],
					TypeList:[],
					idList:[],
					InfoList:[],
					DataList:[],
				},
				modal:false,
				start_time:'',
				end_time:'',
				endtime:new Date(),
				timetabs:'day',
				id:"",
			}
		},
		props:{
			psMsg: String,
		},
		created(){
			this.id = this.$props.psMsg.id1
			this.getSimpleEvent()
		},
		methods:{
			Draw(){
				const option= document.getElementById(this.$props.psMsg.id1);
				const Mychart = this.$echarts.init(option);
				Mychart.setOption({
					title: {
							text: this.$props.psMsg.name
						},
					tooltip: {
							//trigger: 'axis',
							formatter:  (params)=> {
								let list = [];
								var res="";
								//res='<div><p>'+params.seriesName+'</p></div>'
								res ='<p>'+params.data[0]+" "+params.data[2]+"<br/>当前位置:"+ params.data[1]*100 + "%<br/>最大门宽:" + params.data[5] +'</p>'
								return res;
							}
						},
						legend: {
							data:[this.$props.psMsg.name,]
						},
						grid: {
							left: '3%',
							right: '4%',
							containLabel: true
						},
						xAxis: {
							type: 'time',
						},
						yAxis: {
						},
						dataZoom: [{
							type: 'inside',
							start: 0,
							end: 10
						}, {
							start: 0,
							end: 10,
							handleSize: '80%',
							handleStyle: {
								color: '#fff',
								shadowBlur: 3,
								shadowColor: 'rgba(0, 0, 0, 0.6)',
								shadowOffsetX: 2,
								shadowOffsetY: 2
							}
						}],
						series: [
							{
								name:this.$props.psMsg.name,
								type:'line',
								//data:this.Echart.TypeList
								data : this.Echart.DataList
							},
						]
				});
				Mychart.on('click', (params)=>{
					// console.log("dddd");
					//console.log(params);
					// var i = params.id;//横坐标的值
					// var d = params.device_type;
					this.$router.push({
						name:'doorhistory',
						params:{
							id:params.data[3],
							device_model:params.data[4],
						}
					});
				});
			},
			async getSimpleEvent(){
				this.Echart.DataList=[];
				this.Echart.TypeList=[];
				this.Echart.TimeList=[];
				this.Echart.InfoList=[];
				const id1 = this.$props.psMsg.id1
				const id2 = this.$props.psMsg.id2
				this.start_ = this.$props.psMsg.start_time
				this.end_ = this.$props.psMsg.end_time
				const res = await this.$api.readSimpleEvent({id1:id1,id2:id2,startTime:this.$format(this.start_,'YYYY-MM-DD'),endTime:this.$format(this.end_,'YYYY-MM-DD')})
				if (res.data.code ==0) {
					if(res.data.data.totalNumber==0){
						this.$Notice.warning({
							title: this.$t('tip'),
							desc: this.$t('No data'),
						})
					}
					res.data.data.list.forEach((item,index)=>{
						item.end_time = this.$format(item.end_time-(item.end_time-item.start_time)/2,'YYYY-MM-DD HH:mm:ss')
						item.start_time = this.$format(item.start_time,'YYYY-MM-DD HH:mm:ss')
						this.Echart.TimeList.push(item.start_time)
						this.Echart.TimeList.push(item.end_time)
						this.Echart.idList.push(item.id)
						if (item.event_type == "open") {
							if(index == 0){
								this.Echart.DataList.push([item.start_time,0,this.$t('open door'),item.id,item.device_model,item.max_door])
								this.Echart.DataList.push([item.end_time,item.door/item.max_door,this.$t('open door finished'),item.id,item.device_model,item.max_door])
							}else{
								this.Echart.DataList.push([item.start_time,res.data.data.list[index - 1].door/item.max_door,this.$t('open door'),item.id,item.device_model,item.max_door])
								this.Echart.DataList.push([item.end_time,item.door/item.max_door,this.$t('open door finished'),item.id,item.device_model,item.max_door])
							}
						} else if (item.event_type == "close") {
							if(index == 0){
								this.Echart.DataList.push([item.start_time,1,this.$t('close door'),item.id,item.device_model,item.max_door])
								this.Echart.DataList.push([item.end_time,item.door/item.max_door,this.$t('close door finished'),item.id,item.device_model,item.max_door])
							}else{
								this.Echart.DataList.push([item.start_time,res.data.data.list[index - 1].door/item.max_door,this.$t('close door'),item.id,item.device_model,item.max_door])
								this.Echart.DataList.push([item.end_time,item.door/item.max_door,this.$t('close door finished'),item.id,item.device_model,item.max_door])
							}
						}
					})
				}
				this.Draw()
			},
			p(s){
				return s<10 ? '0'+ s: s
			},
		}
	}
</script>

<style>
</style>
