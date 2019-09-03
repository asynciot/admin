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
							<Row>
								<Col span="4">
									<AutoComplete class="handle-input mr10" v-model="offlinedevicename" :data="menu"
									 @on-search="handleSearch1()" :placeholder="$t('keyword')" style="width:100%;" id="serch1"></AutoComplete>
								</Col>
								<Col span="4">
									<Button type="primary" icon="ios-search" @click="search()" style="margin-left:1px">{{$t('search')}}</Button>
								</Col>
							</Row>
								
							<Col span='4' style="margin-top:5px">
							<DatePicker type="date" :placeholder="$t('from date')" format="yyyy-MM-dd" v-model="starttime" style='color:#000' @on-change="getoffline()"></DatePicker>
							</Col>
							<Col span='4' style="margin-top:5px">
							<DatePicker type="date" :placeholder="$t('closing date')" format="yyyy-MM-dd" v-model="endtime" style='color:#000' @on-change="getoffline()"></DatePicker>
							</Col>
							<Col span='24' style="margin-top:5px">
								<table border='1' style="border-color: #fff;width:100%;text-align: center;"></tr>
									<tr style="width:100%;height:16px;font-size:12px;"><td style="width:20%;border: 1px solid #0094ff;">{{$t('device name')}}</td><td style="border: 1px solid #0094ff;">{{$t('掉线时间')}}</td></tr>
									<tr style="width:100%;height:16px;font-size:12px;" v-for="item in data">
										<td style="border: 1px solid #0094ff;">{{item.device_name}}</td>
										<td style="border: 1px solid #0094ff;">
											<div style="background:#0000EE;height:20px;width:100%">
												<div style="background:rgba(255,255,0,1);height:20px;position:absolute;" :style="'margin-left:'+single.left+';width:'+single.widt" v-for="single in item.singlelist"></div>
											</div>
										</td>
									</tr>
								</table>
								<div v-for="item in day" style="position:absolute;" :style="'margin-left:'+item.left+'%'">{{item.value}}</div>
								<Col span='4'>&nbsp;</Col>
								<Page simple :total="offlinetotal" :page-size="offlinenum" :current="offlinepage" @on-change="pageChange" style="text-align:center;margin-top: 20px;"></Page>
							</Col>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
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
		created(){
			this.starttime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
			this.endtime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
			this.getoffline()
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
						// if(logout<left&&logout+item.duration>left){
						// 	logout=left;
						// }
						var lleft=parseFloat((logout-left)*80/right)
						item.left=lleft+'%'
						if(item.duration!=null){
							if(logout-left+parseFloat(item.duration)<right){
								var  wwidt=parseFloat((item.duration)*80/right)
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
					// alert(typeof(this.singlelist[0].t_logout))
				}
				 this.data[val2].singlelist=singlelist
				 //console.log(this.data)
				// this.data.forEach(item=>{
				// 	item.singlelist.forEach(lec=>{
				// 		console.log(lec.widt)
				// 	})
				// })
				
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