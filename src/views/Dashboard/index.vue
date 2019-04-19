<template>
	<div class="wrapper layout-content-main" style="background:#f5f3f0;padding:0;overflow-y: scroll;">
		<Drawer title="显示内容" :closable="false" v-model="value1" width="10">
			<div><Checkbox @on-change='showpanel("map",map)' v-model="map">设备定位</Checkbox></div>
			<div><Checkbox @on-change='showpanel("chat",chat)' v-model="chat">客户意见反馈</Checkbox></div>
			<div><Checkbox @on-change='showpanel("progress",progress)' v-model="progress">故障处理进程</Checkbox></div>
			<div><Checkbox @on-change='showpanel("chart",chart)' v-model="chart">业务图表</Checkbox></div>
			<!-- <div><Checkbox @on-change='showpanel("chart2",chart2)' v-model="chart2">用户组成</Checkbox></div> -->
			<div><Checkbox @on-change='showpanel("chart3",chart3)' v-model="chart3">常见故障</Checkbox></div>
			<div><Checkbox @on-change='showpanel("chart4",chart4)' v-model="chart4">活跃设备</Checkbox></div>
			<div><Checkbox @on-change='showpanel("email",email)' v-model="email">发送邮件</Checkbox></div>
		</Drawer>
		<!-- Content Wrapper. Contains page content -->
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div class="row" style="padding:0">
					<div class="col-lg-3 col-xs-10">
						<!-- small box -->
						<div class="small-box bg-red">
							<div class="inner" style="text-align:center; padding:4px" >
								<div :style="'font-size:'+setheight[0]/2.3+'px'" style='font-weight: bold;'>{{allevents}}</div>
								<p :style="'font-size:'+setheight[0]/6.5+'px'">故障设备</p>
							</div>

							<a href="#" class="small-box-footer" @click="$router.push({name:'maintain'})" :style="'font-size:'+setheight[0]/8+'px'">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-aqua">
							<div class="inner" style="text-align:center; padding:4px">
								<div :style="'font-size:'+setheight[0]/2.3+'px'" style='font-weight: bold;'>{{0}}<sup style="font-size: 20px"></sup></div>
								<p :style="'font-size:'+setheight[0]/6.5+'px'">可更新固件数</p>
							</div>
							<div class="icon">
								<i class="ion ion-stats-bars"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'evolution'})" :style="'font-size:'+setheight[0]/8+'px'">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>

					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">

						<!-- small box -->
						<div class="small-box bg-yellow">
							<div class="inner" style="text-align:center; padding:4px">
								<div :style="'font-size:'+setheight[0]/2.3+'px'" style='font-weight: bold;'>{{today}}</div>

								<p :style="'font-size:'+setheight[0]/6.5+'px'">今日完成任务</p>
							</div>
							<div class="icon">
								<i class="ion ion-person-add"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'maintainList'})" :style="'font-size:'+setheight[0]/8+'px'">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>

					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">

						<!-- small box -->
						<div class="small-box bg-green">
							<div class="inner" style="text-align:center; padding:4px">
								<div :style="'font-size:'+setheight[0]/2.3+'px'" style='font-weight: bold;' v-if="shine">{{onlinedevice}}/{{alldevice}}</div>
								<p :style="'font-size:'+setheight[0]/6.5+'px'">在线设备数 {{parseInt(100*onlinedevice/alldevice)}}%</p>
							</div>
							<div class="icon">
								<i class="ion ion-pie-graph"></i>
							</div>
							<a href="#" class="small-box-footer" @click="$router.push({name:'map'})" :style="'font-size:'+setheight[0]/8+'px'">More info <i class="fa fa-arrow-circle-right"></i></a>
						</div>

					</div>
					<!-- ./col -->
				</div>
				<!-- /.row -->
				<!-- Main row -->
				<Row gutter="20">
					<!-- Left col -->
					<!-- <section class="col-lg-5 connectedSortable"> -->
					
				<swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper" @mouseenter.native="$refs.mySwiper.options.autoplay=false;" @mouseleave.native="$refs.mySwiper.options.autoplay=autoplay;">
						<swiper-slide> 
						<!-- <div class="swiper-button-prev" ></div> -->
						<Col span='12' id="mapwidth" style="padding:5px">
						<div class="box box-primary" v-if="map">
							<div class="box-header" style="margin:0">
							  <!-- tools box -->
							  <div class="pull-right box-tools">
								  <button type="button" class="btn btn-primary btn-sm pull-right" @click="map=!map;showpanel('map',map)"><i class="fa fa-times"></i>
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

								<button type="button" class="btn btn-primary btn-sm pull-right" title="Collapse" style="margin-right: 5px;" @click="mapbody=!mapbody">
								  <i class="fa fa-minus" v-if="mapbody"></i> <i class="fa fa-plus" v-if="!mapbody"></i>
								</button>
							  </div>
							  <!-- /. tools -->

							  <i class="fa fa-map-marker"></i>
							  <h3 class="box-title">
								设备定位
							  </h3>
							</div>
							<div style="background:#f5f3f0;border: 0;" :style="'height:'+screenheight/1.15+'px'" v-if="mapbody">
								<Map style="margin-top:0px;margin:0"></Map>
							</div>
							<!-- /.box-body-->
						</div>
						</Col>
						<Col span='12' id="progresswidth" style="padding:5px">
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
							<div class="box-body" v-if="progressbody" style="" :style="'height:'+screenheight/1.15+'px'">
								<RadioGroup v-model="prostate" @on-change="getprogress(1)">
								<Radio label="5"><span>全部</span></Radio>
								<Radio label="1"><span>批准工单中</span></Radio>
								<Radio label="2"><span>等待接单</span></Radio>
								<Radio label="3"><span>处理中</span></Radio>
								<Radio label="4"><span>等待签字确认</span></Radio>
								</RadioGroup>
								<Scroll :on-reach-bottom='handleReachBottom2' :distance-to-edge="0" style="margin-top: 5px;width:101%" :height="screenheight/1.15-38">
								<ul class="todo-list" style=" padding:3">
									<div v-for="item in todo" :style="'font-size:'+screenheight/54+'px'" style="">
										<Col span='24'> 
											<span class="text">设备：{{item.pro}}</span>
											<small class="label label-danger"><i class="fa fa-clock-o"></i> {{item.time}}</small>
										</Col>
										<div>
											<Col span='24' v-if="item.type=='240'">故障代码：E{{item.description}}{{codelist[item.description]}}</Col>
											<Col span='24' v-if="item.type=='15'">故障代码：E{{item.description}}{{codelist2[parseInt(Math.log2(item.description))]}}</Col>
										</div>
										<div>
											<Col span='24'>安装地址：{{item.addr}}</Col> 
										</div>
										<Col span='3' style="margin-bottom: 10px;">处理进度：</Col>
										<Col span='21' style="margin-bottom: 10px;">
											<Col span='20' @mouseenter.native="barword=item.num;" @mouseleave.native="barword='';">
												<div class="progress horizontal active" :style="'height:'+screenheight/42+'px'" v-if="item.progress =='80%'" >
													<div :style="'font-size:'+screenheight/54+'px'" v-if="barword==item.num" style="position: absolute;left:45%;color:#ffffff"> {{item.state}} </div>
													<div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.progress">
													</div>
												</div>
												<div class="progress horizontal active" :style="'height:'+screenheight/42+'px'" v-if="item.progress =='40%'">
													<div :style="'font-size:'+screenheight/54+'px'" v-if="barword==item.num" style="position: absolute;left:45%"> {{item.state}} </div>
													<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.progress">
													</div>
												</div>
												<div class="progress horizontal active" :style="'height:'+screenheight/42+'px'" v-if="(item.progress =='10%')||(item.progress =='0%')">
													<div :style="'font-size:'+screenheight/54+'px'" v-if="barword==item.num" style="position: absolute;left:45%"> {{item.state}} </div>
													<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.progress">
													</div>
												</div>
											</Col> 
											<Col span='4' style="text-align:center;color:#878787;">{{item.progress}}</Col>
										</Col>
									</div>
								</ul>
								</Scroll>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
						</Col>
						<div class="swiper-button-next" @mouseover="next=true" style="outline: none;background: url(../../assets/svg/123.svg)">
							<div @mouseout="next=false"><icon name="next" width="35" height="35" slot="prepend" v-if="next"></icon></div>
						</div>
						</swiper-slide>
						<swiper-slide>
							<div class="swiper-button-prev" @mouseover="prev=true" style="outline: none;background: url(../../assets/svg/123.svg)">
								<div @mouseout="prev=false"><icon name="prev" width="35" height="35" slot="prepend" v-if="prev"></icon></div>
							</div>
								<Col span='12' id="chartwidth4" style="padding:5px">
									<div class="box box-primary" v-if="chart4">
										<div class="box-header">
											<i class="fa fa-th"></i>
											<h3 class="box-title">活跃设备</h3>
											<div class="box-tools pull-right">
												<div class="btn-group" style="margin-right: 5px;">
													<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chartwidth4')">
														<i class="fa fa-bars"></i></button>
													<div class="dropdown-menu pull-right" role="menu">
														<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chartwidth4')" @click.native="widthblock3('chartwidth4',1);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chartwidth4')" @click.native="widthblock3('chartwidth4',2);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chartwidth4')" @click.native="widthblock3('chartwidth4',3);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chartwidth4')" @click.native="widthblock3('chartwidth4',4);chartwidth()"></Card>
													</div>
												</div>
												<button type="button" class="btn btn-primary btn-sm" @click="chartbody4=!chartbody4;MemberCharts();">
													<i class="fa fa-minus" v-if="chartbody4"></i>
													<i class="fa fa-plus" v-if="!chartbody4"></i>
												</button>
												<button type="button" class="btn btn-primary btn-sm" @click="chart4=false"><i class="fa fa-times"></i>
												</button>
											</div>
										</div>
										<div class="box-body border-radius-none" v-if="chartbody4" :style="'height:'+screenheight/1.15+'px'">
											<div class='' :style="'height:'+screenheight/1.2+'px'">
												<activedoor></activedoor>
											</div>
										</div>
									</div>
								</Col> 
								<Col span='12' id="chartwidth3" style="padding:5px">
									<div class="box box-primary" v-if="chart3">
										<div class="box-header">
											<i class="fa fa-th"></i>
											<h3 class="box-title">常见故障</h3>
											<div class="box-tools pull-right">
												<div class="btn-group" style="margin-right: 5px;">
													<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chartwidth3')">
														<i class="fa fa-bars"></i></button>
													<div class="dropdown-menu pull-right" role="menu">
														<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chartwidth3')" @click.native="widthblock3('chartwidth3',1);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chartwidth3')" @click.native="widthblock3('chartwidth3',2);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chartwidth3')" @click.native="widthblock3('chartwidth3',3);chartwidth()"></Card>
														<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chartwidth3')" @click.native="widthblock3('chartwidth3',4);chartwidth()"></Card>
													</div>
												</div>
												<button type="button" class="btn btn-primary btn-sm" @click="chartbody3=!chartbody3;MemberCharts();">
													<i class="fa fa-minus" v-if="chartbody3"></i>
													<i class="fa fa-plus" v-if="!chartbody3"></i>
												</button>
												<button type="button" class="btn btn-primary btn-sm" @click="chart3=false"><i class="fa fa-times"></i>
												</button>
											</div>
										</div>
										<div class="box-body border-radius-none" v-if="chartbody3" :style="'height:'+screenheight/1.15+'px'">
												<div class='' :style="'height:'+screenheight/1.2+'px'">
												<faultfreq></faultfreq>
												</div>
										</div>
									</div>
								</Col>
								<div class="swiper-button-next" @mouseover="next=true" style="outline: none;background: url(../../assets/svg/123.svg)">
									<div @mouseout="next=false"><icon name="next" width="35" height="35" slot="prepend" v-if="next"></icon></div>
								</div>
							</swiper-slide>
							<swiper-slide> 
							<div class="swiper-button-prev" @mouseover="prev=true" style="outline: none;background: url(../../assets/svg/123.svg)">
								<div @mouseout="prev=false"><icon name="prev" width="35" height="35" slot="prepend" v-if="prev"></icon></div>
							</div>
							<Col span='12' id="chartwidth" style="padding:5px">
										<!-- </section> -->
										<!-- /.Left col -->
										<!-- right col (We are only adding the ID to make the widgets sortable)-->
											<!-- solid sales graph -->
											<div class="box box-primary" v-if="chart">
												<div class="box-header">
													<i class="fa fa-th"></i>
							
													<h3 class="box-title">业务图表</h3>
													
													<div class="box-tools pull-right">
														<div class="btn-group" style="margin-right: 5px;">
															<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chartwidth')">
																<i class="fa fa-bars"></i></button>
															<div class="dropdown-menu pull-right" role="menu">
																<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
																<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',1);chartwidth()"></Card>
																<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',2);chartwidth()"></Card>
																<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',3);chartwidth()"></Card>
																<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chartwidth')" @click.native="widthblock3('chartwidth',4);chartwidth()"></Card>
															</div>
														</div>
														<button type="button" class="btn btn-primary btn-sm" @click="chartbody=!chartbody;areafault();">
															<i class="fa fa-minus" v-if="chartbody"></i>
															<i class="fa fa-plus" v-if="!chartbody"></i>
														</button>
														<button type="button" class="btn btn-primary btn-sm" @click="chart=false"><i class="fa fa-times"></i>
														</button>
													</div>
												</div>
												<div class="box-body border-radius-none" v-if="chartbody" :style="'height:'+screenheight/1.15+'px'">
													<swiper id="swiperBox2" v-bind:options="swiperOption2" ref="mySwiper2">
														<swiper-slide>
															<div class='' :style="'height:'+screenheight/1.2+'px'">
															<compare></compare>
															</div>
														</swiper-slide>
														<!-- <swiper-slide>
															<div class="swiper-button-prev"></div>
															<div class='' style="height:370px">
																<freq></freq>
															</div>
															<div class="swiper-button-next"></div>
														</swiper-slide> -->
														<swiper-slide>
															<div class='' :style="'height:'+screenheight/1.2+'px'">
																<!-- <div id="test1" style="height:300px;width:100%"> </div> -->
																<test1></test1>
															</div>
														</swiper-slide>
													</swiper>
												</div>
											</div>
											<!-- /.box -->
											</Col>
													<Col span='12' id="chatwidth" style="padding:5px">

													<div class="box box-primary" v-if="chat" >
														<div class="box-header">
															<i class="fa fa-comments-o"></i>
							
															<h3 class="box-title">客户意见反馈</h3>
							
															<div class="box-tools pull-right" data-toggle="tooltip" title="">
																<div class="btn-group" data-toggle="btn-toggle">
																	<div class="btn-group" style="margin-right: 5px;">
																		<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" @click="widthblock1('chatwidth')">
																			<i class="fa fa-bars"></i></button>
																		<div class="dropdown-menu pull-right" role="menu">
																			<div style="display: inline-block; font-size:smaller;height:20px;margin-left:5px">大小：</div>
																			<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size1" @mouseover.native="widthblock2(1)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',1)"></Card>
																			<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size2" @mouseover.native="widthblock2(2)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',2)"></Card>
																			<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size3" @mouseover.native="widthblock2(3)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',3)"></Card>
																			<Card style="height:20px;width:20px;cursor: pointer;display: inline-block;border-radius:0;" :style="'background:'+size4" @mouseover.native="widthblock2(4)" @mouseout.native="widthblock1('chatwidth')" @click.native="widthblock3('chatwidth',4)"></Card>
																		</div>
																	</div>
																	<button type="button" class="btn btn-primary btn-sm" style="margin-right: 5px;" @click="chatbody=!chatbody">
																		<i class="fa fa-minus" v-if="chatbody"></i>
																		<i class="fa fa-plus" v-if="!chatbody"></i>
																	</button>
																	<button type="button" class="btn btn-primary btn-sm" @click="chat=false"><i class="fa fa-times"></i>
																	</button>
																</div>
															</div>
														</div>
														<div class="box-body chat" id="chat-box" v-if="chatbody" :style="'height:'+screenheight/1.15+'px'">
															<!-- chat item -->
															<Scroll :on-reach-bottom='handleReachBottom' :distance-to-edge="0" style="margin-top: 5px;width:103%;" :height="screenheight/1.15-60">
															<div class="item" v-for="item in chatlist" >
																<img :src="item.portrait" alt="user image" class="online" onerror="src='../../../static/admin.jpg'">
																<p class="message">
																	<a href="#" class="name">
																		<!-- <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15 &nbsp;&nbsp;</small> -->
																		<div style="font-size: large;" :style="'font-size:'+setheight[0]/6+'px'">{{item.username}}</div>
																		<div style="white-space:normal;word-break:break-all;word-wrap:break-word;width:97%;color:#444444;">{{item.content}}</div>
																	</a>
																	<div style="display: inline-block;width:95%;margin-top:5px">
																	<Col span='1'>&nbsp;</Col>
																	<Col span='6'><i class="fa fa-clock-o" style='margin-top: 10px;'></i>&nbsp;{{item.create_time}}</Col>
																	<Col span='3'><Button type="text" @click="recall(item.id)" v-if="item.from_id">撤回</Button>&nbsp;</Col>
																	<Col span='7'>
																		<Button type="text" @click="item.showlist=true" v-if="!item.showlist" style="outline: none;">共{{item.followlist.length}}条回复</Button>
																		<Button type="text" @click="item.showlist=false" v-if="item.showlist">隐藏回复</Button>
																	</Col>
																	<Col span='7'>
																		<Button type="text" @click="reply='回复'+item.username+':';chatoptions.follow=item.id;chatoptions.content=''" v-if="chatoptions.follow!=item.id" style="outline: none;">回复本条</Button>
																		<Button type="text" @click="reply='请留下您的疑问和建议 ...';chatoptions.follow=-1;chatoptions.content=''" v-if="chatoptions.follow==item.id" style="color:#FF2C00">新加留言</Button>
																	</Col>
																	</div>
																</p>
																<div class="attachment" v-for="follow in item.followlist" v-if="item.showlist">
																	<h4 style="white-space:normal;word-break:break-all;word-wrap:break-word;color:#2d8cf0;display: inline-block;">{{follow.username}}</h4>
																	<h4 style="white-space:normal;word-break:break-all;word-wrap:break-word;display: inline-block;">{{follow.content}}</h4>
																	<div>
																		<Col span='15'>&nbsp;</Col>
																		<Col span='4'><Button type="text" @click="recall(follow.id)" v-if="follow.from_id">撤回</Button>&nbsp;</Col>
																		<Col span='5'><i class="fa fa-clock-o" style='margin-top: 10px;'></i>&nbsp;{{follow.create_time}}</Col>
																	</div>
																</div>
							<!-- 									<div class="attachment" v-if="(!item.showlist)&&(item.followlist.length>0)">
																	<h4 style="white-space:normal;word-break:break-all;word-wrap:break-word; ">宋工:建议减小关门低速1、低速2。</h4>
																</div> -->
																<!-- /.attachment -->
															</div>
															</Scroll>
															<!-- /.item -->
							<!-- 								<div class="input-group">
																<input class="form-control" placeholder="Type message...">
							
																<div class="input-group-btn">
																	<button type="button" class="btn btn-primary"><i class="fa fa-plus"></i></button>
																</div>
															</div> -->
															<form action="#" method="post" style="margin-top:5px">
																<div class="input-group">
																	<Col span='18'><textarea type="text" name="message" style="height:40px" :placeholder="reply" class="form-control" v-model="chatoptions.content" :style="'font-size:'+screenheight/55+'px'"></textarea></Col>
																	<Col span='6'>
																	<span class="input-group-btn" style="width: 100%">
																		<button type="button" class="btn btn-primary btn-flat" @click="sentchat()" v-if="chatoptions.follow!=-1" :disabled="btn2" style="height:40px;width:100%">回复</button>
																		<button type="button" class="btn btn-primary btn-flat" @click="sentchat()" v-if="chatoptions.follow==-1" :disabled="btn2" style="height:40px;width:100%">留言</button>
																	</span>
																	</Col>
																</div>
															</form>
														</div>
													</div>
													</Col>
<!-- 							<div class="swiper-button-next"></div> -->
							</swiper-slide>
						<!-- /.box -->

						</swiper>
					<!-- right col -->
				</Row>
				<!-- /.row (main row) -->
			</section>
				<Col span='22'>&nbsp;</Col>
				<Col span='2' style="vertical-align: middle;">
				<div style="cursor: pointer;color:blue;font-size: larger;margin-left: 20px" @click="value1=true">
					<span style="font-size: 16px" class="fa fa-eye fa-2x"></span>
						内容筛选
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
				btn:false,
				btn2:false,
				value1:false,
				faultdevice: 0,
				barword:'',
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
// 				todo:[{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'2 mins',progress:"40%"},
// 						{pro:"上海科技大学",description:"电梯在使用时光幕异常。经排查，光幕接收信号异常。预计后天购买光幕，恢复电梯正常使用。",time:'54 mins',progress:"60%"},
// 						{pro:"江南一号",description:"电梯通信异常，经排查开关电源盒损坏。预计明天购买开关电源盒，恢复电梯正常使用。",time:'3 hours',progress:"70%"},
// 				],
				todo:[],
				todo2:['','','','',''],
				chatlist:[],
				autoplay:{
					delay: 20000,
					stopOnLastSlide: false,
					disableOnInteraction: true,
				},
				swiperOption:{
					// freeMode:true,
					autoplay:{
						delay: 20000,
						stopOnLastSlide: false,
						disableOnInteraction: true,
					},
// 					loop: true,
// 					loopAdditionalSlides: 2,
					disableOnInteraction: false,
					notNextTick:true,
					direction:'horizontal',
					grabCursor:true,
					setWrapperSize:true,
					autoHerght:true,
					slidesPerView: 1,
					mousewheel:false,
					mousewheelControl:true,
					height:window.innerHeight,
					resistanceRatio:0,
					observeParents:true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					allowTouchMove: false,
					hideOnClick: true,
					navigation: {
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next',
					},
				},
				swiperOption2:{
					// freeMode:true,
// 					loop: true,
// 					loopAdditionalSlides: 2,
					disableOnInteraction: false,
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
					allowTouchMove: true,
					navigation: {
						prevEl: '',
						nextEl: '',
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
					// createtime:'123',
					isSettled:false,
				},
				chatoptions: {
					fromId:window.localStorage.getItem('id'),
					title:'1',
					content:'',
					info:'1',
					type:0,
					follow: -1,
				},
				prostate:'5',
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
				chatbottom:false,
				next:false,
				prev:false,
				reply:'请留下您的疑问和建议 ...',
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
// 			if (window.localStorage.getItem('mapwidth') != null) {this.widthblock3('mapwidth',window.localStorage.getItem('mapwidth'))}
// 			if (window.localStorage.getItem('chatwidth') != null) {this.widthblock3('chatwidth',window.localStorage.getItem('chatwidth'))}
// 			if (window.localStorage.getItem('chartwidth') != null) {this.widthblock3('chartwidth',window.localStorage.getItem('chartwidth'))}
// 			if (window.localStorage.getItem('chartwidth2') != null) {this.widthblock3('chartwidth2',window.localStorage.getItem('chartwidth2'))}
// 			if (window.localStorage.getItem('chartwidth3') != null) {this.widthblock3('chartwidth3',window.localStorage.getItem('chartwidth3'))}
// 			if (window.localStorage.getItem('progresswidth') != null) {this.widthblock3('progresswidth',window.localStorage.getItem('progresswidth'))}
// 			if (window.localStorage.getItem('emailwidth') != null) {this.widthblock3('emailwidth',window.localStorage.getItem('emailwidth'))}
			if (window.localStorage.getItem('map') == 1) {this.map=false}
			if (window.localStorage.getItem('chat') == 1) {this.chat=false}
			if (window.localStorage.getItem('chart') == 1) {this.chart=false}
			if (window.localStorage.getItem('chart2') == 1) {this.chart2=false}
			if (window.localStorage.getItem('chart3') == 1) {this.chart3=false}
			if (window.localStorage.getItem('chart4') == 1) {this.chart4=false}
			if (window.localStorage.getItem('progress') == 1) {this.progress=false}
			if (window.localStorage.getItem('email') == 1) {this.email=false}
			this.chartwidth();
		},
		created(){
			this.screenwidth = document.documentElement.clientWidth;
			this.screenheight = document.documentElement.clientHeight;
			this.setheight[0]=this.screenheight/9.75 -3
			this.setheight[1]=this.setheight[0]/2.4
			this.getchat();
			this.getinfo();
			this.getprogress(0);
			this.LastWeek = this.getWeek(7)
			this.LastWeekend = this.getWeek(1)
			this.NowWeek = this.getWeek(0)
			this.NowWeekend = this.getWeek(-6)
// 				this.DeviceCharts();
// 				this.MemberCharts();
		},
		methods: {
			stop(){
				// alert(typeof(this.prostate))
			},
			handleReachBottom(){
				this.getchat()
			},
			handleReachBottom2(){
				this.getprogress(0)
			},
			showpanel(val1,val2){
				if (val2) {window.localStorage.setItem(val1,0)}
				else {window.localStorage.setItem(val1,1)}
			},
			async sent(){
				this.btn = true
				let res= await this.$api.sentmessage(this.options)
				this.btn= false
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
			async recall(val){
				let res = await this.$api.delchat({id:val})
				if (res.data.code == 0){
					this.chatpage=0
					this.chatlist=[]
					this.getchat()
					this.$Notice.success({
						title: '成功',
						desc: '已撤回消息'
					});
				}
			},
			async sentchat(){
				var res
				if (!/\S/.test(this.chatoptions.content)) {
					this.$Notice.warning({
						title: '提示',
						desc: '内容不能为空'
					});
				}
				else {
					this.btn2= true
					res= await this.$api.sentchat(this.chatoptions)
					this.btn2= false
				}
				if (res.data.code == 0){
					this.chatpage=0
					this.chatlist=[]
					this.getchat()
					this.$Notice.success({
						title: '成功',
						desc: '已发送消息'
					});
					this.chatoptions.content=''
				}
				else{
					this.$Notice.error({
						title: '错误',
						desc: '发送失败'
					});
				}
			},
			async getchat(){
				this.chatpage++
				let cht = await this.$api.chat({num:10,page:this.chatpage,follow:-1})
				if (cht.body.code == 0){
					if (cht.body.list.length == 0) {
						this.chatpage--
						this.$Notice.warning({
							title: '提示',
							desc: '已经到底了'
						});
					}
					for(var i=0;i<cht.body.list.length;i++){
						var followlist=[]
						let ech = await this.$api.chat({num:100,page:1,follow:cht.body.list[i].id})
						if (ech.body.code == 0){
							followlist=ech.body.list
							for(var j=0;j<followlist.length;j++){
								var t=Date.parse(new Date())-followlist[j].create_time
								if(t<86400000){followlist[j].create_time=this.$format(followlist[j].create_time,'HH:mm')}
								else if(t<31536000000){followlist[j].create_time=this.$format(followlist[j].create_time,'MM-DD')}
								else {followlist[j].create_time=this.$format(followlist[j].create_time,'YYYY-MM-DD')}
								if (followlist[j].nickname != null) {followlist[j].username = followlist[j].nickname}
								if (followlist[j].from_id == window.localStorage.getItem('id')) {followlist[j].from_id=true}
								else {followlist[j].from_id=false}
							}
						}
						if (cht.body.list[i].nickname != null) {
							cht.body.list[i].username = cht.body.list[i].nickname
							}
						var portrait="src='../../../static/admin.jpg'"
						if (cht.body.list[i].portrait != null) {portrait='http://server.asynciot.com/getfile?filePath='+cht.body.list[i].portrait}
						var t=Date.parse(new Date())-cht.body.list[i].create_time
						if(t<86400000){cht.body.list[i].create_time=this.$format(cht.body.list[i].create_time,'HH:mm')}
						else if(t<31536000000){cht.body.list[i].create_time=this.$format(cht.body.list[i].create_time,'MM-DD')}
						else {cht.body.list[i].create_time=this.$format(cht.body.list[i].create_time,'YYYY-MM-DD')}
						if (cht.body.list[i].from_id == window.localStorage.getItem('id')) {cht.body.list[i].from_id=true}
						else {cht.body.list[i].from_id=false}
						this.chatlist.push({id:cht.body.list[i].id,username:cht.body.list[i].username,content:cht.body.list[i].content,create_time:cht.body.list[i].create_time,followlist:followlist,showlist:false,portrait:portrait,from_id:cht.body.list[i].from_id})
					}
				}
				else {
					this.$Notice.error({
						title: '错误',
						desc: '获取通知失败！'
					})
				}
			},
			chartwidth(){
				setTimeout(() => {
					this.MemberCharts();
				},200)
			},
			shineword(){
				setTimeout(()=>{
					this.shine=!this.shine
					this.shineword()
				}, 1000)
			},
			async getprogress(val){
				if (val == 1) {this.todo=[];this.progresspage=0}
				this.progresspage++
				let res = await this.$api.progress({
					page: this.progresspage,
					num: 10,
					state: this.prostate,
					// user_id:window.localStorage.getItem('id')
				})
				
				if (res.data.code === 0) {
					if (res.data.list.length == 0) {
						this.progresspage--
						this.$Notice.warning({
							title: '提示',
							desc: '已经到底了'
						});
					}
					this.data = res.data.list
					for (var i=0;i<res.data.list.length;i++) {
						this.getname(i)
					}
				}
				else {
					this.$Notice.error({
						title: '错误',
						desc: '获取故障处理进程失败！'
					})
				}
			},
			async getname(val){
					let ech = await this.$api.devices({device_id:this.data[val].device_id,num:10,page:1})
					if (ech.data.data.list.length == 1) {
					if (ech.data.data.list[0].device_name != null){this.data[val].device_name = ech.data.data.list[0].device_name}
					if (ech.data.data.list[0].IMEI != null){this.data[val].IMEI = ech.data.data.list[0].IMEI}
					if (ech.data.data.list[0].install_addr != null){this.data[val].install_addr = ech.data.data.list[0].install_addr}
					if (ech.data.data.list[0].cell_address != null){this.data[val].cell_address = ech.data.data.list[0].cell_address}
					if (ech.data.data.list[0].ip_country != null){this.data[val].ipaddr = ech.data.data.list[0].ip_country+ech.data.data.list[0].ip_region+ech.data.data.list[0].ip_city}
					var t=Date.parse(new Date())-parseInt(this.data[val].create_time)
					var e=''
					if(t>1000){this.data[val].create_time=parseInt(t/1000).toString()+" secs"}
					if(t>60000){this.data[val].create_time=parseInt(t/60000).toString()+" mins"}
					if(t>3600000){this.data[val].create_time=parseInt(t/3600000).toString()+" hours"}
					if(t>86400000){this.data[val].create_time=parseInt(t/86400000).toString()+" days"}
					}
					var pro='0%'
					var code='0'
					var state='等待接单'
					var e='未填写'
					if (this.data[val].code != null) {
						code=this.data[val].code.toString(16)
						}
					if (this.data[val].state2 == 'examined') {pro='0%';state='批准工单中'}
					if (this.data[val].state2 == 'untreated') {pro='10%';state='等待接单'}
					if (this.data[val].state == 'examined') {pro='80%';state='等待签字确认'}
					if (this.data[val].state == 'untreated') {pro='40%';state='处理中'}
					this.todo.push({pro:this.data[val].device_name,description: code,time:this.data[val].create_time,progress:pro,addr:this.data[val].install_addr,expect:e,type:ech.data.data.list[0].device_type,state:state,num:10*this.progresspage + val})
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
				this.allevents=this.today+this.faultdevice
				}
				res = await this.$api.devices({page: 1,num: 10,isreg: ''})
				if (res.data.code == 0){
				this.alldevice =res.data.data.totalNumber
				}
				res = await this.$api.devices({page: 1,num: 10,isreg: '',state:'online'})
				if (res.data.code == 0){
				this.onlinedevice =res.data.data.totalNumber
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
					window.localStorage.setItem(val1,val2)
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
		}
	}
	
</script>
<style lang="scss" scoped>
	.wrapper{
		background-color: #5A6268;
	}
</style>