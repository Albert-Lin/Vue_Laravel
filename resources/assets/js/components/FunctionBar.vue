<template>
	
	<div>
		<ul>
			<li v-for="(item, index) in items">
				<div class="fun-btn glyphicon"
					 :class="item.glyphicon"
					 :style="{ width:width+'px', height:height+'px', lineHeight:height+'px' }"
					 @click="itemClick(index, item.fun)" ></div>
			</li>
		</ul>
	</div>
	
</template>



<script>
	export default {
		props:['items', 'width', 'height'],
		data(){
			return {};
		},
		computed: {},
		watch: {},
		methods: {
			itemClick: function(index, fun){
				if(fun !== undefined){
					if(fun.param !== undefined){
						fun.fun(fun.param);
					}
					else{
						fun.fun();
					}
				}
				
				this.$emit('item-click', [{id: index}]);
			}
		},
		mounted(){}
	};
</script>



<style>
	.fun-btn{
		padding: 0;
		border: 0;
		margin: 0;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		text-align: center;
		vertical-align: middle;
		font-size: 18px;
		color: #f58512;
	}
	.fun-btn:hover{ background-color: #414065; }
	.fun-btn:active{ background-color: #317085; }
	ul{
		list-style-type: none;
		padding: 0;
		border: 0;
		margin: 0;
	}
</style>