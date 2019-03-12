<template>
	<div class="wrapper layout-content-main" style="background:#f5f3f0;padding:0;overflow-y: scroll;">
		<Drawer title="显示内容" :closable="false" v-model="value1" width="10">
			<div><checkbox v-model="visitor">Map</checkbox></div>
			<div><checkbox v-model="chat">客户意见反馈</checkbox></div>
			<div><checkbox v-model="progress">故障处理进程</checkbox></div>
			<div><checkbox v-model="chart">业务图表</checkbox></div>
			<div><checkbox v-model="chart2">用户组成</checkbox></div>
			<div><checkbox v-model="email">Quick Email</checkbox></div>
		</Drawer>
		<!-- Content Wrapper. Contains page content -->
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div class="row">
					<div class="col-lg-3 col-xs-10">
						<draggable :options="{animation: 60,group:'count'}">
						<!-- small box -->
						<div class="small-box bg-green">
							<div class="inner" style="text-align:center;">
								<h3>{{usernum}}</h3>

								<p>用户人数</p>
							</div>
							<div class="icon">
								<i class="ion ion-bag"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'userManage'})">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
						<!-- small box -->
						<div class="small-box bg-aqua">
							<div class="inner" style="text-align:center;">
								<h3>{{emailnum}}<sup style="font-size: 20px"></sup></h3>

								<p>未读邮件</p>
							</div>
							<div class="icon">
								<i class="ion ion-stats-bars"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'inform'})">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
						<!-- small box -->
						<div class="small-box bg-yellow">
							<div class="inner" style="text-align:center;">
								<h3>{{today}}/{{allevents}}</h3>

								<p>今日完成事件 {{parseInt(100*today/allevents)}}%</p>
							</div>
							<div class="icon">
								<i class="ion ion-person-add"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'maintainList'})">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
						</draggable>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<draggable :options="{animation: 60,group:'count'}">
						<!-- small box -->
						<div class="small-box bg-red">
							<div class="inner" style="text-align:center;">
								<h3 v-if="shine">{{faultdevice}}/{{alldevice}}</h3>
								<h3 style="color:#FF2C00" v-if="!shine"></h3>
								<p>故障设备数 {{parseInt(100*faultdevice/alldevice)}}%</p>
							</div>
							<div class="icon">
								<i class="ion ion-pie-graph"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'alList'})">More info <i class="fa fa-arrow-circle-right"></i></a>
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
						<!-- Map box --> <Col span='12' id="mapwidth">
						<div class="box box-primary" v-if="visitor" >
							<div class="box-header" style="margin:0">
							  <!-- tools box -->
							  <div class="pull-right box-tools">
								  <button type="button" class="btn btn-primary btn-sm pull-right" @click="visitor=!visitor"><i class="fa fa-times"></i>
								  </button>
									<div class="btn-group" style="margin-right: 5px;">
										<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('mapwidth')">
											<i class="fa fa-bars"></i></button>
										<div class="dropdown-menu pull-right" role="menu">
											<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('mapwidth')" @click.native="widthblock3('mapwidth',1)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('mapwidth')" @click.native="widthblock3('mapwidth',2)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('mapwidth')" @click.native="widthblock3('mapwidth',3)"></Card>
											<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('mapwidth')" @click.native="widthblock3('mapwidth',4)"></Card>
										</div>
									</div>

								<button type="button" class="btn btn-primary btn-sm pull-right" title="Collapse" style="margin-right: 5px;" @click="visitorbody=!visitorbody">
								  <i class="fa fa-minus" v-if="visitorbody"></i> <i class="fa fa-plus" v-if="!visitorbody"></i>
								</button>
							  </div>
							  <!-- /. tools -->

							  <i class="fa fa-map-marker"></i>
							  <h3 class="box-title">
								设备定位
							  </h3>
							</div>
							<div style="height:380px;background:#f5f3f0;border: 0;" v-if="visitorbody">
								<Map style="margin-top:20px;margin:0"></Map>
							</div>
							<!-- /.box-body-->
						</div>
						</Col>
						<Col span='6' id="chatwidth">
						  <!-- /.box -->
						<!-- Chat box -->
						<div class="box box-success" v-if="chat" >
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
							<div class="box-body chat" id="chat-box" v-if="chatbody" style="height:380px">
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
						<div class="box box-primary" v-if="progress" >
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
							<div class="box-body" v-if="progressbody" style="height:380px">
								<!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
								<ul class="todo-list">
									<li v-for="item in todo" :style="'height:'+ ((86500/screenheight))+'px'">
										<!-- todo text -->
										<span class="text">项目：{{item.pro}}</span>
										<!-- Emphasis label -->
										<small class="label label-danger"><i class="fa fa-clock-o"></i> {{item.time}}</small>
										<!-- General tools such as edit or delete-->
<!-- 										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div> -->
										<div>故障代码：{{item.description}}</div>
										<Col span='22'>
											<div class="progress horizontal active">
												<div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.progress">
												</div>
											</div>
										</Col>
										<Col span='2' style="text-align:right;color:#878787;">{{item.progress}}</Col>
									</li>
								</ul>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
						</Col>
						
						<Col span='12' id="chartwidth">
					<!-- </section> -->
					<!-- /.Left col -->
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
						<!-- solid sales graph -->
						<div class="box box-info" v-if="chart">
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
									<button type="button" class="btn bg-teal btn-sm" @click="chartbody=!chartbody;OrderCharts();areafault();">
										<i class="fa fa-minus" v-if="chartbody"></i>
										<i class="fa fa-plus" v-if="!chartbody"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" @click="chart=false"><i class="fa fa-times"></i>
									</button>
								</div>
							</div>
							<div class="box-body border-radius-none" v-if="chartbody" style="height:380px">
								<swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
									<swiper-slide>
										<div>
											<Col span='12' style="font-size: large;">今年设备故障数量</Col>
											<Col span='1'> <div style="height:20px;width:20px;background-color:#dcdcdc;" @click="fault=!fault;areafault()"></div></Col>
											<Col span='4'> 
											<div style="color:#888888" @click="fault=!fault;areafault()" v-if="!fault">新添故障设备</div>
											<div style="color:#000000" @click="fault=!fault;areafault()" v-if="fault">新添故障设备</div>
											</Col>
											<Col span='1'> <div style="height:20px;width:20px;background-color:#3c8cbc;" @click="fix=!fix;areafault()"></div> </Col>
											<Col span='4'> 
											<div style="color:#888888" @click="fix=!fix;areafault()" v-if="!fix">修复设备数量</div>
											<div style="color:#000000" @click="fix=!fix;areafault()" v-if="fix">修复设备数量</div>
											</Col>
										</div>
										<div class="chart" style="width:95%">
											<canvas id="areaChart" style="height:250px"></canvas>
										</div>
										<div class="swiper-button-next"></div>
									</swiper-slide>
									
									<swiper-slide>
										<div class="swiper-button-prev"></div>
										<Card class=''>
											<div id="test1" style="height:300px;width:100%"> </div>
										</Card>
									</swiper-slide>
								</swiper>
							</div>

						</div>
						<!-- /.box -->
						</Col>
						<Col span='6' id="chartwidth2">
						<!-- </section> -->
						<!-- /.Left col -->
						<!-- right col (We are only adding the ID to make the widgets sortable)-->
							<!-- solid sales graph -->
							<div class="box box-success" v-if="chart2">
								<div class="box-header">
									<i class="fa fa-th"></i>
						
									<h3 class="box-title">用户组成</h3>
									
									<div class="box-tools pull-right">
										<div class="btn-group" style="margin-right: 5px;">
											<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chartwidth2')">
												<i class="fa fa-bars"></i></button>
											<div class="dropdown-menu pull-right" role="menu">
												<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chartwidth2')" @click.native="widthblock3('chartwidth2',1);chartwidth()"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chartwidth2')" @click.native="widthblock3('chartwidth2',2);chartwidth()"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chartwidth2')" @click.native="widthblock3('chartwidth2',3);chartwidth()"></Card>
												<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chartwidth2')" @click.native="widthblock3('chartwidth2',4);chartwidth()"></Card>
											</div>
										</div>
										<button type="button" class="btn btn-success btn-sm" @click="chartbody2=!chartbody2;MemberCharts();">
											<i class="fa fa-minus" v-if="chartbody2"></i>
											<i class="fa fa-plus" v-if="!chartbody2"></i>
										</button>
										<button type="button" class="btn btn-success btn-sm" @click="chart2=false"><i class="fa fa-times"></i>
										</button>
									</div>
								</div>
								<div class="box-body border-radius-none" v-if="chartbody2" style="height:380px">
									<swiper id="swiperBox2" v-bind:options="swiperOption" ref="mySwiper">

										<swiper-slide>
											<Card class=''>
												<div id="test5" style="height:300px;width:100%"> </div>
											</Card>
										</swiper-slide>
									</swiper>
								</div>
						
							</div>
							<!-- /.box -->
							</Col>
						<!-- /.box -->
						<Col span='6' id="emailwidth">
						<!-- quick email widget -->
						<div class="box box-info" v-if="email">
							<div class="box-header">
								<i class="fa fa-envelope"></i>
						
								<h3 class="box-title">发送邮件</h3>
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
									<button type="button" class="btn bg-teal btn-sm" @click="emailbody=!emailbody">
										<i class="fa fa-minus" v-if="emailbody"></i>
										<i class="fa fa-plus" v-if="!emailbody"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" @click="email=false"><i class="fa fa-times"></i>
									</button>
								</div>
								<!-- /. tools -->
							</div>
							<div class="box-body" style="height:321px" v-if="emailbody">
								<form action="#" method="post">
									<div class="form-group">
										<input type="email" class="form-control" name="emailto" placeholder="发送给:" v-model="options.toId">
									</div>
									<div class="form-group">
										<input type="text" class="form-control" name="subject" placeholder="标题" v-model="options.title">
									</div>
									<div>
										<textarea class="textarea" placeholder="内容" v-model="options.content" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
									</div>
								</form>
							</div>
							<div class="box-footer clearfix" v-if="emailbody">
								
								<button type="button" class="pull-right btn btn-default" id="sendEmail" @click="sent()" :disabled="!btn">确定
									<i class="fa fa-arrow-circle-right"></i></button>
							</div>
						</div>
						</Col>
						</draggable>
					<!-- right col -->
				</Row>
				<!-- /.row (main row) -->
			</section>
			<Col span='23'>&nbsp;</Col>
			<Col span='1'>
				<div>
					<span style="cursor: pointer;color:blue" class="fa fa-eye fa-2x" @click="value1=true"></span>
				</div>
			</Col>
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
				btn:true,
				value1:false,
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
				chart2: true,
				email: true,
				progress: true,
				visitorbody: true,
				chatbody: true,
				chartbody: true,
				chartbody2: true,
				emailbody: true,
				progressbody: true,
				shine:true,
// 				todo:[{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'2 mins',progress:"40%"},
// 						{pro:"上海科技大学",description:"电梯在使用时光幕异常。经排查，光幕接收信号异常。预计后天购买光幕，恢复电梯正常使用。",time:'54 mins',progress:"60%"},
// 						{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'3 hours',progress:"70%"},
// 				],
				todo:[],
				swiperOption:{
					autoplay:true,
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
				screenwidth:'',
				screenheight:'',
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
				chartrepair:[],
				chartorder:[],
				usernum: 0,
				emailnum: 0,
				today: 0,
				allevents: 0,
				alldevice: 0,
			}
		},
		mounted(){
			// this.shineword();
			this.drawchart();
// 			widthblock3('mapwidth',3)
// 			widthblock3('chatwidth',3)
// 			widthblock3('chartwidth',3)
// 			widthblock3('progresswidth',3)
// 			widthblock3('calenderwidth',3)
// 			widthblock3('emailwidth',3)
			this.chartwidth();
		},
		created(){
			this.screenwidth = document.documentElement.clientWidth;
			this.screenheight = document.documentElement.clientHeight;
			this.getinfo();
			this.LastWeek = this.getWeek(7)
			this.LastWeekend = this.getWeek(1)
			this.NowWeek = this.getWeek(0)
			this.NowWeekend = this.getWeek(-6)
// 				this.DeviceCharts();
// 				this.MemberCharts();
		},
		methods: {
			async sent(){
				this.btn = false 
				let res= await this.$api.sentmessage(this.options)
				this.btn= true
				if (res.data.code == 0){
					this.$Notice.success({
						title: '成功',
						desc: '已发送消息'
					});
				}
				else{
					this.$Notice.error({
						title: '错误',
						desc: '发送失败'
					});
				}
			},
			chartwidth(){
				setTimeout(() => {
					this.OrderCharts();
					this.MemberCharts();
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
				this.usernum=0
				this.emailnum=0
				res = await this.$api.fault({num:1,page:1,device_type:'',type:'1',state:'untreated',islast:1})
				if (0 === res.data.code) {
					this.faultdevice =this.faultdevice + res.data.data.totalNumber
				}
				res = await this.$api.people({username: '',mobile: '',name:'',id:'',page: 1,num: 10,total: 0})
				if (0 === res.data.code) {
					this.usernum = res.data.data.totalNumber
				}
				res = await this.$api.message({num:10,page:1,done:false})
				if (res.data.code == 0){
				this.emailnum = res.data.data.totalNumber
				}
				res = await this.$api.getRepair({
					search_info: '',page: 1,num: 4,isreg: "True",state:'treated',order_type:'',result:'',device_id:'',
					finish_starttime:Date.parse(this.$format(new Date(), 'YYYY-MM-DD')),
				})
				if (res.data.code == 0){
				this.today = res.data.data.totalNumber
				}
				res = await this.$api.getRepair({
					search_info: '',page: 1,num: 4,isreg: "True",state:'untreated',order_type:'',result:'',device_id:'',
				})
				if (res.data.code == 0){
				this.faultdevice =this.faultdevice + res.data.data.totalNumber
				this.allevents=this.today+res.data.data.totalNumber
				this.allevents=11
				this.today=1
				}
				res = await this.$api.devices({page: 1,num: 10,isreg: ''})
				if (res.data.code == 0){
				this.alldevice =res.data.data.totalNumber
				}
				res = await this.$api.fault({
					search_info: '',
					page: 1,
					num: 4,
					isreg: "True",
					state:'',
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
						var t=Date.parse(new Date())-parseInt(res.data.data.list[i].createTime)
						if(t>1000){res.data.data.list[i].createTime=parseInt(t/1000).toString()+" secs"}
						if(t>60000){res.data.data.list[i].createTime=parseInt(t/60000).toString()+" mins"}
						if(t>3600000){res.data.data.list[i].createTime=parseInt(t/3600000).toString()+" hours"}
						if(t>86400000){res.data.data.list[i].createTime=parseInt(t/86400000).toString()+" days"}
					}
					this.data = res.data.data.list
					this.data.forEach(item=>{
						this.todo.push({pro:item.device_name,description: 'E'+item.code.toString(16),time:item.createTime,progress:"50%"})
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
				setTimeout(()=>{
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
						data                : this.chartorder,
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
						data                : this.chartrepair,
						}
					)}
					var areaChartData = {
					labels  : ['January', 'February', 'March', 'April', 'May', 'June'],
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
					},200)
			},
			async drawchart(){
			    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
			    // This will get the first returned node in the jQuery collection.
			    var areaChart       = new Chart(areaChartCanvas)
				var rep=''
				var ord=''
				this.chartrepair=[]
				this.chartorder=[]
				var time=this.$format(new Date(), 'YYYY')
				for (var i=0;i<6;i++){
				rep = await this.$api.getRepair({
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state:'treated',
					order_type:'',
					result:'',
					device_id:'',
					finish_starttime:Date.parse(time+'-'+(i+1).toString()),
					finish_endtime:Date.parse(time+'-'+(i+2).toString()),
				})
				this.chartrepair.push(rep.data.data.totalNumber)
				}
				for (var i=0;i<6;i++){
				ord = await this.$api.fault({
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					order_type:'',
					result:'',
					device_id:'',
					starttime:Date.parse(time+'-'+(i+1).toString()),
					endtime:Date.parse(time+'-'+(i+2).toString()),
				})
				this.chartorder.push(ord.data.data.totalNumber)
				}
			    this.areafault()
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
			MemberCharts() {
				setTimeout(()=>{
				let test1 = this.$echarts.init(document.getElementById('test5'))
				test1.resize()
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
				},200)
			},
			OrderCharts() {
				setTimeout(()=>{
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
				},200)
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