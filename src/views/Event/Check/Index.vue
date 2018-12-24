<template lang="jade">
div.layout-content-main
	site(:is="currentTab" keep-alive)
</template>

<script>
	import checkReport from './Report'
	import checkPrint from './Print'
	import checkHistory from './History'
export default {
	data() {
		return {
			currentTab: 'checkHistory'
		};	
	},
	components: { 
		checkPrint,
		checkReport,
		checkHistory,
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
