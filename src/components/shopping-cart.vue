<template>
	<div>
		<Row style='margin-top:20px;margin-bottom:20px;'>
			<Col span="4">
			<span style="font-size:30px;cursor: pointer;" title="我的购物车">
				<span style="color:green;">
					<Icon type="ios-cart" /></span>
				购物车
			</span>
			</Col>
		</Row>

		<Row>
			<Col span="1">&emsp;</Col>
			<Col span="22">
			<Table border ref="selection" @on-selection-change='selectionChange' :columns="columns" :data="data"></Table>
			</Col>
			<Col span="1">&emsp;</Col>
		</Row>

		<Row style='margin-top:30px;'>
			<Col span="16">&emsp;</Col>
			<Col span="7" style="text-align:right;">
			<h2 style='color:gray;'>总计：<span style='color:red;'>{{totalPrice}}</span>
				&emsp;<Button type="primary" @click="toPayment">去结算</Button></h2>
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
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '商品',
						key: 'computerDescribe',
						align: 'center'
					},
					{
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
					},
					{
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
						align: 'center',
						render: (thisRow, params) => {
							return thisRow('InputNumber', {
								style: {},
								attrs: {
									value: params.row.count,
									max: 999,
									min: 1
								},
								on: {
									'on-change': (e) => {
										this.selectionChange();
										this.numberInputClick(params.row.shoppingId, e);
									}
								}
							});
						}
					}, {
						title: '移除购物车',
						key: 'btnDelShoppingCart',
						align: 'center',
						render: (thisRow, params) => {
							return thisRow('Button', {
								attrs: {
									type: 'default',
									id: params.row.shoppingId
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.delete(params.row.shoppingId);
									}
								}
							}, '移除')

						}

					}
				],
				data: [],
				url: 'http://localhost:8888',
				totalPrice: '￥0.00'
			}
		},
		methods: {
			toPayment() {
				const own = this;
				let selectData = this.$refs.selection.objData;
				let arr = [];

				for (let i = 0;; i++) {
					let data = selectData[i];
					if (data != null || data != undefined) {
						if (data._isChecked === true) {
							arr.push(data.shoppingId);
						}
					} else {
						break;
					}
				}

				let data = arr.join(',');
				if (data.length === 0) {
					own.$Notice.warning({
						title: '温馨提示',
						desc: '没有选中你要结算的商品哦！'
					});
				} else {
					//打开信息确认页面
					window.open('http://localhost:8080/infomation?ids=' + data, '_blank');
				}

			},
			numberInputClick(shoppingId, count) { //数据库修改数量
				if (count === null) {
					console.log(count);
					count = 1;
				}

				const own = this;
				let data = JSON.stringify({
					computerCount: count,
					shoppingId: shoppingId
				});

				axios.put(own.url + '/shoppingCart', data, {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						own.selectionChange(); //重新计算总价
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			selectionChange() { //总价计算
				const own = this;
				let selectData = this.$refs.selection.objData;
				let arr = [];

				for (let i = 0;; i++) {
					let data = selectData[i];
					if (data != null || data != undefined) {
						if (data._isChecked === true) {
							arr.push(data.shoppingId);
						}
					} else {
						break;
					}
				}

				axios.get(own.url + '/calculationTotal', {
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						},
						params: {
							shoppingIds: arr.join(',')
						}
					})
					.then(function(response) {
						own.totalPrice = '￥' + response.data.data + '.00';
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			delete(id) { //移除购物车
				const own = this;
				own.$Modal.confirm({
					title: '温馨提示',
					content: '<span style="color:red;">确认要移除吗？</span>',
					onOk: () => {
						axios.delete(own.url + '/shoppingCart/' + id)
							.then(function(response) {
								if (response.data.code === 1028) {
									own.$Notice.success({
										title: '温馨提示',
										desc: response.data.message
									});

									own.shoppingCartShow();
									own.selectionChange();

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
					onCancel: () => {
						this.$Message.info('已取消');
					}
				});
			},
			shoppingCartShow() {
				const own = this;
				axios.get(own.url + '/shoppingCart/selectAll', {
						headers: {
							"Content-Type": "application/json;charset=utf-8"
						}
					})
					.then(function(response) {
						if (response.data.code === 1203) {
							own.$Notice.error({
								title: '温馨提示',
								desc: response.data.message
							});
							own.data = [];
						} else if (response.data.code === 1028) {
							own.$Notice.info({
								title: '温馨提示',
								desc: response.data.message
							});
							own.data = [];
						} else {
							own.data = [];
							response.data.data.forEach(function(item) {
								own.data.push({
									computerDescribe: item.computer.computerDescribe,
									computerImageUrl: item.computer.computerImageList[0].computerImageUrl,
									otherDescribe: item.type.typeName + ' ' + item.dimension.dimensionName + ' ' + '硬盘容量：' + item.hardDisk.hardDiskName +
										' 内存容量：' + item.memoryCapacity.memoryCapacityName + ' 显卡：' + item.nvdia.nvdiaName + ' 处理器：' + item.processor
										.processorName,
									btnDelShoppingCart: '按钮',
									price: '￥' + item.computer.computerPrice + '.00',
									count: item.computerCount,
									shoppingId: item.shoppingId
								});
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		},
		created() { //加载时执行
			this.shoppingCartShow(); //购物车数据渲染
		}
	}
</script>
