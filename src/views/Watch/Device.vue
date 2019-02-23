<template lang="jade">
	div.layout-content-main
		div.form
			Row(:gutter=1)
				Col(span=12)
					card(style="height: 280px")
						Col(span="24" style="height: 35px;font-size:20px")|基础信息
							i(class="fa fa-bookmark" ,:style="{color:cardcolor}" v-for="cardcolor in getlist(data.tagcolor)" style="margin-left: 10px")
						Form.status(label-position="left",:label-width="70")
							Row
								Col(span="12")
									Form-item.fontsize(label="设备名称:")
										p()|{{data.device_name}}
								Col(span="12")
									Form-item(label="信号强度:")
										div()
											icon(name="sign0",width="24",height="24",slot="prepend" v-if="sign[0]")
											icon(name="sign1",width="24",height="24",slot="prepend" v-if="sign[1]")
											icon(name="sign2",width="24",height="24",slot="prepend" v-if="sign[2]")
											icon(name="sign3",width="24",height="24",slot="prepend" v-if="sign[3]")
											icon(name="sign4",width="24",height="24",slot="prepend" v-if="sign[4]")
											icon(name="sign5",width="24",height="24",slot="prepend" v-if="sign[5]")
								Col(span="12")
									Form-item(label="id:")
										p()|{{data.id}}
								Col(span="12")
									Form-item(label="IMEI:")
										p()|{{data.IMEI}}
								Col(span="12")
									Form-item(label="类型:")
										p(v-if="data.device_type=='15'")|控制器
										p(v-if="data.device_type=='240'")|控制柜
								Col(span="12")
									Form-item(label="状态:")
										p()|{{data.state}}
								Col(span="12")
									Form-item(label="ip定位:")
										p()|{{data.ipaddr}}
								Col(span="12" v-if="data.device_type=='15'")
									Form-item(label="型号:" v-if="data.device_model == '1' ")
										p()|NSFC01-01B
									Form-item(label="型号:" v-if="data.device_model == '2' ")
										p()|NSFC01-02T
								Col(span="24")
									Form-item(label="基站定位:")
										p()|{{data.cell_address}}
								Col(span="20")
									Form-item(label="安装地址:")
										p()|{{data.install_addr}}
								Col(span="4")
									Button(type="primary" @click="parameter()")|菜单
					Col(span=12)
						card.card(style='height: 220px')
							img(src='../../assets/wave.gif', width='100%', height='200')
					Col(span=12)
						card.card(style='height: 220px')
							p.clearfix(slot='title' style="height: 20px", align='center')|状态监控
							Form.status(label-position="left",:label-width="70")
								Col(span="23")
									Form-item(label="监控时长(s):")
										input.iv(v-model='realtime.duration' ,:maxlength=4)
								Col(span="23" style="")
									Form-item(label="采样周期(ms):")
										Select(v-model='realtime.interval')
											Option(key="1" label="100" value='100')
											Option(key="2" label="200" value='200')
											Option(key="3" label="500" value='500')
											Option(key="4" label="1000" value='1000')
											Option(key="5" label="2000" value='2000')
								Col(span="23" align='center' style="margin-top: 10px;margin-left: 10px")
									Button(type="success" @click="monitor('1')" style="width:100%")|状态监控
				Col(span=12)
					card.card(align='left' style='height: 500px',v-if='data.device_type == 240')
						Col(span="24" style="height: 35px;font-size:20px")|内存调试
						Row(style="margin-top:20px")|{{this.loading}}
						Row(style="margin-top:20px")
							Col(span=5 style="height: 30px;font-size:16px")|段地址:
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[0]' ,:autofocus="fcous.fir" onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[1]' ,:autofocus="fcous.sec" onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
						Row(style="margin-top:20px")
							Col(span=5 style="height: 30px;font-size:16px")|偏移地址:
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[2]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[3]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[4]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[5]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
						Row(style="margin-top:35px")
							Col(span=5 style="height: 30px;font-size:16px")
								checkbox(v-model="ctn" @on-change="contn()")|连续
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[6]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[7]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[8]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
							Col(span=4)
								input.iv(style="width:55%" ,:maxlength=4 v-model='address[9]' onkeyup="value=value.replace(/([^0-9a-fA-F])+/g, '')")
								input.iv(style="width:35%" ,:maxlength=2 v-model='res[0]' readonly)
						Row(style="margin-top:35px")
							Col(span="20" align='right' style="margin-top: 10px;margin-left: 10px")
								Button(type="success" @click="monitor('2')" style="width:25%")|内存监控
					card.card(align='center' style='height: 500px',v-if='data.device_type == 15')
						div( style="height: 35px;font-size:20px")
							Col(span=4)|事件记录
							Col(span=4)
								Select.smr(v-model="keyword"  placeholder="类型" style="width:100%")
									Option(key="1" label="id" value='id')
									Option(key="2" label="长度" value="length")
									Option(key="3" label="间隔" value="interval")
							Col(span=5)
								AutoComplete.mg(name="inpSer" v-model="search_info" ,:data="menu" , placeholder="关键词" max=15 style="width: 80%" class="handle-input mr10" id="serch1" @on-change="search()")
							Col(span=5)
								DatePicker(type="date" placeholder="开始日期" format="yyyy-MM-dd" v-model="options.starttime" style='width: 100%;' @on-change="search()")
							Col(span=1)|→
							Col(span=5)
								DatePicker(type="date" placeholder="截止日期" format="yyyy-MM-dd" v-model="options.endtime" style='width: 100%;' @on-change="search()")
						div(style='font-size: large;', v-if='total==0')| 这台设备没有事件记录
						Scroll(:on-reach-bottom='handleReachBottom', :distance-to-edge="0" , style="height: 360px; margin-top: 10px")
							card(v-bind:padding='4',v-for='item in list', :key='item.id', align='left', style='height: 60px; font-size: 12px; cursor: pointer;', @click.native='history(item.id)')
								Col(span=22)|  事件序号： {{item.id}}
								Col(span=2)
									div(style="color:red" v-if="(now-item.time)<300000")| New!
								Col(span=24)|  发生时间： {{formatDate(item.time,'yyyy-MM-dd HH:mm:ss')}}
								Col(span=24)|  结束时间： {{formatDate(item.time+item.interval*item["length"],'yyyy-MM-dd HH:mm:ss')}}
						div(style='font-size: large;') 共 {{total}} 条
</template>
	
<script>
	import {
		formatDate
	} from '../../utils.js';
	export default {
		data() {
			return {
				sign:[false,false,false,false,false,false],
				ctn: false,
				a:'',
				loading:'',
				websock:'',
				test:'',
				address:['0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000'],
				res:['00','00','00','00','00','00','00','00'],
				segment:['00','00','00','00'],
				duration:120,
				keyword:'time',
				search_info: '',
				door:true,
				now:[],
				time:'',
				data:[],
				menu:[],
				list:[],
				list2:[],
				total:'',
				fcous:{
					fir:true,
					sec:false,
					thr:false,
				},
				realtime: {
					threshold:'1',
					duration:120,
					interval:'1000',
				},
				options:{
					id:'',
					IMEI:'',
					name:'',
					page:1,
					isreg:'True',
				},
				columns: [{
					title: ' ',
					key: 'device_name'
				},
				{
					title: ' ',
					key: 'IMEI',
				}],
			};
		},
		created() {
			this.getData()
		},
		
	}
</script>

<style>

</style>
