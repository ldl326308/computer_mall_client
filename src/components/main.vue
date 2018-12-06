<template>
	<div>
		<!-- 搜索框 -->
		<Row style="margin-top:25px;margin-bottom:25px;">
			<Col span="8">
			&emsp;
			</Col>
			<Col span="8">
			<Input search enter-button placeholder="搜索" />
			</Col>
			<Col span="8">
			</Col>
		</Row>


		<!--导航栏-->
		<!-- <Row style="margin:10px;font-size:22px;font-family: 'microsoft yahei';color:black;">
			<Col span="24">
			<Breadcrumb>
				<BreadcrumbItem>全部结果 > :</BreadcrumbItem>
				<span>{{nva.brand}}</span>
			</Breadcrumb>
			</Col>
		</Row> -->

		<!-- 品牌展示 -->
		<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
			<span @dblclick="clearBrand">
				<Col span="2" title="双击清空品牌的选中" style="line-height:40px;background-color:WhiteSmoke;height:110px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;品牌:</Col>

			</span>
			<Col span="20">
			<CheckboxGroup v-model="based.brand">
				<Checkbox  v-for="n in brands" :label="n.brandName" :key="n.brandId">
					<img style="width:102px;height:36px;" :src="url + n.brandImage" />
				</Checkbox>
			</CheckboxGroup>
			</Col>
			<Col span="2">
			</Col>
		</Row>

		<!-- 类型展示 -->
		<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
			<span @dblclick=" clearType">
				<Col title="双击清空已选中信息" span="2" style="background-color:WhiteSmoke;line-height:40px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;电脑整机:</Col>
			</span>
			<Col span="20" style="line-height:40px;"> &emsp;
			<RadioGroup v-model="based.type">
				<Radio :label="0" key='0'>
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
			<Select v-model="based.processor" filterable style="margin-left: 5px;" placeholder="请选择处理器">
				<Option :value="0" key='0'>处理器</Option>
				<Option v-for="item in processors" :value="item.processorId" :key="item.processorId">{{ item.processorName }}</Option>
			</Select>
			</Col>

			<!-- 电脑内存容量 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select v-model="based.memoryCapacity" filterable style="margin-left: 5px;" placeholder="请选择内存容量">
				<Option :value="0" key='0'>内存容量</Option>
				<Option v-for="item in memory_capacity" :value="item.memoryCapacityId" :key="item.memoryCapacityId">{{ item.memoryCapacityName }}</Option>
			</Select>
			</Col>

			<!-- 电脑硬盘容量 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select v-model="based.hardDisk" filterable style="margin-left: 5px;" placeholder="请选择硬盘容量">
				<Option :value="0" key='0'>硬盘容量</Option>
				<Option v-for="item in hard_disk" :value="item.hardDiskId" :key="item.hardDiskId">{{ item.hardDiskName }}</Option>
			</Select>
			</Col>

			<!-- 电脑系统 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select v-model="based.computerSystem" filterable style="margin-left: 5px;" placeholder="请选择电脑系统">
				<Option :value="0" key='0'>电脑系统</Option>
				<Option v-for="item in computer_system" :value="item.computerSystemId" :key="item.computerSystemId">{{ item.computerSystemName }}</Option>
			</Select>
			</Col>


			<!-- 电脑尺寸 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select v-model="based.dimension" filterable style="margin-left: 5px;" placeholder="请选择电脑尺寸">
				<Option :value="0" key='0'>屏幕尺寸</Option>
				<Option v-for="item in dimensions" :value="item.dimensionId" :key="item.dimensionId">{{ item.dimensionName }}</Option>
			</Select>
			</Col>

			<!-- 电脑显卡 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select v-model="based.nvdia" filterable style="margin-left: 5px;" placeholder="请选择电脑显卡">
				<Option :value="0" key='0'>电脑显卡</Option>
				<Option v-for="item in nvdias" :value="item.nvdiaId" :key="item.nvdiaId">{{ item.nvdiaName }}</Option>
			</Select>
			</Col>

		</Row>

		<!-- 商品显示 -->
		<Row style="margin-bottom: 3px;">
			<Col span="4">
			&emsp;
			</Col>
			<Col span="20">
			<Card v-for="item in computers" :key='item.computerId' style="width:255px;height:480px;float:left;margin:8px;">
				<div style="text-align:center">
					<img style='width:230px;height:280px;background-size: 100% 100%;' :src="url + item.computerImageList[0].computerImageUrl">
					<p style='color:red;text-align: left;font-size: 24px;'>
						<span style='font-size:20px;'>￥</span>{{item.computerPrice}}.00
					</p>
					<p style="text-align: left;">
						{{item.computerDescribe}}
					</p>

					<p style='position: absolute;top:440px;left: 155px;'>
						<ButtonGroup>
							<Button title="商品详情">
								<Icon type="ios-apps" />
							</Button>
							<Button title="加入购物车">
								<Icon type="ios-cart" />
							</Button>
						</ButtonGroup>
					</p>
				</div>
			</Card>
			</Col>
		</Row>

		<Row>
			<Col span="8">&emsp;</Col>
			<Col>
			<Page :total="page.total" show-total :page-size='page.size' @on-change='pageSelect($event)' />
			</Col>
		</Row>

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
				computer_system: [], //电脑系统
				dimensions: [], //电脑尺寸
				nvdias: [], //电脑显卡
				computers: [], //所有电脑数据				
				url: "http://localhost:8888",
				based: {
					brand: [], //品牌
					type: 0, //整机
					processor: 0, //处理器
					memoryCapacity: 0, //内存容量
					hardDisk: 0, //硬盘容量
					computerSystem: 0, //系统
					dimension: 0, //尺寸
					nvdia: 0 //显卡
				},
				page: {
					total: 1,
					size: 16,
					page: 1
				}

			};
		},
		methods: {
			clearOther() { //清空其它里选中的
				this.based.processor = 0;
				this.based.memoryCapacity = 0;
				this.based.hardDisk = 0;
				this.based.computerSystem = 0;
				this.based.dimension = 0;
				this.based.nvdia = 0;
			},
			clearType() { //清空整机类型
				this.based.type = 0;
			},
			clearBrand() { //清空已选中的品牌
				this.based.brand = 0;
			},
			pageSelect(event) { //分页事件
				const own = this;
				own.page.page = event;
				this.getData(own.page.page, own.page.size);
			},
			getData(page, size) { //电脑商品数据请求
				const own = this;

				axios.get(own.url + '/computer', {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						},
						params: {
							page: page,
							count: size
						}
					})
					.then(function(respon) {
						own.computers = respon.data.data;
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		},
		watch: { //计算查询变化属性
			based: function() {
				console.log(this.based);
			}
		},
		created() {
			var own = this; //保存当前对象
			this.getData(own.page.page, own.page.size); //请求商品数据

			//品牌数据请求
			axios.get(own.url + '/brand', {
					params: {}
				}).then(function(respon) {
					own.brands = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//类型数据请求
			axios.get(own.url + '/type', {
					params: {}
				}).then(function(respon) {
					own.types = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//处理器数据请求
			axios.get(own.url + '/processor', {
					params: {}
				}).then(function(respon) {
					own.processors = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//内存容量数据请求
			axios.get(own.url + '/memoryCapacity', {
					params: {}
				}).then(function(respon) {
					own.memory_capacity = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})


			//硬盘容量数据请求
			axios.get(own.url + '/hardDisk', {
					params: {}
				}).then(function(respon) {
					own.hard_disk = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})


			//电脑系统数据请求
			axios.get(own.url + '/computerSystem', {
					params: {}
				}).then(function(respon) {
					own.computer_system = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})


			//电脑尺寸数据请求
			axios.get(own.url + '/dimension', {
					params: {}
				}).then(function(respon) {
					own.dimensions = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})


			//电脑显卡数据请求
			axios.get(own.url + '/nvdia', {
					params: {}
				}).then(function(respon) {
					own.nvdias = respon.data.data;
				})
				.catch(function(error) {
					console.log(error);
				})

			//商品数量
			axios.get(own.url + '/computer/count', {
					params: {}
				}).then(function(respon) {
					if (respon.data.code === 1224) {
						own.page.total = respon.data.data;
					}
				})
				.catch(function(error) {
					console.log(error);
				})


		}
	}
</script>

<style>

</style>
