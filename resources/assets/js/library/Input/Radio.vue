<template>
	<span class="radio">
		<input type="radio"
		       :id="itemIndex"
		       :name="itemGroup"
		       :class="itemGroup">
		<label :for="itemIndex">
			<span type="selected"></span>
			{{itemName}}
		</label>
	</span>
</template>


<script>

	export default{
		props:['index', 'name', 'group'],
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
			itemGroup: function(){
				if(this.index === undefined){
					console.warn('property "group" is necessary');
				}

				return (this.group)? this.group : 'radio';
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
	.radio{
		display: inline-block;
	}
	.radio input[type=radio]{
		display: none;
	}

	.radio input+label{
		font-weight: 100;
	}
	.radio label{
		font-size: 18px;
	}
	.radio label span{
		width: 19px;
		height: 19px;
		padding: 0;
		border-style: solid;
		border-color: #ff9800;
		border-width: 1px;
		border-radius: 100%;
		margin:2px 6px 0 6px;
		cursor:pointer;
		background-color: #fff;
		display:inline-block;
		text-align:center;
		line-height: 19px;
	}
	.radio label span[type=selected]{
		font-weight: 100;
	}
	.radio label span[type=selected]:before{
		content: '⚫';
		color: #ff6666;
		opacity: 0;
		transition: all 0.5s;
	}
	.radio label span[type=selected]:after{
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
	.radio input[type=radio]:checked+label span[type=selected]:before{
		opacity: 1;
	}
	.radio input[type=radio]:checked+label span[type=selected]:after{
		animation-name: clickAnimation;
		animation-duration: 0.7s;
	}
</style>