<template lang="jade">
div.layout-content-main
	site(:is="currentTab" keep-alive)		
</template>

<script>
	import baseInfo from './BaseInfo'
	import companyInfo from './CompanyInfo'
	import remark from './Remark'
export default {
	data() {
		return {
			currentTab: 'baseInfo'
		};	
	},
	components: { 
		baseInfo,
		companyInfo,
		remark,
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
