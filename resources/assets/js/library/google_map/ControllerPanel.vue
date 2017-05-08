<template>

	<div class="controllerPanel">
		<div v-for="(item, index) in controllers"
		     class="controller btn"
		     :style="ctrlStyle(item)"
		     @click="controllerClick(item.fun)" >
		</div>
	</div>

</template>



<script>

	export default{
		props: ['controller_style',  'controllers'],
		data(){ return{}; },
		computed:{},
		watch:{},
		methods:{
			ctrlStyle: function(item){
				let result = (this.controller_style)? this.controller_style : {};
				result.backgroundImage = 'url('+item.bgImage+')';
				result.backgroundSize = (result.backgroundSize)? result.backgroundSize : '40px';
				return result;
			},
			controllerClick: function(fun){
				if(fun !== undefined && fun.fun !== undefined){
					if(fun.param !== undefined){
						fun.fun(fun.param);
					}
					else{
						fun.fun();
					}
				}
			}
		},
		mounted(){}
	};

</script>



<style>

	.controllerPanel{
		width: 50px;
		min-height: 100px;
		padding: 0;
		border-radius: 5px;
		top: 100px;
		right: 10px;
		position: absolute;
		z-index: 11;
		background-color: #ffffff;
		box-shadow: 0 0 15px rgba(100, 100, 100, 0.5);
	}

	.controllerPanel .controller {
		width: 40px;
		height: 40px;
		padding: 0;
		border: 0;
		margin: 5px;
		background-repeat: no-repeat;
	}
</style>