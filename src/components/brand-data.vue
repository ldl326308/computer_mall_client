<template>
	<div>
		<Button style="" v-for="n in brands" type="default" ghost :key="n.brandId" :id="n.brandId">
			<img style="width:102px;height:36px;" :src="url + n.brandImage" />
		</Button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				brands:[],
				url:"http://localhost:8888"
			};
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
		}
	}
</script>

<style>

</style>
