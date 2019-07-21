<template>
	<div>
		<iframe :src="src" id='iframebox' ref='pdfiframe' frameborder="0" scrolling="yes" style="position:absolute;"></iframe>
		<div style="width:25px;height:25px;position:absolute;margin-left:100px">
			<icon name="sign0" width="24" height="24" slot="prepend"></icon>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				src:'',
			}
		},
		mounted () {
			this.getPdfInfo()
			this.changeIframeBox()
		},
		methods: {
			changeIframeBox () {
				const iframebox = document.getElementById('iframebox')
				const deviceWidth = document.documentElement.clientWidth
				const deviceHeight = document.documentElement.clientHeight
				iframebox.style.width = '100%'
				iframebox.style.height = (Number(deviceHeight)/1.13) + 'px'
			},
			getPdfInfo () {
				// let name = this.pdf
				let src = '../../../static/Instructions.pdf'
				// this.src = src
				this.src = 'http://server.asynciot.com/getfile?filePath=portrait/Instructions.pdf'
			}
		}
	}
</script>

<style>

</style>
