export const menu = [
// 	{
// 		id: 1,
// 		pId: 0,
// 		label: '系统首页',
// 	}, 
	{
		id: 0,
		pId: 0,
		label: 'Dashboard',
		value: 'dashboard',
		val:0,
	},{
		id: 1,
		pId: 0,
		label: "Operation Monitor",
		value: 'menu',
		val:1,
		sub: [
			{
				id: 11,
				pId: 1,
				label: 'Operation State',
				value: 'map',
				val:2,
			}, {
				id: 12,
				pId: 1,
				label: 'Ladder State',
				value: 'laddermap',
				val:3,
			}, 
			{
				id: 13,
				pId: 1,
				label: 'Offline Situation',
				val:4,
			},
			]
	}, {
		id: 2,
		pId: 0,
		label: 'Work Flow',
		value: 'maintain',
		val:4,
		sub: [
			{
				id: 21,
				pId: 2,
				label: 'Examine List',
				value: 'auditinglist',
				val:5,
			}, {
				id: 22,
				pId: 2,
				label: 'Order List',
				value: 'maintain',
				val:6,
			},
			{
				id: 23,
				pId: 2,
				label: 'Dispatch List',
				value: 'maintainlist',
				val:7,
			}],
	}, {
		id: 3,
		pId: 0,
		label: 'Basic Information',
		value: 'event',
		val:8,
		sub: [
			{
				id: 31,
				pId: 3,
				label: 'Devices Information',
				value: 'allist',
				val:9,
			},{
				id: 32,
				pId: 3,
				label: 'Firmware Update',
				value: 'evolution',
				val:10,
			},{
				id: 33,
				pId: 3,
				label: 'Elevator Information',
				value: 'ladder',
				val:11,
			}],
	}, {
		id: 4,
		pId: 0,
		label: 'Group',
		value: 'group',
		val:12,
		sub: [
			{
				id: 41,
				pId: 4,
				label: 'Elevator Group',
				value: 'eleGroup',
				val:13,
			},{
				id: 42,
				pId: 4,
				label: 'Member Group',
				value: 'organize',
				val:14,
			}],
	},{
		id: 5,
		pId: 0,
		label: 'System',
		value: 'sys',
		val:15,
		sub: [
			{
				id: 51,
				pId: 5,
				label: 'User Management',
				value: 'user_manage',
				val:16,
			}, {
				id: 52,
				pId: 5,
				label: 'Notification Record',
				value: 'inform',
				val:17,
			}, {
				id: 53,
				pId: 5,
				label: 'Instructions',
				value: 'instructions',
				checked: true,
				val:18,
			}, {
				id: 54,
				pId: 5,
				label: 'Permission Assignment',
				value: 'authority',
				val:19,
			}]
	}, {
		id: 6,
		pId: 0,
		label: 'Default Setting',
		value: 'setting',
		val:20,
		sub: [
			{
				id: 61,
				pId: 6,
				label: 'Print QR Code',
				value: 'print',
				val:21,
			}]
	}, 
];
