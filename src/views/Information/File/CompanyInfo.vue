<template lang="jade">
div.layout-content-main
	Tabs()
		TabPane(label="基本信息",name="baseInfo")
		TabPane(label="单位信息",name="companyInfo")
		TabPane(label="附件备注",name="remark")
</template>

<script>
export default {
	data() {
		return {
		}
	}
}
</script>

<style lang="css">
</style>
