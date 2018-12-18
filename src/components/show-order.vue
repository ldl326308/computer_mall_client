<template>
	<div>
		<Row style='margin-top:20px;margin-bottom:20px;'>
			<Col span="4">
			<span style="font-size:30px;cursor: pointer;" title="所有订单">
				<span style="color:green;">
					<Icon type="ios-paper-outline" />
				</span>
				所有订单
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
			&emsp;<Button @click="close" type="primary">关闭</Button>
			</Col>
			<Col span="1">&emsp;</Col>
		</Row>


	</div>
</template>
<script>
	export default {
		data() {
			return {
				columns: [{
					title: '订单编号',
					key: 'orderNumber',
					align: 'center'
				}, {
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
					title: '单价',
					key: 'price',
					align: 'center'
				}, {
					title: '数量',
					key: 'count',
					align: 'center'
				}, {
					title: '收货信息',
					key: 'address',
					align: 'center'
				}, {
					title: '订单状态',
					key: 'state',
					align: 'center'
				}],
				data: [],
				url: 'http://localhost:8888'
			}
		},
		methods: {
			close() {
				window.close(); //关闭当前窗口
			},
			orderShow() { //数据渲染
				const own = this;
				axios.get(own.url + '/order/selectAllIsUserId', {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						own.data = [];
						if (response.data.code === 1224) {
							response.data.data.forEach(function(item) {
								own.data.push({
									orderNumber: item.orderNumber,
									computerImageUrl: item.shoppingCart.computerImage,
									computerDescribe: item.shoppingCart.computer.computerDescribe,
									price: '￥' + item.shoppingCart.computerPrice + '.00',
									count: item.shoppingCart.computerCount + '台',
									address: '收货人：' + item.address.receivingName + ' 收货人电话：' + item.address.receivingPhone + ' 收货地址：' + item.address
										.addressName,
									state: item.orderState === 0 ? '等待商家确认' : '商家已确认，等待发货'
								});
							});
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
			this.orderShow(); //购物车数据渲染
		}
	}
</script>
