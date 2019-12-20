<template lang="jade">
	div.table
		div.layout-content-main
			div.form
				Row(:gutter=5)
					Col(span=18)
						card()
							Row
								Col(span="24" style="height: 35px;font-size:20px")|{{$t('Basic Information')}}
									i(class="fa fa-bookmark" ,:style="{color:cardcolor}" v-for="cardcolor in getlist(data.tagcolor)" style="margin-left: 10px")
								Form.status(label-position="left",:label-width="110")
									Row
										Col(span="12")
											Form-item.fontsize(:label="$t('device name')+':'")
												p()|{{data.name}}
										Col(span="12")
											Form-item(:label="$t('RSSI')+':'")
												div()
													icon(name="sign0",width="24",height="24",slot="prepend" v-if="sign[0]")
													icon(name="sign1",width="24",height="24",slot="prepend" v-if="sign[1]")
													icon(name="sign2",width="24",height="24",slot="prepend" v-if="sign[2]")
													icon(name="sign3",width="24",height="24",slot="prepend" v-if="sign[3]")
													icon(name="sign4",width="24",height="24",slot="prepend" v-if="sign[4]")
													icon(name="sign5",width="24",height="24",slot="prepend" v-if="sign[5]")
										Col(span="24")
											Form-item(:label="$t('state')+':'")
												p()|{{data.state}}
										Row
											Col(span="12")
												Form-item(:label="$t('ctrl')+':'")
													p()|{{data.ctrl}}
											Col(span="12")
												Button.mb(type="primary" @click="godevice(1)" style="width:40%" ,:disabled="judge.ctrl")|{{$t('Details')}}
										Row
											Col(span="12")
												Form-item(:label="$t('door')+':'")
													p()|{{data.door1}}
											Col(span="12")
												Button.mb(type="primary" @click="godevice(2)" style="width:40%" ,:disabled="judge.door1")|{{$t('Details')}}
										Row
											Col(span="12")
												Form-item(:label="$t('door')+':'")
													p()|{{data.door2}}
											Col(span="12")
												Button(type="primary" @click="godevice(3)" style="width:40%" disabled="judge.door2")|{{$t('Details')}}
										Col(span="12")
											Form-item(:label="$t('IP location')+':'")
												p()|{{data.ipaddr}}
										Col(span="12" v-if="data.device_type=='15'")
											Form-item(:label="$t('model')+':'" v-if="data.device_model == '1' ")
												p()|NSFC01-01B
											Form-item(:label="$t('model')+':'" v-if="data.device_model == '2' ")
												p()|NSFC01-02T
										Col(span="24")
											Form-item(:label="$t('base station')+':'")
												p()|{{data.cell_address}}
										Row
											Col(span="12")
												Form-item(:label="$t('install address')+':'")
													p()|{{data.install_addr}}
											Col(span="12")
												Button.mb(type="primary" @click="gohistory" style="width:40%")|{{$t('history fault')}}
			div
				EventLine(:psMsg='LadderInfo')
</template>

<script>
	import {
		formatDate
	} from '../../../utils.js';
	import Gantt from './gantt.vue';
	import EventLine from './EventLine.vue';
	export default {
		data() {
			return {
				id:"",
				eventnum:10,
				eventpage:1,
				sign:[false,false,false,false,false,false],
				ctn: false,
				loading:'',
				websock:'',
				test:'',
				address:['','','','','','','','','','','','','','','',''],
				res:['00','00','00','00','00','00','00','00'],
				segment:['','','',''],
				duration:120,
				keyword:'time',
				search_info: '',
				door:true,
				now:[],
				LadderInfo:{
					name:'',
					id1:'',
					id2:'',
				},
				time:'',
				data:[],
				menu:[],
				list:[],
				list2:[],
				total:'',
				realtime: {
					threshold:'1',
					duration:120,
					interval:'1000',
				},
				judge:{
					ctrl:false,
					door1:false,
					door2:false,
				},
				options: {
					id:'',
					IMEI:'',
					name:'',
					page: 1,
					num: 9,
					total: 0,
					isreg: "True",
					duration:'',
					interval:'',
					length:'',
					starttime:'',
					endtime:'',
				},
				columns: [{
					title: ' ',
					key: 'device_name'
				},
				{
					title: ' ',
					key: 'IMEI',
				}],
			}
		},
		components: {
			EventLine,
		},
		created() {
			this.getData()
		},
		watch:{
			'segment': function(val){
				if(val[0].length==2&&val[1].length==0){
					document.getElementById("fir").focus()
				}
				if(val[1].length==2&&val[2].length==0){
					document.getElementById("sec").focus()
				}
				if(val[2].length==2&&val[3].length==0){
					document.getElementById("thr").focus()
				}
			},
			'address': function(val){
				if(val[0].length==2&&val[1].length==0){
					document.getElementById("fou").focus()
				}
			},
		},
		methods: {
			contn(){
				if (this.ctn){
					if (this.address[0] == '') this.address[0]='00'
					if (this.address[1] == '') this.address[1]='00'
					for (var i=1;i<8;i++){
						if (this.address[i*2-1] == 'ff') {
							this.address[i*2] =(parseInt('0x'+this.address[(i-1)*2])+1).toString(16)
							this.address[i*2+1] ='00'
						}else{
							this.address[i*2] =this.address[(i-1)*2]
							this.address[i*2+1] = (parseInt('0x'+this.address[(i-1)*2+1])+1).toString(16)
						}
					}
					for (var i=1;i<10;i++){
						if (this.address[i*2+1].length == 1){
							this.address[i*2+1]='0'+this.address[i*2+1]
						}
					}
				}
			},
			handleSearch1 (selectword) {
				this.menu=[];
				var str;
				for (var i=0;i<this.list.length;i++){
					str=this.list[i].IMEI;
					if (str != null){
						if (str.indexOf(selectword)>=0)
						this.menu.push(str)
					}
					str=this.list[i].device_name;
					if (str != null){
						if (str.indexOf(selectword)>=0){
						this.menu.push(str)
						}
					}
				}
			},
			async getData() {
				let res = await this.$api.reLadder({num:1,page:1,search_info:this.$route.params.IMEI})
				if(!res.data.code){
					this.data = res.data.data.list[0]
					this.id = this.data.id
					this.data.ipaddr = res.data.data.list[0].ip_country+res.data.data.list[0].ip_region+res.data.data.list[0].ip_city
					this.options.IMEI = this.data.door1
					this.LadderInfo.name = this.data.name
					this.LadderInfo.id1 = this.data.ctrl_id
					this.LadderInfo.id2 = this.data.door_id1
					if(this.data.door2 == null){
						this.judge.door2 = true
					}
					if(this.data.state == "online"){
						this.data.state = this.$t('online')
					}else if(this.data.state == "offline"){
						this.data.state = this.$t('offline')
					}else if(this.data.state == "longoffline"){
						this.data.state = this.$t('long offline')
					}
					if (this.data.rssi != ''){
						if (this.data.rssi==0) {
							this.sign[0]=true
						}else if(this.data.rssi<=2){
							this.sign[1]=true
						}else if (this.data.rssi<=4) {
							this.sign[2]=true
						}else if (this.data.rssi<=8) {
							this.sign[3]=true
						}else if (this.data.rssi<=16) {
							this.sign[4]=true
						}else if (this.data.rssi<=32) {
							this.sign[5]=true
						}
					}
					this.options.starttime=this.$format(Date.parse(new Date()),'YYYY-MM-DD')
					this.options.endtime=this.$format(Date.parse(new Date())+86400000,'YYYY-MM-DD')
					// let eve = await this.$api.readLadderEvent({id:this.data.id,page:1,num:10,start:this.options.starttime,end:this.options.endtime})
					// if(!eve.data.code){
					// 	this.list = eve.data.data.list
					// 	this.list2 = this.list
					// 	this.total = eve.data.data.totalNumber
					// }else{
					// 	this.$Notice.error({
					// 		title:  this.$t('error'),
					// 		desc:  this.$t('Fail to gain event information')
					// 	})
					// }
				}else(
					this.$Notice.error({
						title:  this.$t('error'),
						desc: 'Fail to gain elevator data'
					})
				)
				this.now=Date.parse(new Date())
			},
			async search() {
				this.time=new Date(this.options.time)
				if(this.keyword=="id"){
					this.options.id=this.search_info
				}else if(this.keyword=="length"){
					this.options["length"]=this.search_info
				}else if(this.keyword=="interval"){
					this.options.interval=this.search_info
				}
				if(this.options.search_info == ""){
					this.list=this.list2
				}else{
					this.options.starttime=formatDate(this.options.starttime,'yyyy-MM-dd')
					this.options.endtime=formatDate(this.options.endtime,'yyyy-MM-dd')
					if((this.options.starttime>=this.options.endtime)&&(this.options.endtime !="")){
						this.options.endtime=formatDate(Date.parse(this.options.starttime)+86400000,'yyyy-MM-dd')
						this.$Notice.warning({
							title: this.$t('tip'),
							desc: this.$t('The closing date must be later than the from date'),
						})
					}
					let res = await this.$api.readLadderEvent({id:this.data.id,page:1,num:10,start:this.options.starttime,end:this.options.endtime})
					this.total = res.data.data.totalNumber
					this.list = res.data.data.list
				}
			},
			gohistory(){
				let imei
				this.$router.push({
					name: 'History',
					params: {
						id: this.data.id,
					}
				})
			},
			godevice(val){
				let imei
				if(val==1){
					imei = this.data.ctrl
				}else if (val == 2){
					imei = this.data.door1
				}else{
					imei = this.data.door2
				}
				this.$router.push({
					name: 'deviceInfo',
					params: {
						IMEI: imei,
					}
				})
			},
			getlist(val){
				if(val==null){
					return null
				}else{
					return val.split(';')
				}
			},
			async pageChange(val){
				this.offlinepage=val
				let eve = await this.$api.readLadderEvent({id:this.data.id,page:this.offlinepage,num:10,start:this.options.starttime,end:this.options.endtime})
				if(!eve.data.code){
					this.list = eve.data.data.list
					this.list2 = this.list
				}else{
					this.$Notice.error({
						title:  this.$t('error'),
						desc:  this.$t('Fail to gain event information')
					})
				}
			},
			async handleReachBottom () {
				if( this.list.length<this.total){
					var options2=this.options
					options2.page=Math.ceil(this.list.length/9)+1
					options2.num=9
					let eve= await this.$api.event(options2)
					for(var i=0;i<9;i++){
						this.list.push(eve.data.data.list[i])
					}
					this.list2=this.list
				}else{
					let eve= await this.$api.event(options2)
					this.$Notice.warning({
						title: this.$t('tip'),
						desc: this.$t('It is the end！'),
					})
				}
				this.total = eve.data.data.totalNumber
				return new Promise(resolve => {
					resolve();
				});
			},
			formatDate(val, format) {
				return formatDate(val, format)
			},
	 	}
	}
</script>

<style lang="scss">
	.table{
		min-height: 800px;
		position: relative;
		overflow: scroll;
	}
	.mg{
		margin-left: 20px;
	}
	.status {
		p {
			color: #289efc;
		}
	}
	.asd{
		font-size: 20px;
	}
	.card {
		.fr {
			font-style: normal;
			color: #289efc;
		}
	}
	.detail {
		width: 50%;
	}
	.addr {
		padding: 0;
		margin-bottom: 0;
	}
	.center {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
	.ivu-scroll-container{
		height:311px !important;
	}
	.iv{
		display: inline-block;
		width: 100%;
		height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border: 1px solid #dddee1;
		border-radius: 4px;
		color: #495060;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
	}
	.mb{
		margin-bottom: 5px;
	}
</style>
