<template >
	<div class="layout">
		<Layout :style="{minHeight: '100vh'}">
			<Sider :style="{background:'#1e282c'}" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" v-if="!full">
				<Menu ref="side1" :class="menuitemClasses" theme="dark" width="auto" @on-select="go" :active-name="active" :style="{background:'#1e282c',}">
					<div style="width: 100%;height: 64px;background: #367fa9;">
						<img src="../assets/logo-menu.png" style="padding-left: 33%;cursor: pointer;width: 66%;" v-on:click="goHome">
					</div>
					<template>
						<div class="user-panel">
							<Col span="8" >
								<img src="../assets/user2-160x160.jpg" class="img-circle" alt="User Image">
							</Col>
							<Col span="16" style="color: #fff;padding-top: 10px;">
								<p>{{username}}</p>
							</Col>
						</div>
					</template>
					<template v-for="item in menu" v-if="!item.sub" >
						<MenuItem  :key="item.name" :name="item.name" :style="{color:'#b8c7ce'}">
							<i :key="item.name" :class="item.icon" size="16" ></i>
							{{isCollapsed?'':item.label}}
						</MenuItem >
					</template>
					<template v-else>
						<Submenu :name="item.name">
							<template slot="title" >
								<Icon :type="item.icon" size="16"></Icon>
								<Badge v-if="item.count" :count="item.count" class-name="badge-sub-alone" :dot="true">
									{{isCollapsed?'':item.label}}
								</Badge>
								<i v-else>{{isCollapsed?'':item.label}}</i>
							</template>
							<Menu-item class="submenu" v-for="sub in item.sub" :key="sub.name" :style="{background:'#2c3b41',color:'#b8c7ce'}" :name="sub.name" v-if="((sub.label!='用户管理')||(username=='admin'))&&((sub.label!='权限管理')||(username=='admin'))">
								<Badge class-name="badge-alone" overflow-count="99" :count="sub.count?sub.count:0">{{sub.label}}</Badge>
							</Menu-item>
						</Submenu>
					</template>
				</Menu>
			</Sider>
			<Layout>
				<Header  class="m-header" v-if="!full">
					<Row>
						<Col span="20">
							<Col span="22">
								<Badge dot style="float: right;margin-top: 25px;"></Badge>
								<span class="fa fa-bell-o" style="color:white;float: right;padding-top: 25px;" />
							</Col>
							<Col span="1">
								<Badge dot style="float: right;margin-top: 25px;"></Badge>
								<span class="fa fa-envelope-o" style="color:white;float: right;padding-top: 25px;" />
							</Col>
						</Col>
						<Col span="3">
							<Dropdown class="layout-header-user fr" @on-click="logout" trigger="click" style="margin-left: 0px;float: left;">
								<Button type="ghost" long class="w-button" style="margin-top: 10px;">
									<Col span="6">
										<img src="../assets/user2-160x160.jpg" class="img-circle" alt="User Image">
									</Col>
									<Col span="12">
										<p style="color: #fff;padding-top: 5px;">{{username}}</p>
									</Col>
								</Button>
								<Dropdown-menu slot="list">
									<Dropdown-item :name="4">个人信息</Dropdown-item>
									<Dropdown-item :name="6">修改密码</Dropdown-item>
									<Dropdown-item :name="5">微信关注</Dropdown-item>
									<Dropdown-item :name="3">退出</Dropdown-item>
								</Dropdown-menu>
							</Dropdown>
						</Col>
						<Col span="1">
							<Button style="border:0;background:transparent" size="small" @click="full=true">
								<div><icon name="full" width="10" height="10" slot="prepend"></icon></div>
							</Button>
						</Col>
					</Row> <Row>
						<div style="background:#000; color:#FFF';" v-if="showTags">
							<ul>
								<li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
									<router-link :to="item.path" class="tags-li-title">
										{{item.title}}
									</router-link>
									<span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
								</li>
							</ul>
						</div>
					</Row>
				</Header>
				<Content :style="{padding: '0 16px 16px',position:'relative',minHeight: '91vh'}" >
					<div class="layout-content">
						<div style="text-align:right;margin:0px auto 0px auto;background:#FFFACD" v-if="full==true">
						<Button style="border:0;background:transparent" size="small" @click="full=false">
							<div><icon name="quit" width="10" height="10" slot="prepend"></icon></div>
						</Button></div>
						<div>
						<transition name="fade">
							<router-view></router-view>
						</transition>
						</div>
					</div>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>

<script>
	import bus from './bus';
	export default {
		data() {
			const validateOldPassCheck = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.password.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				full:false,
				tagsList: [],
				isCollapsed: false,
				modal: false,
				modalType: 0,
				username:window.localStorage.getItem('username'),
				info: {
					nicname: '',
					phone: ''
				},
				password: {
					oldPassword: '',
					password: ''
				},
				passwordRules: {
					oldPassword: [{
						required: true,
						message: '旧密码不能为空',
						trigger: 'blur'
					}, {
						min: 5,
						message: '密码不能少于6个字符',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					}, {
						min: 5,
						message: '密码不能少于6个字符',
						trigger: 'blur'
					}],
					confirm: [{
						validator: validateOldPassCheck,
						required: true,
						trigger: 'blur'
					}],
				},
				role: {
					0: '管理员',
				},
				count: null,
				active: this.$route.path.split('/')[1],
				menu: [
					{
						name: 'index',
						icon: 'fa fa-cube',
						label: '系统首页',
					},{
						name: 'dashboard',
						icon: 'fa fa-dashboard',
						label: 'Dashboard',
					},{
						name: 'menu',
						icon: 'map',
						label: '运行监控',
						sub:[{
							name:'map',
							label:'运行状态',
						},{
							name:'alertTake',
							label:'告警订阅',
						},{
							name:'evolution',
							label:'更新状态',
						}]
					},{
						name: 'maintain',
						icon: 'settings',
						label: '工作流',
						sub: [{
								name: 'auditinglist',
								label: '审核列表',
							},{
								name: 'maintain',
								label: '工单列表',
							},
							{
								name: 'maintainList',
								label: '维保信息',
							},
// 							{
// 								name: 'upList',
// 								label: '保养信息',
// 							},
// 							{
// 								name: 'faultRank',
// 								label: '故障等级',
// 							}
						],
// 					},{
// 						name: 'company',
// 						icon: 'home',
// 						label: '单位管理',
// 						sub: [{
// 								name: 'contractor',
// 								label: '安装单位',
// 							},
// 							{
// 								name: 'maintainCompany',
// 								label: '维保单位',
// 							},
// 							{
// 								name: 'usedep',
// 								label: '使用单位',
// 							},
// 							{
// 								name: 'property',
// 								label: '物业单位',
// 							}
// 						],
					},{
						name: 'event',
						icon: 'ios-list',
						label: '基础信息维护',
						sub: [{
							name: 'alList',
							label: '设备信息',
						}],
					},{
						name: 'system',
						icon: 'ios-person-outline',
						label: '系统管理',
						sub:[{
							name: 'userManage',
							label: '用户管理',
						},{
							name: 'inform',
							label: '通知记录',
						},{
							name: 'instructions',
							label: '说明文档',
						},{
							name: 'authority',
							label: '权限管理',
						}]
					},{
						name: 'setting',
						icon: 'ios-settings',
						label: '出厂设置',
						sub:[{
							name:'print',
							label:'打印二维码'
						}]
					},
				]
			}
		},
		computed: {
			menuitemClasses: function() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			},
			showTags() {
                // return this.tagsList.length > 0;
				return false;
            }
		},
		
		methods: {
			gethome(){
				this.$router.push({
					name:'index'
				})
			},
			async logout(index) {
				this.modalType = parseInt(index)
				switch (parseInt(index)) {
					case 1:
						let user = await this.$api.user(this.$cookie.get('id'))
						this.info = user.data.account.data
						this.modal = true
						break;
					case 2:
						this.modal = true
						break;
						break;
					case 3:
						let res = await this.$api.logout({})
						window.$cookie.delete('id')
						window.$cookie.delete('role')
						window.localStorage.removeItem('id');
						this.$router.replace({						
							name: 'login'
						})
						break;
					case 4:
						let resp = await this.$api.user({})
						this.$router.push({
							name: 'person'
						})
						break;
					case 6:
						this.$router.push({
							name: 'newpassword'
						})
						break;
					case 5:					
						let http = await this.$api.getcode()
						window.location.href= http.data.qrcode.url
				}
			},
			go(name) {
				if (typeof name === 'string')
					this.$router.push({
						name: name
					});
			},
			goHome() {
				this.$router.push({
					name: 'index'
				});
			},	
			isActive(path) {
                return path === this.$route.fullPath;
            },
//             // 关闭单个标签
//             closeTags(index) {
//                 const delItem = this.tagsList.splice(index, 1)[0];
//                 const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
//                 if (item) {
//                     delItem.path === this.$route.fullPath && this.$router.push(item.path);
//                 }else{
//                     this.$router.push('/home');
//                 }
//             },
//             // 关闭全部标签
//             closeAll(){
//                 this.tagsList = [];
//                 this.$router.push('/home');
//             },
//             // 关闭其他标签
//             closeOther(){
//                 const curItem = this.tagsList.filter(item => {
//                     return item.path === this.$route.fullPath;
//                 })
//                 this.tagsList = curItem;
//             },
            // 设置标签
//             setTags(route){
//                 const isExist = this.tagsList.some(item => {
//                     return item.path === route.fullPath;
//                 })
//                 if(!isExist){
//                     if(this.tagsList.length >= 8){
//                         this.tagsList.shift();
//                     }
//                     this.tagsList.push({
//                         title: route.meta.name,
//                         path: route.fullPath,
//                         name: route.matched[1].components.default.name
//                     })
//                 }
//                 bus.$emit('tags', this.tagsList);
//             },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
			collapsedSider () {
				this.$refs.side1.toggleCollapse();
			},
        },
        watch:{
//             $route(newValue, oldValue){
//                 this.setTags(newValue);
//             }
        },
        created(){
            // this.setTags(this.$route);
        }
	}
</script>

<style lang="scss" scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.layout-breadcrumb {
		padding: 10px 15px 0;
	}

	.laycontent {
		position: relative;
	}

	.layout-content {
		// position: relative;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 10px;
		margin: 15px;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
		// min-height: 500px;
		// min-height: 100%;
	}
	.m-header{
		background: #3c8dbc;
		boxShadow: 0 2px 3px 2px rgba(0,0,0,.1);
		min-height:64px;
	}
	.layout-copy {
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		padding: 0 0 15px;
		color: #9ea7b4;
		bottom: 0;
	}

	.ivu-row-flex {
		height: 100%;
	}

	.layout-menu-left {
		background: #464c5b;
		// overflow-y: scroll;
	}

	.layout-menu-ul {
		padding-top: 1px;
	}

	.layout-header {
		padding: 0px;
		height: 60px;
		background: #3c8dbc;
	}

	.layout-header-user {
		height: 40px;
	}

	.layout-logo-left {
		width: 90%;
		height: 130px;
		line-height: 30px;
		background: #5b6270;
		border-radius: 3px;
		margin: 15px auto 36px;
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item {
		color: #FDFEFC;
	}

	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		// color: #39f;
	}

	.submenu {
		padding: 8px 24px;
	}

	.header-titles {
		line-height: 60px;
		padding-left: 20px;
		margin-top: -1%;
	}

	.info {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
	
	.tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
        background: #59f;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
 		position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #0ff;
    }
	.w-button{
		min-width: 150px;
		border: #fff;
	}
	.img-circle{
		width: 100%;
		max-width: 45px;
		height: auto;
		border-radius: 50%;
	}
	.user-panel{
		padding-left: 20%;
	}
	.label{
		
	}
</style>
