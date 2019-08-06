<template lang="jade">
div.account
	div.text(align="center")
	Row(:gutter=50 style="padding-bottom:15%")
		Col(span=12)
			img.img1(src="../assets/logo-menu.png" align="center")
			h3.account-title(style="text-align:center;font-size:23px;line-height:50px;width:250px" v-if="this.$i18n.locale == 'en-US'")|{{$t("NBSL")}}
			h3.account-title(style="text-align:center" v-if="this.$i18n.locale == 'zh-CN'")|{{$t("NBSL")}}
		Col(span=12 style="padding-top:5%")
			div()
				Form.account-form(ref='form',:model="form",:rules="rules",:label-width="80")
					Form-item(prop="username")
						Input(type="text",v-model="form.username",:placeholder="$t('Username')")
							span(class="fa fa-user-o",size="20",slot="prepend")
					Form-item(prop="password")
						Input(type="password",v-model="form.password",:placeholder="$t('Password')",@on-keyup.enter="login('form')")
							span(class="fa fa-lock" ,size="20",slot="prepend")
							<!-- div(class="code" @click="refreshCode") s-identify(:identifyCode="identifyCode") -->
					Form-item
						Row(:gutter="20")
							Col(span=7)
								Button(type="primary",long,@click="goRegister")|{{$t("register")}}
							Col(span=7)
								Button(type="primary",long,@click="login('form')" ,:loading="loading" )|{{$t("login")}}
							Col(span=10)
								Button(type="success",long,@click="bdqs('form')" ,:loading="loading" )|{{$t("BDQS")}}
							Col(span=12)
								div(style="cursor: pointer;text-align:center;color:#2d8cf0" @click="reset")|{{$t("forget_password?")}}
							Col(span=12 align="center")
								checkbox(v-model="rem" @click="rem=!rem" style="color:#2d8cf0")|{{$t("remember")}}
							Col(span=5)
								Button(type="text",@click="changelang")|<
							Col(span=14)
								div(style="width:100%;text-align: center;")|{{$t('lang')}}
							Col(span=1)
								Button(type="text",@click="changelang")|>
</template>

<script>
import {
  api,
	ladderApi,
	formatDate
} from '@/utils'
import router from '../router/index'
import SIdentify from './veri'
export default {
	components: {
		's-identify': SIdentify,
	},
	data() {
// 	const validateOldPassCheck = () => {
// 		if (this.vericode === '') {
// 			callback(new Error('请填写验证码'));
// 		} else if (this.vericode !== this.identifyCode) {
// 			callback(new Error('验证码错误'));
// 		} else {
// 			callback();
// 		}
// 	};
		return {
			ladderApi: ladderApi,
			loading: false,
			rem: false,
			vericode:'',
			identifyCodes: "1234567890",
			identifyCode: "",
			form: {
				username: '',
				password: '',
			},
			rules: {
				username: [{
					// required: true,
					message: this.$t('Illegal characters!'),
					trigger: 'blur',
					pattern:/^[A-Za-z0-9]+$/,
				},{
					required: true,
					message: this.$t("Please fill in the username"),
					trigger: 'blur'
				},
				{
					type: 'string',
					min: 5,
					message: this.$t("Username should not less than 5 letters"),
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
					min: 3,
					message: this.$t("Password should not less than 6 letters"),
					trigger: 'blur'
				}],
				veri: [{
					required: true,
					message: this.$t("Please fill in the username"),
					trigger: 'blur'
				},
	// 		  {
	// 		    validator: validateOldPassCheck,
	// 		    required: true,
	// 		    trigger: 'blur'
	// 		  }
				]
			}
		}
	},
	created(){
		var rem=window.localStorage.getItem('rem')
		var u=window.localStorage.getItem('u')
		if (u != null) {
			this.form.username=u
		}
		if (rem == 'true') {
			this.rem=true
			var u=window.localStorage.getItem('u')
			if (u != null) {
				this.form.username=u
			}
			var p=window.localStorage.getItem('p')
			if (p != null) {
			  this.form.password=p
			}
		}
	},
	mounted() {
		this.identifyCode = "";
		this.makeCode(this.identifyCodes, 4);
	},
	methods: {
		async bdqs(name) {
			window.localStorage.setItem('item','bd')
			this.loading = true
			this.$refs[name].validate(async (valid) => {
				if (valid) {
					let res = await this.$api.login(this.form)
					if (!res.data.code) {
						this.global.username = res.data.account.username
						window.localStorage.setItem('username',this.global.username)
						window.localStorage.setItem('id',res.data.account.id)
						window.localStorage.setItem('rem',this.rem)
						window.localStorage.setItem('u',this.form.username)
						window.localStorage.setItem('mobile',res.data.account.mobile)
						if (this.rem) {
							window.localStorage.setItem('p',this.form.password)
						}
						const val = await this.$api.people({id:res.data.account.id,num:1,page:1})
						const itm = await this.$api.getMenu({
							page:1,
							num:1,
							id:val.data.data.list[0].role,
						})
						const obj = JSON.stringify(itm.data.data.list[0])
						window.localStorage.setItem('menu',obj)
						this.$Message.success({
							content: this.$t("Login successfully, going the home page!"),
							duration: 0.5,
							onClose: () => {
								this.$router.push({
									name: 'dashboard',
								})
							}
						})
					} else {
						this.loading = false;
						this.$Message.error(this.$t("Login failed!"));
					}
				} else {
					this.loading = false;
					this.$Message.error(this.$t("Please improve login information!"));
				}
			})
		},
		async login(name) {
			window.localStorage.setItem('item','')
			this.loading = true
			this.$refs[name].validate(async (valid) => {
				if (valid) {
					let res = await this.$api.login(this.form)
					if (!res.data.code) {
						this.global.username = res.data.account.username
						window.localStorage.setItem('username',this.global.username)
						window.localStorage.setItem('id',res.data.account.id)
						window.localStorage.setItem('rem',this.rem)
						window.localStorage.setItem('u',this.form.username)
						window.localStorage.setItem('mobile',res.data.account.mobile)
						if (this.rem) {
							window.localStorage.setItem('p',this.form.password)
						}
						const val = await this.$api.people({id:res.data.account.id,num:1,page:1})
						const itm = await this.$api.getMenu({
							page:1,
							num:1,
							id:val.data.data.list[0].role,
						})
						const obj = JSON.stringify(itm.data.data.list[0])
						window.localStorage.setItem('menu',obj)
						this.$Message.success({
							content: this.$t("Login successfully, going the home page!"),
							duration: 0.5,
							onClose: () => {
								this.$router.push({
									name: 'dashboard',
								})
							}
						})
					} else {
						this.loading = false;
						this.$Message.error(this.$t("Login failed!"));
					}
				} else {
					this.loading = false;
					this.$Message.error(this.$t("Please improve login information!"));
				}
			})
		},
		changelang(){
			if (this.$i18n.locale == 'en-US'){
				this.$i18n.locale = 'zh-CN';
				localStorage.setItem('language',this.$i18n.locale)
				this.$router.push(0)
				// Vue.config.lang = 'zh-CN'
			}
			else{
				this.$i18n.locale = 'en-US';
				localStorage.setItem('language',this.$i18n.locale)
				this.$router.push(0)
				// Vue.config.lang = 'en-US'
			}
		},
		goRegister(){
			this.$router.push({
				name: 'register'
			})
		},
		reset(){
			this.$router.push({
				name: 'reset'
			})
		},
		randomNum(min, max) {
		  return Math.floor(Math.random() * (max - min) + min);
		},
		refreshCode() {
		  this.identifyCode = "";
		  this.makeCode(this.identifyCodes, 4);
		},
		makeCode(o, l) {
		  for (let i = 0; i < l; i++) {
			this.identifyCode += this.identifyCodes[
			  this.randomNum(0, this.identifyCodes.length)
			];
		  }
		}
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
	.item{
		padding-top: 10%;
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
	}
</style>
