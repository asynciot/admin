<template lang="jade">
	div.layout-content-main
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
											Input(type='text', placeholder='请输入角色名称',)
								div.form-group
									Card
										p(slot="title")|菜单名称
										Row()
											Tree(:data="menu" show-checkbox)
						Col(span="16")
							Card()
								p(slot="title")|当前已有角色
								div()
									Button.lp(type="error" @click="goRole()")|超级管理员
									Button.lp(type="primary")|普通用户
									Button.lp(type="success")|游客
				div.box-footer
					div.col-sm-offset-2
						button.btn.btn-success(@click='submit()', type='button')|添加
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
							})
						}
					})
					this.menu.push(menus)
				})
			},
			goRole(){
				this.$router.push({
					name: 'editrole',
				})
			},
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
	.layout-content-main{
		overflow-y: scroll !important;
	}
</style>
