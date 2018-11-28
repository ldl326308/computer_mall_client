<template>
	<div class="layout">
		<Layout>
			<Header :style="{position: 'fixed', width: '100%'}">
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo"></div>
					<div class="layout-nav">
						<MenuItem name="1">
						<Icon type="ios-navigate"></Icon>
						Item 1
						</MenuItem>
						<MenuItem name="2">
						<Icon type="ios-keypad"></Icon>
						Item 2
						</MenuItem>
						<MenuItem name="3">
						<Icon type="ios-analytics"></Icon>
						Item 3
						</MenuItem>
						<MenuItem name="4">
						<Icon type="ios-paper"></Icon>
						Item 4
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
				<!--导航栏-->
				<Row style="margin:10px;font-size:22px;font-family: 'microsoft yahei';">
					<Col span="24">
					<Breadcrumb>
						<BreadcrumbItem to="/">全部结果 > :</BreadcrumbItem>
						<BreadcrumbItem to="/">戴尔</BreadcrumbItem>
						<BreadcrumbItem>笔记本</BreadcrumbItem>
					</Breadcrumb>
					</Col>
				</Row>

				<!-- 品牌展示 -->
				<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
					<Col span="2" style="line-height:40px;background-color:WhiteSmoke;height:110px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;品牌:</Col>
					<Col span="20">
					<Button style="" v-for="n in brands" type="default" ghost :key="n.brandId" :id="n.brandId">
						<img style="width:102px;height:36px;" :src="url + n.brandImage" />
					</Button>
					</Col>
					<Col span="2">
					</Col>
				</Row>

				<!-- 类型展示 -->
				<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
					<Col span="2" style="background-color:WhiteSmoke;line-height:40px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;电脑整机:</Col>
					<Col span="20" style="line-height:40px;"> &emsp;
					<RadioGroup v-model="thisType">
						<Radio label="0">
							<span>全部</span>
						</Radio>
						<Radio :label="n.typeId" v-for="n in types" :key="n.typeId">
							<span>{{n.typeName}}</span>
						</Radio>
					</RadioGroup>
					</Col>
					<Col span="2">
					</Col>
				</Row>

				<!-- 电脑处理器 -->
				<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
					<Col span="2" style="background-color:WhiteSmoke;line-height:40px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;其它选项:</Col>

					<!-- 处理器 -->
					<Col span="3" style="line-height: 40px;">
					<Select v-model="thisProcessor" filterable style="margin-left: 5px;" placeholder="请选择处理器">
						<Option v-for="item in processors" :value="item.processorId" :key="item.processorId">{{ item.processorName }}</Option>
					</Select>
					</Col>

					<!-- 电脑内存容量 -->
					<Col span="3" style="line-height: 40px;margin-left:10px;">
					<Select v-model="thisMemoryCapacity" filterable style="margin-left: 5px;" placeholder="请选择内存容量">
						<Option v-for="item in memory_capacity" :value="item.memoryCapacityId" :key="item.memoryCapacityId">{{ item.memoryCapacityName }}</Option>
					</Select>
					</Col>

					<!-- 电脑硬盘容量 -->
					<Col span="3" style="line-height: 40px;margin-left:10px;">
					<Select v-model="thisHardDisk" filterable style="margin-left: 5px;" placeholder="请选择硬盘容量">
						<Option v-for="item in hard_disk" :value="item.hardDiskId" :key="item.hardDiskId">{{ item.hardDiskName }}</Option>
					</Select>
					</Col>

					<!-- 电脑系统 -->
					<Col span="3" style="line-height: 40px;margin-left:10px;">
					<Select v-model="thisComputerSystem" filterable style="margin-left: 5px;" placeholder="请选择电脑系统">
						<Option v-for="item in computer_system" :value="item.computerSystemId" :key="item.computerSystemId">{{ item.computerSystemName }}</Option>
					</Select>
					</Col>
					
					
					<!-- 电脑尺寸 -->
					<Col span="3" style="line-height: 40px;margin-left:10px;">
					<Select v-model="thisDimension" filterable style="margin-left: 5px;" placeholder="请选择电脑尺寸">
						<Option v-for="item in dimensions" :value="item.dimensionId" :key="item.dimensionId">{{ item.dimensionName }}</Option>
					</Select>
					</Col>

					<!-- 电脑显卡 -->
					<Col span="3" style="line-height: 40px;margin-left:10px;">
					<Select v-model="thisNvdia" filterable style="margin-left: 5px;" placeholder="请选择电脑显卡">
						<Option v-for="item in nvdias" :value="item.nvdiaId" :key="item.nvdiaId">{{ item.nvdiaName }}</Option>
					</Select>
					</Col>

				</Row>

			</Content>
			<Footer class="layout-footer-center">2018-10-28 &copy; lover-lc</Footer>
		</Layout>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				brands: [], //品牌数据
				types: [], //类型数据
				processors: [], //处理器数据
				memory_capacity: [], //内存容量
				hard_disk: [], //硬盘容量
				computer_system:[], //电脑系统
				dimensions:[], //电脑尺寸
				nvdias:[],  //电脑显卡
				thisType: '0', //当前选中类型
				thisProcessor: '0', //当前选中处理器
				thisMemoryCapacity: '0', //当前选中的电脑内存容量
				thisHardDisk:'0',//当前选中的电脑硬盘容量
				thisComputerSystem:'0', //当前选中的电脑系统
				thisDimension:'0', //当前选中的电脑尺寸
				thisNvdia:'0', //当前选中的显卡
				url: "http://localhost:8888"
			};
		},
		methods: {

		},
		components: {

		},
		created() {
			var own = this; //保存当前对象

			//品牌数据请求
			axios.get(own.url + '/brand', {
					params: {}
				}).then(function(respon) {
					own.brands = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//类型数据请求
			axios.get(own.url + '/type', {
					params: {}
				}).then(function(respon) {
					own.types = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//处理器数据请求
			axios.get(own.url + '/processor', {
					params: {}
				}).then(function(respon) {
					own.processors = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//内存容量数据请求
			axios.get(own.url + '/memoryCapacity', {
					params: {}
				}).then(function(respon) {
					own.memory_capacity = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})


			//硬盘容量数据请求
			axios.get(own.url + '/hardDisk', {
					params: {}
				}).then(function(respon) {
					own.hard_disk = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})
				

			//电脑系统数据请求
			axios.get(own.url + '/computerSystem', {
					params: {}
				}).then(function(respon) {
					own.computer_system = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})
				
				
			//电脑尺寸数据请求
			axios.get(own.url + '/dimension', {
					params: {}
				}).then(function(respon) {
					own.dimensions = respon.data;
				})
				.catch(function(error) {
					console.log(error);
				})
				
					
				//电脑显卡数据请求
				axios.get(own.url + '/nvdia', {
						params: {}
					}).then(function(respon) {
						own.nvdias = respon.data;
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
