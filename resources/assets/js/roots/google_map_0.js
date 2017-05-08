/**
 * Created by Albert Lin on 2017/5/3.
 */

require('../bootstrap');
window.Vue = require('vue');

window.data = {
	map:{
		center: {
			lat: 24.250746,
			lng: 120.7304326
		}
	},
	ctrlPanel:{
		panelStyle: { display: 'block' },
		ctrls:[
			{
				bgImage: 'http://vue.semanticlab.com/img/nodejs.png',
				fun: function(param){
					alert('nodejs');
				},
			},
			{
				bgImage: 'http://vue.semanticlab.com/img/vue.svg',
				fun: function(param){
					alert('nodejs '+param);
				},
				param: 'from params'
			},
			{
				bgImage: 'http://vue.semanticlab.com/img/laravel.png',
				fun: function(param){
					for(let i = 0; i < param.length; i++){
						console.log('laravel '+param[i]);
					}
				},
				param: ['A', 'B', 'C']
			}
		]
	}
};


window.newapp = new Vue({
	el: '#app',
	components:{
		google_map: require('../library/google_map/googleMap.vue'),
		map_ctrl_panel: require('../library/google_map/ControllerPanel.vue'),
		fun_bar: require('../components/FunctionBar.vue'),
	},
	data:{
		data: window.data,
		items: [
			{
				glyphicon: 'glyphicon-flash',
				fun: {
					fun: ()=>{
						console.log('FLASH');
					}
				}
			},
			{
				glyphicon: 'glyphicon-send',
				fun: {
					fun: ()=>{
						console.log('SEND');
						let dom = document.getElementById('opt-content')
						console.log(dom);
					}
				}
			},
			{
				glyphicon: 'glyphicon-cog',
				fun: {
					fun: (param)=>{
						console.log(param);
					},
					param: 'I am param for COG'
				}
			}
		],
		status: 'close',
		lastClick: undefined,
	},
	methods: {
		funBarClick: function(response){
			if(this.lastClick === response[0].id){
				if(this.status === 'close'){
					document.getElementById('opt-content').style.transform = 'translateX(60px)';
					this.status = 'open';
				}
				else{
					document.getElementById('opt-content').style.transform = 'translateX(-100%)';
					this.status = 'close';
				}
			}
			else{
				if(this.status === 'close'){
					document.getElementById('opt-content').style.transform = 'translateX(60px)';
					this.status = 'open';
				}
			}
			
			this.lastClick = response[0].id;
		}
	}
});