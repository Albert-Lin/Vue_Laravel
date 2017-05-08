<template>
	<span class="switch">
		<input type="checkbox"
		       :id="itemIndex"
		       :class="itemClass">
		<label :for="itemIndex">
			<span type="selected"></span>
			<span type="itemName">{{itemName}}</span>
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
	.switch input[type=checkbox]{
		display: none;
	}

	.switch input+label{
		font-weight: 100;
	}
	.switch label{
		font-size: 18px;
	}
	.switch label span[type=itemName]{
		position: relative;
		top: -7px;
		left: 16px;
	}
	.switch label span[type=selected]{
		width: 30px;
		height: 15px;
		padding: 0;
		border-style: solid;
		border-color: #666666;
		border-width: 1px;
		border-radius: 7px;
		margin:2px 6px 0 6px;
		position: relative;
		left: 14px;
		cursor:pointer;
		background-color: #666666;
		display:inline-block;
		font-weight: 100;
		line-height: 15px;
	}
	.switch label span[type=selected]:before{
		content: "";
		display: inline-block;
		width: 20px;
		height: 20px;
		padding: 0;
		border-style: solid;
		border-radius: 100%;
		border-color: #ff6666;
		border-width: 1px;
		background-color: #ffffff;
		position: relative;
		top: -3px;
		left: -6px;
		box-shadow: 0 0 10px rgba(100, 100, 100, 0.5);
		transition: all 0.5s;
	}
	.switch label span[type=selected]:after{
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
		top: -15px;
		left: -6px;
	}
	.switch input[type=checkbox]:checked+label span[type=selected]{
		border-color: #ff9800;
		background-color: #ff9800;
	}
	.switch input[type=checkbox]:checked+label span[type=selected]:before{
		left: 16px;
	}
	.switch input[type=checkbox]:checked+label span[type=selected]:after{
		animation-name: clickAnimation;
		animation-duration: 0.7s;
	}
	.switch input[type=checkbox]:not(:checked)+label span[type=selected]:after{
		animation-name: clickAnimation2;
		animation-duration: 0.7s;
	}
</style>