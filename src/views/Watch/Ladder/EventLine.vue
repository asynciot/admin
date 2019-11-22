<template lang="jade">
	div
		Modal(title="查询时间" v-model="modal" @on-ok="ok" ,:mask-closable="false")
			DatePicker(type="date" ,:options="options" ,:placeholder="$t('from date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="start_time")
			
			DatePicker(type="date" ,:options="options" ,:placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="end_time")
		Tabs(value="day" ,:animated="false" @on-click="changetabs" )
			TabPane(label="一天" name="day")
			TabPane(label="七天" name="week")
			TabPane(label="一个月" name="month")
			TabPane(label="自定义" name="customize")
			DatePicker(type="date" ,:options="options" ,:placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="endtime")
		div(id="test" ,:style="{ 'width': '100%', height: '200px'}")
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
				},
				modal:false,
				start_time:'',
				end_time:'',
				endtime:new Date(),
				timetabs:'day',
			}
		},
		props:{
			psMsg: String,
		},
		created(){
			setTimeout(()=> {
				this.changetabs("day")
			}, 200);
		},
		methods:{
			async Draw(){
				const option= document.getElementById("test");
				const Mychart = this.$echarts.init(option);
				Mychart.setOption({
					title: {
							text: this.$props.psMsg.name
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data:[this.$props.psMsg.name,]
						},
						grid: {
							left: '3%',
							right: '4%',
							containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: 'category',
							data: this.Echart.TimeList
						},
						yAxis: {
							data:[0,1]
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
								step: 'start',
								data:this.Echart.TypeList
							},
						]
				})
			},
			async getSimpleEvent(){
				this.Echart.TypeList=[];
				this.Echart.TimeList=[];
				const id1 = this.$props.psMsg.id1
				const id2 = this.$props.psMsg.id2
				const res = await this.$api.readLadderSimple({id1:id1,id2:id2,startTime:this.$format(this.start_,'YYYY-MM-DD'),endTime:this.$format(this.end_,'YYYY-MM-DD')})
				if (res.data.code ==0) {
					if(res.data.data.totalNumber==0){
						this.$Notice.warning({
							title: this.$t('tip'),
							desc: this.$t('No data'),
						})
					}
					res.data.data.list.forEach((item,index)=>{
						item.start_time = this.$format(item.start_time,'YYYY-MM-DD HH:mm:ss')
						this.Echart.TimeList.push(item.start_time)
						if (item.event_type == "open") {
							this.Echart.TypeList.push(0)
						} else if (item.event_type == "close") {
							this.Echart.TypeList.push(1)
						}
					})
				}
				this.Draw()
			},
			changetabs(val){
				this.timetabs=val
				var time
				const t=new Date(this.endtime)
				t.setDate(t.getDate() + 1);
				this.end_=t.getFullYear()+'-'+this.p((t.getMonth()+1))+'-'+this.p(t.getDate())+' '+this.p(t.getHours())+':'+this.p(t.getMinutes())+':'+this.p(t.getSeconds());
				switch(val){
					case 'day':
						time= new Date(this.endtime)
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						this.Draw()
						break;
					case 'week':
						time= new Date(this.endtime)
						time.setDate(time.getDate() - 6);
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						this.Draw()
						break;
					case 'month':
						time= new Date(this.endtime)
						time.setMonth(time.getMonth() - 1);
						this.start_=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
						this.Draw()
						break;
					case 'customize':
						this.start_time=''
						this.end_time=''
						this.modal=true
						break;
				}
				this.getSimpleEvent()
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
			p(s){
				return s<10 ? '0'+ s: s
			},
		}
	}
</script>

<style>
</style>
