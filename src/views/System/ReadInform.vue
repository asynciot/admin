<template lang="jade">
div.layout-content-main
	div.form
		Row(:gutter="20")
			Col(span="12")
				Card.ss
					Form(ref='form',:model="query",label-position="left")
						Row(:gutter="5")
							Col(span="20")
								Form-item(label="标题：")|{{list.title}}
							Col(span="10")
								Form-item(label="发件人：admin")
							Col(span="12")
								Form-item(label="时间：")|{{$format(list.createTime, 'YYYY-MM-DD HH:mm:ss')}}
							Col(span="24")
								Form-item(label="内容：")
									Input(v-model="list.content" type="textarea",readonly=true,:rows="5",placeholder="没有内容")
							Col(span="10")|&nbsp;
							Col(span="10")
								Button(type="" @click="$router.back(-1)" )|返回
</template>

<script>
export default{	
	data(){
		return{
			list: [],
			options: {
				name:'',
				type: 1,
				page: 1,
				num: 10,
				total: 0
			}
		
		}
	},
	created(){
		this.getList()
		this.read()
	},
	methods:{
		async read(){
			let res = await this.$api.readmessage({id:this.$route.params.id})
		},
		async getList(){
			let res = await this.$api.message({num:10,page:1,id:this.$route.params.id})
			if (res.data.code == 0){
				this.list=res.data.data.list[0]
			}
		},
		reply(){
			this.$router.push({
				name: 'userManage',
				params:{
					title: this.list.title,
					username: this.list.username
				}
			})
		},
		deleteinform(){
		}
	}
}
	
</script>

<style lang="scss" scoped>
	.ss{
		position: relative;
		left:30%
	}
	
</style>