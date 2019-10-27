<template lang="jade">
div.layout-content-main
    div.form
        Row(:gutter=30)
            Col(span=5)| &nbsp;
            Col(span=14)
                Card(style="min-height:1200px")
                    Div(id="test")
                        Col(span=24)
                            Form(ref="form",:model="form",:label-width="120")
                                Row(:gutter="0")
                                    Col(span="24",offset="0")
                                        Col(span="8" style="margin-top:10px")|{{$t('order ID')}}:{{list.order_id}}
                                        Col(span="8" style="margin-top:10px")|{{$t('device name')}}:{{list.device_name}}
                                        Col(span="8" style="margin-top:10px")|IMEI:{{list.IMEI}}
                                        Col(span="8" style="margin-top:10px" v-if="list.state == 'treated'")|{{$t('state')}}:{{list.result}}
                                        Col(span="8" style="margin-top:10px" v-if="list.state == 'untreated'")|{{$t('state')}}:{{$t('treating')}}
                                        Col(span="8" style="margin-top:10px")|{{$t('confirm time')}}:{{list.confirm_time}}
                                        Col(span='24' style="margin-top:10px")
                                            textarea(v-model='ps' style="width:100%;height:60px", :placeholder="$t('Description of maintenance')")
                                    Col(span=12 style="margin-top:10px")|{{$t('photo before treating')}}:
                                    Col(span=12 style="margin-top:10px")|{{$t('photo after treating')}}:
                                    Col(span=12)
                                        //upload(:before-upload='before1')
                                        img(id="before1" src='../../assets/add.jpg' style="height:100%; width:100%;")
                                    Col(span=12)
                                        //upload(:before-upload='after1')
                                        img(id="after1" src='../../assets/add.jpg' style="height:100%; width:100%;")

</template>

<script>
    export default {
        data() {
            return {
                form:{
                    type:'1',
                },
                list:[],
                ps:'',
            }
        },
        computed: {
            role() {
                return this.username === 'admin' ? '超级管理员' : '普通用户';
            },
        },
        created(){
            this.getData();
        },
        mounted(){

        },
        methods:{
            async getData(){
                let res =await this.$api.getRepair({id:this.$route.params.id,page:1,num:1})
                if (res.data.code === 0) {
                    let ech = await this.$api.devices({device_id:res.data.data.list[0].device_id,num:10,page:1})
                    res.data.data.list[0].device_name = ech.data.data.list[0].device_name
                    res.data.data.list[0].IMEI = ech.data.data.list[0].IMEI
                    res.data.data.list[0].install_addr = ech.data.data.list[0].install_addr
                    res.data.data.list[0].cell_address = ech.data.data.list[0].cell_address
                    if (res.data.data.list[0].result == 'transfer') {res.data.data.list[0].result=this.$t('transferred')}
                    else {res.data.data.list[0].result=this.$t('treated')}
                    this.list = res.data.data.list[0]

                    var before=this.list.before_pic.split(';')
                    var after=this.list.after_pic.split(';')
                    document.getElementById('before1').src='http://server.asynciot.com/getfile?filePath='+before[0];
                    document.getElementById('after1').src='http://server.asynciot.com/getfile?filePath='+after[0];
                    setTimeout(()=>{
                        window.print();
                    },1000)
                } else {
                    this.$Notice.error({
                        title: this.$t('error'),
                        desc: this.$t('Fail to get List')
                    });
                }

            },
            /*async before1 (file) {
                if (this.list.state != "treated"){
                    var type = file.name.split('.')
                    if ((type[1] == 'png')||(type[1] == 'gif')||(type[1] == 'jpg')||(type[1] == 'bmp')||(type[1] == 'jpeg')){
                        if (file.size>2097000) {
                            this.$Notice.warning({
                                title: this.$t('warning'),
                                desc: this.$t('File size must be less than 2M')
                            })
                        }
                        else {

                            this.beforefile1 = new File([file], 'before'+file.name,{type:"image/jpeg"});
                            let url = null;
                            if (window.createObjectURL!=undefined) { // basic
                                url = window.createObjectURL(this.beforefile1) ;
                            }else if (window.webkitURL!=undefined) { // webkit or chrome
                                url = window.webkitURL.createObjectURL(this.beforefile1) ;
                            }else if (window.URL!=undefined) { // mozilla(firefox)
                                url = window.URL.createObjectURL(this.beforefile1) ;
                            }
                            document.getElementById('before1').src=url;
                            return false;
                        }
                    }
                    else{
                        this.$Notice.warning({
                            title: this.$t('warning'),
                            desc: this.$t('File type must be picture')
                        })
                    }
                }
                else{
                    this.$Notice.warning({
                        title: this.$t('warning'),
                        desc: this.$t('Can not supplementary picture.')
                    })
                }
            },
            async after1 (file) {
                if (this.list.state != "treated"){
                    var type = file.name.split('.')
                    if ((type[1] == 'png')||(type[1] == 'gif')||(type[1] == 'jpg')||(type[1] == 'bmp')||(type[1] == 'jpeg')){
                        if (file.size>2097000) {
                            this.$Notice.warning({
                                title: this.$t('warning'),
                                desc: this.$t('File size must be less than 2M')
                            })
                        }else {
                            this.afterfile1 = new File([file], 'after'+file.name,{type:"image/jpeg"});
                            let url = null;
                            if (window.createObjectURL!=undefined) { // basic
                                url = window.createObjectURL(this.afterfile1) ;
                            }else if (window.webkitURL!=undefined) { // webkit or chrome
                                url = window.webkitURL.createObjectURL(this.afterfile1) ;
                            }else if (window.URL!=undefined) { // mozilla(firefox)
                                url = window.URL.createObjectURL(this.afterfile1) ;
                            }
                            document.getElementById('after1').src=url;
                            return false;
                        }
                    }else{
                        this.$Notice.warning({
                            title: this.$t('warning'),
                            desc: this.$t('File type must be picture')
                        })
                    }
                }else{
                    this.$Notice.warning({
                        title: this.$t('warning'),
                        desc: this.$t('Can not supplementary picture.')
                    })
                }
            }*/
        }
    }
</script>

<style scoped>

</style>
