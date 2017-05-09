/**
 * Created by Albert Lin on 2017/5/3.
 */

require('../bootstrap');
window.Vue = require('vue');
let googleMap = require('../library/google_map/GoogleMap.js').default;

{
	// 想一想甚麼樣的資料要拉出來 && 跟 Vue.data 有什麼樣的差異
	window.data = {
		map:{
			center: {
				lat: 24.250746,
				lng: 120.7304326
			},
			marker_icons:[
				googleMap.markerIcon('http://vue.semanticlab.com/img/nodejs.png'),
				googleMap.markerIcon('http://vue.semanticlab.com/img/vue.png'),
				googleMap.markerIcon('https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png'),
			],
			// info_window_prop:{position:{lat: 0, lng: 0}, label:'LABEL', title:'標題'},
			add_markers: [
				googleMap.marker({position:{lat: 25.0274747, lng: 121.5218001}, label:'古亭', title:'FIRST'},
					0, [25.0274747, 121.5218001], 0, googleMap.markerLabel('古亭', '#44ff44', 'fantasy,微軟正黑體'), undefined, 'FIRST', 0),
				googleMap.marker({position:{lat: 24.2526852, lng: 120.7302684}, label:'文化中心', title:'SEC'},
					1, [24.2526852, 120.7302684], 1, googleMap.markerLabel('文化中心', '#446666', 'fantasy,微軟正黑體'), undefined, 'SEC', 1),
				googleMap.marker({position:{lat: 24.2521503, lng: 120.7292076}, label:'I don\'t know', title:'THIRD'},
					2, [24.2521503, 120.7292076], 1, googleMap.markerLabel('I don\'t know', '#446666', 'fantasy,微軟正黑體'), undefined, 'THIRD', 2),
				googleMap.marker({position:{lat: 24.2526852, lng: 120.7302684}, label:'文化中心 2', title:'SEC 2'},
					3, [24.2526852, 120.7302684], 2, googleMap.markerLabel('文化中心 2', '#ff4444', 'fantasy,微軟正黑體'), undefined, 'SEC 2', 3),
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
			infowindow: require('../library/google_map/infoWindow/table_1.vue'),
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