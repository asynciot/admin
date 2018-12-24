<template >  	
 	<div class="layout-content-main">
  		<div class="form">

  		</div>
		<div class="echarts"><i-echarts :option="options" type="line"></i-echarts></div>
 	
 	</div>  	  	 		
</template>

<script>
  import IEcharts from 'vue-echarts-v3'
  export default {
    name: 'table',
    components: {
      IEcharts
    },
    data() {
      return {
      	editVisible: true,
      	form: {
        	dock_id:'',
			type: '',
			imsi: '',
			imei: '',
			t_update: '',
			t_logon:'',
			t_logout:'',
			t_create:'',
			id:'',
    	},
      	
        options: {
          title: {
            text: '设备最近登录时间分布'
          },

          xAxis: {
            name: '时间',
            nameLocation: 'start',
            nameGap: '50',
            boundaryGap: true,
            data: ['一天内', '两天内', '三天内', '四天内', '五天内', '六天内', '一周内', '一周外']
          },
          // yAxis: {},      纵轴自适应
          yAxis: {          //纵轴标尺固定
              type: 'value',
              scale: true,
              name: '数量',
              max: 300,
              min: 0,
              boundaryGap: [0.2, 0.2]
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0,0,0]
          }]
        },
        query: {
			dock_id:'',
			type: '',
			imsi: '',
			imei: '',
			t_update: '',
			t_logon:'',
			t_logout:'',
			t_create:'',
			id:'',
		},

		list: [],
		
		options1: {
			name:'',
			type: '',
			page: 1,
			num: 10,
			total: 0
		},		
		data1:[0, 0, 0, 0, 0, 0,0,0],
		count: 50,
      }
    },
    created(){
    	
    },
    mounted() {
    	
      this.changeData();
    },
    methods: {
    
    async getEdit(params){
    	this.loading = true
		let res = await this.$api.devices({id:params.row.id})
		this.loading = false
		if (0 === res.data.code) {
			this.list = res.data.data.list
			// this.options.total = res.data.data.totalNumber
		}
    },
    changeData() {
		var count=((Date.parse(new Date)-1543574990000))/1000
        this.options.series[0].data = [count,count,count,count,count,count,count,count];
        setTimeout(this.changeData, 2000);
    },
    pageChange(val) {
		this.options1.page = val		
		this.getList()
	},
	async deleteRow(params) {		
		let res = await this.$api.removedevices({id:params.row.id})
		this.$emit('on-custom-comp');
		if (0 === res.data.code) {
			this.$Message.info('操作成功');
			this.getList();
		}else {
			this.$Message.info('操作失败');
		}
	},
	
	saveEdit(name) {
			this.loading = true
			var time= new Date();
			this.$refs[name].validate(async(valid) => {
				if (valid) {
					let res = null
					if(this.$route.params.id) {
						this.form.t_update=Date.parse(time)
						res = await this.$api.updatedevices(this.form)
					} else {
						this.form.t_create=Date.parse(time)
						res = await this.$api.adddevices(this.form)
					}	
					this.loading = false
					if (res.data.code == 0) {
					  this.$Notice.success({
						title: '成功',
						desc: '成功添加设备！'
					  })
					}else{
						this.loading = false
						this.$Notice.error({
							title: '错误',
							desc: '添加设备失败！'
						})
					}
				}else{
					this.loading = false
					this.$Notice.error({
						title: '错误',
						desc: '请检查表单是否完整！'
					})
				}
			})
		},
	
	async getList() {
		this.loading = true
		let res = await this.$api.devices(this.options1)
		this.loading = false
		if (0 === res.data.code) {
			this.list = res.data.data.list		
			this.options1.total = res.data.data.totalNumber
		}
		for (var i=0;i<this.list.length;i++) {
			if (this.list[i].t_create !=null) {
			this.list[i].t_create=this.format(this.list[i].t_create);
			}
			if (this.list[i].t_update !=null) {
			this.list[i].t_update=this.format(this.list[i].t_update);
			}
			if (this.list[i].t_logon !=null) {
			this.list[i].t_logon=this.format(this.list[i].t_logon);
			}
			if (this.list[i].t_logout !=null) {
			this.list[i].t_logout=this.format(this.list[i].t_logout);
			}
		}	
	},
	async search() {
		this.loading = true
		let res = await this.$api.devices(this.query)
		this.loading = false
		if (0 === res.data.code) {
			this.list = res.data.data.list
			// this.options.total = res.data.data.totalNumber
		}
	},	
	
	format (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return (y + '-' + MM + '-' + d +' '+h+':'+m+':'+s);
     },
	
	
			async getdat() {
				
			this.options1.num = 500;
			this.loading = true
			let res = await this.$api.devices(this.options1)
			this.loading = false
		    this.list = res.data.data.list
		    
			var date=Date.parse(new Date())			
			var date2;
			for (var i=0;i<this.list.length;i++)
			{
				
				date2 = parseInt(date-Date.parse(this.list[i].t_logon))/86400000;
				switch (date2)
				{
					case 1 : 
					this.data1[0]++;
					break;
					case 2 : 
					this.data1[1]++;
					break;
					case 3 : 
					this.data1[2]++;
					break;
					case 4 : 
					this.data1[3]++;
					break;
					case 5 : 
					this.data1[4]++;
					break;
					case 6 : 
					this.data1[5]++;
					break;
					case 7 : 
					this.data1[6]++;
					break;
					default: 
					this.data1[7]++;
					break; 
				}		
			}
			
            this.options1.num = 10;
            this.loading = true
			let ress = await this.$api.devices(this.options1)
			this.loading = false		
			if (0 === ress.data.code) {
				this.list = ress.data.data.list		
				this.options1.total = ress.data.data.totalNumber			
			}
			this.getList();
	},
	

    }
  }
</script>
<style>
  .echarts {
    width: 800px;
    height: 250px;
  }
</style>
