<template>
	<div>
		<Row style='margin-top:20px;margin-bottom:20px;'>
			<Col span="4">
			<span style="font-size:30px;cursor: pointer;" title="信息确认">
				<span style="color:green;">
					<Icon type="ios-paper-outline" />
				</span>
				信息确认
			</span>
			</Col>
		</Row>

		<Row style='margin-bottom:20px;'>
			<Col span="12">&emsp;</Col>
			<Col span="12">
			<span style="font-size: 16px;">收货地址信息选择：</span>
			<Select v-model="address" style="width:400px;text-align: left;">
				<Option v-for="item in cityList" :title="item.label" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>&nbsp;
			<span @click="addAddressInfo = true" title="新增新收货地址" style="color:green;cursor:pointer;">
				<Icon size='24' type="ios-add-circle" />
			</span>
			</Col>
		</Row>

		<Row>
			<Col span="1">&emsp;</Col>
			<Col span="22">
			<Table border ref="selection" :columns="columns" :data="data"></Table>
			</Col>
			<Col span="1">&emsp;</Col>
		</Row>

		<Row style='margin-top:30px;'>
			<Col span="16">&emsp;</Col>
			<Col span="7" style="text-align:right;">
			<h2 style='color:gray;'>总计：<span style='color:red;'>￥{{allTotalPrice}}</span>
				&emsp;<Button type="primary" @click="submitOrder">提交订单</Button></h2>
			</Col>
			<Col span="1">&emsp;</Col>
		</Row>

		<!-- 新增地址抽屉 -->
		<Drawer width="400" title="新增收货地址信息" :closable="false" v-model="addAddressInfo">
			<p>
				收货人姓名：<Input v-model="add.receivingName" placeholder="请输入收货人姓名" clearable style="width:280px" />
			</p><br />
			<p>
				收货人电话：<Input v-model="add.addressPhone" placeholder="请输入收货人电话" clearable style="width:280px" />
			</p><br />

			<Row>
				<Col span="5">
				收货地址：
				</Col>
				<Col span="18">
				<Input v-model="add.addressName" type="textarea" placeholder="请输入收货地址" />
				</Col>
			</Row>

			<Row style="margin-top:20px;">
				<Col span="4">&emsp;</Col>
				<Col>
				<Button @click="addAddressClick" style='margin-left:20px;' type="primary">添加</Button>&emsp;
				<Button @click="addAddressInfo = false" type="default">取消</Button>
				</Col>
			</Row>
		</Drawer>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				add: {
					receivingName: '', //收货人姓名
					addressName: '', //收货地址
					addressPhone: '' //收货人电话
				},
				addAddressInfo: false,
				cityList: [],
				address: 0, //选中地址
				columns: [{
					title: '图片',
					key: 'computerImageUrl',
					align: 'center',
					render: (thisRow, params) => {
						return thisRow('img', {
							style: {
								width: '100px',
								'height': '100px',
								'border-radius': '5%'
							},
							attrs: {
								src: 'http://localhost:8888' + params.row.computerImageUrl
							}
						});
					}
				}, {
					title: '商品',
					key: 'computerDescribe',
					align: 'center'
				}, {
					title: '详情',
					key: 'otherDescribe',
					align: 'center'
				}, {
					title: '单价',
					key: 'price',
					align: 'center'
				}, {
					title: '数量',
					key: 'count',
					align: 'center'
				}, {
					title: '总价',
					key: 'totalPrice',
					align: 'center'
				}],
				data: [],
				url: 'http://localhost:8888',
				totalPrice: '0.00',
				shoppingIds: '',
				allTotalPrice: 0
			}
		},
		methods: {
			submitOrder() {
				if (this.address === 0) {
					this.$Notice.error({
						title: '温馨提示',
						desc: '请选择收货地址！'
					});
					return false;
				}

				const own = this;
				let shoppingArr = own.shoppingIds.split(',');
				shoppingArr.forEach(function(item) {

					let data = JSON.stringify({
						addressId: own.address,
						shoppingCartId: item
					});

					axios.post(own.url + '/order', data, {
							headers: {
								"Content-Type": "application/json;charset=utf-8"
							}
						})
						.then(function(response) {
							if (response.data.code === 1028) {
								window.open('http://localhost:8080/order/show', '_blank');
								window.close();
							} else {
								this.$Notice.error({
									title: '温馨提示',
									desc: response.data.message
								});
							}
						})
						.catch(function(error) {
							console.log(error);
						})

				});

			},
			addressShow() { //地址显示
				const own = this;
				axios.get(own.url + '/address', {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						own.cityList = []; //清空数据
						if (response.data.data != null) {
							response.data.data.forEach(function(item) {
								own.cityList.push({
									value: item.addressId,
									label: '收件人：' + item.receivingName + ' 电话：' + item.receivingPhone + ' 地址：' + item.addressName
								});
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			addAddressClick() { //添加地址方法
				const own = this;
				let receivingName = own.add.receivingName.trim();
				let addressName = own.add.addressName.trim();
				let addressPhone = own.add.addressPhone.trim();

				if (receivingName === "" || receivingName.length === 0) {
					own.$Notice.error({
						title: '温馨提示',
						desc: '收货人姓名输入格式错误！请重新输入！'
					});
					return false;
				}

				if (/^[0-9]{11}$/.test(addressPhone) === false) {
					own.$Notice.error({
						title: '温馨提示',
						desc: '收货人联系电话输入格式错误！请重新输入！'
					});
					return false;
				}

				if (addressName === "" || addressName.length === 0) {
					own.$Notice.error({
						title: '温馨提示',
						desc: '收货地址输入格式错误！请重新输入！'
					});
					return false;
				}

				let data = JSON.stringify({
					receivingName: receivingName,
					addressName: addressName,
					receivingPhone: addressPhone
				});

				axios.post(own.url + '/address', data, {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						if (response.data.code === 1028) {
							own.$Notice.success({
								title: '温馨提示',
								desc: '添加成功！'
							});

							//关闭抽屉
							own.addAddressInfo = false;
							//重新渲染数据
							own.addressShow();

						} else {
							own.$Notice.error({
								title: '温馨提示',
								desc: response.data.message
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			shoppingCartShow(ids) { //数据渲染
				const own = this;
				axios.get(own.url + '/shoppingCart/selectIds', {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						},
						params: {
							shoppingIds: ids
						}
					})
					.then(function(response) {
						own.data = [];
						if (response.data.code === 1224) {
							response.data.data.forEach(function(item) {
								own.data.push({
									computerDescribe: item.computer.computerDescribe,
									computerImageUrl: item.computer.computerImageList[0].computerImageUrl,
									otherDescribe: item.type.typeName + ' ' + item.dimension.dimensionName + ' ' + '硬盘容量：' + item.hardDisk.hardDiskName +
										' 内存容量：' + item.memoryCapacity.memoryCapacityName + ' 显卡：' + item.nvdia.nvdiaName + ' 处理器：' + item.processor
										.processorName,
									price: '￥' + item.computer.computerPrice + '.00',
									count: item.computerCount + '台',
									totalPrice: '￥' + item.computer.computerPrice * item.computerCount + '.00'
								});
								//所有商品总价
								own.allTotalPrice += item.computer.computerPrice * item.computerCount;
							});

							own.allTotalPrice = own.allTotalPrice + '.00';

						} else {
							own.$Notice.error({
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
		created() { //加载时执行
			let website = window.location.search;
			let ids = website.substring(website.lastIndexOf('=') + 1);
			this.shoppingIds = ids;
			this.addressShow();
			this.shoppingCartShow(ids); //购物车数据渲染
		}
	}
</script>
