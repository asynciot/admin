<template>
	<div class="layout-content-main" style='background:#f5f3f0'>
		<div class="panel">
			<section class="panel-title">
				<b v-text="title"></b>
			</section>
			<section class="panel-content">
				<slot name='content'></slot>
			</section>
			<div slot='content'>
				<Row :gutter='20' style="padding-top: 20px;margin-left: 35px;">
					<Col span="24">
						<div style="width:100%;text-align: center;font-family:'楷体'">
							<h2 style="font-size:30px;text-align: left;font-family:'楷体'">{{$t("Today")}}    {{time}}</h2>
						</div>
						<div class="box10" style="height:640px">
							<p style="text-align: center;font-size:15px">{{$t("The easiest device to lose connection")}}</p>
							<Col span='24' style="margin-top:5px">
								<Gantt></Gantt>
							</Col>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>
<script>
	import Gantt from '@/views/Dashboard/gantt'
	export default {
		components: {
			'Gantt':Gantt,
		},
		 props: {
		  title: {
		    type: String,
		    default:'',
		  }
		},
		data() {
			return {
				menu:[],
				offlinedevicename:'',
				offlinetotal:0,
				offlinenum:20,
				offlinepage:1,
				day:1,
				data:[],
				starttime:'',
				endtime:'',
				first:'',
				last:'',
				time:'',
			}
		},
		mounted(){
			this.showtime();
		},
		methods: {
			async handleSearch1 () {
				this.menu=[];
				var str;
				for (var i=0;i<this.data.length;i++){
					str=this.data[i].device_name;		  	    	
					if ((str != null)&&(this.offlinedevicename != null)){
						if (str.indexOf(this.offlinedevicename)>=0)
							this.menu.push(str)
					} 
				}
			},
			showtime(){
				setTimeout(()=>{
					this.time=this.$format(new Date(),'YYYY-MM-DD HH:mm:ss')
					this.showtime()
				}, 1000)
			},
			pageChange(val){
				this.offlinepage=val
				this.getoffline()
			},
			async getoffline(){			
				let off = await this.$api.getoffline({starttime:this.$format(this.starttime,'YYYY-MM-DD'),endtime:this.$format(Date.parse(this.endtime)+86400000,'YYYY-MM-DD'),num:this.offlinenum,page:this.offlinepage,search_info:this.offlinedevicename})
				if (off.data.code == 0) {
					this.data=off.data.data.list
					this.offlinetotal=off.data.data.totalNumber
					for (var i=0;i<this.data.length;i++){
						this.singleoffline(this.data[i].id,i)
					}
					this.day=[]
					var day=parseInt((Date.parse(this.endtime)-Date.parse(this.starttime))/86400000)+1
					if (day==1) {
						day=8
						for (var i=0;i<day;i++){
							this.day.push({value:((3*i)+':00'),left:(i*10)+20})
						}
						this.day.push({value:'0:00',left:98})
					}
					else{
						for (var i=0;i<day;i++){
							this.day.push({value:(i+1)+'day',left:(i*80/day)+20})
						}
					}
				}
			},
			async singleoffline(val,val2){
				let off = await this.$api.singleoffline({starttime:this.$format(this.starttime,'YYYY-MM-DD'),endtime:this.$format(Date.parse(this.endtime)+86400000,'YYYY-MM-DD'),id:val})
				var singlelist=[]
				if (off.data.code == 0) {
					singlelist=off.data.list
					this.last=this.$format(new Date(singlelist[0].t_logout),'YYYY-MM-DD HH:mm:ss')
					this.first=this.$format(new Date(singlelist[singlelist.length-1].t_logout),'YYYY-MM-DD HH:mm:ss')
					var left=Date.parse(this.starttime)
					var right=Date.parse(this.endtime)-Date.parse(this.starttime)+86400000
					singlelist.forEach(item=>{
						var logout = new Date(item.t_logout).getTime();
						var lleft=parseFloat((logout-left)*80/right)
						item.left=lleft+'%'
						if(item.duration!=null){
							if(logout-left+parseFloat(item.duration*1000)<right){
								var  wwidt=parseFloat((item.duration*1000)*80/right)
								if(wwidt<1){
									item.widt=1+'px'
								}
								else{
									item.widt=wwidt+'%'
									if(wwidt+lleft>=100){
										wwidt=100-lleft;
										item.widt=wwidt+'%'
									}
								}
							}
							else{
								item.widt=(right-(logout-left))*80/right+'%'
							}
						}
						else{
							item.widt=0;
						}
					})
				}
				this.data[val2].singlelist=singlelist
			},
			async search(){
				this.getoffline()
			},
		}
	}
	
</script>
<style lang="scss" scoped>
	.panel {
		background: #ffffff;
		padding: 18px 30px 18px 18px;
		box-shadow: 0 0 4px rgba(232, 237, 250, .6);
		height: 37.5rem;
		overflow: scroll;
	}
	.panel-title {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		padding-bottom: 20px;
		.iconfont {
			color: #1296db;
			font-size: 24px;
			font-weight: bold;
			margin-right: 12px;
		}
		b {
			margin-left:12px;
			font-size: 16px;
			color: #333333;
		}
	}
	.panel-content {
		margin-left: 36px;;
	}
</style>