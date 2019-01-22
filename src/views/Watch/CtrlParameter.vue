<template lang="jade">
	div.layout-content-main
		div(style="text-align:center;font-weight:'';font-size:25px" )|{{$route.params.device_name}}的菜单
		div(style="margin: 0 auto;width: 800px" v-for="showlist in all")
			Card(style="margin-top:10px; width:100%; font-size:20px; color:#878787;height:40px;cursor: pointer;border-radius:0;" v-bind:padding='5' @click.native="showlist.show=!showlist.show")
				Col(span='23')|{{showlist.title}}
				Col(span='1' style="font-size:15px")
					i(class="fa fa-angle-down fa-2x" v-if='!showlist.show')
					i(class="fa fa-angle-up fa-2x" v-if='showlist.show')
			Card(style="width:100%; font-size:15px;height:30px;border-radius:0;" v-bind:padding='5' v-for="item in showlist.list" key="item" v-if="showlist.show")
				Col(span='10')|{{item.label}}
				Col(span='14' style="text-align:right;color:#878787;")|{{item.value}}
</template>

<script>
	export default{
		data(){
			return{
				all:[{
				show:false,
				title:'4.01菜单',
				list:[
				{label:'01. 电机额定功率',value:''},
				{label:'02. 电机额定电压',value:''},
				{label:'03. 电机额定电流',value:''},
				{label:'04. 电机额定力矩',value:''},
				{label:'05. 电机额定转速',value:''},
				{label:'06. 电机极对数',value:''},
				{label:'07. 电机额定反电动势',value:''},
				{label:'08. 电机相序',value:''},
				{label:'09. 编码器反馈方向',value:''},
				{label:'10. 上电初始电角度',value:''},
				{label:'11. 零点偏移电角度',value:''}]
				},{
				show:false,
				title:'4.02菜单',
				list:[
				{label:'01. 速度环超前放大倍数',value:''},
				{label:'02. 速度环滞后放大倍数',value:''},
				{label:'03. 速度环积分增益系数',value:''},
				{label:'04. 速度环阻尼增益系数',value:''},
				{label:'05. 速度环微分增益系数',value:''},
				{label:'06. 电流环比例增益',value:''},
				{label:'07. 电流环积分增益',value:''},
				{label:'08. 输出电流限制',value:''},
				{label:'09. 载波频率',value:''},
				{label:'10. 死区时间设置',value:''},
				{label:'11. 励磁电流设置',value:''},
				{label:'12. 启动制动力矩积分系数/模拟量称重增益系数',value:''}],
				},{
				show:false,
				title:'7.01菜单',
				list:[
				{label:'01. X1 功能选择',value:''},
				{label:'02. X2 功能选择',value:''},
				{label:'03. X3 功能选择',value:''},
				{label:'04. X4 功能选择',value:''},
				{label:'05. X5 功能选择',value:''},
				{label:'06. X6 功能选择',value:''},
				{label:'07. X7 功能选择',value:''},
				{label:'08. X8 功能选择',value:''},
				{label:'09. X9 功能选择',value:''},
				{label:'10. X10 功能选择',value:''},
				{label:'11. X11 功能选择',value:''},
				{label:'12. X12 功能选择',value:''},
				{label:'13. X13 功能选择',value:''},
				{label:'14. X14 功能选择',value:''},
				{label:'15. X15 功能选择',value:''},
				{label:'16. X16 功能选择',value:''},
				{label:'17. X17 功能选择',value:''},
				{label:'18. X18 功能选择',value:''},
				{label:'19. X19 功能选择',value:''},
				{label:'20. X20 功能选择',value:''},
				{label:'21. X1 功能选择',value:''},
				{label:'22. X2 功能选择',value:''},
				{label:'23. X3 功能选择',value:''},
				{label:'24. X4 功能选择',value:''},
				{label:'25. X5 功能选择',value:''}],
				},{
				show:false,
				title:'7.02菜单',
				list:[
				{label:'01. 门 1 光幕开关极性选择',value:''},
				{label:'02. 门 2 光幕开关极性选择',value:''},
				{label:'03. 门 1 安全触板开关极性选择',value:''},
				{label:'04. 门 2 安全触板开关极性选择',value:''},
				{label:'05. 门 1 开门到位开关极性选择',value:''},
				{label:'06. 门 2 开门到位开关极性选择',value:''},
				{label:'07. 门 1 关门到位开关极性选择',value:''},
				{label:'08. 门 2 关门到位开关极性选择',value:''},
				{label:'09. 满载输入选择',value:''},
				{label:'10. 超载输入选择',value:''}],
				},{
				show:false,
				title:'7.03菜单',
				list:[
				{label:'01. PB1 功能选择',value:''},
				{label:'02. PB2 功能选择',value:''},
				{label:'03. PB3 功能选择',value:''},
				{label:'04. PB4 功能选择',value:''},
				{label:'05. PB5 功能选择',value:''},
				{label:'06. PB6 功能选择',value:''},
				{label:'07. PB7 功能选择',value:''},
				{label:'08. PB8 功能选择',value:''}],
				},{
				show:false,
				title:'7.04菜单',
				list:[
				{label:'01. Y1 功能选择',value:''},
				{label:'02. Y2 功能选择',value:''},
				{label:'03. Y3 功能选择',value:''},
				{label:'04. Y4 功能选择',value:''},
				{label:'05. Y5 功能选择',value:''},
				{label:'06. Y6 功能选择',value:''},
				{label:'07. Y7 功能选择',value:''},
				{label:'08. Y8 功能选择',value:''}],
				},{
				show:false,
				title:'7.05菜单',
				list:[
				{label:'01. CP3‐Y1 功能选择',value:''},
				{label:'02. CP3‐Y2 功能选择',value:''},
				{label:'03. CP3‐Y3 功能选择',value:''},
				{label:'04. CP8',value:''}],
				},{
				show:false,
				title:'9.01菜单',
				list:[
				{label:'01. 并联/群控选择',value:''},
				{label:'02. 并联主梯/副梯',value:''},
				{label:'03. 层站召唤粘连去除',value:''},
				{label:'04. 轿内错误指令删除',value:''},
				{label:'05. 操纵箱配置',value:''},
				{label:'06. 层站召唤配置',value:''},
				{label:'07. 模拟量称重选择',value:''},
				{label:'08. 防捣乱选择',value:''},
				{label:'09. 到站钟输出选择',value:''},
				{label:'10. 到站钟输出延时',value:''},
				{label:'11. VIP 贵宾层服务',value:''},
				{label:'12. 夜间保安层服务',value:''}],
				},{
				show:false,
				title:'9.02菜单',
				list:[
				{label:'01. 消防电梯开关输入选择',value:''},
				{label:'02. 消防开关配置选择',value:''},
				{label:'03. 消防模式',value:''},
				{label:'04. 抱闸行程开关检测',value:''},
				{label:'05. 启动运行检测关门到位',value:''}],
				},{
				show:false,
				title:'9.03菜单',
				list:[
				{label:'01. 再平层',value:''},
				{label:'02. 停电应急救援',value:''},
				{label:'03. 层站召唤粘连去除',value:''},
				{label:'04. 地震管制',value:''},
				{label:'05. 语音报站',value:''},
				{label:'06. 强迫关门',value:''},
				{label:'07. 远程监控',value:''},
				{label:'08. 小区监控',value:''},
				{label:'09. 层站到站',value:''},
				{label:'10. 层站预报',value:''},
				{label:'11. IC卡服务',value:''},
				{label:'12. IC 卡服务楼层 1',value:''},
				{label:'13. IC 卡服务楼层 2',value:''},
				{label:'14. IC 卡服务楼层 3',value:''},
				{label:'15. IC 卡服务楼层 4',value:''},
				{label:'16. IC 卡服层站召 00‐FF 唤选择',value:''}],
				},{
				show:false,
				title:'软件版本号',
				list:[
				{label:'01. 电梯控制软件版本号',value:''},
				{label:'02. 电机控制软件版本号',value:''},
				{label:'03. 串行通讯软件版本号',value:''},
				{label:'04. 轿顶控制软件版本号',value:''},
				{label:'05. 并联通讯软件版本号',value:''}],
				}
				]
			}
		},
		computed: {
		},
		created(){
			this.getData();
		},

		methods:{
			async getData(){
				var buffer
				let res =await this.$api.runtime({page:1,num:20,device_id:this.$route.params.id})
				if (res.data.code == 0){
					res.data.data.list.forEach(item=>{
						if (item.data != null) {buffer = base64url.toBuffer(item.data)}
						if (item.type == 8196){
							for (var i=0;i<11;i++){
								this.all[0].list[i].value=256*(buffer[2*i])+(buffer[2*i+1])
								if ((i==0)||(i==5)) {
									this.all[0].list[i].value=(this.all[0].list[i].value/10).toFixed(1)
								}
							}
						}
						if (item.type == 8197){
							for (var i=0;i<11;i++){
								this.all[1].list[i].value=(buffer[i])
							}
							this.all[1].list[11].value=(256*(buffer[11])+(buffer[12]))
						}
						if (item.type == 8198){
							for (var i=0;i<25;i++){
								this.all[2].list[i].value=((buffer[i]&0x7f)<<1)+(buffer[i]&0x80)/128
							}
						}
						if (item.type == 8199){
							for (var i=0;i<10;i++){
								this.all[3].list[i].value=(buffer[i])
								if (this.all[3].list[i].value == 0) {this.all[3].list[i].value='常开'}
								if (this.all[3].list[i].value == 1) {this.all[3].list[i].value='常闭'}
								if (typeof(this.all[3].list[i].value) == 'number') {this.all[3].list[i].value='其他'}
							}
						}
						if (item.type == 8200){
							for (var i=0;i<8;i++){
								this.all[4].list[i].value=(buffer[i])
								if (this.all[4].list[i].value == 0) {this.all[4].list[i].value='未使用'}
								if (this.all[4].list[i].value == 1) {this.all[4].list[i].value='门 1 开门按钮'}
								if (this.all[4].list[i].value == 2) {this.all[4].list[i].value='门 1 关门按钮'}
								if (this.all[4].list[i].value == 3) {this.all[4].list[i].value='司机开关门'}
								if (this.all[4].list[i].value == 4) {this.all[4].list[i].value='独立按钮'}
								if (this.all[4].list[i].value == 5) {this.all[4].list[i].value='直驶按钮'}
								if (this.all[4].list[i].value == 6) {this.all[4].list[i].value='司机换向按钮'}
								if (this.all[4].list[i].value == 7) {this.all[4].list[i].value='消防钥匙开关'}
								if (this.all[4].list[i].value == 8) {this.all[4].list[i].value='门转开关'}
								if (this.all[4].list[i].value == 9) {this.all[4].list[i].value='延时关门'}
								if (this.all[4].list[i].value == 10) {this.all[4].list[i].value='门 2 开门按钮'}
								if (this.all[4].list[i].value == 11) {this.all[4].list[i].value='门 2 关门按钮'}
								if (this.all[4].list[i].value == 12) {this.all[4].list[i].value='医梯开关'}
								if (this.all[4].list[i].value == 13) {this.all[4].list[i].value='服务层切换 1'}
								if (this.all[4].list[i].value == 14) {this.all[4].list[i].value='服务层切换 2'}
								if (this.all[4].list[i].value == 15) {this.all[4].list[i].value='服务层切换 3'}
								if (typeof(this.all[4].list[i].value) == 'number') {this.all[4].list[i].value='其他'}
							}
						}
						if (item.type == 8201){
							for (var i=0;i<8;i++){
								this.all[5].list[i].value=(buffer[i])
								if (this.all[5].list[i].value == 0) {this.all[5].list[i].value='未使用'}
								if (this.all[5].list[i].value == 1) {this.all[5].list[i].value='运行接触器'}
								if (this.all[5].list[i].value == 2) {this.all[5].list[i].value='封星接触器'}
								if (this.all[5].list[i].value == 3) {this.all[5].list[i].value='抱闸接触器'}
								if (this.all[5].list[i].value == 4) {this.all[5].list[i].value='抱闸维持接触器  '}
								if (this.all[5].list[i].value == 5) {this.all[5].list[i].value='消防照明继电器'}
								if (this.all[5].list[i].value == 6) {this.all[5].list[i].value='消防道基站'}
								if (this.all[5].list[i].value == 7) {this.all[5].list[i].value='封门继电器'}
								if (this.all[5].list[i].value == 8) {this.all[5].list[i].value='停电应急救援运行'}
								if (this.all[5].list[i].value == 9) {this.all[5].list[i].value='门 1 开门输出'}
								if (this.all[5].list[i].value == 10) {this.all[5].list[i].value='门 1 关门输出'}
								if (this.all[5].list[i].value == 11) {this.all[5].list[i].value='门 2 开门输出'}
								if (this.all[5].list[i].value == 12) {this.all[5].list[i].value='门 2 关门输出'}
								if (this.all[5].list[i].value == 13) {this.all[5].list[i].value='救援蜂鸣输出'}
								if (typeof(this.all[5].list[i].value) == 'number') {this.all[5].list[i].value='其他'}
							}
						}
						if (item.type == 8202){
							for (var i=0;i<3;i++){
								this.all[6].list[i].value=(buffer[i])
								if (this.all[6].list[i].value == 0) {this.all[6].list[i].value='无信号输出'}
								if (this.all[6].list[i].value == 1) {this.all[6].list[i].value='输出上行到站钟'}
								if (this.all[6].list[i].value == 2) {this.all[6].list[i].value='输出下行到站钟'}
								if (this.all[6].list[i].value == 3) {this.all[6].list[i].value='上下行到站钟合并输出'}
								if (this.all[6].list[i].value == 4) {this.all[6].list[i].value='超载蜂鸣'}
								if (this.all[6].list[i].value == 5) {this.all[6].list[i].value='消防警铃'}
								if (typeof(this.all[6].list[i].value) == 'number') {this.all[6].list[i].value='其他'}
							}
								this.all[6].list[3].value=(buffer[3])
								if (this.all[6].list[3].value == 0) {this.all[6].list[3].value='无信号输出'}
								if (this.all[6].list[3].value == 1) {this.all[6].list[3].value='液晶输出'}
								if (this.all[6].list[3].value == 2) {this.all[6].list[3].value='力必拓 IC 卡'}
								if (this.all[6].list[3].value == 3) {this.all[6].list[3].value='金博 IC 卡'}
								if (typeof(this.all[6].list[3].value) == 'number') {this.all[6].list[3].value='其他'}
						}
						if (item.type == 8203){
							for (var i=0;i<12;i++){
								this.all[7].list[i].value=(buffer[i])
							}
								if (this.all[7].list[0].value == 0) {this.all[7].list[0].value='单梯'}
								if (this.all[7].list[0].value == 1) {this.all[7].list[0].value='并联'}
								if (this.all[7].list[0].value == 2) {this.all[7].list[0].value='群控'}
								if (this.all[7].list[1].value == 0) {this.all[7].list[1].value='副梯'}
								if (this.all[7].list[1].value == 255) {this.all[7].list[1].value='主梯'}
								if (this.all[7].list[2].value == 0) {this.all[7].list[2].value='关闭'}
								if (this.all[7].list[2].value == 1) {this.all[7].list[2].value='开通'}
								if (this.all[7].list[3].value == 0) {this.all[7].list[3].value='关闭'}
								if (this.all[7].list[3].value == 1) {this.all[7].list[3].value='开通'}
								if (this.all[7].list[4].value == 0) {this.all[7].list[4].value='单操纵箱'}
								if (this.all[7].list[4].value == 1) {this.all[7].list[4].value='第二操纵箱作为残疾人操纵箱'}
								if (this.all[7].list[4].value == 2) {this.all[7].list[4].value='第二操纵箱作为后门操纵箱'}
								if (this.all[7].list[5].value == 0) {this.all[7].list[5].value='单层站召唤'}
								if (this.all[7].list[5].value == 1) {this.all[7].list[5].value='残疾人层站召唤开通'}
								if (this.all[7].list[5].value == 2) {this.all[7].list[5].value='后门层站召唤开通'}
								if (this.all[7].list[6].value == 0) {this.all[7].list[6].value='无效'}
								if (this.all[7].list[6].value == 1) {this.all[7].list[6].value='轿顶板'}
								if (this.all[7].list[6].value == 2) {this.all[7].list[6].value='主板'}
								if (this.all[7].list[7].value == 0) {this.all[7].list[7].value='无效'}
								if (this.all[7].list[7].value == 1) {this.all[7].list[7].value='称重判断'}
								if (this.all[7].list[7].value == 2) {this.all[7].list[7].value='光幕判断'}
								if (this.all[7].list[7].value == 2) {this.all[7].list[7].value='轻载开关判断'}
								if (this.all[7].list[8].value == 1) {this.all[7].list[8].value='到站钟一直开启'}
								if (this.all[7].list[8].value == 2) {this.all[7].list[8].value='到站钟在设置的时间内开启'}
								if (this.all[7].list[8].value == 2) {this.all[7].list[8].value='到站钟一直关闭'}
								if (this.all[7].list[10].value == 1) {this.all[7].list[10].value='未开通'}
								if (this.all[7].list[10].value == 2) {this.all[7].list[10].value='通过层站召唤按钮启用开通'}
								if (this.all[7].list[10].value == 2) {this.all[7].list[10].value='通过层站召唤端子启用开通'}
								if (this.all[7].list[10].value == 2) {this.all[7].list[10].value='通过 IO 板端口启用开通'}
								if (this.all[7].list[11].value == 2) {this.all[7].list[11].value='关闭'}
								if (this.all[7].list[11].value == 2) {this.all[7].list[11].value='开通'}
							for (var i=0;i<9;i++){
								if (typeof(this.all[7].list[i].value) == 'number') {this.all[7].list[i].value='其他'}
							}
							for (var i=10;i<12;i++){
								if (typeof(this.all[7].list[i].value) == 'number') {this.all[7].list[i].value='其他'}
							}
						}
						if (item.type == 8204){
							for (var i=0;i<5;i++){
								this.all[8].list[i].value=(buffer[i])
							}
								if (this.all[8].list[0].value == 0) {this.all[8].list[0].value='无效'}
								if (this.all[8].list[0].value == 1) {this.all[8].list[0].value='层站召唤板端子输入'}
								if (this.all[8].list[0].value == 2) {this.all[8].list[0].value='IO 板端子输入'}
								if (this.all[8].list[1].value == 0) {this.all[8].list[1].value='启用消防电梯开关，消防员钥匙开关和消防联 动开关输入无效'}
								if (this.all[8].list[1].value == 1) {this.all[8].list[1].value='启用消防电梯开关和消防联动开关，消防员钥 匙开关输入无效'}
								if (this.all[8].list[1].value == 2) {this.all[8].list[1].value='启用消防电梯开关和消防员钥匙开关，消防联 动开关无效'}
								if (this.all[8].list[1].value == 3) {this.all[8].list[1].value='启用消防电梯开关、消防员钥匙开关、消防联 动开关'}
								if (this.all[8].list[2].value == 0) {this.all[8].list[2].value='系统标配消防模式'}
								if (this.all[8].list[2].value == 1) {this.all[8].list[2].value='香港消防模式'}
								if (this.all[8].list[3].value == 0) {this.all[8].list[3].value='不检测抱闸行程开关'}
								if (this.all[8].list[3].value == 1) {this.all[8].list[3].value='检测左右抱闸行程开关'}
								if (this.all[8].list[3].value == 2) {this.all[8].list[3].value='检测左抱闸行程开关'}
								if (this.all[8].list[3].value == 3) {this.all[8].list[3].value='检测右抱闸行程开关'}
								if (this.all[8].list[4].value == 0) {this.all[8].list[4].value='启动运行部检测关门到位'}
								if (this.all[8].list[4].value == 1) {this.all[8].list[4].value='启动运行检测关门到位，关门不到位禁止电梯 运行'}
								for (var i=0;i<5;i++){
									if (typeof(this.all[8].list[i].value) == 'number') {this.all[8].list[i].value='其他'}
								}
						}
						if (item.type == 8205){
							for (var i=0;i<16;i++){
								this.all[9].list[i].value=(buffer[i])
							}
							for (var i=0;i<10;i++){
								if (this.all[9].list[i].value == 0) {this.all[9].list[i].value='关闭'}
								if (this.all[9].list[i].value == 1) {this.all[9].list[i].value='开通'}
								if (typeof(this.all[9].list[i].value) == 'number') {this.all[9].list[i].value='其他'}
							}
								if (this.all[9].list[10].value == 0) {this.all[9].list[10].value='关闭'}
								if (this.all[9].list[10].value == 255) {this.all[9].list[10].value='开通'}
								if (typeof(this.all[9].list[10].value) == 'number') {this.all[9].list[10].value='其他'}
						}
						if (item.type == 8206){
							for (var i=0;i<5;i++){
								var val1=(buffer[i*3]).toString(16)
								var val2=(buffer[i*3+1]).toString(16)
								var val3=(buffer[i*3+2]).toString(16)
								if (val1.length == 1) {val1='0'+val1}
								if (val2.length == 1) {val2='0'+val2}
								if (val3.length == 1) {val3='0'+val3}
								this.all[10].list[i].value=val1+val2+val3
							}
							
						}
					})
				}
			},
		}
	}	
</script>

<style lang="scss" scoped>
	.inline{
		display: inline-block;
	}
	.username{
		font-size: 30px;
		color: #222;
		display: inline-block;
	}
	.role{
		font-size: 14px;
		color: #999;
		display: inline-block;
	}
	
</style>