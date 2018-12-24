<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=30)
				Col(span=8)
					Card.click( style="height:220px;")
						div(@click="go('person')")
							div(class="user-info")
								img(src="../../assets/admin.jpg",width="20%",style="border-radius:50%")
								div(class="user-info-cont")
									div(class="user-info-name")|{{this.username}}
									div()|{{role}}
							div(class="user-info-list")
							div(class="user-info-list")
					Row(:gutter=20)
						Col(span=24 style="margin-top: 15px")
							div(style="display: inline-block; font-size:16px; margin-left: 5px")|您关注了
							div(style="display: inline-block; font-size:20px; margin-left: 10px; color: rgb(45, 140, 240);")|{{followlist.length}}
							div(style="display: inline-block; font-size:16px; margin-left: 10px")|台设备
				Col(span=16)
					Row(:gutter=20)
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-1",@click="go('alList')")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.device}}
										div()|电梯数量
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-2",@click="go('map')")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.online}}
										div()|在线设备
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-3",@click="go('inform')")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.message}}
										div()|通知信息
					Row(:gutter=20)
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-1",@click="go('maintainList')")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.maintain}}
										div()|维修电梯数量
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-2",@click="go('userManage')",disabled="userList.username!=admin")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.user}}
										div()|用户数量
						Col(span=8)
							Card.click(:body-style="{padding: '0px'}")
								div(class="grid-content grid-con-3",@click="go('maintain')")
									div(class="grid-cont-right")
										div(class="grid-num")|{{total.fault}}
										div()|故障电梯数量
			Row(:gutter=1 style="margin-top: 15px")
				Col(span=11)
					Card(v-bind:padding='4',style="font-size:16px; border-radius:0; height:40px;background-color:#aaf")
						Col(span=6 style="")
							div(style="font-size:16px")|关注设备
						Col(span=4 style="")
							div(style="font-size:16px")|设备类型
						Col(span=6 style="")
							div(style="font-size:16px")|版本号
						Col(span=6 style="")
							div(style="font-size:16px")|运行状态
					Scroll(:on-reach-bottom='followReachBottom', :distance-to-edge="0" , style="height: 360px; margin-top: 10px")
						Card(v-bind:padding='4',v-for='item in list' align='left', style='border-radius:0;height: 40px; font-size: 16px; cursor: pointer;', @click.native='deviceinfo(item.IMEI)')
							Col(span=6 style="")
								div|{{item.device_name}}&nbsp;
							Col(span=4)
								div|{{item.device_type}}&nbsp;
							Col(span=6)
								div|{{item.device_firmware.replace(/\r\n/ig,"a")}}&nbsp;
							Col(span=6)
								div|{{item.state}}
				Col(span=12 style="margin-left:10px")
					Card(v-bind:padding='4',style="font-size:16px; border-radius:0; height:40px;background-color:#aaf")
						Col(span=8 style="")
							div(style="font-size:16px")|标题
						Col(span=6 style="")
							div(style="font-size:16px")|发件人
						Col(span=7 style="")
							div(style="font-size:16px")|时间
					Scroll(:on-reach-bottom='messageReachBottom', :distance-to-edge="0" , style="height: 360px; margin-top: 10px")
						Card(v-bind:padding='4',v-for='item in inform' align='left', style='border-radius:0;height: 40px; font-size: 16px; cursor: pointer;', @click.native='read(item.id)')
							Col(span=8 style="")
								div|{{item.title}}&nbsp;
							Col(span=6)
								div|管理员
							Col(span=8)
								div|{{formatDate(item.createTime,'yyyy-MM-dd HH:mm:ss')}}&nbsp;
</template>

<script>
	import {
		formatDate
	} from '../../utils.js'
	export default{	
		data(){
			return{
				followlist:[],
				table:'all',
				userList:[],
				username:window.localStorage.getItem('username'),
				list:[],
				inform:[],
				query:{
					username:window.localStorage.getItem('username'),
					name:'',
				},
				ladList:[],
				total:{
					device:0,
					maintain:0,
					fault:0,
					message:0,
					user:0,
					online:0,
				},
				options:{
					page: 1,
					num: 100,
					total: 0,
				}
			}
		},
		computed: {
			role() {
				return this.username === 'admin' ? '超级管理员' : '普通用户';
			}
		},
		created(){
			this.getData();
			this.getmessage();
			this.gettotal();
		},
		methods:{
			async followReachBottom () {
				if ( this.list.length<this.followlist.length){
					let eve= await this.$api.follow({num:10,page:(Math.ceil(this.list.length/10)+1),IMEI:this.followlist[i].imei})
					for (var i=0;i<eve.data.data.list.length;i++){
						if (eve.data.data.list[i].device_firmware !=null) {
							if(eve.data.data.list[i].device_firmware.length>=6){
								eve.data.data.list[i].device_firmware=eve.data.data.list[i].device_firmware.substring(0,6)
							}
						}
						this.list.push(eve.data.data.list[i])
					}
				}
				else {
					this.$Notice.warning({
						title: '提示',
						desc: '已经到底了！',
					})
				}
					return new Promise(resolve => {			
						resolve();
					});
				},
			async messageReachBottom () {
				if ( this.inform.length<this.total.message){
					let eve= await this.$api.follow({num:10,page:(Math.ceil(this.inform.length/10)+1),done:true})
					for (var i=0;i<10;i++){
						this.inform.push(eve.data.data.list[i])
					}
				}
				else {
					this.$Notice.warning({
						title: '提示',
						desc: '已经到底了！',
					})
				}
					return new Promise(resolve => {			
						resolve();
					});
				},
			read(val){
				this.$router.push({
					name: 'readInform',
					params: {
						id: val
					}
				})
			},
			async getmessage(){
				// if (this.table=="message"){
					let mes = await this.$api.message({num:10,page:1,done:false})
					this.inform=mes.data.data.list
				// }
			},
			async gettotal(){
				var res
				res = await this.$api.devicecount()
				if (0 === res.data.code) {
					this.total.device=parseInt(res.data.data.ctrllongoffline)
							+parseInt(res.data.data.ctrloffline)
							+parseInt(res.data.data.ctrlonline)
							+parseInt(res.data.data.doorlongoffline)
							+parseInt(res.data.data.dooroffline)
							+parseInt(res.data.data.dooronline)
					this.total.online=parseInt(res.data.data.ctrlonline)+parseInt(res.data.data.dooronline)
				}
				res = await this.$api.repair({num:1,page:1})
				if (0 === res.data.code) {
					this.total.maintain = res.data.data.totalNumber
				}
				res = await this.$api.fault({num:1,page:1})
				if (0 === res.data.code) {
					this.total.fault = res.data.data.totalNumber
				}
				res = await this.$api.people({num:1,page:1})
				if (0 === res.data.code) {
					this.total.user = res.data.data.totalNumber
				}
				res = await this.$api.message({num:1,page:1})
				if (0 === res.data.code) {
					this.total.message = res.data.data.totalNumber
				}
			},
			deviceinfo(val){
				this.$router.push({						
					name: 'elevatorFiles',
					params: {
						IMEI: val										
					}
				})
			},
			async getData(){
				this.list=[]
				var fol
				let lis = await this.$api.follow({num:100,page:1})
				if (0 === lis.data.code){
					this.followlist=lis.data.data.list
					for (var i=0;i<this.followlist.length;i++){
						fol = await this.$api.devices({num:10,page:1,IMEI:this.followlist[i].imei})
							if (0 === fol.data.code){
								if(fol.data.data.list[0].state == "online"){
									fol.data.data.list[0].state = "在线"
								}else if(fol.data.data.list[0].state == "offline"){
									fol.data.data.list[0].state = "离线"
								}else if(fol.data.data.list[0].state == "longoffline"){
									fol.data.data.list[0].state = "长期离线"
								}
								if(fol.data.data.list[0].device_type == "240"){
									fol.data.data.list[0].device_type = "控制柜"
								}else if(fol.data.data.list[0].device_type == "15"){
									fol.data.data.list[0].device_type = "控制器"
								}
								if (fol.data.data.list[0].device_firmware !=null) {
								if(fol.data.data.list[0].device_firmware.length>=6){
								fol.data.data.list[0].device_firmware=fol.data.data.list[0].device_firmware.substring(0,6)
								}
								}
							fol.data.data.list[0].deleteid=lis.data.data.list[i].id
							this.list.push(fol.data.data.list[0])						
							}					
					}	
				}
			},
			go(name){
				console.log(name);
				this.$router.push({
					name: name,
				})
			},
			user(){
				if (this.userList.username=='admin'){
					this.$router.push({
						name: 'userManage',
					})
				}
			},
			formatDate(val, format) {
				return formatDate(val, format)
			},
			deleteinform(val){

			},

			delfl(val){
				this.$Modal.confirm({
					title: '确认不再关注这台设备吗',
					content:val.device_name,
					onOk: () => {
						this.todelfl(val)
					},
					onCancel: () => {
					}
				})
			},
			async todelfl(val){
				let res = await this.$api.delfollow({imei:val.IMEI})
				if (res.data.code == 0){
					this.getData()
					this.$Notice.success({
						title: '成功',
						desc: '不再关注'+val.device_name
					});
				}
				else {
					this.$Notice.error({
						title: '失败',
						desc: '发生错误'
					});
				}
			},
		}
	}	
</script>

<style lang="scss" scoped>
	.box-header{
		font-size: 20px;
	}
	.el-row {
		margin-bottom: 20px;
	}
	.grid-content {
		display: flex;
		align-items: center;
		height: 100px;
	}
	.grid-cont-right {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
	.grid-num {
		font-size: 30px;
		font-weight: bold;
	}
	.grid-con-icon {
		font-size: 50px;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		color: #fff;
	}
	.click{
		cursor: pointer;
	}
	.grid-con-1 .grid-con-icon {
		background: rgb(45, 140, 240);
	}
	.grid-con-1 .grid-num {
		color: rgb(45, 140, 240);
	}
	.grid-con-2 .grid-con-icon {
		background: rgb(100, 213, 114);
	}
	.grid-con-2 .grid-num {
		color: rgb(145, 40, 240);
	}
	.grid-con-3 .grid-con-icon {
		background: rgb(242, 94, 67);
	}
	.grid-con-3 .grid-num {
		color: rgb(242, 94, 67);
	}
	.user-info {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 2px solid #ccc;
		margin-bottom: 20px;
	}
	.user-avator {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}
	.user-info-cont {
		padding-left: 50px;
		flex: 1;
		font-size: 14px;
		color: #999;
	}
	.user-info-cont div:first-child {
		font-size: 30px;
		color: #222;
	}
	.user-info-list {
		font-size: 14px;
		color: #999;
		line-height: 25px;
	}
	.user-info-list span {
		margin-left: 70px;
	}
	.mgb20 {
		margin-bottom: 20px;
	}
	.todo-item {
		font-size: 14px;
	}
	.todo-item-del {
		text-decoration: line-through;
		color: #999;
	}
	.schart {
		width: 95%;
		height: 300px;
	}	
</style>