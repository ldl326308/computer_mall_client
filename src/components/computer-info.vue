<template>
	<div>
		<Row style='margin-top:50px;'>
			<Col span="1">&emsp;</Col>
			<Col span="9" style="margin-right:20px;">

			<!-- 图片预览 -->

			<Poptip placement="right">
				<!-- 图片预览 -->
				<div style="text-align:center;border:1px solid gray;">
					<img style='width:455px;height:455px;background-size: 100% 100%;' :src='url + currentImage'>
				</div>

				<div class="api" slot="content">
					<img style='width:550px;height:550px;background-size:100% 100%;' :src='url + currentImage' />
				</div>
			</Poptip>


			<!-- 所有图片显示 -->
			<div style='border:1px solid beige;width:460px;height:75px;margin-top:10px;margin-left:25px;'>
				<div v-for='item in images' style="margin:15px;float:left;" :key='item.computerImageId'>
					<img class='infoImg' @mouseover='updShowImg(item.computerImageUrl)' style='width:50px;height:50px;cursor:pointer;'
					 :src="url + item.computerImageUrl">
				</div>
			</div>

			</Col>
			<Col span="2">&emsp;</Col>
			<Col span="13">
			<div style="width:500px;height:475px;text-align: left;">
				<h2>{{title}}</h2>
				<br />
				<h2 style='color: red;'>价格：<span style="font-size:16px;">￥</span>{{computerPrice}}.00</h2>
				<br />
				<p>
					<Tag class='tag' color="green">类型：{{type}}</Tag>
					<Tag class='tag' color="magenta">品牌：{{brandName}}</Tag>
					<Tag class='tag' color="red">系统：{{computerSystem}}</Tag>
					<Tag class='tag' color="volcano">屏幕大小：{{dimension}}</Tag>
					<Tag class='tag' color="orange">硬盘容量：{{hardDisk}}</Tag>
					<Tag class='tag' color="gold">内存容量：{{memoryCapacity}}</Tag>
					<Tag class='tag' color="yellow">显卡：{{nvdia}}</Tag>
					<Tag class='tag' color="lime">处理器：{{processor}}</Tag>
					<Tag class='tag' color="purple">产品上架时间：{{computerCreateTime}}</Tag>
				</p>
				<br />
				<p style="line-height: 40px;font-size:16px;">
					商品数量：<InputNumber :max="999" :min="1" v-model="computerCount"></InputNumber>
				</p>
				<br />
				<p>
					<ButtonGroup size="large">
						<Button @click="close">关闭页面</Button>
						<Button @click="addShoppingCat">加入购物车</Button>
						<Button @click='toShoppingCart'>查看购物车</Button>
					</ButtonGroup>
				</p>
				<br />
				<p style='font-size: 16ox;color: gray;cursor: pointer;'>温馨提示&emsp;·支持7天无理由退货</p>
			</div>
			</Col>
		</Row>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				url: 'http://localhost:8888',
				images: [],
				currentImage: '',
				title: '',
				computerPrice: 0,
				brandName: '',
				computerSystem: '',
				dimension: '',
				hardDisk: '',
				memoryCapacity: '',
				nvdia: '',
				processor: '',
				type: '',
				computerCreateTime: '',
				computerCount: 1,
				computerId: 0
			}
		},
		methods: {
			toShoppingCart(){
				window.open('http://localhost:8080/shopping/cart', '_blank');
			},
			close(){
				window.close();
			},
			updShowImg(url) {
				this.currentImage = url;
			},
			addShoppingCat() { //加入购物车方法
				const own = this;

				let data = JSON.stringify({
					computerId: own.computerId,
					computerCount: own.computerCount
				});

				axios.post(own.url + '/shoppingCart', data, {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					})
					.then(function(response) {
						if (response.data.code === 1203) { //未登入
							own.$Notice.error({
								title: '温馨提示',
								desc: response.data.message
							});

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
			}
		},
		created() {
			const own = this;
			let website = window.location.search;
			let computerId = website.substring(website.lastIndexOf('=') + 1);
			own.computerId = computerId;
			axios.get(own.url + '/computer/' + computerId)
				.then(function(response) {
					own.currentImage = response.data.data.computerImageList[0].computerImageUrl; //当前预览图片
					own.images = response.data.data.computerImageList; //所有图片
					own.title = response.data.data.computerDescribe;
					own.computerPrice = response.data.data.computerPrice;
					own.brandName = response.data.data.brand.brandTitle;
					own.computerSystem = response.data.data.computerSystem.computerSystemName;
					own.dimension = response.data.data.dimension.dimensionName;
					own.hardDisk = response.data.data.hardDisk.hardDiskName;
					own.memoryCapacity = response.data.data.memoryCapacity.memoryCapacityName;
					own.nvdia = response.data.data.nvdia.nvdiaName;
					own.processor = response.data.data.processor.processorName;
					own.type = response.data.data.type.typeName;
					own.computerCreateTime = response.data.data.computerCreateTime;
				})
				.catch(function(error) {
					console.log(error);
				})


		}

	}
</script>
<style>
	.infoImg:hover {
		border: 1px solid orange;
	}

	.tag {
		margin-right: 15px;
		margin-top: 15px;
	}
</style>
