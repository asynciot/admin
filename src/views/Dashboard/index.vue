<template>
	<div class="wrapper layout-content-main" style="background:#FFFACD;padding:0">
		<!-- Content Wrapper. Contains page content -->
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div class="row">
					<div class="col-lg-3 col-xs-10">
						<draggable :options="{animation: 60,group:'count'}">
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
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
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
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
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
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
						<!-- small box -->
						<div class="small-box bg-red">
							<div class="inner" style="text-align:center;">
								<h3 v-if="shine">{{faultdevice}}</h3>
								<h3 style="color:#FF2C00" v-if="!shine">5</h3>
								<p>故障电梯数</p>
							</div>
							<div class="icon">
								<i class="ion ion-pie-graph"></i>
							</div>
							<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
						</draggable>
					</div>
					<!-- ./col -->
				</div>
				<!-- /.row -->
				<!-- Main row -->
				<Row gutter="20">
					<!-- Left col -->
					<!-- <section class="col-lg-5 connectedSortable"> -->
					

					<draggable :options="{animation: 60,group:'panel'}">
						<!-- Map box --> <Col span='6' id="visitorwidth">
						<div class="box box-solid bg-light-blue-gradient" v-if="visitor" style="height:420px">
							<div class="box-header">
							  <!-- tools box -->
							  <div class="pull-right box-tools">
								  <button type="button" class="btn btn-primary btn-sm pull-right" @click="visitor=!visitor"><i class="fa fa-times"></i>
								  </button>
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('visitorwidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('visitorwidth')" @click.native="widthblock3('visitorwidth',1)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('visitorwidth')" @click.native="widthblock3('visitorwidth',2)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('visitorwidth')" @click.native="widthblock3('visitorwidth',3)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('visitorwidth')" @click.native="widthblock3('visitorwidth',4)"></Card>
										</div>
									</div>

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
						</Col>
						<Col span='6' id="chatwidth">
						  <!-- /.box -->
						<!-- Chat box -->
						<div class="box box-success" v-if="chat" style="height:420px">
							<div class="box-header">
								<i class="fa fa-comments-o"></i>

								<h3 class="box-title">客户意见反馈</h3>

								<div class="box-tools pull-right" data-toggle="tooltip" title="">
									<div class="btn-group" data-toggle="btn-toggle">
										<div class="btn-group" style="margin-right: 5px;">
											<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chatwidth')">
												<i class="fa fa-bars"></i></button>
											<div class="dropdown-menu pull-right" role="menu">
												<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',1)"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',2)"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',3)"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',4)"></Card>
											</div>
										</div>
										<button type="button" class="btn btn-success btn-sm" style="margin-right: 5px;" @click="chatbody=!chatbody">
											<i class="fa fa-minus" v-if="chatbody"></i>
											<i class="fa fa-plus" v-if="!chatbody"></i>
										</button>
										<button type="button" class="btn btn-success btn-sm" @click="chat=false"><i class="fa fa-times"></i>
										</button>
									</div>
								</div>
							</div>
							<div class="box-body chat" id="chat-box" v-if="chatbody" style="height:420px">
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
										<h4>宋工:建议减小关门低速1、低速2。</h4>
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
										<h4>杜工:建议将层门撞弓与轿门锁门球间隙调至7-8mm位置。</h4>
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
										<h4>高工:请排查抱闸反馈开关是否异常，监控主板X7、X8指灯信号。</h4>
									</div>
								</div>
								<!-- /.item -->
<!-- 								<div class="input-group">
									<input class="form-control" placeholder="Type message...">

									<div class="input-group-btn">
										<button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
									</div>
								</div> -->
							</div>
							<!-- /.chat -->
						</div>
						</Col>
						<Col span='6' id="progresswidth">
						<!-- /.box (chat box) -->

						<!-- TO DO List -->
						<div class="box box-primary" v-if="progress" style="height:420px">
							<div class="box-header">
								<i class="ion ion-clipboard"></i>
								<h3 class="box-title">故障电梯处理进程</h3>
								<div class="pull-right box-tools">
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('progresswidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('progresswidth')" @click.native="widthblock3('progresswidth',1)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('progresswidth')" @click.native="widthblock3('progresswidth',2)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('progresswidth')" @click.native="widthblock3('progresswidth',3)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('progresswidth')" @click.native="widthblock3('progresswidth',4)"></Card>
										</div>
									</div>
									<button type="button" class="btn btn-primary btn-sm pull-right" @click="progress=!progress"><i class="fa fa-times"></i>
									</button>
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
										<div>问题描述：{{item.description}}</div>
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
						</Col>
						<Col span='6' id="emailwidth">
						<!-- quick email widget -->
						<div class="box box-info" style="height:420px">
							<div class="box-header">
								<i class="fa fa-envelope"></i>

								<h3 class="box-title">Quick Email</h3>
								<!-- tools box -->
								<div class="pull-right box-tools">
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('emailwidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('emailwidth')" @click.native="widthblock3('emailwidth',1)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('emailwidth')" @click.native="widthblock3('emailwidth',2)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('emailwidth')" @click.native="widthblock3('emailwidth',3)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('emailwidth')" @click.native="widthblock3('emailwidth',4)"></Card>
										</div>
									</div>
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
						</Col>
						<Col span='12' id="chartwidth">
					<!-- </section> -->
					<!-- /.Left col -->
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
						<!-- solid sales graph -->
						<div class="box box-solid bg-teal-gradient" v-if="chart" style="height:420px">
							<div class="box-header">
								<i class="fa fa-th"></i>

								<h3 class="box-title">业务图表</h3>
								
								<div class="box-tools pull-right">
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn bg-teal btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chartwidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',1);chartwidth()"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',2);chartwidth()"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',3);chartwidth()"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',4);chartwidth()"></Card>
										</div>
									</div>
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
										<Card class=''>
											<div id="test1" style="height:300px;width:100%"> </div>
										</Card>
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

						</div>
						<!-- /.box -->
						</Col>
						<Col span='6' id="calenderwidth">
						<!-- Calendar -->
						<div class="box box-solid bg-green-gradient" style="height:420px">
							<div class="box-header">
								<i class="fa fa-calendar"></i>

								<h3 class="box-title">Calendar</h3>
								<!-- tools box -->
								<div class="pull-right box-tools">
									<!-- button with a dropdown -->
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('calenderwidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('calenderwidth')" @click.native="widthblock3('calenderwidth',1)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('calenderwidth')" @click.native="widthblock3('calenderwidth',2)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('calenderwidth')" @click.native="widthblock3('calenderwidth',3)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('calenderwidth')" @click.native="widthblock3('calenderwidth',4)"></Card>
										</div>
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
						</Col>
						<!-- /.box -->
						</draggable>
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
				faultdevice: 0,
				size1: '#ffffff',
				size2: '#ffffff',
				size3: '#ffffff',
				size4: '#ffffff',
				fault:true,
				fix:true,
				visitor: true,
				chat: true,
				chart: true,
				progress: true,
				visitorbody: true,
				chatbody: true,
				chartbody: true,
				progressbody: true,
				shine:true,
// 				todo:[{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'2 mins',progress:"40%"},
// 						{pro:"上海科技大学",description:"电梯在使用时光幕异常。经排查，光幕接收信号异常。预计后天购买光幕，恢复电梯正常使用。",time:'54 mins',progress:"60%"},
// 						{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'3 hours',progress:"70%"},
// 				],
				todo:[],
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
				data:[],
				area:[],
				LastWeek:'',
				LastWeekend:'',
				NowWeek:'',
				NowWeekend:'',
			}
		},
		mounted(){
			// this.shineword();
			this.drawchart();
			this.OrderCharts();
		},
		created(){
			this.getinfo();
			this.LastWeek = this.getWeek(7)
			this.LastWeekend = this.getWeek(1)
			this.NowWeek = this.getWeek(0)
			this.NowWeekend = this.getWeek(-6)
// 				this.DeviceCharts();
// 				this.MemberCharts();
		},
		methods: {
			chartwidth(){
				setTimeout(() => {
					this.OrderCharts();
				},200)
			},
			shineword(){
				setTimeout(()=>{
					this.shine=!this.shine
					this.shineword()
				}, 1000)
			},
			async getinfo(){
				var res
				var ech
				this.faultdevice=0
				res = await this.$api.fault({num:1,page:1,device_type:'',type:'1',state:'untreated',islast:1})
				if (0 === res.data.code) {
					this.faultdevice = res.data.data.totalNumber
				}
				
				res = await this.$api.getRepair({
					search_info: '',
					page: 1,
					num: 4,
					isreg: "True",
					state:'untreated',
					order_type:'',
					result:'',
					device_id:'',
				})
				if (res.data.code === 0) {
					for (var i=0;i<res.data.data.list.length;i++) {
						ech = await this.$api.devices({device_id:res.data.data.list[i].device_id,num:10,page:1}),
						res.data.data.list[i].device_name = ech.data.data.list[0].device_name
						res.data.data.list[i].IMEI = ech.data.data.list[0].IMEI
						res.data.data.list[i].install_addr = ech.data.data.list[0].install_addr
						res.data.data.list[i].cell_address = ech.data.data.list[0].cell_address
						res.data.data.list[i].ipaddr = ech.data.data.list[0].ip_country+ech.data.data.list[0].ip_region+ech.data.data.list[0].ip_city
						var t=Date.parse(new Date())-parseInt(res.data.data.list[i].create_time)
						if(t>1000){res.data.data.list[i].create_time=parseInt(t/1000).toString()+" secs"}
						if(t>60000){res.data.data.list[i].create_time=parseInt(t/60000).toString()+" mins"}
						if(t>3600000){res.data.data.list[i].create_time=parseInt(t/3600000).toString()+" hours"}
						if(t>86400000){res.data.data.list[i].create_time=parseInt(t/86400000).toString()+" days"}
					}
					this.data = res.data.data.list
					this.data.forEach(item=>{
						this.todo.push({pro:item.device_name,description:"暂无描述",time:item.create_time,progress:"50%"})
					})
				}
			},
			widthblock1(val){
				var width=document.getElementById(val).className
					if (width=='ivu-col ivu-col-span-6') {this.size1='#008b00';this.size2='#ffffff';this.size3='#ffffff';this.size4='#ffffff'}
					if (width=='ivu-col ivu-col-span-12') {this.size1='#008b00';this.size2='#008b00';this.size3='#ffffff';this.size4='#ffffff'}
					if (width=='ivu-col ivu-col-span-18') {this.size1='#008b00';this.size2='#008b00';this.size3='#008b00';this.size4='#ffffff'}
					if (width=='ivu-col ivu-col-span-24') {this.size1='#008b00';this.size2='#008b00';this.size3='#008b00';this.size4='#008b00'}
			},
			widthblock2(val){
					if (val==1) {this.size1='#008b00';this.size2='#ffffff';this.size3='#ffffff';this.size4='#ffffff'}
					if (val==2) {this.size1='#008b00';this.size2='#008b00';this.size3='#ffffff';this.size4='#ffffff'}
					if (val==3) {this.size1='#008b00';this.size2='#008b00';this.size3='#008b00';this.size4='#ffffff'}
					if (val==4) {this.size1='#008b00';this.size2='#008b00';this.size3='#008b00';this.size4='#008b00'}
			},
			widthblock3(val1,val2){
					if (val2==1) {document.getElementById(val1).className='ivu-col ivu-col-span-6'}
					if (val2==2) {document.getElementById(val1).className='ivu-col ivu-col-span-12'}
					if (val2==3) {document.getElementById(val1).className='ivu-col ivu-col-span-18'}
					if (val2==4) {document.getElementById(val1).className='ivu-col ivu-col-span-24'}
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

			},
			getWeek(n){
				var now = new Date()
				var year = now.getFullYear()
				var month = now.getMonth()+1
				var date = now.getDate()
				var day = now.getDay()
				if(day !== 0){
					n =n+day-1
				}else{
					n =n+day
				}
				if(day){
					if(month>1){
						month=month
					}else{
						year=year-1
						month=12
					}
				}
				now.setDate(now.getDate()-n);	
				year=now.getFullYear();
				month=now.getMonth()+1;
				date=now.getDate();
				var s=year+"/"+(month<10?('0'+month):month)+"/"+(date<10?('0'+date):date);
				return s
			},
			MemberCharts() {
				let test1 = this.$echarts.init(document.getElementById('test5'))
				test1.setOption({
					title: {
						text: '用户比例',
						subtext: '数量',
						left: 'center',
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						bottom: 10,
						left: 'center',
						data: ['游客', '普通用户','管理员','组长']
					},
					series : [{
						type: 'pie',
						radius : '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data:[
							{value:148, name: '游客'},
							{value:235, name: '普通用户'},
							{value:5, name: '管理员'},
							{value:44, name: '组长'},
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				})
			},
			DeviceCharts() {
				let test1 = this.$echarts.init(document.getElementById('test3'))
				let test2 = this.$echarts.init(document.getElementById('test4'))
				test1.setOption({
					title: {
						text: '新增设备',
						subtext: '数量'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['门机', '控制柜']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value',
					},
					series: [{
						name: '门机',
						type: 'line',
						data: [6, 8, 11, 4, 3, 5, 1],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
						itemStyle : {
							normal : {
								color:'#37a2da',
								lineStyle:{
									color:'#37a2da'
								}
							}
						},
					},
					{
						name: '控制柜',
						type: 'line',
						data: [6, 5, 7, 3, 2, 3, 4],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
						itemStyle : {
							normal : {
								color:'#ffd460',
								lineStyle:{
									color:'#ffd460'
								}
							}
						},
					}]
				})
				test2.setOption({
					title: {
						text: '本周访问量',
						subtext: '人数'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['游客', '用户']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value',
					},
					series: [{
						name: '游客',
						type: 'line',
						data: [10, 13, 22, 15, 23, 22, 40],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							],
							
						},
						itemStyle : {
							normal : {
								color:'#67e0e3',
								lineStyle:{
									color:'#67e0e3'
								}
							}
						},
					},
					{
						name: '用户',
						type: 'line',
						data: [41, 53, 62, 51, 41, 50, 72],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
						itemStyle : {
							normal : {
								color:'#ff9f7f',
								lineStyle:{
									color:'#ff9f7f'
								}
							}
						},
					}]
				})
			},
			OrderCharts() {
				var test1 = echarts.init(document.getElementById('test1'))
				test1.resize()
				test1.setOption({
					title: {
						text: '事件对比',
						subtext: '次数'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['本周事件数量', '上周事件数量']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value',
					},
					series: [{
						name: '本周事件数量',
						type: 'line',
						data: [41, 55, 60, 43, 52, 33, 20],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					},
					{
						name: '上周事件数量',
						type: 'line',
						data: [60, 75, 67, 83, 52, 33, 40],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					}]
				})
// 				test2.setOption({
// 					title: {
// 						text: '故障数量对比',
// 						subtext: '次数'
// 					},
// 					tooltip: {
// 						trigger: 'axis'
// 					},
// 					legend: {
// 						data: ['本周故障数量', '上周故障数量']
// 					},
// 					xAxis: {
// 						type: 'category',
// 						boundaryGap: false,
// 						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
// 					},
// 					yAxis: {
// 						type: 'value',
// 					},
// 					series: [{
// 						name: '本周故障数量',
// 						type: 'line',
// 						data: [1, 3, 2, 5, 3, 2, 0],
// 						markPoint: {
// 							data: [
// 								{type: 'max', name: '最大值'},
// 								{type: 'min', name: '最小值'}
// 							]
// 						},
// 						itemStyle : {
// 							normal : {
// 								color:'#e69d87',
// 								lineStyle:{
// 									color:'#e69d87'
// 								}
// 							}
// 						},
// 					},
// 					{
// 						name: '上周故障数量',
// 						type: 'line',
// 						data: [1, 3, 2, 1, 1, 0, 2],
// 						markPoint: {
// 							data: [
// 								{type: 'max', name: '最大值'},
// 								{type: 'min', name: '最小值'}
// 							]
// 						},
// 						itemStyle : {
// 							normal : {
// 								color:'#759aa0',
// 								lineStyle:{
// 									color:'#759aa0'
// 								}
// 							}
// 						},
// 					}]
// 				})
			},
		}
	}
	
</script>
<style lang="scss" scoped>
	.wrapper{
		background-color: #5A6268;
	}
</style>