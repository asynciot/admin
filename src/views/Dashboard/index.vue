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
								<button type="button" class="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" style="margin-right: 5px;" title="Date range">
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
						<div class="box box-success" v-if="chat">
							<div class="box-header">
								<i class="fa fa-comments-o"></i>

								<h3 class="box-title">客户意见反馈</h3>

								<div class="box-tools pull-right" data-toggle="tooltip" title="Status">
									<div class="btn-group" data-toggle="btn-toggle">
										<button type="button" class="btn btn-success btn-sm" style="margin-right: 5px;" @click="chatbody=!chatbody">
											<i class="fa fa-minus" v-if="chatbody"></i>
											<i class="fa fa-plus" v-if="!chatbody"></i>
										</button>
										<button type="button" class="btn btn-success btn-sm" @click="chat=false"><i class="fa fa-times"></i>
										</button>
									
									</div>
								</div>
							</div>
							<div class="box-body chat" id="chat-box" v-if="chatbody">
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
								<div class="input-group">
									<input class="form-control" placeholder="Type message...">

									<div class="input-group-btn">
										<button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
									</div>
								</div>
							</div>
							<!-- /.chat -->
						</div>
						<!-- /.box (chat box) -->

						<!-- TO DO List -->
						<div class="box box-primary" v-if="progress">
							<div class="box-header">
								<i class="ion ion-clipboard"></i>
								<h3 class="box-title">故障电梯处理进程</h3>
								<div class="pull-right box-tools">
									<button type="button" class="btn btn-primary btn-sm pull-right" @click="progress=!progress"><i class="fa fa-times"></i>
									</button>
								<button type="button" class="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" style="margin-right: 5px;" title="Date range">
									<i class="fa fa-calendar"></i></button>
								<button type="button" class="btn btn-primary btn-sm pull-right" title="Collapse" style="margin-right: 5px;" @click="progressbody=!progressbody">
									<i class="fa fa-minus" v-if="progressbody"></i> <i class="fa fa-plus" v-if="!progressbody"></i>
								</button>
								</div>
							</div>
							<!-- /.box-header -->
							<div class="box-body" v-if="progressbody">
								<!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
								<ul class="todo-list">
									<li v-for="item in todo">
										<!-- todo text -->
										<span class="text">项目：{{item.pro}}</span>
										<!-- Emphasis label -->
										<small class="label label-danger"><i class="fa fa-clock-o"></i> {{item.time}}</small>
										<!-- General tools such as edit or delete-->
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
										<div>问题描述：{{item.explain}}</div>
										<Col span='23'>
											<div class="progress horizontal active">
												<div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.progress">
												</div>
											</div>
										</Col>
										<Col span='1' style="text-align:right;color:#878787;">{{item.progress}}</Col>
									</li>
								</ul>
							</div>
							<!-- /.box-body -->
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
						<div class="box box-solid bg-teal-gradient" v-if="chart">
							<div class="box-header">
								<i class="fa fa-th"></i>

								<h3 class="box-title">业务图表</h3>
								
								<div class="box-tools pull-right">
									<button type="button" class="btn bg-teal btn-sm" @click="chartbody=!chartbody">
										<i class="fa fa-minus" v-if="chartbody"></i>
										<i class="fa fa-plus" v-if="!chartbody"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" @click="chart=false"><i class="fa fa-times"></i>
									</button>
								</div>
							</div>
							<div class="box-body border-radius-none" v-if="chartbody">
								<swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
									<swiper-slide>
										<div>
											<Col span='12' style="font-size: large;">今年设备故障数量</Col>
											<Col span='1'> <div style="height:20px;width:20px;background-color:#dcdcdc;" @click="fault=!fault;areafault()"></div></Col>
											<Col span='4'> 
											<div style="color:#888888" @click="fault=!fault;areafault()" v-if="!fault">故障设备数量</div>
											<div style="color:#000000" @click="fault=!fault;areafault()" v-if="fault">故障设备数量</div>
											</Col>
											<Col span='1'> <div style="height:20px;width:20px;background-color:#3c8cbc;" @click="fix=!fix;areafault()"></div> </Col>
											<Col span='4'> 
											<div style="color:#888888" @click="fix=!fix;areafault()" v-if="!fix">修复设备数量</div>
											<div style="color:#000000" @click="fix=!fix;areafault()" v-if="fix">修复设备数量</div>
											</Col>
										</div>
										<div class="chart">
											<canvas id="areaChart" style="height:250px"></canvas>
										</div>
									</swiper-slide>
									<swiper-slide>
										<div class="chart">
											<canvas id="lineChart" style="height:250px"></canvas>
										</div>
									</swiper-slide>
									<swiper-slide>
										<div class="chart">
											<canvas id="barChart" style="height:250px"></canvas>
										</div>
									</swiper-slide>
									<swiper-slide>
										<div class="chart">
											<canvas id="pieChart" style="height:250px"></canvas>
										</div>
									</swiper-slide>
								</swiper>
							</div>
							<!-- /.box-body -->
<!-- 							<div class="box-footer no-border">
								<div class="row">
									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="20" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">Mail-Orders</div>
									</div>

									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">Online</div>
									</div>

									<div class="col-xs-4 text-center">
										<input type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">In-Store</div>
									</div>

								</div>

							</div> -->
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
				<div slot="content" style="width:100px;height:100px">
					<div><checkbox v-model="visitor">Map</checkbox></div>
					<div><checkbox v-model="chat">客户意见反馈</checkbox></div>
					<div><checkbox v-model="progress">故障处理进程</checkbox></div>
					<div><checkbox v-model="chart">业务图表</checkbox></div>
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
				fault:true,
				fix:true,
				msg: 'Welcome to Your Vue.js App',
				visitor: true,
				chat: true,
				chart: true,
				progress: true,
				visitorbody: true,
				chatbody: true,
				chartbody: true,
				progressbody: true,
				shine:true,
				todo:[{pro:"江南一号",explain:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'2 mins',progress:"40%"},
						{pro:"上海科技大学",explain:"电梯在使用时光幕异常。经排查，光幕接收信号异常。预计后天购买光幕，恢复电梯正常使用。",time:'54 mins',progress:"60%"},
						{pro:"江南一号",explain:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'3 hours',progress:"70%"},
				],
				swiperOption:{
					autoplay:false,
					delay:10000,
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
			}
		},
		mounted(){
			this.shineword();
			this.drawchart();
			
		},
		methods: {
			shineword(){
				setTimeout(()=>{
					this.shine=!this.shine
					this.shineword()
				}, 1000)
			},
			areafault(){
					var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
					// This will get the first returned node in the jQuery collection.
					var areaChart       = new Chart(areaChartCanvas)
					var datasets =[]
					if (this.fault) {datasets.push(
						{
						label               : 'Electronics',
						fillColor           : 'rgba(210, 214, 222, 1)',
						strokeColor         : 'rgba(210, 214, 222, 1)',
						pointColor          : 'rgba(210, 214, 222, 1)',
						pointStrokeColor    : '#c1c7d1',
						pointHighlightFill  : '#fff',
						pointHighlightStroke: 'rgba(220,220,220,1)',
						data                : [65, 59, 80, 81, 56, 55, 40]
						}
					)}
					if (this.fix) {datasets.push(
						{
						label               : 'Digital Goods',
						fillColor           : 'rgba(60,141,188,0.9)',
						strokeColor         : 'rgba(60,141,188,0.8)',
						pointColor          : '#3b8bba',
						pointStrokeColor    : 'rgba(60,141,188,1)',
						pointHighlightFill  : '#fff',
						pointHighlightStroke: 'rgba(60,141,188,1)',
						data                : [28, 48, 40, 19, 86, 27, 90]
						}
					)}
					var areaChartData = {
					labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets
					}
					console.log(areaChartData)
					var areaChartOptions = {
					//Boolean - If we should show the scale at all
					showScale               : true,
					//Boolean - Whether grid lines are shown across the chart
					scaleShowGridLines      : true,
					//String - Colour of the grid lines
					scaleGridLineColor      : 'rgba(0,0,0,.05)',
					//Number - Width of the grid lines
					scaleGridLineWidth      : 1,
					//Boolean - Whether to show horizontal lines (except X axis)
					scaleShowHorizontalLines: true,
					//Boolean - Whether to show vertical lines (except Y axis)
					scaleShowVerticalLines  : true,
					//Boolean - Whether the line is curved between points
					bezierCurve             : true,
					//Number - Tension of the bezier curve between points
					bezierCurveTension      : 0.3,
					//Boolean - Whether to show a dot for each point
					pointDot                : true,
					//Number - Radius of each point dot in pixels
					pointDotRadius          : 4,
					//Number - Pixel width of point dot stroke
					pointDotStrokeWidth     : 1,
					//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
					pointHitDetectionRadius : 20,
					//Boolean - Whether to show a stroke for datasets
					datasetStroke           : true,
					//Number - Pixel width of dataset stroke
					datasetStrokeWidth      : 2,
					//Boolean - Whether to fill the dataset with a color
					datasetFill             : true,
					//String - A legend template
					legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
					//Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
					maintainAspectRatio     : true,
					//Boolean - whether to make the chart responsive to window resizing
					responsive              : true
					}
				
					//Create the line chart
					areaChart.Line(areaChartData, areaChartOptions)
			},
			drawchart(){
			    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
			    // This will get the first returned node in the jQuery collection.
			    var areaChart       = new Chart(areaChartCanvas)
			
			    var areaChartData = {
			      labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			      datasets: [
			        {
			          label               : 'Electronics',
			          fillColor           : 'rgba(210, 214, 222, 1)',
			          strokeColor         : 'rgba(210, 214, 222, 1)',
			          pointColor          : 'rgba(210, 214, 222, 1)',
			          pointStrokeColor    : '#c1c7d1',
			          pointHighlightFill  : '#fff',
			          pointHighlightStroke: 'rgba(220,220,220,1)',
			          data                : [65, 59, 80, 81, 56, 55, 40]
			        },
			        {
			          label               : 'Digital Goods',
			          fillColor           : 'rgba(60,141,188,0.9)',
			          strokeColor         : 'rgba(60,141,188,0.8)',
			          pointColor          : '#3b8bba',
			          pointStrokeColor    : 'rgba(60,141,188,1)',
			          pointHighlightFill  : '#fff',
			          pointHighlightStroke: 'rgba(60,141,188,1)',
			          data                : [28, 48, 40, 19, 86, 27, 90]
			        }
			      ]
			    }
			
			    var areaChartOptions = {
			      //Boolean - If we should show the scale at all
			      showScale               : true,
			      //Boolean - Whether grid lines are shown across the chart
			      scaleShowGridLines      : true,
			      //String - Colour of the grid lines
			      scaleGridLineColor      : 'rgba(0,0,0,.05)',
			      //Number - Width of the grid lines
			      scaleGridLineWidth      : 1,
			      //Boolean - Whether to show horizontal lines (except X axis)
			      scaleShowHorizontalLines: true,
			      //Boolean - Whether to show vertical lines (except Y axis)
			      scaleShowVerticalLines  : true,
			      //Boolean - Whether the line is curved between points
			      bezierCurve             : true,
			      //Number - Tension of the bezier curve between points
			      bezierCurveTension      : 0.3,
			      //Boolean - Whether to show a dot for each point
			      pointDot                : true,
			      //Number - Radius of each point dot in pixels
			      pointDotRadius          : 4,
			      //Number - Pixel width of point dot stroke
			      pointDotStrokeWidth     : 1,
			      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			      pointHitDetectionRadius : 20,
			      //Boolean - Whether to show a stroke for datasets
			      datasetStroke           : true,
			      //Number - Pixel width of dataset stroke
			      datasetStrokeWidth      : 2,
			      //Boolean - Whether to fill the dataset with a color
			      datasetFill             : true,
			      //String - A legend template
			      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
			      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
			      maintainAspectRatio     : true,
			      //Boolean - whether to make the chart responsive to window resizing
			      responsive              : true
			    }
			
			    //Create the line chart
			    areaChart.Line(areaChartData, areaChartOptions)
			
			    //-------------
			    //- LINE CHART -
			    //--------------
			    var lineChartCanvas          = $('#lineChart').get(0).getContext('2d')
			    var lineChart                = new Chart(lineChartCanvas)
			    var lineChartOptions         = areaChartOptions
			    lineChartOptions.datasetFill = false
			    lineChart.Line(areaChartData, lineChartOptions)
			
			    //-------------
			    //- PIE CHART -
			    //-------------
			    // Get context with jQuery - using jQuery's .get() method.
			    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
			    var pieChart       = new Chart(pieChartCanvas)
			    var PieData        = [
			      {
			        value    : 700,
			        color    : '#f56954',
			        highlight: '#f56954',
			        label    : 'Chrome'
			      },
			      {
			        value    : 500,
			        color    : '#00a65a',
			        highlight: '#00a65a',
			        label    : 'IE'
			      },
			      {
			        value    : 400,
			        color    : '#f39c12',
			        highlight: '#f39c12',
			        label    : 'FireFox'
			      },
			      {
			        value    : 600,
			        color    : '#00c0ef',
			        highlight: '#00c0ef',
			        label    : 'Safari'
			      },
			      {
			        value    : 300,
			        color    : '#3c8dbc',
			        highlight: '#3c8dbc',
			        label    : 'Opera'
			      },
			      {
			        value    : 100,
			        color    : '#d2d6de',
			        highlight: '#d2d6de',
			        label    : 'Navigator'
			      }
			    ]
			    var pieOptions     = {
			      //Boolean - Whether we should show a stroke on each segment
			      segmentShowStroke    : true,
			      //String - The colour of each segment stroke
			      segmentStrokeColor   : '#fff',
			      //Number - The width of each segment stroke
			      segmentStrokeWidth   : 2,
			      //Number - The percentage of the chart that we cut out of the middle
			      percentageInnerCutout: 50, // This is 0 for Pie charts
			      //Number - Amount of animation steps
			      animationSteps       : 100,
			      //String - Animation easing effect
			      animationEasing      : 'easeOutBounce',
			      //Boolean - Whether we animate the rotation of the Doughnut
			      animateRotate        : true,
			      //Boolean - Whether we animate scaling the Doughnut from the centre
			      animateScale         : false,
			      //Boolean - whether to make the chart responsive to window resizing
			      responsive           : true,
			      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
			      maintainAspectRatio  : true,
			      //String - A legend template
			      legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
			    }
			    //Create pie or douhnut chart
			    // You can switch between pie and douhnut using the method below.
			    pieChart.Doughnut(PieData, pieOptions)
			
			    //-------------
			    //- BAR CHART -
			    //-------------
			    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
			    var barChart                         = new Chart(barChartCanvas)
			    var barChartData                     = areaChartData
			    barChartData.datasets[1].fillColor   = '#00a65a'
			    barChartData.datasets[1].strokeColor = '#00a65a'
			    barChartData.datasets[1].pointColor  = '#00a65a'
			    var barChartOptions                  = {
			      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			      scaleBeginAtZero        : true,
			      //Boolean - Whether grid lines are shown across the chart
			      scaleShowGridLines      : true,
			      //String - Colour of the grid lines
			      scaleGridLineColor      : 'rgba(0,0,0,.05)',
			      //Number - Width of the grid lines
			      scaleGridLineWidth      : 1,
			      //Boolean - Whether to show horizontal lines (except X axis)
			      scaleShowHorizontalLines: true,
			      //Boolean - Whether to show vertical lines (except Y axis)
			      scaleShowVerticalLines  : true,
			      //Boolean - If there is a stroke on each bar
			      barShowStroke           : true,
			      //Number - Pixel width of the bar stroke
			      barStrokeWidth          : 2,
			      //Number - Spacing between each of the X value sets
			      barValueSpacing         : 5,
			      //Number - Spacing between data sets within X values
			      barDatasetSpacing       : 1,
			      //String - A legend template
			      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
			      //Boolean - whether to make the chart responsive
			      responsive              : true,
			      maintainAspectRatio     : true
			    }
			
			    barChartOptions.datasetFill = false
			    barChart.Bar(barChartData, barChartOptions)
			}
		}
	}
	
	
	  $(function () {
    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */

    //--------------
    //- AREA CHART -
    //--------------

    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
    // This will get the first returned node in the jQuery collection.
    var areaChart       = new Chart(areaChartCanvas)

    var areaChartData = {
      labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label               : 'Electronics',
          fillColor           : 'rgba(210, 214, 222, 1)',
          strokeColor         : 'rgba(210, 214, 222, 1)',
          pointColor          : 'rgba(210, 214, 222, 1)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label               : 'Digital Goods',
          fillColor           : 'rgba(60,141,188,0.9)',
          strokeColor         : 'rgba(60,141,188,0.8)',
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    var areaChartOptions = {
	  title: {
            text: 'Custom Chart Title'
        },
      //Boolean - If we should show the scale at all
      showScale               : true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines      : false,
      //String - Colour of the grid lines
      scaleGridLineColor      : 'rgba(0,0,0,.05)',
      //Number - Width of the grid lines
      scaleGridLineWidth      : 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines  : true,
      //Boolean - Whether the line is curved between points
      bezierCurve             : true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension      : 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot                : false,
      //Number - Radius of each point dot in pixels
      pointDotRadius          : 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth     : 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke           : true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth      : 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill             : true,
      //String - A legend template
      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio     : true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive              : true
    }

    //Create the line chart
    areaChart.Line(areaChartData, areaChartOptions)

    //-------------
    //- LINE CHART -
    //--------------
    var lineChartCanvas          = $('#lineChart').get(0).getContext('2d')
    var lineChart                = new Chart(lineChartCanvas)
    var lineChartOptions         = areaChartOptions
    lineChartOptions.datasetFill = false
    lineChart.Line(areaChartData, lineChartOptions)

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieChart       = new Chart(pieChartCanvas)
    var PieData        = [
      {
        value    : 700,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'Chrome'
      },
      {
        value    : 500,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'IE'
      },
      {
        value    : 400,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'FireFox'
      },
      {
        value    : 600,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Safari'
      },
      {
        value    : 300,
        color    : '#3c8dbc',
        highlight: '#3c8dbc',
        label    : 'Opera'
      },
      {
        value    : 100,
        color    : '#d2d6de',
        highlight: '#d2d6de',
        label    : 'Navigator'
      }
    ]
    var pieOptions     = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke    : true,
      //String - The colour of each segment stroke
      segmentStrokeColor   : '#fff',
      //Number - The width of each segment stroke
      segmentStrokeWidth   : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps       : 100,
      //String - Animation easing effect
      animationEasing      : 'easeOutBounce',
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate        : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale         : false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive           : true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio  : true,
      //String - A legend template
      legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions)

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
    var barChart                         = new Chart(barChartCanvas)
    var barChartData                     = areaChartData
    barChartData.datasets[1].fillColor   = '#00a65a'
    barChartData.datasets[1].strokeColor = '#00a65a'
    barChartData.datasets[1].pointColor  = '#00a65a'
    var barChartOptions                  = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero        : true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines      : true,
      //String - Colour of the grid lines
      scaleGridLineColor      : 'rgba(0,0,0,.05)',
      //Number - Width of the grid lines
      scaleGridLineWidth      : 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines  : true,
      //Boolean - If there is a stroke on each bar
      barShowStroke           : true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth          : 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing         : 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing       : 1,
      //String - A legend template
      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      //Boolean - whether to make the chart responsive
      responsive              : true,
      maintainAspectRatio     : true
    }

    barChartOptions.datasetFill = false
    barChart.Bar(barChartData, barChartOptions)
  })
	
</script>
<style lang="scss" scoped>
	.wrapper{
		background-color: #5A6268;
	}
</style>