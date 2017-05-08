<template>
	<div class="google_map">
		<div id="map"></div>
	</div>
</template>

 

<script>
	
	export default {
		props:['center', 'controllers'],
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
			mapCtrl: function(){
				let result = (this.controllers)? this.controllers : {};

				result.zoomControl = (result.zoomControl)? result.zoomControl : true;
				result.zoomControlOptions = (result.zoomControlOptions)? result.zoomControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };

				result.mapTypeControl = (result.mapTypeControl)? result.mapTypeControl : true;
				result.mapTypeControlOptions = (result.mapTypeControlOptions)? result.mapTypeControlOptions : { position: google.maps.ControlPosition.TOP_RIGHT };

				result.scaleControl = (result.scaleControl)? result.scaleControl : true;
				result.scaleControlOptions = (result.scaleControlOptions)? result.scaleControlOptions : {};

				result.streetViewControl = (result.streetViewControl)? result.streetViewControl : true;
				result.streetViewControlOptions = (result.streetViewControlOptions)? result.streetViewControlOptions : {};

				result.rotateControl = (result.rotateControl)? result.rotateControl : true;
				result.rotateControlOptions = (result.rotateControlOptions)? result.rotateControlOptions : { position: google.maps.ControlPosition.RIGHT_BOTTOM };
				return result;
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
				})
			},
		},
		mounted(){
			this.googleMapInit();
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
</style>