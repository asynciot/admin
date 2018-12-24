<template lang="jade">
div.layout-content-main
	Tabs()
		TabPane(:label="label1",name="附件备注")
		TabPane(:label="label3",name="基本信息")
		TabPane(:label="label4",name="单位信息")
</template>

<script>
export default {
	data() {
		return {
			label1: (h) => {
				return h('div', [
					h('span', '附件备注'),
					h('Badge', {
						props: {
						}
					})
				])
			},
			label2: (h) => {
				return h('div', [
					h('span', '出厂设置'),
					h('Badge', {
						props: {
						}
					})
				])
			},
			label3: (h) => {
				return h('div', [
					h('span', '基本信息'),
					h('Badge', {
						props: {
						}
					})
				])
			},
			label4: (h) => {
				return h('div', [
					h('span', '单位信息'),
					h('Badge', {
						props: {
						}
					})
				])
			},
		}
	}
}
</script>

<style lang="css">
</style>
