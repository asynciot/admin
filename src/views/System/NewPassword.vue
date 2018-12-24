<template>
	<div style="margin-top:50px;margin-left:50px">
		<div style="font-size:30px;margin-left: 250px;margin-bottom: 20px"">修改密码</div>
		<Form ref="form" :model="form" :rules="rules" :label-width="120">
		  <Row :gutter="5">
			<Col span="10" offset="2">
				<Form-item label="用户名称" prop="nicname">
					{{$route.nicname}}
				</Form-item>
				<Form-item label="原密码" prop="oldpassword">
					<Input v-model="form.oldpassword" placeholder="请输入名称"></Input>
				</Form-item>
				<Form-item label="新密码" prop="password">
					<Input v-model="form.password" placeholder="请输入新密码"></Input>
				</Form-item>
				<Form-item label="确认密码" prop="password2">
					<Input placeholder="请再次输入新密码"></Input>
				</Form-item>
			</Col>
		  </Row>
		</Form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					id:'',
					nicname:'',
					sex:'保密',
					birthday:'',
					authority:'',
					unit:'',
					email:'',
					mobile:'',
				},
				rules: {
					oldpassword: [{
						required: true,
						type: 'string',
						message: '请正确填写原密码',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						type: 'string',
						message: '请正确填写新密码',
						trigger: 'blur'
					}],
					password2: [{
						required: true,
						type: 'string',
						message: '两次输入必须相同',
						trigger: 'blur'
					}],
				},
			};
		}
	}
</script>

<style>

</style>
