<template lang="jade">
div.layout-content-main
	div.form
		Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="getList()")
			Row(:gutter=5)
				Col(span="3")
					Select(placeholder="请选择版本号",v-model="version" style="width:100%" @on-change="getList()")
						Option(v-for="item in versions",:key="item",:value="item")|{{item}}
				Col(span='3')
					AutoComplete(name="inpSer" v-model="options.search_info" ,:data="menu" ,@on-search="handleSearch1()" placeholder="关键词" max=15 style="width:100%" class="handle-input mr10" id="serch1")
				Col(span="13")
					Button(type="primary" icon='search' @click='getList()')|搜索
					Button.mr-10(type="success",:disabled="(select.length == 0) || !version",@click="update(select)")|更新选中设备
				Col(span="3")
					upload(:before-upload='handleUpload')
						Button(icon='ios-cloud-upload-outline') {{filename}}
				Col(span="2")
					Button.mr-10(type='success', @click='confirm()' style='' v-if='!upsuccess') 上传
	div(style="min-height: 450px;")
		Table(@on-selection-change="selection",:columns="columns",:data="data",size="small" stripe)
	div
	Col(span='6')|&nbsp;
	Col(span='18')
		Page(show-elevator :total="options.total",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
</template>

<script>
import {
  api,
	ladderApi,
	formatDate
} from '@/utils'
export default {
  created() {
    this.getList()
		this.getVersion()
  },
  data() {
		const type= {
      15: '控制器',
      240: '控制柜',
    };
    const netWork = {
      3: '联通3G',
      40: '移动4G',
      41: '联通4G',
    };
    return {
			versions: [],
			version: '',
			upsuccess: true,
			filename: '请选择文件',
			select: [],
			api: api,
			ladderApi: ladderApi,
			loading:false,
			username:window.localStorage.getItem('username'),
			columns: [{
				type: 'selection',
				align: 'center',
				width: 60,
			},{
				title: '设备名称',
				key: 'device_name',
				align: 'center',
				width: 110,
			},{
				title: 'IMEI(设备识别码)',
				key: 'IMEI',
				width: 140,
				minWidth:140,
			},{
				title: '设备类型',
				key: 'device_type',
				width:90,
				render: (h, params) => {
					var i='';
					if (params.row.device_type==240) i='控制柜';
					if (params.row.device_type==15) i='控制器';
					return h('p',i)
				}
			},
//      {
//        title: '网络类型',
//        key: 'networkType',
//					width:100,
//        render: (h, params) => {
//          return h('p',netWork[params.row.networkType]||'-')
//        }
//      },
			{
				title: '版本',
				key: 'device_firmware',
				width:90,
			},
			{
				title: '状态',
				width:90,
				render: (h, params) => {
					return h('p',(params.row.commond=='update') ? '更新中':'未在更新')
				}
			},
			{
				title: 'IP定位',
						 width: 110,
				 render: (h, params) => {
				 return h('div',params.row.ip_country+params.row.ip_region+params.row.ip_city)
				 }
			},
			{
				title: '基站定位',
				key: 'cell_address',
				render: (h,params) => {
					var addr= params.row.cell_address
					if (params.row.cell_address !=null) {
						if(params.row.cell_address.length>=38){
							addr=item.cell_address.substring(0,38)+"…"
						}
					}
					return  h('Poptip',{
						props: {
							trigger:"hover",										
							placement:"top-start",
							content:params.row.cell_address
						},
					},addr)
				}
			},
			{
				title: '操作',
				width:80,
				render: (h, params) => {
					return h('Button', {
						props: {
							type: 'primary',
							size: "small",
							disabled: (!this.version||this.username=="demo"),
						},
						on: {
							click: () => {
								this.update([params.row])
							}
						}
					}, '更新')
				}
			}],
      data: [],
			menu:[],
			file: null,
      options: {
        page: 1,
        num: 10,
        total: 1,
				version: '0.965b',
				search_info: '',
      }
    }
  },
  methods: {
		handleSearch1 () {
			this.menu=[];
			var str;
				for (var i=0;i<this.data.length;i++){
					str=this.data[i].IMEI;
						if (str != null){
							if (str.indexOf(this.options.search_info)>=0){
							this.menu.push(str)
							}
						}
					str=this.data[i].device_name;		  	    	
						if (str != null){
							if (str.indexOf(this.options.search_info)>=0){
							this.menu.push(str)
							}
						} 
					}
			},
		handleUpload (file) {
			var type = file.name.split('.')
			if (type[1] == 'bin'){
			this.file = file;
			this.filename = this.file.name;
			this.upsuccess = false;
			return false;
			}
			else{
				this.$Notice.warning({
					title: '警告',
					desc: '只能上传bin类型的文件'
				})
			}
		},
		async confirm(){
			var flag=0;
			var formData = new FormData()
			var formData = new window.FormData()
			formData.append('file',this.file)
			this.versions.forEach(item=>{
				if(item==this.filename) {flag=1}
			})
				if (flag==1) {
					this.upsuccess=true
					this.$Notice.warning({
						title: '成功',
						desc: (this.filename+'已存在')
					})
					this.filename='已上传'+this.filename
					}
				else {
					let res = await this.$api.upload(formData)
					if (res.data.code == 0){
						this.versions=[]
						let typ= await this.$api.gettype({type:'firmware',num:100,page:1})
						typ.data.data.list.forEach(item=>{
							this.versions.push(item.name)
						})
					this.upsuccess=true
					this.$Notice.success({
						title: '成功',
						desc: ('成功上传'+this.filename)
					})
					this.filename='已上传'+this.filename
					}
					else{
						this.$Notice.error({
							title: '错误',
							desc: '上传失败'
						})
					}
				}
		},
		pageChange(val) {
		  this.options.page = val
		  this.getList()
		},
		async getList() {
			this.versions=[]
			let typ= await this.$api.gettype({type:'firmware',num:100,page:1})
			typ.data.data.list.forEach(item=>{
				this.versions.push(item.name)
			})
      this.loading = true
      let res = await this.$api.devices(this.options)
      this.loading = false
      if (res.data.code === 0) {
				for (var i=0;i<res.data.data.list.length;i++){
					if (res.data.data.list[i].device_firmware !=null) {
						if(res.data.data.list[i].device_firmware.length>=6){
							res.data.data.list[i].device_firmware=res.data.data.list[i].device_firmware.substring(0,6)
						}
					}
				}
        this.data = res.data.data.list
				// this.data = [{device_name:'一号',IMEI:6346},{device_name:'二号',IMEI:61246},{device_name:'三号',IMEI:5891},{device_name:'四号',IMEI:345},]
        this.options.total = res.data.data.totalNumber
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '获取列表失败'
        });
      }
    },
		selection(data) {
			this.select=[]
      data.forEach(item=>{
				this.select.push(item)
			})
    },
		update(val) {			
			var name = []
			val.forEach(item=>{
				if (item.device_name!=null){name.push(item.device_name); }
				else {name.push(item.IMEI)}
			})
			this.$Modal.confirm({
				title: '请确认要升级的设备',
				content:name,
				onOk: () => {
					this.toupdate(val)
				},
				onCancel: () => {
				}
			})
			},
			async toupdate(val){
				var res
				var success=[]
				var error =[]
				for (var i=0;i<val.length;i++) {
					res = await this.$api.updat({IMEI:val[i].IMEI,firmware:this.version})
						if (res.data.code === 0) {
							if (val[i].device_name!=null){success.push(val[i].device_name);}
							else {success.push(val[i].IMEI)}							
							}
						else{
							if (val[i].device_name!=null){error.push(val[i].device_name);}
							else {error.push(val[i].IMEI)}
						}
					}
					if (success.length == val.length) {
						this.getList()
						this.$Notice.success({
							title: '成功',
							desc: '成功升级'+success
						});
					} else {
							if (error.length == val.length) {
								this.$Notice.error({
									title: '错误',
									desc: '升级失败'
								});
							}
							else{
								this.getList()
								this.$Notice.warning({
									title: '警告',
									desc: '成功升级'+success+'；但是'+error+'升级失败'
								});
							}							
						}
			}
		},

}
</script>

<style lang="scss" scoped>
	.mr-10{
		margin-left: 5px;
	}
</style>
