<template lang="jade">
	div.layout-content-main()
		div.box
			div.box-header.with-border
				p.box-title 角色对应菜单信息
			form.form-horizontal
				div.box-body
					Row(:gutter="10")
						Col(span="8")
							Card
								div.form-group
									Card()
										p(slot="title")|角色名称
										div.col-sm-8.col-md-6
											Input(type='text', placeholder='请输入角色名称',v-model="name")
								div.form-group
									Card()
										p(slot="title")|可执行功能
										div()
											Checkbox()|读取
											Checkbox()|写入
						Col(span="8")
							Card
								p(slot="title")|菜单名称
								Row()
									Tree(:data="menu" show-checkbox)
						Col(span="8")
							Card()
								p(slot="title")|当前已有角色
								div()
									Button.lp(type="error")|超级管理员
									Button.lp(type="primary")|普通用户
									Button.lp(type="success")|游客
				div.box-footer
					Col(span="2")
						Button(@click='submit()', type='success')|完成
					Col(span="2")
						Button(@click='submit()', type='error')|删除
					Col(span="2")
						Button(@click='submit()', type='cancel')|取消
</template>

<script>
	import {menu} from '@/views/menu.js'

	let nodes = []
	let asd = []
	let child = []
	menu.forEach(item => {
		nodes.push({
			id: item.id,
			pId: item.pId,
			title: item.label
		})
		if(item.sub){
			item.sub.forEach(sub => {
				child.push({
					id: sub.id,
					pId: sub.pId,
					title: sub.label
				})
			})
		}
	})
	export default {
		data () {
			return {
				menu:[],
				name:'超级管理员'
			}
		},
		created() {
			this.data()
		},
		methods: {
			data(){
				nodes.forEach((item,index)=>{
					let menus = []
					menus.title = item.title
					menus.checked = true
					menus.expend = true
					menus.pId = item.pId
					menus.id = item.id
					menus.children = []
					child.forEach(res=>{
						if(res.pId==item.id){
							menus.children.push({
								id:res.id,
								pId:res.pId,
								title:res.title,
								checked: true,
							})
						}
					})
					this.menu.push(menus)
				})
			}
		}
	}
</script>

<style lang="css">
	.content{
		overflow: auto;
	}
	.lp{
		margin-right: 5px;
	}
</style>
