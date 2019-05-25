<template>
	<div class="wrapper layout-content-main account" style="padding:0px;overflow-y: scroll;padding-left: 10px;" id="lay">
		<Col span="6" style="color:#fff">
			<div style="height:300px;width:100%;text-align: center;">
				<h2>今天</h2>
				<div style="font-size:20px">
					<Col span="12">今日故障：10</Col>
					<Col span="12">今日维修：5</Col>
					<Col span="24">
						<div class="progress horizontal active" :style="'height:'+screenheight/42+'px'" style="background: #000080;">
							<div class="progress-bar" style="background: #7CEDFF;" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+'10%'"></div>
						</div>
					</Col>
				</div>
			</div>
			<div class="box10">
				<h1>Sample Box</h1>   
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus consectetur dolor a porttitor. Curabitur id sem sed ante fringilla pulvinar et id lectus. Nullam justo ipsum, hendrerit ut commodo nec, pellentesque nec erat. Pellentesque pharetra.
				</p> 
				<br />
			</div>
		</Col>
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	import Map from '@/views/Dashboard/Map'
	import test1 from '@/views/Dashboard/Order'
	import faultfreq from '@/views/Dashboard/faultfreq'
	import activedoor from '@/views/Dashboard/activedoor'
	import compare from '@/views/Dashboard/compare'
	import echarts from 'echarts'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default {
		name: 'HelloWorld',
		components: {
			draggable,
			'Map': Map,
			'test1':test1,
			'faultfreq':faultfreq,
			'activedoor':activedoor,
			'compare':compare,
			swiper,swiperSlide,
		},
		data() {
			return {
				text0:true,
				text1:true,
				text2:true,
				text3:true,
				text4:true,
				text5:true,
				text6:true,
				text7:true,
				btn:false,
				btn2:false,
				value1:false,
				faultdevice: 0,
				size1: '#ffffff',
				size2: '#ffffff',
				size3: '#ffffff',
				size4: '#ffffff',
				fault:true,
				fix:true,
				map: true,
				chat: true,
				chart: true,
				chart2: false,
				chart3: true,
				chart4: true,
				email: true,
				progress: true,
				mapbody: true,
				chatbody: true,
				chartbody: true,
				chartbody2: true,
				chartbody3: true,
				chartbody4: true,
				emailbody: true,
				progressbody: true,
				shine:true,
				barword:'',
				todo:[],
				chatlist:[],
				swiperOption:{
					autoplay:true,
					delay:20000,
					notNextTick:true,
					direction:'horizontal',
					grabCursor:true,
					setWrapperSize:true,
					autoHerght:true,
					slidesPerView: 1,
					mousewheel:true,
					mousewheelControl:true,
					height:window.innerHeight,
					resistanceRatio:0,
					observeParents:true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					allowTouchMove: false,
					navigation: {
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next',
					},
				},
				data:[],
				area:[],
				LastWeek:'',
				LastWeekend:'',
				NowWeek:'',
				NowWeekend:'',
				screenwidth:'',
				screenheight:'',
				setheight:['','','',''],
				options: {
					toId:'',
					fromId:window.localStorage.getItem('id'),
					title:'',
					content:'',
					info:'',
					type:0,
					// createTime:'123',
					isSettled:false,
				},
				chatoptions: {
					fromId:window.localStorage.getItem('username'),
					title:'1',
					content:'',
					info:'1',
					type:0,
					follow: -1,
				},
				chartrepair:[],
				chartorder:[],
				usernum: 0,
				emailnum: 0,
				today: 0,
				allevents: 0,
				alldevice: 0,
				onlinedevice:0,
				chatpage:0,
				progresspage:0,
				prostate:'6',
				chatbottom:false,
				reply:'',
				codelist:['维护','过流','母线过压','母线欠压','输入缺相',
						'输出缺相','输出过力矩','编码器故障','模块过热','运行接触器故障',
						'抱闸接触器故障','封星继电器故障','抱闸开关故障','运行中安全回路断开','运行中门锁断开',
						'门锁短接故障','层站召唤通讯故障','轿厢通讯故障','并联通讯故障','开门故障',
						'关门故障','开关门到位故障','平层信号异常','终端减速开关故障','下限位信号异常',
						'上限位信号异常','打滑故障','电梯速度异常','电机反转故障','磁极位置学习故障',
						'E30','停车速度检测','井道自学习故障','马达过热故障','制动力严重不足',
						  '制动力不足警告',],
				codelist2:['输入电压过低','输入电压过高','','','开关门受阻','飞车保护','电机过载','输出过流'],
			}
		},
		mounted(){
			// this.shineword();

			
		},
		created(){
			this.screenwidth = document.documentElement.clientWidth-200;
			this.screenheight = document.documentElement.clientHeight;
			this.setheight[0]=this.screenheight/9.75 -3
			this.setheight[1]=this.setheight[0]/2.4
			var _this=this
			$(window).resize(function(){
			});

		},
		methods: {}
	}
	
</script>
<style lang="scss" scoped>
	.wrapper{
		background-color: #5A6268;
	}
	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	/*这里使用了贝塞尔曲线*/
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	/*slide-fade-leave-to 用于低于 2.1.8 版本的 Vue*/
	/*translateX 转化为 x 轴的值*/
	.slide-fade-enter, .slide-fade-leave-to {
		transition: translateX(10px);
		opacity: 0;
	}
	.bounce-enter-active {
	  animation: bounce-in .5s;
	}
	.bounce-leave-active {
	  animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
	  0% {
		transform: scale(0);
	  }
	  50% {
		transform: scale(1.5);
	  }
	  100% {
		transform: scale(1);
	  }
	}
	.account {
		position: absolute;
		display: flex;
		flex-flow: column nowrap;
// 		align-items: center;
// 		justify-content: center;
		width: 110%;
		height: 110%;
		background: url('../../assets/bg4.jpg') center center no-repeat;
		// background:#ff0000;
		background-size: 100% auto;
	}
	body {
    font-size: 11px;
    font-family: 'Open Sans', sans-serif;
    color: #4A4A4A ;
    text-align: center; 
	}

	.box10{
		margin: 20px auto;
		width: 100%;
		min-height: 210px;
		padding: 10px;
		position:relative;
		background: -webkit-gradient(linear, 100% 0%, 0% 100%, from(#2c6282), to(#aaaaff), color-stop(.1,#2c6282));
		border: 1px solid #ccc;
		-webkit-box-shadow: 1px 1px 4px rgba(0,0,0, 0.1);
		-webkit-border-bottom-right-radius: 60px 5px;
		
	}
	.box10:before{
		content: '';
		width: 98%;
		z-index:-1;
		height: 100%;
		padding: 0 0 1px 0;
		position: absolute;
		bottom:0; right:0;
		background: -webkit-gradient(linear, 0% 20%, 0% 92%, from(#fff), to(#f9f9f9), color-stop(.1,#fff));
		border: 1px solid #ccc;
		-webkit-box-shadow: 1px 1px 8px rgba(0,0,0, 0.1);
		-webkit-border-bottom-right-radius: 60px 5px;
		-webkit-transform: skew(2deg,2deg)
							translate(3px,8px)
	}
	.box10:after{
		content: '';
		width: 98%;
		z-index:-1;
		height: 98%;
		padding: 0 0 1px 0;
		position: absolute;
		bottom:0; right:0;
		background: -webkit-gradient(linear, 0% 20%, 0% 100%, from(#f3f3f3), to(#f6f6f6), color-stop(.1,#fff));
		border: 1px solid #ccc;
		-webkit-box-shadow: 0px 0px 8px rgba(0,0,0, 0.1);
		-webkit-transform: skew(2deg,2deg)
							translate(-1px,2px)
	}

	.box10 img {
		width: 100%;
		margin-top: 15px;
	}

	p{ 
		margin-top: 15px;
		text-align: justify;
	}

	h1{
		font-size: 20px;
		font-weight: bold;
		margin-top: 5px; 
		text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
	}

	a{
		text-decoration: none;
		color: #4A4A4A !important;
	}

	a:hover{
		text-decoration: underline;
		color: #6B6B6B !important ;
	}
</style>