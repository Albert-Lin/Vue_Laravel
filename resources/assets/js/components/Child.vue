<template>
	
	<div>
		<button @click="showMessage"> CHILD SHOW MESSAGE </button>
	</div>
	
</template>


<script>
	
	let parent = require('./../library/Parent.vue');
	
	export default {
		mixins: [parent],
		data(){
			return {
				message: 'Child Data Message',
			};
		},
	};

</script>


<style></style>