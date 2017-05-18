import {Cluster} from './Cluster';
import {InfoWindow} from './InfoWindow';

export let Marker = {

	mixins: [Cluster, InfoWindow],
	components: [],
	props: ['marker_icons', 'add_markers', 'delete_markers'],
	data(){
		return {
			markerList: [], // map
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
			else{
				console.log("Can not delete " + this.delete_markers);
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
		markersToDelete: function(newConfig){
			// delete marker(s)
			if(newConfig !== undefined){
				this.deleteMarkers(newConfig);
				this.markersToDelete = undefined;
			}
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
		 * @param {Boolean} cluster
		 */
		addMarkerPreProcess: function(markerOptional, cluster){
			markerOptional.id = Object.keys(this.markerList).length; // *
			markerOptional.zIndex = Object.keys(this.markerList).length;
			markerOptional.position = (Array.isArray(markerOptional.position))? {lat: markerOptional.position[0], lng: markerOptional.position[1]} : markerOptional.position;
			markerOptional.label = (typeof markerOptional.label === "string")? {text: markerOptional.label} : markerOptional.label;
			markerOptional.icon = (markerOptional.icon !== undefined && !(markerOptional.icon instanceof Object))? this.markerIconsList[markerOptional.icon]: markerOptional.icon;
			// *
			if(cluster === true){
				markerOptional.clusterName = (markerOptional.clusterName !== undefined)? markerOptional.clusterName : 'default';
				markerOptional.clusterImage = (markerOptional.clusterImage)? markerOptional.clusterImage : 'http://vue.semanticlab.com/img/default.png';
			}
			else{
				markerOptional.clusterName = undefined;
				markerOptional.clusterImage = undefined;
			}

			return markerOptional;
		},
		/**
		 * Main logic for register google.maps.Marker event
		 *
		 * notes: the format of eventOptional should be:
		 *  {
		 *      event: '{EVENT_NAME}',
		 *      callback: {CALLBACK_FUNCTION}
		 *  }
		 *
		 * @param markerItem
		 * @param eventOptional
		 */
		registerMarkerEvent: function(markerItem, eventOptional){
			let current = this;
			let event = eventOptional.event;
			let callback = (eventOptional.callback)? eventOptional.callback : function(){};
			let infoWindowDom = document.getElementById('infoWindow');
			// make sure the optional has 'event' property
			if(event !== undefined){
				// special setting for google.maps.InfoWindow
				if(event === 'click' && infoWindowDom !== null && infoWindowDom !== undefined){
					this.createInfoWindow();
					callback = function(){
						// original event which user set
						callback();
						// open google.maps.InfoWindow
						current.openInfoWindow(markerItem);
					};
				}
				markerItem.addListener(event, callback);
			}
			else{
				console.error('【registerMarkerEvent error】: the event optional should include "event" property.');
				console.error('event optional:');
				console.error(eventOptional);
			}
		},
		/**
		 * Register Marker event(s) by given input marker optional
		 *
		 * @param markerItem
		 * @param markerOptional
		 */
		registerMarkerEvents: function(markerItem, markerOptional){
			let eventOptionals = markerOptional.events;
			if(eventOptionals !== undefined){
				// several events:
				if(Array.isArray(eventOptionals)){
					for(let i = 0; i < eventOptionals.length; i++){
						this.registerMarkerEvent(markerItem, markerOptional, eventOptionals[i]);
					}
				}
				// single event:
				else{
					this.registerMarkerEvent(markerItem, markerOptional, eventOptionals);
				}
			}
		},
		/**
		 * Create google.maps.Marker object by given marker optional
		 *
		 * @param {{}} markerOptional
		 * @param {Boolean} cluster
		 */
		createMarker: function(markerOptional, cluster){
			markerOptional = this.addMarkerPreProcess(markerOptional, cluster);
			
			// create google.maps.Marker object:
			let markerItem = new google.maps.Marker(markerOptional);
			
			// events:
			this.registerMarkerEvents(markerItem, markerOptional);
			
			// cluster:
			if(cluster === true){
				if(this.markerClusterList[markerOptional.clusterName] === undefined) {
					this.markerClusterList[markerOptional.clusterName] = { markers: [], clusterImage: markerOptional.clusterImage };
					this.createMarkerClusterObject(markerOptional.clusterName);
				}
				this.markerClusterList[markerOptional.clusterName].markers[markerOptional.id] = markerItem;
				this.markerClusterObjectList[markerOptional.clusterName].addMarker(markerItem);
			}

			// setMap:
			// set map only if current google.maps.Marker do not need cluster
			if(cluster !== true){
				markerItem.setMap(this.map);
			}


			this.markerList[markerOptional.id] = markerItem;
		},
		/**
		 * Called this.createMarker() to create google.maps.Marker objects
		 * by given marker optionals
		 *
		 * @param {[]} markerOptionals
		 * @param {Boolean} cluster:
		 *  the flag for checking given markerOptionals should be cluster or not.
		 *  e.g., ATM, supermarket and some data not the main target of application
		 */
		addMarkers: function(markerOptionals, cluster=true){
			for(let i = 0; i < markerOptionals.length; i++){
				this.createMarker(markerOptionals[i], cluster);
			}
		},
		/**
		 *
		 * @param markerId
		 */
		deleteMarker: function(markerId){
			let marker = this.markerList[markerId];
			let clusterName = marker.clusterName;
			if(clusterName !== undefined){
				// markerClusterObjectList:
				this.markerClusterObjectList[clusterName].removeMarker(marker);

				// markerClusterList:
				if(this.markerClusterList[clusterName].markers[markerId] !== undefined){
					this.markerClusterList[clusterName].markers[markerId].setMap(null);
					delete this.markerClusterList[clusterName].markers[markerId];
				}

				// delete markerClusterObjectList & markerClusterList:
				if(this.markerClusterObjectList[clusterName].getMarkers().length === 0){
					this.deleteMarkerClusterObject(clusterName, true);
				}
			}
			else{
				this.markerList[markerId].setMap(null);
			}

			delete this.infoWindowList[markerId];
			delete this.markerList[markerId];
			marker = undefined;
		},
		/**
		 *
		 * @param markerIds
		 */
		deleteMarkers: function(markerIds){
			if(Array.isArray(markerIds)){
				for(let i = 0; i < markerIds.length; i++){
					this.deleteMarker(markerIds[i]);
				}
			}
			else{
				this.deleteMarker(markerIds);
			}
		},
	},
	mounted(){
		this.addMarkers();
	}
	
};