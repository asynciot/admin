<template>
	<div class="wrapper layout-content-main" style="background:#FFFACD">
		<!-- Content Wrapper. Contains page content -->
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div class="row">
					<div class="col-lg-3 col-xs-10">
						<!-- small box -->
						<div class="small-box bg-aqua">
							<div class="inner" style="text-align:center;">
								<h3>175/190</h3>

								<p>在线维保人员</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-green">
							<div class="inner" style="text-align:center;">
								<h3>53<sup style="font-size: 20px"></sup></h3>

								<p>备件待发</p>
							</div>
							<div class="icon">
								<i class="ion ion-stats-bars"></i>
							</div>
							<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-yellow">
							<div class="inner" style="text-align:center;">
								<h3>18/197</h3>

								<p>今日完成事件 9%</p>
							</div>
							<div class="icon">
								<i class="ion ion-person-add"></i>
							</div>
							<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-red">
							<div class="inner" style="text-align:center;">
								<h3 v-if="shine">5</h3>
								<h3 style="color:#FF2C00" v-if="!shine">5</h3>
								<p>故障电梯数</p>
							</div>
							<div class="icon">
								<i class="ion ion-pie-graph"></i>
							</div>
							<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
				</div>
				<!-- /.row -->
				<!-- Main row -->
				<Row gutter="20">
					<!-- Left col -->
					<!-- <section class="col-lg-5 connectedSortable"> -->
					
					<Col span='14'>
					<draggable :options="{animation: 60,group:'panel'}">
						<!-- Map box -->
						  <div class="box box-solid bg-light-blue-gradient" v-if="visitor">
							<div class="box-header">
							  <!-- tools box -->
							  <div class="pull-right box-tools">
								  <button type="button" class="btn btn-primary btn-sm pull-right" @click="visitor=!visitor"><i class="fa fa-times"></i>
								  </button>
								<button type="button" class="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" style="margin-right: 5px;"
										title="Date range">
								  <i class="fa fa-calendar"></i></button>
								<button type="button" class="btn btn-primary btn-sm pull-right" title="Collapse" style="margin-right: 5px;" @click="visitorbody=!visitorbody">
								  <i class="fa fa-minus" v-if="visitorbody"></i> <i class="fa fa-plus" v-if="!visitorbody"></i>
								</button>
							  </div>
							  <!-- /. tools -->

							  <i class="fa fa-map-marker"></i>

							  <h3 class="box-title">
								Map
							  </h3>
							</div>
							<div class="box-body" style="height:480px;" v-if="visitorbody">
								<div style=""><Map style="margin-top:20px;"></Map></div>
							</div>
							<!-- /.box-body-->

						  </div>
						  <!-- /.box -->
						<!-- Chat box -->
						<div class="box box-success">
							<div class="box-header">
								<i class="fa fa-comments-o"></i>

								<h3 class="box-title">客户意见反馈</h3>

								<div class="box-tools pull-right" data-toggle="tooltip" title="Status">
									<div class="btn-group" data-toggle="btn-toggle">
										<button type="button" class="btn btn-default btn-sm active"><i class="fa fa-square text-green"></i>
										</button>
										<button type="button" class="btn btn-default btn-sm"><i class="fa fa-square text-red"></i></button>
									</div>
								</div>
							</div>
							<div class="box-body chat" id="chat-box">
								<!-- chat item -->
								<div class="item">
									<img src="../../assets/img/user4-128x128.jpg" alt="user image" class="online">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
											南京巨人通力电梯有限公司
										</a>
										NSFC01-01A型门机变频器关门有撞击声。
									</p>
									<div class="attachment">
										<h4>宋工:</h4>

										<p class="filename">
											建议减小关门低速1、低速2。
										</p>
									</div>
									<!-- /.attachment -->
								</div>
								<!-- /.item -->
								<!-- chat item -->
								<div class="item">
									<img src="../../assets/img/user3-128x128.jpg" alt="user image" class="offline">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:15</small>
											上海三菱电梯有限公司
										</a>
										THPB1-52型双折变频门机无法开门现象。
									</p>
									<div class="attachment">
										<h4>杜工:</h4>
										<p class="filename">
											建议将层门撞弓与轿门锁门球间隙调至7-8mm位置。
										</p>
									</div>
								</div>
								<!-- /.item -->
								<!-- chat item -->
								<div class="item">
									<img src="../../assets/img/user2-160x160.jpg" alt="user image" class="offline">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
											南浔中菱通达有限公司
										</a>
										电梯正常运行报E12号故障。
									</p>
									<div class="attachment">
										<h4>高工:</h4>
										<p class="filename">
											请排查抱闸反馈开关是否异常，监控主板X7、X8指灯信号。
										</p>
									</div>
								</div>
								<!-- /.item -->
							</div>
							<!-- /.chat -->
							<div class="box-footer">
								<div class="input-group">
									<input class="form-control" placeholder="Type message...">

									<div class="input-group-btn">
										<button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
									</div>
								</div>
							</div>
						</div>
						<!-- /.box (chat box) -->

						<!-- TO DO List -->
						<div class="box box-primary">
							<div class="box-header">
								<i class="ion ion-clipboard"></i>
								<h3 class="box-title">故障电梯处理进程</h3>
							</div>
							<!-- /.box-header -->
							<div class="box-body">
								<!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
								<ul class="todo-list">
									<li v-for="item in todo">
										<!-- todo text -->
										<span class="text">项目：{{item.pro}}</span>
										<!-- Emphasis label -->
										<small class="label label-danger" ><i class="fa fa-clock-o"></i> 2 mins</small>
										<!-- General tools such as edit or delete-->
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
										<div>问题描述：{{item.explain}}</div>
									</li>
								</ul>
							</div>
							&laquo; &raquo;
							<!-- /.box-body -->
							<div class="box-footer clearfix no-border">
								<button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Add item</button>
							</div>
						</div>
						<!-- /.box -->

						<!-- quick email widget -->
						<div class="box box-info">
							<div class="box-header">
								<i class="fa fa-envelope"></i>

								<h3 class="box-title">Quick Email</h3>
								<!-- tools box -->
								<div class="pull-right box-tools">
									<button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
										<i class="fa fa-times"></i></button>
								</div>
								<!-- /. tools -->
							</div>
							<div class="box-body">
								<form action="#" method="post">
									<div class="form-group">
										<input type="email" class="form-control" name="emailto" placeholder="Email to:">
									</div>
									<div class="form-group">
										<input type="text" class="form-control" name="subject" placeholder="Subject">
									</div>
									<div>
										<textarea class="textarea" placeholder="Message" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
									</div>
								</form>
							</div>
							<div class="box-footer clearfix">
								<button type="button" class="pull-right btn btn-default" id="sendEmail">Send
									<i class="fa fa-arrow-circle-right"></i></button>
							</div>
						</div>
					</draggable>
					</Col>
					<!-- </section> -->
					<!-- /.Left col -->
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
					<Col span="10">
						<draggable :options="{animation: 60,group:'panel'}">
						<!-- solid sales graph -->
						<div class="box box-solid bg-teal-gradient">
							<div class="box-header">
								<i class="fa fa-th"></i>

								<h3 class="box-title">业务图表</h3>

								<div class="box-tools pull-right">
									<button type="button" class="btn bg-teal btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" data-widget="remove"><i class="fa fa-times"></i>
									</button>
								</div>
							</div>
							<div class="box-body border-radius-none">
								<div style=''>
								<div id="line" style="height: 200px; width:80%"></div>
								</div>
							</div>
							<!-- /.box-body -->
							<div class="box-footer no-border">
								<div class="row">
									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="20" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">Mail-Orders</div>
									</div>
									<!-- ./col -->
									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">Online</div>
									</div>
									<!-- ./col -->
									<div class="col-xs-4 text-center">
										<input type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">In-Store</div>
									</div>
									<!-- ./col -->
								</div>
								<!-- /.row -->
							</div>
							<!-- /.box-footer -->
						</div>
						<!-- /.box -->

						<!-- Calendar -->
						<div class="box box-solid bg-green-gradient">
							<div class="box-header">
								<i class="fa fa-calendar"></i>

								<h3 class="box-title">Calendar</h3>
								<!-- tools box -->
								<div class="pull-right box-tools">
									<!-- button with a dropdown -->
									<div class="btn-group">
										<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
											<i class="fa fa-bars"></i></button>
										<ul class="dropdown-menu pull-right" role="menu">
											<li><a href="#">Add new event</a></li>
											<li><a href="#">Clear events</a></li>
											<li class="divider"></li>
											<li><a href="#">View calendar</a></li>
										</ul>
									</div>
									<button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
									</button>
									<button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
									</button>
								</div>
								<!-- /. tools -->
							</div>
							<!-- /.box-header -->
							<div class="box-body no-padding">
								<!--The calendar -->
								<div id="calendar" style="width: 100%"></div>
							</div>
							<!-- /.box-body -->
							<div class="box-footer text-black">
								<div class="row">
									<div class="col-sm-6">
										<!-- Progress bars -->
										<div class="clearfix">
											<span class="pull-left">Task #1</span>
											<small class="pull-right">90%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 90%;"></div>
										</div>

										<div class="clearfix">
											<span class="pull-left">Task #2</span>
											<small class="pull-right">70%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 70%;"></div>
										</div>
									</div>
									<!-- /.col -->
									<div class="col-sm-6">
										<div class="clearfix">
											<span class="pull-left">Task #3</span>
											<small class="pull-right">60%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 60%;"></div>
										</div>

										<div class="clearfix">
											<span class="pull-left">Task #4</span>
											<small class="pull-right">40%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 40%;"></div>
										</div>
									</div>
									<!-- /.col -->
								</div>
								<!-- /.row -->
							</div>
						</div>
						<!-- /.box -->
						</draggable>
						</Col>
					<!-- right col -->
				</Row>
				<!-- /.row (main row) -->
			</section>
			<Poptip trigger="hover" placement="left" style="margin-top:10px;margin-left:1600px;" width="50">
				<div style="cursor: pointer;color:#0000FF">显示内容</div>
				<div class="api" slot="content">
					<checkbox v-model="visitor">map</checkbox>
				</div>
			</Poptip>
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	import Mapp from '@/views/Dashboard/Map'
	import echarts from 'echarts'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default {
		name: 'HelloWorld',
		components: {
			draggable,
			'Map': Mapp,
			swiper,swiperSlide,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				visitor: true,
				visitorbody: true,
				shine:true,
				todo:[{pro:"江南一号",explain:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。"},
						{pro:"上海科技大学",explain:"电梯在使用时光幕异常。经排查，光幕接收信号异常。预计后天购买光幕，恢复电梯正常使用。"},
						{pro:"江南一号",explain:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。"},
				],
				option1:{
									title: {
											// text: '折线图堆叠'
									},
									tooltip: {
											trigger: 'axis'
									},
									legend: {
											data:['数据1','数据2','数据3','数据4','数据5'],
											textStyle: {
											            color: '#FF7F00',
											            fontSize:'16'
											            },
									},
									grid: {
											left: '3%',
											right: '4%',
											bottom: '3%',
											containLabel: true
									},
									toolbox: {
											feature: {
													// saveAsImage: {}
											}
									},
									xAxis: {
											type: 'category',
											boundaryGap: false,
											color:'#f0f',
											data: ['周一','周二','周三','周四','周五','周六','周日'],
														splitLine: {
				               			show: false, 
				                    //  改变轴线颜色
				                    lineStyle: {
				                        // 使用深浅的间隔色
				                        color: ['red']
				                        }                            
				                    },
				                    //  改变x轴颜色
				                    axisLine:{
				                        lineStyle:{
				                            color:'#df0af8',
				//                            width:8,//这里是为了突出显示加上的，可以去掉
				                        }
				                    },                         
				                    //  改变x轴字体颜色和大小
				                    axisLabel: {
				                        textStyle: {
				                            color: '#FF7F00',
				                            fontSize:'16'
				                        },
				                    },
									},
									yAxis: {
											type: 'value',
											splitLine: {
											               			show: false, 
											                    //  改变轴线颜色
											                    lineStyle: {
											                        // 使用深浅的间隔色
											                        color: ['white']
											                        }                            
											                    },
											                    //  改变x轴颜色
											                    axisLine:{
											                        lineStyle:{
											                            color:'#df0af8',
											//                            width:8,//这里是为了突出显示加上的，可以去掉
											                        }
											                    },                         
											                    //  改变x轴字体颜色和大小
											                    axisLabel: {
											                        textStyle: {
											                            color: '#FF7F00',
											                            fontSize:'16'
											                        },
											                    },
									},
									series: [
											{
													name:'数据1',
													type:'line',
													stack: '总量',
													data:[120, 132, 101, 134, 90, 230, 210]
											},
											{
													name:'数据2',
													type:'line',
													stack: '总量',
													data:[220, 182, 191, 234, 290, 330, 310]
											},
											{
													name:'数据3',
													type:'line',
													stack: '总量',
													data:[150, 232, 201, 154, 190, 330, 410]
											},
											{
													name:'数据4',
													type:'line',
													stack: '总量',
													data:[320, 332, 301, 334, 390, 330, 320]
											},
											{
													name:'数据5',
													type:'line',
													stack: '总量',
													data:[820, 932, 901, 934, 1290, 1330, 1320]
											}
									]
								},
			}
		},
		mounted(){
			this.shineword();
			this.draw();
		},
		methods: {
			draw(){
				var myChart = echarts.init(document.getElementById('line'));
				myChart.setOption(this.option1);
			},
			shineword(){
				setTimeout(()=>{
					this.shine=!this.shine
					this.shineword()
				}, 1000)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper{
		background-color: #5A6268;
	}
</style>