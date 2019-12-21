<template lang="jade">
div
	Div
		Row
			Col(span="3")
				div
					DatePicker(type="date"  ,:placeholder="$t('from date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="start_time")
			Col(span="3")
				div
					DatePicker(type="date"  ,:placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="end_time")
			Col(span="4")
				Button(type="primary" @click="getOrderList()")|{{$t('OK')}}
	div
		EventLine(v-for="order in orderList" ,:key="order.id1",:psMsg = 'order')
</template>

<script>
	import EventLine from './EventLinetest.vue';
	export default {
		data() {
			return {
				start_time : new Date(),
				end_time : new Date(),
				orderList:[],
			}
		},
		components: {
			EventLine,
		},
		created(){
			var time= new Date(this.end_time)
			time.setDate(time.getDate() - 1)
			this.start_time=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
			this.getOrderList()
		},
		methods:{
			p(s){
				return s<10 ? '0'+ s: s
			},
			async getOrderList(){
				const res = await this.$api.getOrderList({startTime:this.$format(this.start_time,'YYYY-MM-DD'),endTime:this.$format(this.end_time,'YYYY-MM-DD')})
				if(res.data.code == 0) {
					this.orderList=[]
					res.data.list.forEach((item,index)=>{
						this.orderList.push({
							name:item.device_name,
							id1:item.device_id,
							id2:null,
							start_time:this.$format(this.start_time,'YYYY-MM-DD'),
							end_time:this.$format(this.end_time,'YYYY-MM-DD'),
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
