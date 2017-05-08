<template>
	<span class="checkBox">
		<input type="checkbox"
			   :id="itemIndex"
			   :class="itemClass">
		<label :for="itemIndex">
			<span type="selected"></span>
			{{itemName}}
		</label>
	</span>
</template>


<script>

	export default{
		props:['index', 'name', 'boxClass'],
		computed:{
			itemIndex: function(){
				if(this.index === undefined){
					console.warn('property "index" is necessary');
				}
				
				return (this.index)? this.index : 'default';
			},
			itemName: function(){
				return (this.name)? this.name : '';
			},
			itemClass: function(){
				if(this.index === undefined){
					console.warn('property "boxClass" is advised');
				}
				
				return (this.boxClass)? this.boxClass : 'checkbox';
			}
		}
	};
	
</script>


<style>
	@keyframes clickAnimation {
		0%   { transform: scale(0, 0); }
		50%  { transform: scale(1, 1); }
		80%  { opacity: 0 }
		100% { transform: scale(0, 0); opacity: 0.3 }
	}
	@keyframes clickAnimation2 {
		0%   { transform: scale(0, 0); }
		50%  { transform: scale(1, 1); }
		80%  { opacity: 0 }
		100% { transform: scale(0, 0); opacity: 0.3 }
	}
	.checkBox{
		display: inline-block;
	}
	.checkBox input[type=checkbox]{
		display: none;
	}
	.checkBox input+label{
		font-weight: 100;
	}
	.checkBox label{
		font-size: 18px;
	}
	.checkBox label span{
		width: 20px;
		height: 20px;
		padding: 0;
		border-style: solid;
		border-color: #ff9800;
		border-width: 1px;
		border-radius: 3px;
		margin:2px 6px 0 6px;
		cursor:pointer;
		background-color: #fff;
		display:inline-block;
		text-align:center;
		line-height: 20px;
	}
	.checkBox label span[type=selected]{
		font-weight: 100;
	}
	.checkBox label span[type=selected]:before{
		content: '✔';
		color: #ff6666;
		opacity: 0;
		transition: all 0.5s;
	}
	.checkBox label span[type=selected]:after{
		content: "";
		display: inline-block;
		width: 40px;
		height: 40px;
		padding: 0;
		border-radius: 100%;
		margin: 0;
		background-color: #000;
		transform: scale(0, 0);
		opacity: 0.3;
		position: absolute;
		top: -8px;
		left: 16px;
	}
	.checkBox input[type=checkbox]:checked+label span[type=selected]:before{
		opacity: 1;
	}
	.checkBox input[type=checkbox]:checked+label span[type=selected]:after{
		animation-name: clickAnimation;
		animation-duration: 0.7s;
	}
	.checkBox input[type=checkbox]:not(:checked)+label span[type=selected]:after{
		animation-name: clickAnimation2;
		animation-duration: 0.7s;
	}
</style>