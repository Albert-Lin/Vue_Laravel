<template>
	
	<div>
		<div>{{ title }}</div>
		<button id="mesg" @click="showMessge">CLICK</button>
	</div>
	
</template>


<script>
	
	export function Component0(optionals){
		let vue = {};
		
		this.Component0 = function(optionals){
			this.__proto__ = new (require('./SuperComponent.js').SuperComponent);
			if(optionals === undefined){
				this.props = ['name', 'phone'];
				this.data = {
					title: 'Component 0 Title'
				};
				this.computed = {
					fullName: function(){
						return this.name+' Lin';
					}
				};
				this.watch = {};
				this.methods = {
					showMessge: function(){
						console.log("title: "+this.title);
						console.log("name: "+this.name);
						console.log("FullName: "+this.fullName);
						console.log("phone: "+this.phone);
					}
				};
				this.mounted = function(){
					console.log('ㄎㄎㄎ成功惹');
				};
			}
			
			this.vueGenerator();
			
		};
		
		this.vueGenerator = function(){
			let component = this;
			vue = {
				components: component.components,
				props: component.props,
				data(){ return component.data; },
				computed: component.computed,
				watch: component.watch,
				methods: component.methods,
				mounted(){ component.mounted(); }
			};
		};
		
		this.getVue = function(){
			return vue;
		};
		
		this.Component0(optionals);
	}
	
	export default (new Component0()).getVue();
	
	
</script>


<style></style>