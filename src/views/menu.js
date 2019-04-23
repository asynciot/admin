export const menu = [
// 	{
// 		id: 1,
// 		pId: 0,
// 		label: '系统首页',
// 	}, 
	{
		id: 2,
		pId: 0,
		label: 'Dashboard',
		value: 'dashboard',
	},{
		id: 3,
		pId: 0,
		label: '运行监控',
		value: 'menu',
		sub: [
			{
				id: 31,
				pId: 3,
				label: '运行状态',
				value: 'map',
			}, {
				id: 32,
				pId: 3,
				label: '电梯状态',
				value: 'laddermap',
			}, 
// 			{
// 				id: 33,
// 				pId: 3,
// 				label: '更新状态',
// 			},
			]
	}, {
		id: 4,
		pId: 0,
		label: '工作流',
		value: 'maintain',
		sub: [
			{
				id: 41,
				pId: 4,
				label: '审核列表',
				value: 'auditinglist',
			}, {
				id: 42,
				pId: 4,
				label: '工单列表',
				value: 'maintain',
			},
			{
				id: 43,
				pId: 4,
				label: '维保信息',
				value: 'maintainList',
			}],
	}, {
		id: 5,
		pId: 0,
		label: '基础信息维护',
		value: 'event',
		sub: [
			{
				id: 51,
				pId: 5,
				label: '设备信息',
				value: 'alList',
			},{
				id: 52,
				pId: 5,
				label: '固件更新',
				value: 'evolution',
			},{
				id: 53,
				pId: 5,
				label: '电梯信息',
				value: 'ladder',
			}],
	}, {
		id: 6,
		pId: 0,
		label: '系统管理',
		value: 'system',
		sub: [
			{
				id: 61,
				pId: 6,
				label: '用户管理',
				value: 'userManage',
			}, {
				id: 62,
				pId: 6,
				label: '通知记录',
				value: 'inform',
			}, {
				id: 63,
				pId: 6,
				label: '说明文档',
				value: 'instructions',
			}, {
				id: 64,
				pId: 6,
				label: '权限管理',
				value: 'authority',
			}]
	}, {
		id: 7,
		pId: 0,
		label: '出厂设置',
		value: 'setting',
		sub: [
			{
				id: 71,
				pId: 7,
				label: '打印二维码',
				value: 'print',
			}]
	}, 
];
