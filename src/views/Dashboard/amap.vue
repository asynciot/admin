<template lang="jade">
div()
	Col.map(span="24" id="mapsize")
		div#map
</template>


<script>
	import {
		api,
		ladderApi,
		formatDate
	} from '@/utils'
	import r from '@/assets/red.png';
	import g from '@/assets/green.png';
	import error from '@/assets/error.gif';
	import lost from '@/assets/lost.gif';
	import open from '@/assets/open.gif';
	const createMark = (img) => {
		return new AMap.Icon({
			size:new AMap.Size(25, 25),
			image:img, 
			//anchor: new BMap.Size(10, 26),
			imageSize: new AMap.Size(25, 25),
		});
	};
	const redMark = createMark(r);
	const greenMark = createMark(g);
	const errorMark = createMark(error);
	const lostMark = createMark(lost);
	const openMark = createMark(`@/assets/open.gif?timestamp=${new Date().getTime()}`);

	var cenlat = 1;
	var cenlon = 1;
	var tagCor = '';
	const labelStyle = {
		color: 'black',
		fontSize: '12px',
		borderRadius: '4px',
		height: '16px',
		lineHeight: '12px',
		borderColor: 'black',
		fontFamily: ' 微软雅黑',
	};
	export default {
		data() {
			const type = {
				15: '控制器',
				240: '控制柜',
			};
			const netWork = {
				3: '联通3G',
				40: '移动4G',
				41: '联通4G',
			};
			return {
				showtag:true,
				title:'',
				color:[false,false,false,false,false,false],
				col:['green','red','yellow','blue','gray','black'],
				menu: [],
				query:{
					search_info: '',
					page: 1,
					num:1000,
					// device_type: 240,
					state:'',
					register: "registered",
					tagcolor: '',
					item: window.localStorage.getItem('item'),
					follow:'yes'
				},
				show:{
					device_type: 'all',
					state:'online',
				},
				option: {
					lon: this.$cookie.get('lng'),
					lat: this.$cookie.get('lat'),
					zoom: this.$cookie.get('zoom') || 9,
				},
				map: null,
				div_show: true,
				devices: [],
				tableData: [],
				select_type:'all',
				select_state:'login',
				openAnimateList: [],
				markerClusterer: null,
				markers: [],
				list:'',
				countmark:0,
				center:{
					lat: 0,
					lon: 0,
				},
				options: {
					name:'',
					page: 1,
					num: 10,
					total: 0,
					register: "registered",				
				},
				screenheight:'',
			}
		},
		mounted() {			
			this.initMap()
			this.setsize()
		},
		methods: {
			setsize(){
				const mapsize = document.getElementById('mapsize')
				const deviceWidth = document.documentElement.clientWidth
				this.screenheight = document.documentElement.clientHeight
				// mapsize.style.width = '100%'
				mapsize.style.height = (Number(this.screenheight)/2.55) + 'px'
				// mapsize.style.height ='380px'
			},
			async handleSearch1 () {
				this.menu=[];
				var str;
				for (var i=0;i<this.devices.length;i++){
					str=this.devices[i].IMEI;
					if ((str != null)&&(this.query.search_info != null)){
						if (str.indexOf(this.query.search_info)>=0)
							this.menu.push(str)
					}
				}
				for (var i=0;i<this.devices.length;i++){
					str=this.devices[i].device_name;		  	    	
					if ((str != null)&&(this.query.search_info != null)){
						if (str.indexOf(this.query.search_info)>=0)
							this.menu.push(str)
					} 
				}
			},
			//绘图
			async initMap() {
				this.getList();
				await this.centpoint()
				//let point = new BMap.Point(cenlon, cenlat);
				let map = new AMap.Map('map', {
					enableMapClick: false,
					resizeEnable: true,
					lang:"zh_en"
				});
				if(this.$i18n.locale == 'en-US'){
					map.setLang("en");
				}else{
					map.setLang("zh_cn");
				}
				map.setZoomAndCenter(5, [cenlon, cenlat]);
				//map.centerAndZoom(point, 10);
				//map.enableScrollWheelZoom();
				// map.addControl(new BMap.NavigationControl({
				// 	anchor: BMAP_ANCHOR_TOP_RIGHT,
				// 	enableGeolocation: true, 
				// }));
				// map.addEventListener('tilesloaded', () => {
				// 	this.eventHandler();
				// });
				// map.addControl(new BMap.ScaleControl({
				// 	anchor: BMAP_ANCHOR_TOP_RIGHT
				// }));
				// map.addControl(new BMap.OverviewMapControl());
				var that=this;
				this.map = map
				map.plugin(["AMap.MarkerClusterer"],function(){
					that.markerClusterer=new AMap.MarkerClusterer(
						that.map,
						that.markers,
						{gridSize:80}
					)
				})
				// this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
				// 	markers: this.markers
				// });
				// this.markerClusterer.setGridSize(90);
				 this.markerClusterer.setMinClusterSize(1);
				 this.markerClusterer.setMaxZoom(12)
			},
			eventHandler() {
				const center = this.map.getCenter();
				const zoom = this.map.getZoom();
				this.$cookie.set('lat', center.lat)
				this.$cookie.set('lng', center.lng)
				this.$cookie.set('zoom', zoom)
			},
			//获取数据
			async getList() {
				let res = await this.$api.devices(this.query)
				// let dev = await this.$api.reLadder(this.query)
				this.devices=res.data.data.list
				this.options.total = res.data.data.totalNumber		
				this.devices.forEach(item => {
					if(item.state == "online"){
						item.state = "在线"
					}else if(item.state == "offline"){
						item.state = "离线"
					}else if(item.state == "longoffline"){
						item.state = "长期离线"
					}
					if(item.device_type == "240"){
						item.device_type = this.$t('ctrl')
					}else if(item.device_type == "15"){
						item.device_type = this.$t('door')
					}
					if(item.cell_lat == null||item.cell_lon == null){
						// this.$api.deldevices({id:item.id}),
					}else{
						if(res.data.code == 0){
							const now = new Date().getTime();
							this.devices = res.data.data.list.map((item) => {
								if(!item.updateTime){
									item.isLoss = true;
									return item;
								}
								if(now - item.updateTime > 120000){
									item.isLoss = true;
								}else{
									item.isLoss = false;
								}
								if(item.deviceId.indexOf('test') !== -1){
									item.isLoss = false;
									item.Alert = '0';
								}
								return item;
							});
						}					
					}
				})
				await this.addMark()
				await this.centpoint()
			},
			async search() {
				if(this.query.search_info.length > 15){
					this.$Notice.error({
						title: '警告',
						desc: '请不要超过15字！',
					})
				}else{
					if(this.show.device_type == 'all'){
						this.query.device_type = ''
					}else{
						this.query.device_type = this.show.device_type
					}
					if(this.show.state == 'all'){
						this.query.state = ''
					}else{
						this.query.state = this.show.state
					}
					let dev = await this.$api.devices(this.query)
					this.devices = dev.data.data.list
					this.options.total = dev.data.data.totalNumber
					this.devices.forEach(item =>{
						if(item.state == "online"){
							item.state = "在线"
						}else if(item.state == "offline"){
							item.state = "离线"
						}else if(item.state == "longoffline"){
							item.state = "长期离线"
						}
						if(item.device_type == "ctrl"){
							item.device_type = "控制柜"
						}else if(item.device_type == "door"){
							item.device_type = "控制器"
						}
					})
					this.addMark()
					await this.centpoint()
				}
			},
			async addMark() {
				var that=this
				//this.map.clearMap();
				//this.markerClusterer.removeMarkers(this.markers)
				if(this.map!=null){
					this.map.plugin(["AMap.MarkerClusterer"],function(){
						that.markerClusterer.removeMarkers(that.markers)
					})
					this.map.clearMap();
				}
				this.markers = []
				this.devices.forEach(item => {
					if (item.cellocation_id != null)
					{
						const point = new BMap.Point(item.cell_lon+Math.random()/500, item.cell_lat);
						let marker = null;
						if (item.state  == "在线") {
							labelStyle.color = '#55BC52';
							labelStyle.borderColor = '#55BC52';
							marker = new AMap.Marker({
								position:new AMap.LngLat(point.lng,point.lat),
								icon: greenMark
							});
						}
						if (item.state  == '长期离线') {
							labelStyle.color = '#55BC52';
							labelStyle.borderColor = '#55BC52';
							marker = new AMap.Marker({
								position:new AMap.LngLat(point.lng,point.lat),
								icon: lostMark
							});
						}
						var steelContent ='设备id:'+item.device_id+'<div></div>设备名称:'+item.device_name+'<div></div>基站地址:'+item.cell_address
						var steelOpts = {
							width : 150,     //信息窗口宽度
							height: 130,     //信息窗口高度
							title : "<b>设备信息</b>" , //信息窗口标题
							enableMessage:true	//设置允许信息窗发送短息
						};
						var info = [];
						info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>"+this.$t('Device Info')+"</b>");
						info.push(this.$t('device ID')+" : "+item.device_id+"  "+this.$t('device name')+" : "+item.device_name);
						info.push(this.$t('Base Station Address')+":"+item.cell_address+"</div></div>");
						var infoWindow=new AMap.InfoWindow({content: info.join("<br/>")});
						var that=this;
						//marker.addEventListener('mouseover',function () {this.openInfoWindow(new BMap.InfoWindow(steelContent, steelOpts))})
						marker.on('mouseover',function(){infoWindow.open(that.map,[point.lng,point.lat])})
						marker.on('mouseout',function (){infoWindow.close()})
						this.markers.push(marker)

					}
				})
				if(this.map!=null){
					this.map.plugin(["AMap.MarkerClusterer"],function(){
						that.markerClusterer.addMarkers(that.markers)
					})
				}
			},
			showtag1(data) {
				this.showtag=true
			},
			showtag2(data) {
				this.showtag=false
			},
			cardClick(val,vd){
				if ((val==null)||(vd==null)){
					this.$Notice.warning({
						title: '警告',
						desc: '该设备没有记录地址',
					})
				}
				else {this.map.panTo(new BMap.Point(vd, val))}
			},
			angleChange(){
				if(document.getElementById("1").className == "fa fa-angle-up fa-3x"){
					document.getElementById("1").className = "fa fa-angle-down fa-3x"
					this.div_show = false
				}else{
					document.getElementById("1").className = "fa fa-angle-up fa-3x"
					this.div_show = true
				}						
			},
			async centpoint() {
				let res = await this.$api.devices(this.query)
				var minlat = 500;
				var minlon = 500;
				var maxlat = -500;
				var maxlon = -500;				
 				this.devices= res.data.data.list
 				this.options.total = res.data.data.totalNumber
				this.devices.forEach(item => {
					if(item.state == "online"){
						item.state = "在线"
					}else if(item.state == "offline"){
						item.state = "离线"
					}else if(item.state == "longoffline"){
						item.state = "长期离线"
					}
					if(item.device_type == "240"){
						item.device_type = "控制柜"
					}else if(item.device_type == "15"){
						item.device_type = "控制器"
					}
					if(item.cell_lat<=minlat){
						minlat = item.cell_lat
					}
					if(item.cell_lon<=minlon){
						minlon = item.cell_lon
					}
					if(item.cell_lat>=maxlat){
						maxlat = item.cell_lat
					}
					if(item.cell_lon>=maxlon){
						maxlon = item.cell_lon
					}
				})
				cenlat = (minlat+maxlat)/2			
				cenlon = (minlon+maxlon)/2
			},
// 			pageChange(val) {
// 				this.query.page = val
// 				this.search()
// 				this.addMark()
// 			},
			getlist(val){
				return val.split(';')
			},
// 			async checkcolor(c) {
// 				this.color[c]=!this.color[c]
// 				if (this.color[c]) {
// 					document.getElementById(this.col[c]).className="fa fa-bookmark fa-2x"
// 					document.getElementById(this.col[c]).style.marginTop = "4px"
// 				}
// 				else {
// 					document.getElementById(this.col[c]).className="fa fa-tag fa-2x"
// 					document.getElementById(this.col[c]).style.marginTop = "4px"
// 				}
// 				this.query.tagcolor=''
// 				for (var i=0;i<6;i++) {
// 				if (this.color[i]) {
// 					if (this.query.tagcolor!='') {
// 						this.query.tagcolor=this.query.tagcolor+';'
// 						}
// 					this.query.tagcolor=this.query.tagcolor+this.col[i]
// 				}
// 				}
// 				this.search()
// 			},
		}
	}
</script>

<style lang="scss" scoped>
	.mt{
		margin-top: 4px;
	}
	.map {
		height: calc(30vh - 54px);
	}
	#map {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
