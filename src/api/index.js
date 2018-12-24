import { stringify } from 'qs';
import {
	root,
	AccountApi,
	DeviceApi,
	RootApi,
	CommonApi,
	OtherApi,
} from './config'
export default {
	ws: (data) => `${root.replace('http', 'ws')}/v1/devices/socket?${stringify(data)}`,
	debug: (data) => `${root.replace('http', 'ws')}/v1/devices/socketDebug?${stringify(data)}`,
  
	
	logoutdevices: (data) => {
		return RootApi.save({key1:'Command',key2:'Logout'}, data)
	},
	
	//other
	message:(data) => {
		return CommonApi.query(Object.assign({key1:'message'}, data))
	},
	sentmessage:(data) => {
		return CommonApi.save({key1:'message'}, data)
	},
	readmessage:(data) => {
		return CommonApi.save({key1:'message',key1:'settle'}, data)
	},
	messagecount:(data) => {
		return CommonApi.query(Object.assign({key1:'message',key2:'count'}, data))
	},
	sentMessage:(data) => {
		return CommonApi.save({key1:'sms',key2:data}, data)
	},
	getcode:(data) => {
		return CommonApi.query(Object.assign({key1:'wechat',key2:'getqrcode'}, data))
	},
	//account
  register:(data)=>{
  	return AccountApi.save({key1:'register'},data)
  },
  retrieve:(data)=>{
	return AccountApi.save({key1:'retrieve'},data)
  },
	update:(data)=>{
    return AccountApi.update(data)
  },
	user:(data)=>{
		return AccountApi.query(Object.assign(data))
	},
  login:(data)=>{
    return AccountApi.save({key1:'login'},data)
  },
	logout:(data)=>{
    return AccountApi.save({key1:'logout'},data)
  },
	password:(data)=>{
		return AccountApi.save({key1:'password'},data)
	},
	people:(data) => {
		return AccountApi.query(Object.assign({}, data))
	},
	addpeople:(data) => {
		return AccountApi.save({}, data)
	},
	updatepeople:(data) => {
		return AccountApi.update({}, data)
	},
	removePeople:(data) => {
		return AccountApi.remove(Object.assign({key1:'delete'}, data))
	},
	
	//machine
	devices: (data) => {
		return DeviceApi.query(Object.assign({key1:'Device',key2:'ReadMore'}, data))
	},
	devicecount: (data) => {
		return DeviceApi.query(Object.assign({key1:'Device',key2:'ReadCount'}, data))
	},
	setdevices: (data) => {
		return DeviceApi.update({key1:'Device'}, data)
	},	
 	deldevices: (data) => {
		return DeviceApi.remove(Object.assign({key1:'Device'}, data))
	},
 	regdevices: (data) => {
		return DeviceApi.save({key1:'Register'}, data)
	},
	event: (data) => {
		return DeviceApi.query(Object.assign({key1:'Event'}, data))
	},
	delevent: (data) => {
		return DeviceApi.remove(Object.assign({key1:'Event'}, data))
	},
	upload: (data) => {
		return DeviceApi.save({key1:'Upload'}, data)
	},
	updat: (data) => {
		return DeviceApi.save({key1:'Update'}, data)
	},
	monitor: (data) => {
		return DeviceApi.save({key1:'Monitor'}, data)
	},
	gettype:(data) => {
		return DeviceApi.query(Object.assign({key1:'Binary'}, data))
	},
	follow:(data)=> {
		return DeviceApi.query(Object.assign({key1:'follow'}, data))
	},
	addfollow:(data)=> {
		return DeviceApi.save({key1:'follow'}, data)
	},
	delfollow:(data)=> {
		return DeviceApi.remove(Object.assign({key1:'follow'}, data))
	},
	fault:(data)=> {
		return DeviceApi.query(Object.assign({key1:'Fault'}, data))
	},
	order:(data)=> {
		return DeviceApi.save({key1:'Fault',key2:'order'}, data)
	},
	repair:(data)=> {
		return DeviceApi.query(Object.assign({key1:'Repair'}, data))
	},
	finish:(data)=> {
		return DeviceApi.save({key1:'Repair',key2:'finish'}, data)
	},
	runtime:(data)=> {
		return DeviceApi.query(Object.assign({key1:'Runtime'}, data))
	}
}