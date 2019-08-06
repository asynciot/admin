<template lang="jade">
	div.layout-content-main
		div.form
			Form(ref='query',:model="query",label-position="right",:label-width="100" @keydown.enter.native.prevent="search()")
				div(style="padding-bottom:5px")
					Row(:gutter=5)
						Col(span="19")
							Button.mr-10(type="success",icon="md-add",:loading="loading",@click="goGroup()")|{{$t('New')}} {{$t('Elevator Group')}}
						Col(span="5")
							Button.mr-10(type="primary",icon="ios-search",:loading="loading",@click="options.page=1,search()")
							Input(v-model="query.name",:placeholder="$t('Group Name')" style="width:75%;")
		div(style="min-height:450px")
			Table(:columns="columns",:data="list",size="small" stripe)
		Col(span="24" style="text-align:center;")
			Page(show-elevator :total="options.total",:page-size="options.num",:current="options.page" on-change="pageChange",show-total)
</template>

<script>
	export default {
		data() {
			return {
				options:{
					page:1,
					nums:10,
					total:0,
				},
				query:{
					page:1,
					nums:10,
					name:'',
				},
				list:[],
				loading:false,
				columns: [{
					title: this.$t('Group Name'),
					key: 'name',
				},
				{
					title: this.$t('Group Creator'),
					key: 'leader',
				},
				{
					title: this.$t('Region'),
					key: 'region',
				},
				{
					title: this.$t('phone number'),
					key: 'mobile',
				},
				{
					title: this.$t('handle'),
					key: 'IMEI',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.$router.push({
											name: 'editElevator',
											params:{
												id: params.row.id
											}
										})
									}
								}
							}, this.$t('edit')),
							h('Button', {
								props: {
									type: 'error',
									size: 'small',
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click:()=>{
										this.rmGroup(params.row.id)
									}
								}
							}, this.$t('delete')),
						]);
					}
				}],
			}
		},
		created() {
			this.getGroup()
		},
		methods:{
			async search() {
				this.loading = true
				const res = await this.$api.readGroup(this.query)
				if(res.data.code == 0){
					this.list = res.data.data.list
					this.options.total = res.data.data.totalNumber
					this.loading = false
				}
			},
			goGroup(){
				this.$router.push({
					name:'addElevator',
				})
			},
			async getGroup(){
				this.loading = true
				const res = await this.$api.readGroup(this.query)
				if(res.data.code == 0){
					this.list = res.data.data.list
					this.options.total = res.data.data.totalNumber
					this.loading = false
				}
			},
			async rmGroup(val){
				this.loading = true
				const res = await this.$api.rmGroup({
					id:val,
				})
				if(res.data.code == 0){
					this.$Notice.success({
							title: this.$t('success'),
							desc: ''
						});
						this.getGroup()
				}else{
					this.$Notice.error({
					title: this.$t('error'),
					desc: ''
					});
				}
				this.loading = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mr-10{
		margin-right: 10px;
	}
	.ta{
		text-align: center;
	}
</style>
