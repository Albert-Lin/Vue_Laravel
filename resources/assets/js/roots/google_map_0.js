/**
 * Created by Albert Lin on 2017/5/3.
 */

require('../bootstrap');
window.Vue = require('vue');

{
	// 想一想甚麼樣的資料要拉出來 && 跟 Vue.data 有什麼樣的差異
	window.data = {
		map:{
			center: {
				lat: 24.250746,
				lng: 120.7304326
			},
			marker_icons:[
				{ url: 'http://vue.semanticlab.com/img/nodejs.png', size: new google.maps.Size(20, 32), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32) },
			],
			add_markers: [
				{id: 0, position:{lat:25.0274747, lng:121.5218001}, title:'A'},
				{id: 1, position:{lat:24.2526852, lng:120.7302684}, title:'b'},
				{id: 2, position:{lat:24.2521503, lng:120.7292076}, title:'c'}
			],
			remove_markers: []
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
					bgImage: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/laravel-4096-black.png',
					fun: function(param){
						for(let i = 0; i < param.length; i++){
							console.log('laravel '+param[i]);
						}
					},
					param: ['A', 'B', 'C']
				}
			]
		},
		funBarItems: [
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
		]
	};
	
	init();
}




function init(){
	window.vueApp = new Vue({
		el: '#app',
		components:{
			google_map: require('../library/google_map/googleMap.vue'),
			map_ctrl_panel: require('../library/google_map/ControllerPanel.vue'),
			fun_bar: require('../components/FunctionBar.vue'),
		},
		data:{
			data: window.data,
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
}