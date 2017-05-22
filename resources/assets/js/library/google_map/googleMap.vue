<template>
	<div class="google_map">
		<div id="map"></div>
		<div id="info_window">
			<info_window :prop="infoWindowProp"></info_window>
		</div>
	</div>
</template>

 

<script>

	import {Marker} from './Marker';
	import {InfoWindowComponent} from './infoWindow/InfoWindowComponent.vue';

	export default {
		mixins: [Marker],
		components: {
			info_window: require('./infoWindow/InfoWindowComponent.vue'),
		},
		props: ['center', 'mapControllers'],
		data(){
			return {
				map: undefined,
			};
		},
		computed:{
			mapCenter: function(){
				let result = (this.center)? this.center : {};
				result.lat = (result.lat)? result.lat : 25.0440978;
				result.lng = (result.lng)? result.lng : 121.5289268;

				return result;
			},
			controllers: function(){
				let result = (this.controllers)? this.controllers : {};

				// zoom:
				result.zoomControl = (result.zoomControl)? result.zoomControl : true;
				result.zoomControlOptions = (result.zoomControlOptions)? result.zoomControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };

				// mapType:
				result.mapTypeControl = (result.mapTypeControl)? result.mapTypeControl : true;
				result.mapTypeControlOptions = (result.mapTypeControlOptions)? result.mapTypeControlOptions : {
						position: google.maps.ControlPosition.TOP_RIGHT,
						style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
						mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
					};

				// scale:
				result.scaleControl = (result.scaleControl)? result.scaleControl : true;
				result.scaleControlOptions = (result.scaleControlOptions)? result.scaleControlOptions : {};

				// streetView:
				result.streetViewControl = (result.streetViewControl)? result.streetViewControl : true;
				result.streetViewControlOptions = (result.streetViewControlOptions)? result.streetViewControlOptions : {};

				// rotate:
				result.rotateControl = (result.rotateControl)? result.rotateControl : true;
				result.rotateControlOptions = (result.rotateControlOptions)? result.rotateControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };
				return result;
			}
		},
		watch: {
			'center.lat'(newLat){
				console.log('got new lat: '+newLat);
				this.mapCenter.lat = newLat;
				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
			},
			'center.lng'(newLng){
				console.log('got new lng: '+newLng);
				this.mapCenter.lng = newLng;
				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
			}
		},
		methods: {
			// Map:
			googleMapInit: function(){
				this.map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: this.mapCenter.lat, lng: this.mapCenter.lng},
					zoom: 16,

					zoomControl: this.controllers.zoomControl,
					zoomControlOptions: this.controllers.zoomControlOptions,

					mapTypeControl: this.controllers.mapTypeControl,
					mapTypeControlOptions: this.controllers.mapTypeControlOptions,

					scaleControl: this.controllers.scaleControl,
					scaleControlOptions: this.controllers.scaleControlOptions,

					streetViewControl: this.controllers.streetViewControl,
					streetViewControlOptions: this.controllers.streetViewControlOptions,

					rotateControl: this.controllers.rotateControl,
					rotateControlOptions: this.controllers.rotateControlOptions,

					addressControlOptions: {
						position: google.maps.ControlPosition.BOTTOM_CENTER
					},
				})
			},
		},
		mounted(){
			this.googleMapInit();
			this.markerClusterClassPlugin();
			this.addMarkers();
		}
	};

//	export default {
//		components:{
//			infowindow: require('./infoWindow/table_1.vue'),
//		},
//		props:['center', 'controllers', 'marker_icons', 'cluster', 'add_markers', 'remove_markers'],
//		data(){
//			return {
//				// a google.maps.Map object
//				map: undefined,
//
//				// a list of google.maps.Marker objects:
//				// [ Marker, Marker, ... ]
//				markerList: [],
//
//				// a list of cluster, each cluster: a list of google.maps.Marker objects:
//				// [ 'cluster_name'=>[ Marker, Marker, ... ], ... ]
//				clusters: [],
//
//				// a list of MarkerClusterer:
//				// [ 'cluster_name'=>MarkerClusterer, 'cluster_name'=>MarkerClusterer, ... ]
//				markerClusterList: [],
//
//				// a list of google.maps.InfoWindow:
//				// [ InfoWindow, InfoWindow, ... ]
//				windowList: [],
//
//				// properties of table_1.vue
//				info_window_prop: undefined,
//			};
//		},
//		computed:{
//			mapCenter: function(){
//				let result = (this.center)? this.center : {};
//				result.lat = (result.lat)? result.lat : 25.0440978;
//				result.lng = (result.lng)? result.lng : 121.5289268;
//				return result;
//			},
//			mapCtrl: function(){
//				let result = (this.controllers)? this.controllers : {};
//
//				result.zoomControl = (result.zoomControl)? result.zoomControl : true;
//				result.zoomControlOptions = (result.zoomControlOptions)? result.zoomControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };
//
//				result.mapTypeControl = (result.mapTypeControl)? result.mapTypeControl : true;
//				result.mapTypeControlOptions = (result.mapTypeControlOptions)? result.mapTypeControlOptions : {
//					position: google.maps.ControlPosition.TOP_RIGHT,
//					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
//					mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
//				};
//
//				result.scaleControl = (result.scaleControl)? result.scaleControl : true;
//				result.scaleControlOptions = (result.scaleControlOptions)? result.scaleControlOptions : {};
//
//				result.streetViewControl = (result.streetViewControl)? result.streetViewControl : true;
//				result.streetViewControlOptions = (result.streetViewControlOptions)? result.streetViewControlOptions : {};
//
//				result.rotateControl = (result.rotateControl)? result.rotateControl : true;
//				result.rotateControlOptions = (result.rotateControlOptions)? result.rotateControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };
//				return result;
//			},
//			markerIcons: function(){
//				return (this.marker_icons)? this.marker_icons : [];
//			},
//			add_marker: function(){
//				return (this.add_markers)? this.add_markers : [];
//			},
//			remove_marker: function(){
//				return (this.remove_markers)? this.remove_markers : [];
//			},
//			marker_cluster: function(){
//				if(this.cluster === true){
//					return {
//						action: 'add',
//						clusterName: -1, // 'default' & undefined are for default cluster
//					};
//				}
//				else if(this.cluster == false){
//					return {
//						action: 'remove',
//						clusterName: -1,
//					};
//				}
//				else if(this.cluster instanceof Object){
//					return this.cluster;
//				}
//			},
//			infoWindowProp: function(){
//				return (this.info_window_prop)? this.info_window_prop : {position:{lat: 0, lng: 0}, label:'LABEL', title:'標題'};
//			},
//		},
//		watch:{
//			'center.lat'(newLat){
//				console.log('got new lat: '+newLat);
//				this.mapCenter.lat = newLat;
//				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
//			},
//			'center.lng'(newLng){
//				console.log('got new lng: '+newLng);
//				this.mapCenter.lng = newLng;
//				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
//			},
//			add_marker: function(value){
//				this.addMarkers();
//			},
//			remove_marker: function(value){
//				console.log(this.markerList);
//				this.removeMarkers();
//				console.log('done');
//			},
//			marker_cluster: function(value){
//				if(value.action === 'add'){
//					if(value.clusterName === -1){ // add all
//						this.addMarkerClusters();
//					}
//					else if(value.clusterName === undefined){
//						this.addMarkerCluster('default');
//					}
//					else if(Array.isArray(value.clusterName)){
//						this.addMarkerClusters(value.clusterName);
//					}
//					else{
//						this.addMarkerCluster(value.clusterName);
//					}
//				}
//				else{
//					if(value.clusterName === -1){
//						this.removeMarkerClusters();
//					}
//					else if(value.clusterName === undefined){
//						this.removeMarkerCluster('default');
//					}
//					else if(Array.isArray(value.clusterName)){
//						this.removeMarkerClusters(value.clusterName)
//					}
//					else{
//						this.removeMarkerCluster(value.clusterName);
//					}
//				}
//			}
//		},
//		methods:{
//			// MAp
//			googleMapInit: function(){
//				this.map = new google.maps.Map(document.getElementById('map'), {
//					center: {lat: this.mapCenter.lat, lng: this.mapCenter.lng},
//					zoom: 16,
//					zoomControl: this.mapCtrl.zoomControl,
//					zoomControlOptions: this.mapCtrl.zoomControlOptions,
//					mapTypeControl: this.mapCtrl.mapTypeControl,
//					mapTypeControlOptions: this.mapCtrl.mapTypeControlOptions,
//					scaleControl: this.mapCtrl.scaleControl,
//					scaleControlOptions: this.mapCtrl.scaleControlOptions,
//					streetViewControl: this.mapCtrl.streetViewControl,
//					streetViewControlOptions: this.mapCtrl.streetViewControlOptions,
//					rotateControl: this.mapCtrl.rotateControl,
//					rotateControlOptions: this.mapCtrl.rotateControlOptions,
//
//					addressControlOptions: {
//						position: google.maps.ControlPosition.BOTTOM_CENTER
//					},
//				})
//			},
//
//			// Marker
//			addMarkerPreProcess: function(marker){
//				marker.position = (Array.isArray(marker.position))? {lat: marker.position[0], lng: marker.position[1]} : marker.position;
//				marker.id = this.markerList.length;
//				marker.zIndex = this.markerList.length;
//				marker.icon = (marker.icon !== undefined && !(marker.icon instanceof Object))? this.markerIcons[marker.icon]: marker.icon;
//				marker.clusterName = (marker.clusterName !== undefined)? marker.clusterName : 'default';
//				marker.clusterImage = (marker.clusterImage)? marker.clusterImage : 'http://vue.semanticlab.com/img/default.png';
//				return marker;
//			},
//			addMarker: function(marker){
//				// This:
//				let current = this;
//
//				// Map:
//				let map = this.map;
//
//				// Marker:
//				let markerItem = new google.maps.Marker(marker);
//
//				// InfoWindow:
//				let infowindowTemplate = document.getElementById('infowindowTemplate');
//				let style = window.getComputedStyle(infowindowTemplate.children[0]);
//				let minWidth = parseInt(style.minWidth.replace(/px/gi, ''))+2+'px';
//				let height = '499px';
//				let windowItem = new google.maps.InfoWindow({
//					content: '<div id="info_window_'+marker.id+'"  style="min-width:'+minWidth+'; height:'+height+';"><div></div></div>',
//					maxWidth: 600
//				});
//				this.windowList[marker.id] = windowItem;
//
//				// Event:
//				markerItem.addListener('click', function(){
//					current.info_window_prop = marker;
//					setTimeout(function(){
//						windowItem.open(map, markerItem);
//						setTimeout(function(){
//							let style = window.getComputedStyle(infowindowTemplate.children[0]);
//							document.getElementById('info_window_'+marker.id).style.height = style.height;
//							document.getElementById('info_window_'+marker.id).innerHTML = '';
//							document.getElementById('info_window_'+marker.id).innerHTML = infowindowTemplate.innerHTML;
//						}, 50);
//					}, 200);
//
//				});
//
//				// List && Cluster:
//				if(this.clusters[marker.clusterName] === undefined){
//					this.clusters[marker.clusterName] = [];
//				}
//				if(this.markerClusterList[marker.clusterName] === undefined){
//					this.addMarkerCluster(marker.clusterName, marker.clusterImage);
//				}
//				this.markerList[marker.id] = markerItem;
////				this.clusters[marker.clusterName].push(markerItem);
//				this.clusters[marker.clusterName][marker.id] = markerItem;
//				this.markerClusterList[marker.clusterName].addMarker(markerItem);
//
//				// Map:
////				markerItem.setMap(this.map);
//			},
//			addMarkers: function(){
//				if(this.add_marker !== undefined && this.add_marker.length > 0){
//					for(let i = 0; i < this.add_marker.length; i++){
//						this.add_marker[i] = this.addMarkerPreProcess(this.add_marker[i]);
//						this.addMarker(this.add_marker[i]);
//					}
//				}
//				this.add_marker = [];
//			},
//			removeMarker: function(index){
//				let marker = this.markerList[index];
//				if(marker !== undefined){
//					for(let clusterName in this.clusters){
//						for(let i = 0; i < this.clusters[clusterName].length; i++){
//							if(this.clusters[clusterName][i] === marker) {
//								this.markerClusterList[clusterName].removeMarker(marker);
//								console.log("CLUSTER");
//								console.log(this.markerClusterList[clusterName]);
//								console.log(this.markerClusterList[clusterName].getMarkers());
//								console.log(this.clusters[clusterName]);
//								break;
//							}
//						}
//					}
//
//					console.log("MARKER");
//					this.markerList[index] = undefined;
//					marker = undefined;
//					console.log(this.markerList);
//					console.log("================");
//				}
//			},
//			removeMarkers: function(){
//				if(this.remove_marker !== undefined && this.remove_marker.length > 0){
//					for(let i = 0; i < this.remove_marker.length; i++){
//						this.removeMarker(this.remove_marker[i]);
//					}
//				}
//
//				this.remove_marker = [];
//			},
//
//
//			// MarkerCluster
//			markerClusterPlugin: function(){
//				MarkerClusterer.prototype.setupStyles_ = function() {
//					if (this.styles_.length) {
//						return;
//					}
//
//					for (let i = 0, size; size = this.sizes[i]; i++) {
//						this.styles_.push({
//							url: this.imagePath_,
//							height: size,
//							width: size
//						});
//					}
//				};
//			},
//			createMarkerCluster: function(clusterName, clusterImage){
//				return new MarkerClusterer(
//					this.map,
//					this.clusters[clusterName],
//					{imagePath: clusterImage}
//				);
//			},
//			addMarkerCluster: function(clusterName, clusterImage){
//				if(this.markerClusterList[clusterName] !== undefined){
//					this.removeMarkerCluster(clusterName);
//				}
//				this.markerClusterList[clusterName] = new this.createMarkerCluster(clusterName, clusterImage);
//			},
//			addMarkerClusters: function(clusterNames=undefined){
//				if(Array.isArray(clusterNames)){
//					for(let i = 0; i < clusterNames.length; i++){
//						this.addMarkerCluster(clusterNames[i]);
//					}
//				}
//				else{
//					for(let clusterName in this.clusters){
//						this.addMarkerCluster(clusterName);
//					}
//				}
//			},
//			removeMarkerCluster: function(clusterName){
//				this.markerClusterList[clusterName].clearMarkers();
//				this.markerClusterList[clusterName] = undefined;
//				for(let i = 0; i < this.clusters[clusterName].length; i++){
//					this.clusters[clusterName][i].setMap(this.map);
//				}
//			},
//			removeMarkerClusters: function(clusterNames=undefined){
//				if(Array.isArray(clusterNames)){
//					for(let i = 0; i < clusterNames.length; i++){
//						this.removeMarkerCluster(clusterNames[i]);
//					}
//				}
//				else{
//					for(let clusterName in this.markerClusterList){
//						this.removeMarkerCluster(clusterName);
//					}
//				}
//			}
//
//
//		},
//		mounted(){
//			this.googleMapInit();
//			this.markerClusterPlugin();
//			this.addMarkers();
//		}
//	}
	
</script>


<style>
	#map{
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 10;
	}
	#infowindowTemplate{
		display: none;
	}
	.gm-iv-container{
		position: fixed;
		right: 50px;
		bottom: 22px;
	}
	.gm-iv-address{
		position: fixed;
		right: 76px;
		bottom: 22px;
		min-height: 56px;
	}
	.gm-iv-marker-icon{
		top: -10px;
	}
	.gm-iv-address-link{
		display: none;
	}
	.gm-iv-address .gm-iv-vertical-separator{
		top: -1px;
	}
	
</style>