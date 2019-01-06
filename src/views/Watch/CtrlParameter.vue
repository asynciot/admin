<template lang="jade">
	div.layout-content-main
		div(style="text-align:center;font-weight:'';font-size:25px" )|{{$route.params.device_name}}的参数
		Col(span='24' v-for="showlist in all")
			Col(span="6")|&nbsp;
			Col(span='12')
				Card(style="margin-top:10px; width:100%; font-size:20px; color:#878787;height:40px;cursor: pointer;border-radius:0;" v-bind:padding='5' @click.native="showlist.show=!showlist.show")
					Col(span='22')|{{showlist.title}}
					Col(span='2' style="font-size:15px")
						i(class="fa fa-angle-down fa-2x" v-if='!showlist.show')
						i(class="fa fa-angle-up fa-2x" v-if='showlist.show')
				Card(style="width:100%; font-size:15px;height:30px;border-radius:0;" v-bind:padding='5' v-for="item in showlist.list" v-if="showlist.show")
					Col(span='22')|{{item.label}}
					Col(span='2')|{{item.value}}
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