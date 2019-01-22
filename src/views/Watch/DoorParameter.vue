<template lang="jade">
	div.layout-content-main
		div(style="text-align:center;font-weight:'';font-size:25px" )|{{$route.params.device_name}}的菜单
		div(style="margin: 0 auto;width: 800px" v-for="showlist in menuB" v-if="$route.params.device_model == '1' ")
			Card(style="margin-top:10px; width:100%; font-size:20px; color:#878787;height:40px;cursor: pointer;border-radius:0;" v-bind:padding='5' @click.native="showlist.show=!showlist.show")
				Col(span='23')|{{showlist.title}}
				Col(span='1' style="font-size:15px")
					i(class="fa fa-angle-down fa-2x" v-if='!showlist.show')
					i(class="fa fa-angle-up fa-2x" v-if='showlist.show')
			Card(style="width:100%; font-size:15px;height:30px;border-radius:0;" v-bind:padding='5' v-for="item in showlist.list" key="item" v-if="showlist.show")
				Col(span='10')|{{item.label}}
				Col(span='14' style="text-align:right;color:#878787;")|{{item.value}}
		div(style="margin: 0 auto;width: 800px" v-for="showlist in menuT" v-if="$route.params.device_model == '2' ")
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
				menuB:[{
				show:false,
				title:'P菜单',
				list:[
				{label:'操作使能设置',value:''},
				{label:'低速力矩提升',value:''},
				{label:'高速力矩提升',value:''},
				{label:'开门到位保持力矩',value:''},
				{label:'关门到位保持力矩',value:''},
				{label:'开门力矩环最大电压',value:''},
				{label:'关门力矩环最大电压',value:''},
				{label:'关门减速力矩环最大电压',value:''},
				{label:'直流制动电压',value:''},
				{label:'最大转矩',value:''},
				{label:'过载保护电流',value:''},
				{label:'加减速时关门过载电流',value:''},
				{label:'稳定运行时关门过载电流',value:''},
				{label:'电流零点值',value:''},
				{label:'关门过载反开使能设置',value:''},
				{label:'开门到位继电器极性设置',value:''},
				{label:'关门到位继电器极性设置',value:''},
				{label:'多功能继电器EPR极性设置',value:''},
				{label:'开门到位输入开关极性设置',value:''},
				{label:'关门到位输入开关极性设置',value:''},
				{label:'开门减速输入开关极性设置',value:''},
				{label:'关门减速输入开关极性设置',value:''},
				{label:'继电器EPR功能设置',value:''},
				{label:'门机测试自动运行及门宽自学习',value:''},
				{label:'保留',value:''},
				{label:'电机空载电流',value:''},
				{label:'数据初始化',value:''},
				{label:'关门末端转矩提升',value:''},
				{label:'控制方式标志',value:''},
				{label:'关门减速位置',value:''},
				{label:'开门减速位置',value:''},
				{label:'门宽距离',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''},
				{label:'保留',value:''}]
				},{
				show:false,
				title:'D菜单',
				list:[
				{label:'关门启动速度',value:''},
				{label:'关门高速',value:''},
				{label:'关门低速1',value:''},
				{label:'关门低速2',value:''},
				{label:'开门启动速度',value:''},
				{label:'开门高速',value:''},
				{label:'开门低速1',value:''},
				{label:'开门低速2',value:''},
				{label:'关门到位时保持速度',value:''},
				{label:'开门到位时保持速度',value:''},
				{label:'最大输出频率',value:''},
				{label:'基准频率',value:''},
				{label:'关门加速时间',value:''},
				{label:'关门减速时间',value:''},
				{label:'开加速时间',value:''},
				{label:'开减速时间',value:''},
				{label:'启动段S曲线',value:''},
				{label:'到达段S曲线',value:''},
				{label:'开到位停止保护时间',value:''},
				{label:'关低速2切换时间',value:''},
				{label:'直流制动保持时间',value:''},
				{label:'关门过电流检出时间',value:''},
				{label:'关门过电流检出时间点',value:''},
				{label:'开关门过电流检出时间',value:''},
				{label:'关门过流继电器动作时间',value:''},
				{label:'关到位继电器输出延时',value:''},
				{label:'门机急停时减速时间',value:''},
				{label:'门机逆转延时时间',value:''},
				{label:'操作使能复位时间',value:''},
				{label:'测试运行开关门总时间',value:''},
				{label:'检测电流滤波时间',value:''},
				{label:'给定速度滤波时间',value:''},
				{label:'开门启动加速时间',value:''},
				{label:'关门启动加速时间',value:''},
				{label:'开门加速1段加速时间',value:''},
				{label:'关门加速1段加速时间',value:''},
				{label:'开门加速1段速度',value:''},
				{label:'关门加速1段速度',value:''},
				{label:'关门超时反开延时',value:''},
				{label:'保留',value:''}],
				}],
				menuT:[
				  {
					show:false,
				    title: 'F07',
				    list: [
				      {label: '关门启动速度',value: ''},
					  {label: '关门高速',value: ''},
					  {label: '速度稳定时允许误差频率',value: ''},
					  {label: '同步门门刀打开速度',value: ''},
					  {label: '关门低速 1 ',value: ''},
					  {label: '关门低速 2 ',value: ''},
					  {label: '开门启动速度',value: ''},
					  {label: '开门高速',value: ''},
					  {label: '开门低速 1 ',value: ''},
					  {label: '开门高速 2 ',value: ''},
					  {label: '自学习及上电运行速度',value: ''}, 
					  {label: '开门限位时保持速度',value: ''}, 
					  {label: '关门限位时保持速度',value: ''}, 
					  {label: '低速区启动时运行速度',value: ''}, 
					  {label: '同步电机上电时运行速度',value: ''}, 
					  {label: '加减速时允许误差频率',value: ''}, 
					  {label: '最大输出频率',value: ''}, 
					  {label: '基准频率',value: ''}
				    ]
				  },
				  {
				    title: 'F08',
					show: false,
				    list: [
				      {
				        label: '加速时间',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '减速时间',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '启动时 S 曲线',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '到达时 S 曲线',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '开门停止保护时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '关门停止保护时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: 'IPM 故障电机关断时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '每分钟允许故障次数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '门机急停时减速时间',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '门逆转延时时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '制动力保持时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '检测电流滤波时间',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '测试运行时开关门总时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '关门过流允许时间',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '开门过流允许时间',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '关门过流继电器动作时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '飞车保护起作用延时时间设定',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '关门到位输出延时时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '允许开、关门运行时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '过电流电机关断时间',
				        value: '',
				        
				        num: 10
				      }, {
				        label: '给定速度滤波时间',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '检测速度滤波时间',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '输出滤波时间',
				        value: '',
				        
				        num: 1
				      },
				    ]
				  }, {
					show:false,
				    title: 'F09',
				    list: [
				      {
				        label: '开门减速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门减速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门极限位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门极限位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开锁速度运行距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门启动速度运行距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '安全触板限位距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '门宽距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门低速区距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门低速区距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '同步门刀打开时加速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '同步门刀打开时减速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '低速区启动开门时减速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '低速区启动关门时减速距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门过流检测距离',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门限位保护位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门 限位保护位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门低速 1 减速位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门低速 1 减速位置',
				        value: '',
				        
				        num: 1
				      },
				    ]
				  }, {
					show:false,
				    title: 'F10',
				    list: [
				      {
				        label: '低速力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '高速力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '开门保持力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '关门保持力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '同步电机启动运行电压',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '开门最大力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '关门最大力矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '稳定运行时关门过载电流',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '开、关门过载保护电流',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '加减速运行时关门过载电流',
				        value: '',
				        
				        num: 100
				      },
				    ]
				  }, {
					show:false,
				    title: 'F11',
				    list: [
				      {
				        label: '最大转矩',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '过流电流的减少量',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '关门保持力矩 1 ',
				        value: '',
				        
				        num: 100
				      }, {
				        label: '电流传感器 U 相零点电流偏移',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '电流传感器 V 相零点电流偏移',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '电流传感器电流比例',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '速度环 P 参数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '速度环 I 参数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '励磁电流环 P 参数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '励磁电流环 I 参数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '力矩电流环 P 参数',
				        value: '',
				        
				        num: 1
				      },{
				        label: '力矩电流环 I 参数',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门高速力矩限定',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '菜单调节演示',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '同步电机磁极位置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '编码器每转脉冲数',
				        value: '',
				        
				        num: 1
				      },
				    ]
				  }, {
					show:false,
				    title: 'F12',
				    list: [
				      {
				        label: '同步门选择设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '电机 UVW 接线方向设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '门机测试运行设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '门宽自测定设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '数据初始化设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '磁极位置测定操作',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '数据写保护设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门制动定时/长期制动选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门制动定时/长期制动选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '编码器方向设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门过载反开动作设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '控制模式设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '消防功能选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门限位输出继电器极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门限位输出继电器极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门限位开关极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门限位开关极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '电机温控开关极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '光幕极性设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '电机级数设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门输入信号端子选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门输入信号端子选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '开门限位输入信号端子选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门限位输入信号端子选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '保留',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '消防输入信号端子选择',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '前后门设置',
				        value: '',
				        
				        num: 1
				      }, {
				        label: '关门自动检测停止位置设置',
				        value: '',
				        
				        num: 1
				      }
				    ]
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
				if (res.data.code == 0) {
					res.data.data.list.forEach(item=>{
						if (item.data != null) {buffer = base64url.toBuffer(item.data)}
						if (item.type == 4099){
							for (var i=0;i<18;i++) {
								this.menuT[0].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/100).toFixed(2)
								this.menuB[0].list[i].value=(256*(buffer[2*i])+buffer[2*i+1])
							}
							for (var i=10;i<13;i++) {
								this.menuB[0].list[i].value=(this.menuB[0].list[i].value/100).toFixed(2)
								}
						}
						if (item.type == 4100){
							for (var i=0;i<22;i++) {
								this.menuT[1].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/this.menuT[1].list[i].num).toFixed(this.menuT[1].list[i].num.length-1)
								this.menuB[0].list[i+18].value=(256*(buffer[2*i])+buffer[2*i+1])
							}
								this.menuT[1].list[22].value=(256*(buffer[2*i])+buffer[2*i+1])
						}
						if (item.type == 4101){
							for (var i=0;i<19;i++) {
								this.menuT[2].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/this.menuT[2].list[i].num).toFixed(this.menuT[2].list[i].num.length-1)
								if ((i != 16)||(i != 17)) {this.menuB[1].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/10).toFixed(1)}
								else {this.menuB[1].list[i].value=(256*(buffer[2*i])+buffer[2*i+1])}
							}
						}
						if (item.type == 4102){
							for (var i=0;i<10;i++) {
								this.menuT[3].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/this.menuT[3].list[i].num).toFixed(this.menuT[3].list[i].num.length-1)
								this.menuB[1].list[i+19].value=(256*(buffer[2*i])+buffer[2*i+1])
							}
							for (var i=0;i<8;i++){
								this.menuB[1].list[i+19].value=(this.menuB[1].list[i+19].value/10).toFixed(1)
							}
							this.menuB[1].list[21].value=(this.menuB[1].list[21].value/10).toFixed(1)
							this.menuB[1].list[23].value=(this.menuB[1].list[23].value/10).toFixed(1)
							this.menuB[1].list[26].value=(this.menuB[1].list[26].value/10).toFixed(1)
						}
						if (item.type == 4103){
							for (var i=0;i<16;i++) {
								this.menuT[4].list[i].value=((256*(buffer[2*i])+buffer[2*i+1])/this.menuT[4].list[i].num).toFixed(this.menuT[4].list[i].num.length-1)
							}
							for (var i=0;i<11;i++) {
								this.menuB[1].list[i+29].value=(256*(buffer[2*i])+buffer[2*i+1])
							}
							for (var i=3;i<9;i++){
								this.menuB[1].list[i+29].value=(this.menuB[1].list[i+29].value/10).toFixed(1)
							}
							this.menuB[1].list[29].value=(this.menuB[1].list[29].value/10).toFixed(1)
						}
						if (item.type == 4104){
							for (var i=0;i<33;i++) {
								this.menuT[5].list[i].value=buffer[i]
							}
						}
					})
				}
			}
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