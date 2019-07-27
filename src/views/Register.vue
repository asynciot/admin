<template lang="jade">
div.account
	div.text(align="center")
	Row(:gutter= 50 style="padding-bottom:15%")
		Col(span=12)
			img.img1(src="../assets/logo-menu.png" align="center")
			h3.account-title(style="text-align:center;font-size:23px;line-height:50px;width:250px" v-if="this.$i18n.locale == 'en-US'")|{{$t("NBSL")}}
			h3.account-title(style="text-align:center" v-if="this.$i18n.locale == 'zh-CN'")|{{$t("NBSL")}}
		Col(span=12 style="padding-top:5%")
			Form.account-form(ref='form',:model="form",:rules="rules",:label-width="80")
				Form-item(prop="mobile")
					Input(type="text",v-model="form.mobile",:placeholder="$t('phone number')" maxlength=11)
						icon(name="ios-call-outline",width="14",height="14",slot="prepend")
				Form-item(prop="username")
					Input(type="text",v-model="form.username",:placeholder="$t('Username')")
						Icon(type="ios-person-outline",size="20",slot="prepend")
				Form-item(prop="verifyCode")
					Row(:gutter=30)
						Col(span=13)
							Input(type="text",v-model="form.verifyCode",:placeholder="$t('Verification Code')" maxlength='4')
								Icon(type="ios-unlocked-outline",size="20",slot="prepend")
						Col(span=11)
							div()
								Button(@click="sentMessage",v-if="count<=0",style="width: 100%")|{{$t('Get Code')}}
								Button(@click="sentMessage",v-if="count>0",style="width: 100%" disabled)|{{$t('Get Code')}}({{count}})
				Form-item(prop="password")
					Input(type="password",v-model="form.password",:placeholder="$t('Password')")
						Icon(type="ios-locked-outline",size="18",slot="prepend")
				Form-item(prop="confirm")
					Input(type="password",v-model="query.confirm",:placeholder="$t('Confirm Password')")
						Icon(type="ios-locked-outline",size="18",slot="prepend")
				Form-item
					Button(type="primary",style="width: 125px" @click="create('form')",:loading="loading")|{{$t('register')}}
					Button.ss(type="primary" ,:style="{width: '125px'}" @click="$router.back(-1)")|{{$t('cancel')}}
</template>

<script>
import {
	api,
	ladderApi,
	formatDate
} from '@/utils'
import router from '../router/index'
export default {
	data() {
		const validateOldPassCheck = (rule, value, callback) => {
			if(this.query.confirm == '') {
				callback(new Error(this.$t('Please enter your password again.')));
			} else if(this.query.confirm !== this.form.password) {
				callback(new Error(this.$t('Inconsistent passwords!')));
			} else {
				callback();
			}
		};
		return {
			count: 0,
			time: '',
			ladderApi: ladderApi,
			loading: false,
			form: {
				id:'',
				mobile: '',
				username: '',
				password: '',
				verifyCode:'',
			},
			query:{
				confirm:'',
			},
			rules: {
				username: [{
					required: true,
					message: this.$t('Illegal characters!'),
					trigger: 'blur',
					pattern:/^[A-Za-z0-9]+$/,
				},
				{
					type: 'string',
					min: 5,
					message: this.$t('Username should not less than 5 letters'),
					trigger: 'blur'
				}],
				mobile: [{
					required: true,
					message: this.$t('Please fill in the phone number.'),
					trigger: 'blur'
				},{
					message: this.$t('Wrong Phone Number'),
					pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
					trigger: 'blur'
				}],
				verifyCode: [{
					required: true,
					pattern:/^[A-Za-z0-9]+$/,
					message: this.$t('Please fill in the true verification code.'),
					trigger: 'blur'
				},
				{
					type: 'string',
					min: 4,
					message: this.$t('Verification code should be 4 letters'),
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: this.$t('Illegal characters!'),
					trigger: 'blur',
					pattern:/^[A-Za-z0-9]+$/,
				},
				{
					type: 'string',
					min: 6,
					message: this.$t('Password should not less than 6 letters'),
					trigger: 'blur'
				}],
				confirm: [{
					validator: validateOldPassCheck,
					required: true,
					trigger: 'blur'
				}],
			},
		}
	},
	created(){
		this.munite()
		// window.localStorage.setItem('munite',0)
	},
	methods: {
		async sentMessage(){
			if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.form.mobile)){
				this.time=Number(Date.parse(new Date()))
				window.localStorage.setItem('munite',this.time)
				this.munite()
				let res = await this.$api.sentMessage(this.form.mobile)
			}
			else{
				if (this.form.mobile == null || this.form.mobile == ''){
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Please fill in the phone number.')
					})
				}
				else {
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Wrong Phone Number')
					})
				}
			}
		},
		munite(){
			if (!(/^\d+$/.test(window.localStorage.getItem('munite')))) window.localStorage.setItem('munite',0)
			this.time=Number(Date.parse(new Date()))
			this.count=(Number(window.localStorage.getItem('munite'))+60000-this.time)/1000
			if (this.count>0){		
				setTimeout(()=>{
					this.munite()
				}, 1000)
			}
			else{window.localStorage.setItem('munite',0)}
		},
		create(name) {
			this.loading = true
			this.$refs[name].validate(async(valid) => {
				if(valid) {
					let res = null
					if(!this.$route.params.id) {
						res = await this.$api.register(this.form)
					}
					this.loading = false
					if(res.data.code == 0){
						this.$refs[name].resetFields();
						window.localStorage.setItem('munite',0);
						this.$router.back();
						this.$Notice.success({
							title: this.$t('success'),
							desc: '',
							onClose: () => {
							}
						})
					}else {
						this.loading = false
						this.$Notice.error({
							title: this.$t('error'),
							desc: this.$t('Fail to register')
						})
					}
				}else{
					this.loading = false
					this.$Notice.error({
						title: this.$t('error'),
						desc: this.$t('Please check the form!')
					})
				}
			})
		},
	}
}
</script>

<style lang="scss" scoped>
	.bg{
		position: absolute;
    width: 100%;
    height: 100%;
    background: url('../assets/page.jpg') center center no-repeat;
    background-size: 100% auto;
		filter: blur(5px);
  }
	.text{
		width: 100%;
		height: 100%;
		padding-bottom: 10%;
		position:relative;
	}
	.img1{
		padding-left: 20%;
	}
	.account {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: url('../assets/page.jpg') center center no-repeat;
    background-size: 100% auto;
	.account-title {
		color: #606266;
		font-size: 30px;
		line-height: 100px;
		height: 100px;
	}
	.account-form {
		display: block;
		width: 350px;
		margin-left: -80px;
	}
	.register-form {
		width: 270px;
		display: block;
	}
	.ss{
		margin-left: 20px;
	}
}
</style>
