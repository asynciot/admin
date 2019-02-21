<template>

<div class="layout-content-main">
	<Tabs value="name1" :animated="false" @on-click="Onchange" >
		<TabPane label="全部" name="alList"></TabPane>
		<TabPane label="已注册" name="registered"></TabPane>
		<TabPane label="未注册" name="unregistered"></TabPane>
		<TabPane label="注册中" name="registing"></TabPane>
	</Tabs>
			<Select class="smr" v-model="options.device_dc" style="width:100px;" placeholder="类型">
				<Option key="1" label="全部" value=""></Option>
				<Option key="2" label="控制器" value="door"></Option>
				<Option key="3" label="控制柜" value="ctrl"></Option>
			</Select>
			<AutoComplete v-model="options.search_info" :data="menu" @on-search="handleSearch1" placeholder="请输入关键词" style="width:200px"></AutoComplete>
     	<Button class="mr-10" type="default" icon="search" @click="search()"></Button> 
     	<br> </br>
     	<Table class="mb-10" :columns="columns" :data="data" ></Table> 
     	<Page style=" " class="pagination" show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>
     </div>
     </template>
     
     <script>
     export default {
       data() {
     
         const status = {
           0: '正常',
           1: '烧录',
           2: '清除',
         };
         return {
         	wait: false,
         	menu:[],

           options: {
						 search_info: '',
						 device_dc:'',
						 select_status:'',
             page: 1,
             num: 10,
             total: 0,
						 op_statue: 'ok',
           },
           searchkey:'搜索类型',
           loading: false,
           columns: [ {
               title: '设备名称',
               key: 'device_name'
             },
             {
               title: 'IMEI',
               key: 'IMEI',
             },
             {
               title: 'IMSI',
               key: 'IMSI',
             },
             {
               title: '基站定位',
               width: 500,
               key: 'cell_address',
             },
             {
               title: 'IP定位',
               width: 150,
               key: 'ipaddr',
             },
             {
               title: '更新时间',
               key: 't_create',
               render: (h, params) => {
                 return h('p',this.$format(params.row.t_update, 'YYYY-MM-DD HH:mm:ss'))
               }
             },
             {
               title: '创建时间',
               key: 't_create',
               render: (h, params) => {
                 return h('p',this.$format(params.row.t_create, 'YYYY-MM-DD HH:mm:ss'))
               }
             },
             {
               title: '操作',
               width: 200,
               render: (h, params) => {
                 return h('div', [
				 h('Button', {
						props: {
							type: 'primary',
							size: "small",
						},
						style: {
							marginRight: '10px',
						},
						on: {
							click: () => {
								this.$router.push({						
									name: 'elevatorFiles',
									params: {
										id: params.row.id
									}
								})
							},
						}
					}, '查看/编辑'),
                   h('Button', {
                     props: {
                       type: 'primary',
                       size: "small",
                       disabled: (params.row.op_statue != '注册'),
                     },
                     style: {
                       marginRight: '10px',
                     },
                     on: {
                       click: () => {  
													this.burn(params.row)
                       }
                     }
                   }, params.row.op_statue),
                 ])
               }
             }
           ],
           refreshNum: 0,
           data: [
           ]
         }
       },
       created() {
         this.getList()
       },
       methods: {
       	handleSearch1 (selectword) {
       		this.menu=[];
       		var str;
             for (var i=0;i<this.data.length;i++){
             	str=this.data[i].IMEI;
             	if (str != null){
             		if (str.indexOf(selectword)>=0)
             		this.menu.push(str)
             	}
             	str=this.data[i].device_name;		  	    	
     		        	if (str != null){
     		        		if (str.indexOf(selectword)>=0){
     		        		this.menu.push(str)
     		        		}
     		        	} 
       	  }
           },
         pageChange(val) {
           this.options.page = val
           this.getList()
         },
         async getList() {
           this.loading = true
     	  let res = await this.$api.devices(this.options)
           this.loading = false
     
           if (res.data.code === 0) {
             this.data = res.data.data.list
						 
						 this.data.forEach(item =>{							 
							 if (item.op_statue !=null) {
							 if(item.op_statue=='ok'){
							 	item.op_statue='注册'
							 }
							 }
							 if (item.op_statue !=null) {
							 if(item.op_statue=='registing'){
							 item.op_statue='注册中'
							 }
							 }		 
							if (item.device_name !=null) {
						 	if(item.device_name.length>=10){
						 		item.device_name=item.device_name.substring(0,9)+"…"
						 	}
							}
							if (item.cell_address !=null) {
							if(item.cell_address.length>=40){
								alert(item.device_name)
						 		item.cell_address=item.cell_address.substring(0,40)+"…"
						 	}
							}
						 	})						 
             this.options.total = res.data.data.totalNumber				 
						 
           } else {
             this.$Notice.error({
               title: '错误',
               desc: '获取列表失败'
             });
           }
         },
     		
     	async search() {
     		this.options.page = 1
				this.getList()
     	},	
         async burn(item) {
           let res = await this.$api.regdevices({id: item.id,IMSI: item.IMSI, IMEI: item.IMEI})
           if (res.data.code === 0) {
             this.refreshNum = 2
             this.refresh()
             this.$Notice.success({
               title: '成功',
               desc: '开始注册！稍后在运维界面显示该设备'
             });
//           let res = await this.$api.deldevices({id: item.id,IMSI: item.IMSI, IMEI: item.IMEI})
           } else {
             this.$Notice.error({
               title: '错误',
               desc: '注册失败'
             });
           }
         },
         refresh() {
           setTimeout(()=>{
             this.getList()
             if (this.refreshNum > 0) {
               this.refresh()
               this.refreshNum--
             }
           }, 5000)
         },
     
         async clear(item) {
           let res = await this.$api.logoutdevices(item.id)
           if (res.data.code === 0) {
             this.getList()
             this.$Notice.success({
               title: '成功',
               desc: '开始清除'
             });
           } else {
             this.$Notice.error({
               title: '错误',
               desc: '开始清除失败'
             });
           }
         },
     		Onchange: function(val) {
     			this.$router.push({
     				name: val,
     			})
     		}
       }
     }
     </script>
     <style scoped>
     .mb-10 {
       margin-bottom: 20px;
     }
     .img {
       width: 200px;
       height: 200px;
     }
     .tags-close-box {
     
             box-sizing: border-box;
             padding-top: 1px;
             text-align: center;
             width: 90px;
             height: 30px;
             background: #fff;
             box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
             z-index: 10;
         }
     .pagination {
     	position: absolute;
     	margin-left: 30%;
			margin-top: 3%;
     }
     </style>
     