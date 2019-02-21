<template lang="jade">
div.layout-content-main
	site(:is="currentTab" keep-alive)
</template>

<script>
	import setting from './Setting'
	import print from './Print'

export default {
	data() {
		return {
			currentTab: 'print'
		};	
	},
	components: { 
		setting,
		print,

 },
 watch: {
		'currentTab':function(val){
			this.currentTab = currentTab
		}
 },
	methods: {
		toggleTab: function(TabPane) {
			this.currentTab = this.TabPane;
		}
	}
}
</script>

<style lang="css">
</style>
