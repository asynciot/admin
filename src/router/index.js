import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Register = resolve => require(['@/views/Register'], resolve)
const Reset = resolve => require(['@/views/Reset'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Index = resolve => require(['@/views/Menu/Index'], resolve)

const User = resolve => require(['@/views/User/Index'], resolve)
const UserInfo = resolve => require(['@/views/User/Info/UserInfo'], resolve)
const MyFollowList = resolve => require(['@/views/User/Info/FollowList'], resolve)
const MyMaintainList = resolve => require(['@/views/User/Info/MaintainList'], resolve)
const MyUpkeepList = resolve => require(['@/views/User/Info/UpkeepList'], resolve)
const MyAssessList = resolve => require(['@/views/User/Info/AssessList'], resolve)

const CtrlHistory = resolve => require(['@/views/Watch/CtrlHistory'], resolve)
const DoorHistory = resolve => require(['@/views/Watch/DoorHistory'], resolve)
const CtrlMonitor = resolve => require(['@/views/Watch/CtrlMonitor'], resolve)
const DoorMonitor = resolve => require(['@/views/Watch/DoorMonitor'], resolve)
const CtrlParameter = resolve => require(['@/views/Watch/CtrlParameter'], resolve)
const DoorParameter = resolve => require(['@/views/Watch/DoorParameter'], resolve)
const Memory = resolve => require(['@/views/Watch/Memory'], resolve)
const Evolution = resolve => require(['@/views/Watch/Evolution'], resolve)
const Map = resolve => require(['@/views/Watch/Map'], resolve)
const DeviceInfo = resolve => require(['@/views/Watch/DeviceInfo'], resolve)
const List = resolve => require(['@/views/Watch/List'], resolve)

//company
const Company = resolve => require(['@/views/Doc/Company'], resolve)
const Member = resolve => require(['@/views/Doc/Maintain/Member'], resolve)
const MemberDetail = resolve => require(['@/views/Doc/Maintain/MemberDetail'], resolve)
const Group = resolve => require(['@/views/Doc/Maintain/Group'], resolve)
const GroupDetail = resolve => require(['@/views/Doc/Maintain/GroupDetail'], resolve)
const Site = resolve => require(['@/views/Doc/Maintain/Site'], resolve)
const SiteDetail = resolve => require(['@/views/Doc/Maintain/SiteDetail'], resolve)
const Contractor = resolve => require(['@/views/Doc/Contractor'], resolve)
const ContractorDetail = resolve => require(['@/views/Doc/ContractorDetail'], resolve)
const Unit = resolve => require(['@/views/Doc/Maintain/Unit'], resolve)
const UnitDetail = resolve => require(['@/views/Doc/Maintain/UnitDetail'], resolve)
const UseDep = resolve => require(['@/views/Doc/UseDep'], resolve)
const UseDepDetail = resolve => require(['@/views/Doc/UseDepDetail'], resolve)
const Property = resolve => require(['@/views/Doc/Property'], resolve)
const PropertyDetail = resolve => require(['@/views/Doc/PropertyDetail'], resolve)


//Maintain
const Fault = resolve => require(['@/views/Maintain/Fault'], resolve)
const MaintainList = resolve => require(['@/views/Maintain/MaintainList'], resolve)
const FaultRank = resolve => require(['@/views/Maintain/FaultRank'], resolve)
const Maintain = resolve => require(['@/views/Maintain/Maintain'], resolve)
const Finish = resolve => require(['@/views/Maintain/Finish'], resolve)
const Order = resolve => require(['@/views/Maintain/Order'], resolve)
//Setting
const FileIndex = resolve => require(['@/views/Event/File/BaseInfo'], resolve)
const AlList = resolve => require(['@/views/Event/File/List'], resolve)
const Alert = resolve => require(['@/views/Event/File/Alert'], resolve)
const AssessHistory = resolve => require(['@/views/Event/Assess/History'], resolve)
const AssessPrint = resolve => require(['@/views/Event/Assess/Print'], resolve)
const AssessReport = resolve => require(['@/views/Event/Assess/Report'], resolve)
const CheckIndex = resolve => require(['@/views/Event/Check/Index'], resolve)
const CheckHistory = resolve => require(['@/views/Event/Check/History'], resolve)
const CheckPrint = resolve => require(['@/views/Event/Check/Print'], resolve)
const CheckReport = resolve => require(['@/views/Event/Check/Report'], resolve)


//system
const Print = resolve => require(['@/views/System/Print'], resolve)
const UserManage = resolve => require(['@/views/System/UserManage'], resolve)
const UserManageDetail = resolve => require(['@/views/System/UserManageDetail'], resolve)
const Inform = resolve => require(['@/views/System/Inform'], resolve)
const Notice = resolve => require(['@/views/System/Notice'], resolve)
const ReadNotice = resolve => require(['@/views/System/ReadNotice'], resolve)
const ReadInform = resolve => require(['@/views/System/ReadInform'], resolve)
const WriteNotice = resolve => require(['@/views/System/WriteNotice'], resolve)
const WriteInform = resolve => require(['@/views/System/WriteInform'], resolve)
const Person = resolve => require(['@/views/System/Person'], resolve)
const Instructions = resolve => require(['@/views/System/Instructions'], resolve)
const NewPassword = resolve => require(['@/views/System/NewPassword'], resolve)

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
			meta:{name:'登录'},
      component: Login
    },{
		path: '/register',
		name: 'register',
		meta:{name:'注册'},
		component: Register
	},{
		path: '/reset',
		name: 'reset',
		meta:{name:'注册'},
		component: Reset
	},{
      path: '/',
      name: 'home',
			meta:{name:'首页'},
      component: Home,
      children: [
				{
					path: '/home',
					name: 'index',
					meta:{name:'主页'},
					component: Index
				},
				//user
				{
					path:'/user',
					name: 'user',
					meta:{name:'个人信息'},
					component: User,
				},{
					path:'/user/info',
					name: 'userInfo',
					meta:{name:'个人信息'},
					component: UserInfo
				},{
					path:'/user/followlist',
					name: 'followList',
					meta:{name:'关注列表'},
					component: MyFollowList
				},{
					path:'/user/maintainlist',
					name: 'myMaintainList',
					meta:{name:'维修列表'},
					component: MyMaintainList
				},{
					path:'/user/upkeeplist',
					name: 'upkeepList',
					meta:{name:'保养列表'},
					component: MyUpkeepList
				},{
					path:'/user/assesslist',
					name: 'assessList',
					meta:{name:'评估列表'},
					component: MyAssessList
				},
				//设备管理
        {
          path: '/watch/evolution',
          name: 'evolution',
					meta:{name:'版本更新'},
          component: Evolution
        },{
          path: '/watch/map',
          name: 'map',
					meta:{name:'地图'},
          component: Map
        },{
          path: '/watch/list',
          name: 'list',
					meta:{name:'列表'},
          component: List
        },{
          path: '/watch/device/:IMEI',
          name: 'deviceInfo',
					meta:{name:'设备'},
          component: DeviceInfo
        },{
			path: '/watch/device/doorhistory/:id',
			name: 'doorhistory',
			meta:{name:'控制器事件'},
			component: DoorHistory
		},{
			path: '/watch/device/ctrlhistory/:id',
			name: 'ctrlhistory',
			meta:{name:'控制柜事件'},
			component: CtrlHistory
		},{
			path: '/watch/device/doormonitor/:IMEI/:duration/:threshold/:interval',
			name: 'doormonitor',
			meta:{name:'控制器监控'},
			component: DoorMonitor,
		},{
			path: '/watch/device/ctrlmonitor/:IMEI/:duration/:threshold/:interval/:id',
			name: 'ctrlmonitor',
			meta:{name:'状态监控'},
			component: CtrlMonitor
		},{
			path: '/watch/device/ctrlparameter/:IMEI/:id/:device_name',
			name: 'ctrlparameter',
			meta:{name:'参数信息'},
			component: CtrlParameter,
		},{
			path: '/watch/device/doorparameter/:IMEI/:id/:device_name',
			name: 'doorparameter',
			meta:{name:'参数信息'},
			component: DoorParameter
		},
		//维保管理
		{
			path: '/maintain/maintainlist',
			name: 'maintainList',
			meta:{name:'维保信息'},
			component: MaintainList
		},{
			path: '/maintain/maintain',
			name: 'maintain',
			meta:{name:'事件列表'},
			component: Maintain,
		},{
			path: '/maintain/order/:id',
			name: 'order',
			meta:{name:'接单'},
			component: Order
		},{
			path: '/maintain/finish/:id',
			name: 'finish',
			meta:{name:'完成工单'},
			component: Finish
		},
		//单位管理
			//维保单位
		{
			path: '/doc/maintain/member',
			name: 'maintainMember',
			meta:{name:'维保人员'},
			component: Member
		},{
			path: '/doc/maintain/member/new',
			name: 'maintainMemberNew',
			meta:{name:'添加维保人员'},
			component: MemberDetail
		},{
			path: '/doc/maintain/group',
			name: 'maintainGroup',
			meta:{name:'维保群组管理'},
			component: Group
		},{
			path: '/doc/maintain/group/new',
			name: 'maintainGroupNew',
			meta:{name:'添加维保群组'},
			component: GroupDetail
		},{
			path: '/doc/maintain/site',
			name: 'maintainSite',
			meta:{name:'维保站点管理'},
			component: Site
		},{
			path: '/doc/maintain/site/new',
			name: 'maintainSiteNew',
			meta:{name:'添加维保站点'},
			component: SiteDetail
		},{
			path: '/doc/maintain/site/edit/:id',
			name: 'editSite',
			meta:{name:'编辑维保站点'},
			component: SiteDetail
		},{
			path: '/doc/company',
			name: 'maintainCompany',
			meta:{name:'维保管理'},
			component: Company
		},{
			path: '/doc/maintain/unit',
			name: 'maintainUnit',
			meta:{name:'维保单位管理'},
			component: Unit
		},{
			path: '/doc/maintai/unit/new',
			name: 'maintainUnitNew',
			meta:{name:'添加维保单位'},
			component: UnitDetail
		},{
			path: '/doc/unit/edit/:id',
			name: 'editUnit',
			meta:{name:'编辑维保单位'},
			component: UnitDetail
		},
		//安装单位
		{
			path: '/doc/contractor',
			name: 'contractor',
			meta:{name:'安装单位管理'},
			component: Contractor
		},{
			path: '/doc/contractor/new',
			name: 'maintainContractorNew',
			meta:{name:'添加安装单位'},
			component: ContractorDetail
		},{
			path: '/doc/contractor/edit/:id',
			name: 'editContractor',
			meta:{name:'编辑安装单位'},
			component: ContractorDetail
		},
		//使用单位
		{
			path: '/doc/usedep',
			name: 'usedep',
			meta:{name:'使用单位管理'},
			component: UseDep
		},{
			path: '/doc/usedep/new',
			name: 'maintainUseDepNew',
			meta:{name:'添加使用单位'},
			component: UseDepDetail
		},{
			path: '/doc/usedep/edit/:id',
			name: 'editUseDep',
			meta:{name:'编辑使用单位'},
			component: UseDepDetail
		},
		//物业单位
		{
			path: '/doc/property',
			name: 'property',
			meta:{name:'物业单位管理'},
			component: Property
		},{
			path: '/doc/property/new',
			name: 'maintainPropertyNew',
			meta:{name:'添加物业单位'},
			component: PropertyDetail
		},{
			path: '/doc/property/edit/:id',
			name: 'editProperty',
			meta:{name:'编辑物业单位'},
			component: PropertyDetail
		},		
		//信息管理	
		{
			path: '/evnet/list',
			name: 'alList',
			meta:{name:'电梯列表/全部'},
			component: AlList
		},
		{
			path: '/evnet/alert/:IMEI',
			name: 'alert',
			meta:{name:'确认事件'},
			component: Alert
		},
		{
			path: '/evnet/file/:IMEI',
			name: 'elevatorFiles',
			meta:{name:'电梯档案'},
			component: FileIndex
		},{
			path: '/evnet/assess/history',
			name: 'assessHistory',
			meta:{name:'历史记录'},
			component: AssessHistory
		},{
			path: '/evnet/assess/print',
			name: 'assessPrint',
			meta:{name:'打印工单'},
			component: AssessPrint
		},{
			path: '/evnet/assess/report',
			name: 'assessReport',
			meta:{name:'评估报告'},
			component: AssessReport
		},{
			path: '/evnet/check',
			name: 'checkIndex',
			meta:{name:'检验记录'},
			component: CheckIndex
		},{
			path: '/evnet/check/history',
			name: 'checkHistory',
			meta:{name:'历史记录'},
			component: CheckHistory
		},{
			path: '/evnet/check/print',
			name: 'checkPrint',
			meta:{name:'打印工单'},
			component: CheckPrint
		},{
			path: '/evnet/check/report',
			name: 'checkReport',
			meta:{name:'评估报告'},
			component: CheckReport
		},
		//系统管理
		{
			path: '/system/usermanage',
			name: 'userManage',
			meta:{name:'用户管理'},
			component: UserManage,
		},{
			path: '/system/usermanagedetail',
			name: 'usermanageDetail',
			meta:{name:'编辑用户'},
			component: UserManageDetail			
		},{
			path: '/system/newpassword',
			name: 'newpassword',
			meta:{name:'更改密码'},
			component: NewPassword
		},{
			path: '/system/inform',
			name: 'inform',
			meta:{name:'通知记录'},
			component: Inform
		},{
			path: '/system/notice',
			name: 'notice',
			meta:{name:'公告记录'},
			component: Notice
		},{
			path: '/system/readnotice',
			name: 'readNotice',
			meta:{name:'查看公告'},
			component: ReadNotice
		},{
			path: '/system/readinform',
			name: 'readInform',
			meta:{name:'查看消息'},
			component: ReadInform
		},{
			path: '/system/writeinform',
			name: 'writeInform',
			meta:{name:'发送消息'},
			component: WriteInform
		},{
			path: '/system/writenotice',
			name: 'writeNotice',
			meta:{name:'发布公告'},
			component: WriteNotice
		},{
			path: '/system/print',
			name: 'print',
			meta:{name:'打印'},
			component: Print,
		},{
			path: '/system/person',
			name: 'person',
			meta:{name:'个人信息'},
			component: Person,
		},{
			path: '/system/instructions',
			name: 'instructions',
			meta:{name:'说明文档'},
			component: Instructions,
		},],
    },
		{ path: '*', redirect: '/' }
  ]
})
