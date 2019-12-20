<template lang="jade">
    Div
        Div
            DatePicker(type="date"  ,:placeholder="$t('from date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="start_time")

            DatePicker(type="date"  ,:placeholder="$t('closing date')" format="yyyy-MM-dd" slot="extra" transfer style='color:#000' v-model="end_time")
        Div
            EventLine(v-for="order in orderList",:key="order.id1",:psMsg = 'order')
</template>

<script>
    import EventLine from './EventLine.vue';
    export default {
        data() {
            return {
                start_time : new Date(),
                end_time : new Date(),
                orderList:[],
                LadderInfo:[]
            }
        },
        created(){
            var time= new Date(this.end_time)
            time.setDate(time.getDate() - 6)
            this.start_time=time.getFullYear()+'-'+this.p((time.getMonth()+1))+'-'+this.p(time.getDate())+' '+this.p(time.getHours())+':'+this.p(time.getMinutes())+':'+this.p(time.getSeconds());
            //console.log(this.start_time+"111"+this.end_time)
            this.getOrderList()
            console.log(this.orderList)
        },
        methods:{
            p(s){
                return s<10 ? '0'+ s: s
            },
            async getOrderList(){
                const res = await this.$api.getOrderList({startTime:this.$format(this.start_time,'YYYY-MM-DD'),endTime:this.$format(this.end_time,'YYYY-MM-DD')})
                if(res.data.code == 0) {
                    res.data.list.forEach((item,index)=>{
                        this.orderList.push({
                            name:item.device_name,
                            id1:item.device_id,
                            id2:null
                        })
                    })
                }
            }
        }
    }

</script>

<style scoped>

</style>
