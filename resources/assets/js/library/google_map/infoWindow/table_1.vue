<template>
	<div class="infoWindow">
		<table class="table table-striped">
			<thead><tr><th>KEY</th><th>VALUE</th></tr></thead>
			<tbody>
			<tr><td>POSITION</td><td>{{prop.position.lat+' '+prop.position.lng}}</td></tr>
			<tr><td>LABEL</td><td>{{prop.label}}</td></tr>
			<tr><td>TITLE</td><td>{{prop.title}}</td></tr>
			</tbody>
		</table>
	</div>
</template>


<script>
	export default{
		props: ['prop'],
		data(){ return{}; },
		computed: {},
		watch: {},
		methods: {},
		mounted(){}
	}
</script>


<style>
	.infoWindow{
		width: 100%;
		height: auto;
		padding: 10px;
		border-style: solid;
		border-width: 1px 1px 1px 10px;
		border-color: #4CAF50;
		margin: 0;
	}
</style>