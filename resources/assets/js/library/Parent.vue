<template>
	
	<div>
		<div>Title: {{ title }}</div><br>
		<div>Name: {{ name }}</div><br>
		<button @click="showMessage"> PARENT SHOW MESSAGE </button>
	</div>
	
</template>


<script type="text/babel">
	
	export default {
		props: ['title', 'name'],
		data(){
			return {
				message: 'Parent Data Message',
			};
		},
		computed: {},
		watch: {},
		methods: {
			showMessage: function(){
				console.log(this.message);
			}
		},
		mounted(){
			console.log('I am from Parent');
		}
	};
	
</script>


<style></style>