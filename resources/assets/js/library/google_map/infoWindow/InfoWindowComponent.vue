<template>
	<div class="infoWindow_1">
		<table class="table table-striped">
			<thead><tr><th>KEY</th><th>VALUE</th></tr></thead>
			<tbody>
			<tr><td>POSITION</td><td>{{prop.position.lat+' '+prop.position.lng}}</td></tr>
			<tr><td>LABEL</td><td>{{prop.label.text}}</td></tr>
			<tr><td>TITLE</td><td>{{prop.title}}</td></tr>
			<tr><td>CLUSTER</td><td v-html="prop.clusterName"></td></tr>
			<tr><td>DESCRIPTION</td><td v-html="prop.description"></td></tr>
			</tbody>
		</table>
	</div>
</template>


<script>
	export default {
		props: ['prop'],
		data(){ return{}; },
		computed: {},
		watch: {},
		methods: {},
		mounted(){}
	};
</script>


<style>
	.infoWindow_1{
		min-width: 300px; /*建議要給，畫面比較順*/
		padding: 10px;
		border-style: solid;
		border-width: 1px 1px 1px 10px;
		border-color: #4CAF50;
		margin: 0;
	}
</style>