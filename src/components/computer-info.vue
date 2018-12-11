<template>
	<div>
		<Row style='margin-top:50px;'>
			<Col span="1">&emsp;</Col>
			<Col span="8" style="margin-right:20px;">

			<!-- 图片预览 -->
			<div style="text-align:center;">
				<img style='width:455px;height:455px;background-size: 100% 100%;' :src='url + currentImage'>
			</div>

			<!-- 所有图片显示 -->
			<div style='border:1px solid beige;width:455px;height:75px;'>
				<div v-for='item in images' style="margin:15px;float:left;" :key='item.computerImageId'>
					<img class='infoImg' style='width:50px;height:50px;cursor:pointer;' :src="url + item.computerImageUrl">
				</div>
			</div>

			</Col>
			<Col span="14">
			<div style="border:1px solid beige;width: 800px;height: 530px;">
				<h2 style="text-align: left;">&emsp;&emsp;{{title}}</h2>
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
				title:''
			}
		},
		created() {
			const own = this;
			let website = window.location.search;
			let computerId = website.substring(website.lastIndexOf('=') + 1);

			axios.get(own.url + '/computer/' + computerId)
				.then(function(response) {
					console.log(response);
					own.currentImage = response.data.data.computerImageList[0].computerImageUrl; //当前预览图片
					own.images = response.data.data.computerImageList; //所有图片
					own.title = response.data.data.computerDescribe;

				})
				.catch(function(error) {
					console.log(error);
				})


		}

	}
</script>
<style>
	.infoImg:hover{
		border: 1px solid orange;
	}
</style>
