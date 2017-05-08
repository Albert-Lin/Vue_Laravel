<template>
	<div class="google_map">
		<div id="map"></div>
	</div>
</template>

 

<script>
	
	export default {
		props:['center', 'controllers', 'marker_icons', 'add_markers', 'remove_markers'],
		data(){
			return {
				map: undefined,
				markerList: [],
			};
		},
		computed:{
			mapCenter: function(){
				let result = (this.center)? this.center : {};
				result.lat = (result.lat)? result.lat : 25.0440978;
				result.lng = (result.lng)? result.lng : 121.5289268;
				return result;
			},
			mapCtrl: function(){
				let result = (this.controllers)? this.controllers : {};

				result.zoomControl = (result.zoomControl)? result.zoomControl : true;
				result.zoomControlOptions = (result.zoomControlOptions)? result.zoomControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };

				result.mapTypeControl = (result.mapTypeControl)? result.mapTypeControl : true;
				result.mapTypeControlOptions = (result.mapTypeControlOptions)? result.mapTypeControlOptions : {
					position: google.maps.ControlPosition.TOP_RIGHT,
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
				};

				result.scaleControl = (result.scaleControl)? result.scaleControl : true;
				result.scaleControlOptions = (result.scaleControlOptions)? result.scaleControlOptions : {};

				result.streetViewControl = (result.streetViewControl)? result.streetViewControl : true;
				result.streetViewControlOptions = (result.streetViewControlOptions)? result.streetViewControlOptions : {};

				result.rotateControl = (result.rotateControl)? result.rotateControl : true;
				result.rotateControlOptions = (result.rotateControlOptions)? result.rotateControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };
				return result;
			},
			add_marker: function(){
				return (this.add_markers)? this.add_markers : [];
			},
			remove_marker: function(){
				return (this.remove_markers)? this.remove_markers : [];
			}
			markerIcons: function(){
				return (this.marker_icons)? this.marker_icons : [];
			}
		},
		watch:{
			'center.lat'(newLat){
				console.log('got new lat: '+newLat);
				this.mapCenter.lat = newLat;
				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
			},
			'center.lng'(newLng){
				console.log('got new lng: '+newLng);
				this.mapCenter.lng = newLng;
				this.map.setCenter({lat: this.mapCenter.lat, lng: this.mapCenter.lng});
			},
			add_marker: function(value){
				this.addMarkers();
			},
			remove_marker: function(value){
				this.removeMarkers();
			}
		},
		methods:{
			googleMapInit: function(){
				this.map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: this.mapCenter.lat, lng: this.mapCenter.lng},
					zoom: 16,
					zoomControl: this.mapCtrl.zoomControl,
					zoomControlOptions: this.mapCtrl.zoomControlOptions,
					mapTypeControl: this.mapCtrl.mapTypeControl,
					mapTypeControlOptions: this.mapCtrl.mapTypeControlOptions,
					scaleControl: this.mapCtrl.scaleControl,
					scaleControlOptions: this.mapCtrl.scaleControlOptions,
					streetViewControl: this.mapCtrl.streetViewControl,
					streetViewControlOptions: this.mapCtrl.streetViewControlOptions,
					rotateControl: this.mapCtrl.rotateControl,
					rotateControlOptions: this.mapCtrl.rotateControlOptions,
					
					addressControlOptions: {
						position: google.maps.ControlPosition.BOTTOM_CENTER
					},
				})
			},
			addMarkers: function(){
				if(this.add_marker !== undefined && this.add_marker.length > 0){
					for(let i = 0; i < this.add_marker.length; i++){
						this.addMarker(this.add_marker[i]);
					}
				}
				
				this.add_marker = [];
			},
			addMarker: function(marker){
				let add = true;
				if(this.markerList[marker.id] !== undefined){
					if(confirm("Marker exist, do you want to replace it?") === false){
						add = false;
					}
					else{
						this.removeMarker(marker.id);
					}
				}
				
				if(add === true){
					let markerItem = new google.maps.Marker(marker);
					this.markerList[marker.id] = markerItem;
					markerItem.setMap(this.map);
				}
			},
			removeMarkers: function(){
				if(this.remove_marker !== undefined && this.remove_marker.length > 0){
					for(let i = 0; i < this.remove_marker.length; i++){
						this.removeMarker(this.remove_marker[i]);
					}
				}
				
				this.remove_marker = [];
			},
			removeMarker: function(index){
				let marker = this.markerList[index];
				if(marker !== undefined){
					marker.setMap(null);
					this.markerList[index] = undefined;
				}
			},
		},
		mounted(){
			this.googleMapInit();
			this.addMarkers();
		}
	}
	
</script>


<style>
	#map{
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 10;
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