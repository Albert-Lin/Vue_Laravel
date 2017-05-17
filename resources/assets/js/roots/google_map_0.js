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
			cluster: true,
			add_markers: [
				{ position: [25.0274747, 121.5218001], icon: 0, label: '古~亭', clusterName: 'A', title: 'FIRST'},
				{ position: [24.2526852, 120.7302684], icon: 1, label: {text: '文化中心', color:'#446666', fontFamily:'fantasy,微軟正黑體'}, title: 'SEC', clusterName: 'A', clusterImage: 'http://vue.semanticlab.com/img/m2.png'},
				{ position: [24.2521503, 120.7292076], icon: googleMap.markerIcon('https://www.cloudcms.com/images/drivers/javascript/xjavascript.891e032e.png.pagespeed.ic.iBvyvS-EQY.png'), label: {text: 'I don\'t know', color:'#446666', fontFamily:'fantasy,微軟正黑體'}, title: 'THIRD'},
				{ position: [24.2526852, 120.7302684], icon: 2, label: '文化中心 2', title: 'SEC 2',
					description:'臺中市葫蘆墩文化中心（全銜為臺中市政府文化局葫蘆墩文化中心）是位於臺灣臺中市豐原區的公立藝文場所。其前身為「臺中縣立文化中心」，西元2000年(民國99年)12月25日臺中縣市合併，台中市升格為直轄市，依據「葫蘆墩」為豐原的舊地名，是以將台中縣立文化中心更名為「葫蘆墩文化中心」，直屬臺中市政府文化局所轄，為大臺中地區山線最重要的文化機構。<br><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/%E8%91%AB%E8%98%86%E5%A2%A9%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%83.JPG/330px-%E8%91%AB%E8%98%86%E5%A2%A9%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%83.JPG">',
					clusterName: 'A', clusterImage: 'http://vue.semanticlab.com/img/m2.png'}

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