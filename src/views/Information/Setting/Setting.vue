<template>
<div class="layout-content-main">
	<Tabs value="name1" :animated="false" @on-click="Onchange">
		<TabPane label="烧录" name="setting"></TabPane>
		<TabPane label="打印" name="print"></TabPane>
	</Tabs>
        <AutoComplete v-model="query.search_info" :data="menu" @on-search="handleSearch1" placeholder="input here" style="width:200px"></AutoComplete>
		<Button class="mr-10" type="default" icon="search" @click="search()"></Button> 
		<br> </br>
	<Table class="mb-10" :columns="columns" :data="data" ></Table> 
	<Page style="padding-right: 38%;" class="pagination" show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>
</div>
</template>

<script>
//	<div class="form" padding-top="100"></div>
export default {
  data() {

    const status = {
      0: '正常',
      1: '烧录',
      2: '清除',
    };
    return {
    	menu:[],
    	query: {
			search_info: '',
			page: 1,
			num: 10,
			select_type:'',
			select_status:'',
			isreg: 'False',
    	},
      options: {
        page: 1,
        num: 10,
        total: 0,
        isreg: 'False',
      },
      searchkey:'搜索类型',
      loading: false,
      columns: [{
          title: '序号',
          key: 'id'
        }, {
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
          title: '基站地址',
          width: 200,
          key: 'cell_address',
        },
        {
          title: 'IP地址',
          width: 200,
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
          minWidth: 100,
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
						this.burn(params.row)
                  }
                }
              }, '烧录'),
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
        this.options.total = res.data.data.totalNumber
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '获取列表失败'
        });
      }
    },
		
	async search() {
		this.loading = true
		let res = await this.$api.devices(this.query)
		this.loading = false
		if (0 === res.data.code) {
			this.data = res.data.data.list
			// this.options.total = res.data.data.totalNumber
		}
	},	
    async burn(item) {
      let res = await this.$api.regdevices({id: item.id,IMSI: item.IMSI, IMEI: item.IMEI})
      if (res.data.code === 0) {
        this.refreshNum = 2
        this.refresh()
        this.$Notice.success({
          title: '成功',
          desc: '开始烧录！稍后在运维界面显示该设备'
        });
      let res = await this.$api.deldevices({id: item.id,IMSI: item.IMSI, IMEI: item.IMEI})
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '烧录失败'
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
    handleTags(command){
                this.searchkey=command;
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
</style>
