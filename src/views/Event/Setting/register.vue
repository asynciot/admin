<template lang="jade">
	div.layout-content-main 
		Form(ref="form",:model="form",:rules="rules",:label-width="120")
			Row(:gutter="18")
				Col(span="10",offset="2")
					Form-item(label="设备名称",prop="device_name") 
						Input(v-model="form.device_name",placeholder="给设备一个别称方便区别")
					Form-item(label="dock_id",prop="dock_id")
						Input(v-model="form.dock_id",placeholder="请输入dockid")
					Form-item(label="IMSI:",prop="IMSI")
						div {{form.IMSI}}
					Form-item(label="IMEI:",prop="IMEI") 
						div {{form.IMEI}}
					Form-item(label="设备类型",prop="type") 
						Input(v-model="form.type",placeholder="请填写设备类型")
					Form-item(label="维保人员",prop="member") 
						Input(v-model="form.member",placeholder="当前操作人员")
					Form-item(label="基站地址",prop="cell_address") 
						Input(v-model="form.cell_address",placeholder="请填写基站地址")
			Row.mb-20
				Col(span="14",offset="2")
					Form-item.tc 
						Button.mr-10(icon="close",@click="$router.back(-1)")|取消 
						Button(type="success",icon="plus",@click="create('form')",:loading="loading")|注册
</template>

<script>
	import region from '@/views/region.json'
	export default {

		data() {
			return {
				region: region,
				loading: false,
				list:[],
				form: {
					dock_id: '',
					IMSI: '',
					IMEI: '',
					cell_address: '',
					id:'',
					member: '',
					phone: '',
					device_name: '',
				},
				rules: {
					dock_id: [{
						required: true,
						type: 'string',
						message: '请填写dockid',
						trigger: 'blur'
					}],
					IMSI: [{
						required: false,
						type: 'string',
//						pattern:/^4600[0,1,2,3,5,6,7]\d{10}$/,
						message: '请填写正确的imsi',
						trigger: 'blur'
					}],
					IMEI: [{
						required: false,
						type: 'string',
//						pattern:/^\d{15}$/,
						message: '请填写正确的IMEI',
						trigger: 'blur'
					}],
					type: [{
						required: false,
						type: 'string',
						message: '请填写设备类型',
						trigger: 'blur'
					}],
					device_name: [{
						required: true,
						type: 'string',
						message: '请填写设备名称',
						trigger: 'blur'
					}],

				},
			}
		},
		created() {
		this.getData()
	},
		methods: {
		async getData() {
			let res = await this.$api.devices({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
			
		},
		create(name) {
			this.$refs[name].validate(async(valid) => {
				if (valid) {
				    let res = await this.$api.regdevices(this.form)
			      	if (res.data.code === 0) {
				        this.$Notice.success({
				          	title: '成功',
				          	desc: '开始烧录！稍后将在运维界面显示此设备。'
				        });
			      	} else {
				        this.$Notice.error({
				          	title: '错误',
				          	desc: '烧录失败'
				        });
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.material-combination {
		position: relative;
	}
	
	.cover {
		filter: blur(2px);
	}
	
	.material-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>