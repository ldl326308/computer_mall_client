<template>
	<div>
		<!-- 搜索框 -->
		<Row style="margin-top:25px;margin-bottom:25px;">
			<Col span="8">
			&emsp;
			</Col>
			<Col span="8">
			<Input search enter-button placeholder="搜索" v-model="searchValue" @on-search='searchClick' />
			</Col>
			<Col span="8">
			</Col>
		</Row>

		<!-- 品牌展示 -->
		<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
			<span @click="brandClick" title="查询所有品牌" style='cursor:pointer;'>
				<Col span="2" style="line-height:40px;background-color:WhiteSmoke;height:110px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;品牌:</Col>
			</span>
			<Col span="20" style='text-align: left;'>
			<RadioGroup id='brandMain' @on-change='dataChange' v-model="brand">
				<Radio class='span-display' v-for="n in brands" :label="n.brandId" :key="n.brandId">
					<img style="width:102px;height:36px;margin-left:10px;" :src="url + n.brandImage" />
				</Radio>
			</RadioGroup>
			</Col>
			<Col span="2">
			</Col>
		</Row>

		<!-- 类型展示 -->
		<Row style="border: 1px solid lightgray;border-right:none;margin-bottom: 3px;">
			<span @click="typeClick" style='cursor:pointer;'>
				<Col span="2" style="background-color:WhiteSmoke;line-height:40px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);">&emsp;电脑整机:</Col>
			</span>
			<Col span="20" style="line-height:40px;text-align: left;"> &emsp;
			<RadioGroup @on-change='dataChange' v-model="type">
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
			<span @click="clearOther">
				<Col title="清空当前行选中" span="2" style="background-color:WhiteSmoke;line-height:40px;border-right:1px solid lightgray;
					font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);cursor:pointer;">&emsp;其它选项:</Col>
			</span>

			<!-- 处理器 -->
			<Col span="3" style="line-height: 40px;">
			<Select @on-change='dataChange' title="处理器" v-model="processor" filterable style="margin-left: 5px;" placeholder="请选择处理器">
				<Option :value="0" key='0'>处理器</Option>
				<Option v-for="item in processors" :value="item.processorId" :key="item.processorId">{{ item.processorName }}</Option>
			</Select>
			</Col>

			<!-- 电脑内存容量 -->
			<Col span="3" style="line-height: 40px;margin-left:10px;">
			<Select @on-change='dataChange' title="内存容量" v-model="memoryCapacity" filterable style="margin-left: 5px;"
			 placeholder="请选择内存容量">
				<Option :value="0" key='0'>内存容量</Option>
				<Option v-for="item in memory_capacity" :value="item.memoryCapacityId" :key="item.memoryCapacityId">{{ item.memoryCapacityName }}</Option>
			</Select>
			</Col>

			<!-- 电脑硬盘容量 -->
			<Col title="硬盘容量" span="3" style="line-height: 40px;margin-left:10px;">
			<Select @on-change='dataChange' v-model="hardDisk" filterable style="margin-left: 5px;" placeholder="请选择硬盘容量">
				<Option :value="0" key='0'>硬盘容量</Option>
				<Option v-for="item in hard_disk" :value="item.hardDiskId" :key="item.hardDiskId">{{ item.hardDiskName }}</Option>
			</Select>
			</Col>

			<!-- 电脑系统 -->
			<Col title="系统" span="3" style="line-height: 40px;margin-left:10px;">
			<Select @on-change='dataChange' v-model="computerSystem" filterable style="margin-left: 5px;" placeholder="请选择电脑系统">
				<Option :value="0" key='0'>电脑系统</Option>
				<Option v-for="item in computer_system" :value="item.computerSystemId" :key="item.computerSystemId">{{ item.computerSystemName }}</Option>
			</Select>
			</Col>


			<!-- 电脑尺寸 -->
			<Col title="尺寸" span="3" style="line-height: 40px;margin-left:10px;">
			<Select @on-change='dataChange' v-model="dimension" filterable style="margin-left: 5px;" placeholder="请选择电脑尺寸">
				<Option :value="0" key='0'>屏幕尺寸</Option>
				<Option v-for="item in dimensions" :value="item.dimensionId" :key="item.dimensionId">{{ item.dimensionName }}</Option>
			</Select>
			</Col>

			<!-- 电脑显卡 -->
			<Col title="显卡" span="3" style="line-height: 40px;margin-left:10px;">
			<Select @on-change='dataChange' v-model="nvdia" filterable style="margin-left: 5px;" placeholder="请选择电脑显卡">
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
				<div :title='item.brand.brandTitle' style="text-align:center">
					<img style='width:230px;height:280px;background-size: 100% 100%;' :src="url + item.computerImageList[0].computerImageUrl">
					<p style='color:red;text-align: left;font-size: 24px;'>
						<span style='font-size:20px;'>￥</span>{{item.computerPrice}}.00
					</p>
					<p style="text-align: left;">
						{{item.computerDescribe}}
					</p>

					<p style='position: absolute;top:440px;left: 155px;'>
						<ButtonGroup>
							<Button @click="computerInfo(item.computerId)" title="商品详情">
								<Icon type="ios-apps" />
							</Button>
							<Button @click="addShoppingCat(item.computerId)" title="加入购物车">
								<Icon type="ios-cart" />
							</Button>
						</ButtonGroup>
					</p>
				</div>
			</Card>
			</Col>
		</Row>

		<Row style='margin-top:20px;float:right'>
			<Col>
			<Page :total="page.total + 1" show-total :page-size='page.size' @on-change='pageSelect($event)' />
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
				brand: 0, //品牌
				type: 0, //整机
				processor: 0, //处理器
				memoryCapacity: 0, //内存容量
				hardDisk: 0, //硬盘容量
				computerSystem: 0, //系统
				dimension: 0, //尺寸
				nvdia: 0, //显卡
				page: {
					total: 1,
					size: 16,
					page: 1
				},
				searchValue: ''

			};
		},
		methods: {
			addShoppingCat(computerId) { //加入购物车方法
				const own = this;

				let data = JSON.stringify({
					computerId: computerId,
					computerCount: 1
				});

				axios.post(own.url + '/shoppingCart', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1203) { //未登入
							own.$Notice.info({
								title: '温馨提示',
								desc: '请先登入，没有登入无法加入购物车哦！'
							});
							//广播事件
							own.$emit('notLoggedIn');

						} else { //操作成功
							own.$Notice.success({
								title: '温馨提示',
								desc: response.data.message
							});
						}


					})
					.catch(function(error) {
						console.log(error);
					})
			},
			computerInfo(computerId) { //商品详情
				window.open('http://localhost:8080/info?computerId='+computerId, '_blank');
			},
			searchClick() { //模糊搜索
				const own = this;
				own.page.page = 1;
				own.clearOther(); //清空下拉框选中的数据
				own.type = 0;

				let data = JSON.stringify({
					likeStr: own.searchValue,
					page: 1,
					count: own.page.size
				});

				axios.post(own.url + '/computer/query/like', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1028) {
							own.$Notice.info({
								title: '温馨提示',
								desc: '没有查找到你想要的数据哦！'
							});
							own.computers = [];
							own.page.total = response.data.total;
						} else {
							own.computers = response.data.data;
							own.page.total = response.data.total;
						}

					})
					.catch(function(error) {
						console.log(error);
					})
			},
			typeClick() {
				this.type = 0;
				this.selectData();
			},
			brandClick() {
				this.brand = 0;
				this.selectData();
			},
			selectData() { //数据查询
				const own = this;
				own.page.page = 1;
				let data = JSON.stringify({
					brand: own.brand,
					type: own.type,
					processor: own.processor,
					memoryCapacity: own.memoryCapacity,
					hardDisk: own.hardDisk,
					computerSystem: own.computerSystem,
					dimension: own.dimension,
					nvdia: own.nvdia,
					page: own.page.page,
					count: own.page.size
				});

				axios.post(own.url + '/computer/query', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1028) {
							own.$Notice.info({
								title: '温馨提示',
								desc: '没有查找到你想要的数据哦！'
							});
						}
						own.computers = response.data.data;
						own.page.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					})

			},
			dataChange() { //监听条件变化
				this.selectData();
			},
			clearOther() { //清空其它里选中的
				this.processor = 0;
				this.memoryCapacity = 0;
				this.hardDisk = 0;
				this.computerSystem = 0;
				this.dimension = 0;
				this.nvdia = 0;
				this.selectData(); //数据重新查询
			},
			pageSelect(event) { //分页事件
				const own = this;
				own.page.page = event;
				let data = JSON.stringify({
					brand: own.brand,
					type: own.type,
					processor: own.processor,
					memoryCapacity: own.memoryCapacity,
					hardDisk: own.hardDisk,
					computerSystem: own.computerSystem,
					dimension: own.dimension,
					nvdia: own.nvdia,
					page: own.page.page,
					count: own.page.size
				});

				axios.post(own.url + '/computer/query', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1028) {
							own.$Notice.info({
								title: '温馨提示',
								desc: '没有查找到你想要的数据哦！'
							});
						}
						own.computers = response.data.data;
						own.page.total = response.data.total;
					})
					.catch(function(error) {
						console.log(error);
					})
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
						own.page.total = respon.data.total;
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		},
		created() {
			var own = this; //保存当前对象
			this.selectData(); //请求商品数据

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
		}
	}
</script>

<style>
	.span-display span {
		display: none;
	}

	.span-display {
		margin: 5px;
	}

	.span-display img:hover {
		width: 125px;
		height: 45px;
		border: 2px double skyblue;
	}

	.show {
		border: 1px solid skyblue;
		border-radius: 45%;
	}
</style>
