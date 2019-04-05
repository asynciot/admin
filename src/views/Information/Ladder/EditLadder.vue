<template lang="jade">
	div
		div.box
			div.box-header.with-border
				p.box-title 电梯编辑
			div.form
				Row(:gutter="30")
					Col(span="8")
						Card()
							p(slot="title")|基本信息
							Form(:label-width="120")
								Row(:gutter="5")
									Col(span="20")
										Form-item(label="电梯名称：")
											Input(type='text', v-model="ladder.name" placeholder='请输入电梯名称')
										Form-item(label="安装地址：")
											Input(type='text', v-model="ladder.install_addr" placeholder='请输入安装地址')
						div.form-group
							Card()
								p(slot="title")|设备绑定
								Row(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary")|控制柜
									Col(span=10)
										Input(type='text' v-model='ladder.ctrl' placeholder='控制柜IMEI' disabled)
								Row.mt-1(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary")|门机
									Col(span=10)
										Input(type='text' v-model='ladder.door1' placeholder='门机IMEI' disabled)
								Row.mt-1(:gutter=5)
									Col(span=6 offset=3)
										Button(type="primary")|门机
									Col(span=10)
										Input(type='text' v-model='ladder.door2' placeholder='门机IMEI' disabled)
								Row.mt-1(:gutter=5 style="text-align:center")
										Button(@click='updateLadder()' type='success')|完成
										Button.ml-5(@click="$router.back(-1)")|返回
						
</template>

<script>
	export default {
		data () {
			const type = {
				15: '门机',
				240: '控制柜',
			};
			const model = {
				'online': '在线',
				'offline': '离线',
				'longoffline': '长期离线',
			};
			return {
				list: [],
				show:{
					state: 'online',
				},
				query:{
					search_info: '',
					page: 1,
					num: 10,
					isreg: "True",
					state: 'online',
					device_type:"240",
					register: "registered",	
					install_addr:'',
				},
				options: {
					name:'',
					page: 1,
					num: 10,
					total: 0,
					isreg: "True",
					model:'login',
					register: "registered",	
				},
				ladder:{
					name:'',
					install_addr:'',
				},
				save:{
					ladder_id:0,
					name:'',
					install_addr:'',
				},
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let res = await this.$api.reLadder({
					id:this.$route.params.id
				});
				this.ladder=res.data.data.list[0];
			},
			async updateLadder(){
				this.save.ladder_id = this.ladder.id
				this.save.name = this.ladder.name
				this.save.install_addr = this.ladder.install_addr
				let res = await this.$api.updateLadder(this.save);
				if (res.data.code == 0) {
					this.$Notice.success({
						title: '成功',
						desc: '编辑成功，可在电梯信息查看！'
					});
					this.$router.back(-1)
				}else{
					this.$Notice.error({
					title: '失败',
					desc: '编辑失败'
					});
				}
			},
		}
	}
</script>

<style lang="css">
	.content{
		overflow: auto;
	}
	.lp{
		margin-right: 5px;
	}
	.layout-content-main{
		overflow-y: scroll !important;
	}
	.ssa{
		margin-top: 5px;
		min-height: 450px;
	}
</style>
