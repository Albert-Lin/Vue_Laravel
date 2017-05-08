<template>
	<div class="card">
		<div class="cardHead"
			 :class="head.glyphicon"
			 :style="{ backgroundColor:head.bgColor, color:head.color, fontSize:head.fontSize+'px' }">{{head.title}}</div>
		<div class="cardContent"
			 :style="{ backgroundColor:content.bgColor, color:content.color }">
			<div class="cardBody">{{bodyContent}}</div>
			<hr>
			<div class="cardBottom">{{bottomContent}}</div>
		</div>
	</div>
</template>



<script>
	
	export default {
		components: {},
		props:['prop', 'body', 'bottom'],
		data(){
			return{}
		},
		computed:{
			head: function(){
				let property = {
					glyphicon: 'glyphicon',
					bgColor: 'rgb(255, 68, 68)',
					color: '#FFF',
					fontSize: '24',
					title: ''
				};
				
				if(this.prop.head !== undefined){
					return {
						glyphicon: (this.prop.head.icon !== undefined)? 'glyphicon '+this.prop.head.icon : property.glyphicon,
						bgColor: (this.prop.head.bgColor !== undefined)? this.prop.head.bgColor : property.bgColor,
						color: (this.prop.head.color !== undefined)? this.prop.head.color : property.color,
						fontSize: (this.prop.head.fontSize !== undefined)? this.prop.head.fontSize : property.fontSize,
						title: (this.prop.head.title !== undefined)? this.prop.head.title : property.title
					};
				}
				else{
					return property;
				}
			},
			content: function(){
				let property= {
					bgColor: '#fff',
					color: '#6f6f6f'
				};

				if(this.prop.content !== undefined){
					return {
						bgColor: (this.prop.content.bgColor !== undefined)? this.prop.content.bgColor : property.bgColor,
						color: (this.prop.content.color !== undefined)? this.prop.content.color : property.color,
					};
				}
				else{
					return property;
				}
			},
			bodyContent: function(){
				return (this.body !== undefined)? this.body : '';
			},
			bottomContent: function(){
				return (this.bottom !== undefined)? this.bottom : '';
			}
		},
		watch:{},
		methods:{},
		mounted(){}
	};
	
</script>




<style>
	
	.card{
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		margin: 0;
		font-family: Arial, "微軟正黑體", Helvetica, sans-serif;
		overflow-wrap: break-word;
	}
	.card > .cardHead{
		min-width: 65px;
		max-width: calc(100% - 60px);
		height: 65px;
		padding: 0 5px 0 5px;
		border: 0;
		border-radius: 3px;
		margin: 0;
		line-height: 65px;
		text-align: center;
		vertical-align: middle;
		overflow-y: hidden;
		transform: translate(30px, 20px);
		position: absolute;
		z-index: 11;
		box-shadow: 0 0 40px rgba(100, 100, 100, 0.3);
	}
	.card > .cardContent{
		width: calc(100% - 30px);
		padding: 60px 10px 10px 10px;
		border: 0;
		border-radius: 5px;
		margin: 0 15px 0 15px;
		transform: translateY(40px);
		z-index: 10;
	}
	
</style>