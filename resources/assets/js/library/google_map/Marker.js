import {Cluster} from './Cluster';

export let Marker = {

	mixins: [Cluster],
	components: [],
	props: ['marker_icons', 'add_markers', 'delete_markers'],
	data(){
		return {
			markerList: [],
		};
	},
	computed: {
		/**
		 * Equals to property "marker_icon"
		 *  which has several user default Marker Icon configs,
		 *  used at create new google.maps.Marker object.
		 *
		 * @returns {Array}
		 */
		markerIconsList: function(){
			return (this.marker_icons)? this.marker_icons : [];
		},
		/**
		 * Create config object for adding markers on Google Map
		 *
		 * @returns {*}
		 */
		markersToAdd: function(){
			let result = { markers: [], cluster: true };
			
			if(Array.isArray(this.add_markers)){
				result.markers = this.add_markers;
			}
			else if(Array.isArray(this.add_markers.markers)){
				result = this.add_markers;
				if(result.cluster === undefined){
					result.cluster = true;
				}
			}
			
			return result;
		},
		/**
		 * Create config object for delete markers on Google Map
		 *
		 * @returns {Array}
		 */
		markersToDelete: function(){
			let result = [];
			
			if(Array.isArray(this.delete_markers)){
				result = this.delete_markers;
			}
			else if(!(this.delete_markers instanceof Object)){
				result = [this.delete_markers];
			}
			
			return result;
		}
	},
	watch: {
		/**
		 * Add markers while markersToAdd is changed
		 */
		markersToAdd: function(newConfig){
			// adding marker(s)
			if(newConfig !== undefined){
				this.addMarkers(newConfig.markers, newConfig.cluster);
				this.markersToAdd = undefined;
			}
		},
		/**
		 *
		 */
		markersToDelete: function(){
			// delete marker(s)
		},
	},
	methods: {
		/**
		 * For much more easier to create google.maps.Marker optionals,
		 * we allow user input simple optional format e.g., {lat: 25.0, lng: 121.0} => [25.0, 121.0].
		 * Before creating google.maps.Marker object,
		 * we will use current function to translate optional bake to standard format
		 *
		 * notes: the property which has "*" comment means
		 * it's not standard property for google.maps.Marker
		 *
		 * @param markerOptional
		 */
		addMarkerPreProcess: function(markerOptional){
			markerOptional.id = this.markerList.length; // *
			markerOptional.zIndex = this.markerList.length;
			markerOptional.position = (Array.isArray(markerOptional.position))? {lat: markerOptional.position[0], lng: markerOptional.position[1]} : markerOptional.position;
			markerOptional.label = (typeof markerOptional.label === "string")? {text: markerOptional.label} : markerOptional.label;
			markerOptional.icon = (markerOptional.icon !== undefined && !(markerOptional.icon instanceof Object))? this.markerIconsList[markerOptional.icon]: markerOptional.icon;
			markerOptional.clusterName = (markerOptional.clusterName !== undefined)? markerOptional.clusterName : 'default';  // *
			markerOptional.clusterImage = (markerOptional.clusterImage)? markerOptional.clusterImage : 'http://vue.semanticlab.com/img/default.png';  // *
			return markerOptional;
		},
		/**
		 * Create google.maps.Marker object by given marker optional
		 *
		 * @param {{}} markerOptional
		 * @param {Boolean} cluster
		 */
		createMarker: function(markerOptional, cluster){
			markerOptional = this.addMarkerPreProcess(markerOptional);
			
			// event ...
			// infoWindow ...
			// cluster ...
		},
		/**
		 * Called this.createMarker() to create google.maps.Marker objects
		 * by given marker optionals
		 *
		 * @param {[]} markerOptionals
		 * @param {Boolean} cluster
		 */
		addMarkers: function(markerOptionals, cluster=true){
			for(let i = 0; i < markerOptionals.length; i++){
				this.createMarker(markerOptionals[i], cluster);
			}
		}
	},
	mounted(){
		this.addMarkers();
	}
	
};