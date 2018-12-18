<template>
	<div class="layout">
		<Layout>
			<Header :style="{width: '100%'}">
				<Menu mode="horizontal" theme="dark">
					<router-link :to="{ name: 'main'}">
						<div class="layout-logo" style='font-size:16px;color:white;line-height:30px;font-family: 华文琥珀;'>
							&nbsp;LC电脑商城
						</div>
					</router-link>
					<div class="layout-nav">
						<MenuItem name="1" :title='currentUser.userNickname'>
						<span @click="judge" type="primary">
							<Icon type="logo-octocat" />
							{{showUserName}}
						</span>
						</MenuItem>

						<MenuItem name="2">
						<span @click="lookShoppingCart" type="primary">
							<Icon type="ios-cart" />
							我的购物车
						</span>
						</MenuItem>
						<MenuItem name="3">
						<span @click="lookOrder">
							<Icon type="md-paper" />
							我的订单
						</span>
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Content :style="{margin: '0px 20px 0', background: '#fff', minHeight: '500px'}">
				<!-- 主体内容 -->
				<mainHtml @notLoggedIn='tipsLogin'></mainHtml>
			</Content>

			<!-- 底部 -->
			<Footer class="layout-footer-center">2018-10-28 &copy; lover-lc</Footer>

			<!-- 右侧登入抽屉 -->
			<Drawer title="LC电脑商城" width="320" :mask-closable="false" v-model="login">
				<!-- 用户头像 -->
				<Row style='margin-bottom:20px;'>
					<Col span="10">&emsp;</Col>
					<Col span="10">
					<Avatar style='width:60px;height:60px;' :src="headPortrait" />
					</Col>
				</Row>

				<!-- 登入操作 -->
				<Row>
					<Col span="6">&emsp;
					</Col>
					<Col span="14">
					<Form inline>
						<FormItem prop="user">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="只允许输入6-12位数字或字母">
								<Input style='width:180px;line-height: 26px;' type="text" v-model="loginUser.userName" placeholder="请输入账号">
								<Icon type="ios-person-outline" slot="prepend"></Icon>
								</Input>
							</Poptip>
						</FormItem>
						<FormItem prop="password">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="只允许输入6-12位数字、字母或空格及英文句号">
								<Input style='width:180px;line-height: 26px;' type="password" v-model="loginUser.userPassword" placeholder="请输入密码">
								<Icon type="ios-lock-outline" slot="prepend"></Icon>
								</Input>
							</Poptip>
						</FormItem>
						<FormItem>
							<Button style='margin-left:20px;' type="primary" @click='loginValidator()'>登入</Button>&emsp;
							<Button @click="register = true , login = false" type="default">注册</Button>
						</FormItem>
					</Form>
					</Col>
				</Row>
			</Drawer>

			<!-- 右侧注册抽屉 -->
			<Drawer width='450' title="LC电脑商城" :mask-closable="false" v-model="register">

				<!-- 注册字段：账号、密码、昵称、头像 -->
				<p>
					<h2 style='color:green;'>用户注册</h2>
				</p>

				<!-- 用户头像 -->
				<Row style='margin-bottom:20px;margin-top:20px;'>
					<Col span="9">&emsp;</Col>
					<Col span="10">
					<Avatar style='width:60px;height:60px;' :src="headPortrait" />
					</Col>
				</Row>

				<Row>
					<Col span="2">&emsp;</Col>
					<Col span='15' style="">
					<Form :label-width="70">
						<FormItem label="昵称:">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="请输入1-10位文字、字母或数字!">
								<Input type="text" v-model="reg.userNickname"></Input>
							</Poptip>
						</FormItem>
						<FormItem label="账号:">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="请输入6-16位数字或字母！">
								<Input type="text" v-model="reg.userAccountNumber"></Input>
							</Poptip>
						</FormItem>
						<FormItem label="密码:">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="请6-16位数字、字母或空格及英文句号!">
								<Input type="password" v-model="reg.userPassword"></Input>
							</Poptip>
						</FormItem>
						<FormItem label="确认密码:">
							<Poptip trigger="hover" placement="top" title="温馨提示" content="请6-16位数字、字母或空格及英文句号!">
								<Input type="password" v-model="reg.userPassword2"></Input>
							</Poptip>
						</FormItem>
						<FormItem>
							<Button style='margin-left:25px;' type="primary" @click="handleSubmit">注册</Button>
							<Button style='margin-left:25px;' @click="register = false">取消</Button>
						</FormItem>
					</Form>
					</Col>
				</Row>
			</Drawer>

			<!-- 当前用户信息修改左侧抽屉 -->
			<Drawer title="个人信息" placement="left" width='360' :mask-closable="false" v-model="informationDisplay">

				<!-- 用户头像 -->
				<Row style='margin-bottom:20px;'>
					<Col span="5">&emsp;</Col>
					<Col span="10">
					<Avatar style='width:120px;height:120px;' :src="currentUser.userHeadPortrait" />
					</Col>
				</Row>

				<!-- 信息展示 -->
				<Row>
					<Col span="4">&emsp;</Col>
					<Col span='16'>
					<p>&emsp;&emsp;昵称：{{currentUser.userNickname}}</p><br />
					<p>&emsp;&emsp;账号：{{currentUser.userAccountNumber}}</p><br />
					<p>&emsp;&emsp;密码：{{currentUser.userPassword}}</p><br />
					<p>&emsp;&emsp;状态：{{currentUser.userState}}</p><br />
					<p>创建时间：{{currentUser.userCreateTime}}</p><br />
					</Col>
				</Row>

				<!-- 注销、信息修改 -->
				<Row style='margin-top:10px;'>
					<Col span="4">&emsp;</Col>
					<Col span="16">
					<ButtonGroup>
						<Button @click="Logout">注销登入</Button>
						<Button @click="updateCurrentUser = true ,informationDisplay = false">信息修改</Button>
					</ButtonGroup>
					</Col>
				</Row>
			</Drawer>

			<!-- 当前用户信息修改 -->
			<Drawer title="个人信息修改" placement="left" width='400' :closable="false" v-model="updateCurrentUser">

				<!-- 用户头像 -->
				<Row style='margin-top:20px;margin-left: 45px;'>
					<Col span="6">&emsp;</Col>
					<Col span="10">
					<!-- 头像展示 -->
					<Avatar style='width:120px;height:120px;margin-bottom: 15px;' :src="url + upd.userHeadPortrait" />
					<!-- 头像上传 -->
					<Upload name='file' :show-upload-list='false' :on-success="uploadSuccess" action="http://localhost:8888/upload/headerPortrait">
						&nbsp;&nbsp;<Button icon="ios-cloud-upload-outline">头像上传</Button>
					</Upload>
					</Col>
				</Row>

				<!-- 密码、昵称修改 -->
				<Row style='margin-top:10px;'>
					<Col span="2">&emsp;</Col>
					<Col span='16' style="">
					<Form :label-width="70">
						<FormItem label="账号:">
							<Input type="text" readonly="readonly" v-model="upd.userAccountNumber"></Input>
						</FormItem>
						<FormItem label="昵称:">
							<Input type="text" v-model="upd.userNickname"></Input>
						</FormItem>
						<FormItem label="密码:">
							<Input type="password" placeholder="请输入密码" v-model="upd.userPassword"></Input>
						</FormItem>
						<FormItem label="确认密码:">
							<Input type="password" placeholder="请输入密码" v-model="upd.userPassword2"></Input>
						</FormItem>
						<FormItem>
							<Button style='margin-left:15px;' type="primary" @click="updCurrentInfo">更新</Button>
							<Button style='margin-left:25px;' @click="updateCurrentUser = false">取消</Button>
						</FormItem>
					</Form>
					</Col>
				</Row>
			</Drawer>

		</Layout>
	</div>
</template>

<script>
	import mainHtml from './main.vue'

	export default {
		data() {
			return {
				upd: { //修改信息的对象
					userAccountNumber: '',
					userNickname: '',
					userPassword: '',
					userPassword2: '',
					userHeadPortrait: '/images/head_portrait/599a521472424.jpg'
				},
				showUserName: '请登入...',
				login: false, //登入抽屉
				register: false, //注册抽屉
				informationDisplay: false, //信息展示抽屉
				questionBox: false, //提问框
				updateCurrentUser: false, //个人信息修改
				loginUser: {
					userName: '',
					userPassword: ''
				},
				headPortrait: 'http://localhost:8888/images/head_portrait/599a521472424.jpg',
				url: 'http://localhost:8888',
				already_login: false, //是否登入标志
				reg: { //注册信息
					userAccountNumber: '',
					userPassword: '',
					userPassword2: '',
					userNickname: ''
				},
				currentUser: {
					userAccountNumber: '',
					userPassword: '********',
					userNickname: '',
					userState: '',
					userCreateTime: '',
					userHeadPortrait: ''
				}

			};
		},
		methods: {
			lookOrder() {
				window.open('http://localhost:8080/order/show', '_blank');
			},
			lookShoppingCart() {
				window.open('http://localhost:8080/shopping/cart', '_blank');
			},
			tipsLogin() {
				this.login = true;
			},
			uploadSuccess(res, file) { //上传图片成功事件
				if (res.code === 1224) { //上传成功
					this.successTips(res.message);
					this.upd.userHeadPortrait = res.data;
				} else { //上传失败
					this.errorTips(res.message);
				}
			},
			updCurrentInfo() {
				const own = this;
				//昵称验证
				if (/^[0-9a-zA-z\u4e00-\u9fa5]{1,10}$/.test(this.upd.userNickname) === false) {
					this.errorTips('昵称格式错误，请输入1-10位文字、字母或数字!');
					return false;
				}

				//密码验证
				if (/^[0-9a-zA-z. ]{6,16}$/.test(this.upd.userPassword) === false) {
					this.errorTips('密码格式错误!请6-16位数字、字母或空格及英文句号!');
					return false;
				} else {
					if (!(this.upd.userPassword === this.upd.userPassword2)) { //两次密码输入不一致
						this.errorTips('两次密码输入不一致!');
						return false;
					}
				}


				//数据
				let data = JSON.stringify({
					userNickname: own.upd.userNickname,
					userPassword: own.upd.userPassword,
					userHeadPortrait: own.upd.userHeadPortrait
				});

				axios.put(own.url + '/user', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1224) {
							own.successTips(response.data.message); //消息提示
							own.updateCurrentUser = false; //关闭抽屉
							own.currentUserBinding(response.data.data); //数据更新
						} else {
							own.errorTips(response.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					})

			},
			handleSubmit() { //注册用户
				const own = this;
				//昵称验证
				if (/^[0-9a-zA-z\u4e00-\u9fa5]{1,10}$/.test(this.reg.userNickname) === false) {
					this.errorTips('昵称格式错误，请输入1-10位文字、字母或数字!');
					return false;
				}

				//注册用户名验证
				if (/^[0-9a-zA-z]{6,16}$/.test(this.reg.userAccountNumber) === false) {
					this.errorTips('账号格式错误！请输入6-16位数字或字母！');
					return false;
				}

				//注册密码验证
				if (/^[0-9a-zA-z. ]{6,16}$/.test(this.reg.userPassword) === false) {
					this.errorTips('密码格式错误!请6-16位数字、字母或空格及英文句号!');
					return false;
				} else {
					if (!(this.reg.userPassword === this.reg.userPassword2)) { //两次密码输入不一致
						this.errorTips('两次密码输入不一致!');
						return false;
					}
				}

				let data = JSON.stringify({
					userAccountNumber: own.reg.userAccountNumber,
					userPassword: own.reg.userPassword,
					userNickname: own.reg.userNickname
				});

				axios.post(this.url + '/user', data, {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						//注册成功
						if (response.data.code == 1224) {
							own.successTips(response.data.message); //成功弹框
							own.showUserName = response.data.data.userNickname.substring(0, 5) + '...'; //用户名显示
							own.already_login = true; //已登入标志
							own.register = false; //关闭注册抽屉
							own.currentUserBinding(response.data.data); //绑定值到展示对象
						} else { //注册失败
							own.errorTips(response.data.message); //失败弹框
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			currentUserBinding(user) {
				//导航栏用户信息展示
				this.showUserName = user.userNickname.substring(0, 5) + '...';

				//修改信息的抽屉
				this.currentUser.userAccountNumber = user.userAccountNumber;
				this.currentUser.userNickname = user.userNickname;
				this.currentUser.userState = '正常';
				this.currentUser.userCreateTime = user.userCreateTime;
				this.currentUser.userHeadPortrait = this.url + user.userHeadPortrait;

				//修改
				this.upd.userHeadPortrait = user.userHeadPortrait;
				this.upd.userNickname = user.userNickname;
				this.upd.userAccountNumber = user.userAccountNumber;
				this.upd.userPassword = user.userPassword;
				this.upd.userPassword2 = user.userPassword;

			},
			loginValidator() { //登入验证
				const own = this;
				//用户名验证
				if (/^[0-9a-zA-z]{6,16}$/.test(this.loginUser.userName) === false) {
					this.errorTips('登入账号验证失败！请输入6-16位数字或字母！');
					return false;
				}
				//用户密码验证
				if (/^[0-9a-zA-z. ]{6,16}$/.test(this.loginUser.userPassword) === false) {
					this.errorTips('登入密码验证失败!请6-16位数字、字母或空格及英文句号!');
					return false;
				}

				let user = JSON.stringify({
					userAccountNumber: own.loginUser.userName,
					userPassword: own.loginUser.userPassword
				});

				//后台数据库验证
				axios.post(own.url + '/user/login', user, {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						//验证失败
						if (response.data.code == 1203) {
							own.errorTips(response.data.message);
						} else { //验证成功
							own.successTips(response.data.message); //弹框
							own.showUserName = response.data.data.userNickname.substring(0, 5) + '...'; //用户名显示
							own.login = false; //关闭右侧抽屉
							own.already_login = true; //已登入标志
							own.currentUserBinding(response.data.data); //绑定值到展示对象
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			errorTips(message) { //失败是消息提示
				this.$Notice.error({
					title: '温馨提示',
					desc: message
				});
			},
			successTips(message) { //成功时消息提示
				this.$Notice.success({
					title: '温馨提示',
					desc: message
				});
			},
			judge() { //注册or登入
				if (this.already_login === false) {
					//打开登入页面
					this.login = true;
				} else {
					//如果已经登入，打开信息修改页面
					this.informationDisplay = true;
				}
			},
			Logout() { //注销登入
				const own = this;
				axios.get(own.url + '/user/logout')
					.then(function(response) {
						own.successTips(response.data.message); //弹框提示
						own.informationDisplay = false; //关闭当前用户信息展示抽屉
						//清空数据
						own.userClear();
					})
					.catch(function(error) {
						console.log(error);
					})

			},
			userClear() { //用户信息清除
				//当前用户昵称清空
				this.showUserName = '请登入...';
				//登入的信息清空
				this.loginUser.userName = '';
				this.loginUser.userPassword = '';
				//注册时的信息清空
				this.reg.userAccountNumber = '';
				this.reg.userPassword = '';
				this.reg.userPassword2 = '';
				this.reg.userNickname = '';
				//当前用户信息清空
				this.currentUser.userAccountNumber = '';
				this.currentUser.userNickname = '';
				this.currentUser.userState = '';
				this.currentUser.userCreateTime = '';
				this.currentUser.userHeadPortrait = '';
				this.already_login = false;
			}
		},
		components: {
			mainHtml
		},
		created() {
			const own = this;

			//查看是否有登入用户，如果有，则显示名称
			axios.get(own.url + '/currentUser')
				.then(function(response) {
					//有用户登入记录
					if (response.data.code == 1224) {
						own.showUserName = response.data.data.userNickname.substring(0, 5) + '...';
						own.userName = response.data.data.userAccountNumber;
						own.userPassword = response.data.data.userPassword;
						own.already_login = true; //已登入标志
						own.currentUserBinding(response.data.data); //绑定值到展示对象
					}
				})
				.catch(function(error) {
					console.log(error);
				})
		}
	}
</script>

<style>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}

	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}

	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}

	.layout-footer-center {
		text-align: center;
	}
</style>
