export const menu = [
	{
		id: 1,
		pId: 0,
		label: '系统首页',
	}, {
		id: 2,
		pId: 0,
		label: 'Dashboard',
	},{
		id: 3,
		pId: 0,
		label: '运行监控',
		sub: [
			{
				id: 31,
				pId: 3,
				label: '运行状态',
			}, {
				id: 32,
				pId: 3,
				label: '告警订阅',
			}, {
				id: 33,
				pId: 3,
				label: '更新状态',
			}]
	}, {
		id: 4,
		pId: 0,
		label: '工作流',
		sub: [
			{
				id: 41,
				pId: 4,
				label: '审核列表',
			}, {
				id: 42,
				pId: 4,
				label: '工单列表',
			},
			{
				id: 43,
				pId: 4,
				label: '维保信息',
			}],
	}, {
		id: 5,
		pId: 0,
		label: '基础信息维护',
		sub: [
			{
				id: 51,
				pId: 5,
				label: '设备信息',
			}],
	}, {
		id: 6,
		pId: 0,
		label: '系统管理',
		sub: [
			{
				id: 61,
				pId: 6,
				label: '用户管理',
			}, {
				id: 62,
				pId: 6,
				label: '通知记录',
			}, {
				id: 63,
				pId: 6,
				label: '说明文档',
			}, {
				id: 64,
				pId: 6,
				label: '权限管理',
			}]
	}, {
		id: 7,
		pId: 0,
		label: '出厂设置',
		sub: [
			{
				id: 71,
				pId: 7,
				label: '打印二维码'
			}]
	}, 
];
