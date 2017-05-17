/**
 * Created by Albert Lin on 2017/5/11.
 */


export let Cluster = {

	mixins: [],
	components: {},
	props: ['cluster'],
	data(){
		return{
			/**
			 * A list record all the cluster information,
			 * it's a map structure, each element is key-value pair,
			 * e.g., [
			 *          'clusterName'=>
			 *          {
			 *              markers:[ 'Marker.id'=>google.maps.Marker, 'Marker.id'=>google.maps.Marker, ... ], // map
			 *              clusterImage:'../img/default.png'
			 *          }
			 *       ]
			 *
			 *  *note: the most tricky part, we only use first marker of cluster to set cluster-image
			 */
			markerClusterList: [],
			/**
			 * MarkerCluster objects List
			 */
			markerClusterObjectList: [],
		}
	},
	computed: {
		/**
		 * Create action config for MarkerCluster
		 * @returns {undefined}
		 */
		markerClusterAction: function(){
			let result = undefined;
			
			if(this.cluster === true){
				result = {
					action: 'add',
					clusterName: -1, // -1 for all
				};
			}
			else if(this.cluster == false){
				result = {
					action: 'delete',
					clusterName: -1,
				};
			}
			else if(this.cluster instanceof Object){
				result = this.cluster;
			}
			
			return result;
		}
	},
	watch: {
		/**
		 * Execute mapping function while this.markerClusterAction changed
		 * @param newAction
		 */
		markerClusterAction: function(newAction){
			if(newAction !== undefined){
				if(newAction.action === 'add'){
					if(newAction.clusterName === -1){ // add all
						this.addMarkerClusterObjects();
					}
					else if(newAction.clusterName === undefined){
						this.createMarkerClusterObject('default');
					}
					else if(Array.isArray(newAction.clusterName)){
						this.addMarkerClusterObjects(newAction.clusterName);
					}
					else{
						this.createMarkerClusterObject(newAction.clusterName);
					}
				}
				else{
					if(newAction.clusterName === -1){
						this.deleteMarkerClusterObjects();
					}
					else if(newAction.clusterName === undefined){
						this.deleteMarkerClusterObject('default');
					}
					else if(Array.isArray(newAction.clusterName)){
						this.deleteMarkerClusterObjects(newAction.clusterName)
					}
					else{
						this.deleteMarkerClusterObject(newAction.clusterName);
					}
				}
			}
		}
	},
	methods: {
		/**
		 * MarkerClusterer plugin
		 */
		markerClusterClassPlugin: function(){
			MarkerClusterer.prototype.setupStyles_ = function() {
				if (this.styles_.length) {
					return;
				}
				
				for (let i = 0, size; size = this.sizes[i]; i++) {
					this.styles_.push({
						url: this.imagePath_, // change here
						height: size,
						width: size
					});
				}
			};
		},
		/**
		 * Create a MarkerClusterer object and push into
		 * this.markerClusterObjectList
		 *
		 * @param clusterName
		 */
		createMarkerClusterObject: function(clusterName){
			if(this.markerClusterObjectList[clusterName] !== undefined){
				this.deleteMarkerClusterObject(clusterName);
			}
			
			this.markerClusterObjectList[clusterName] = new MarkerClusterer(
				this.map,
				this.markerClusterList[clusterName].markers,
				{imagePath: this.markerClusterList[clusterName].clusterImage}
			);
		},
		/**
		 * Create several MarkerClusterer objects and push all
		 * into this.markerClusterObjectList
		 *
		 * @param clusterNames
		 */
		addMarkerClusterObjects: function(clusterNames=undefined){
			if(Array.isArray(clusterNames)){
				for(let i = 0; i < clusterNames.length; i++){
					this.createMarkerClusterObject(clusterNames[i]);
				}
			}
			else{
				for(let clusterName in this.markerClusterList){
					this.createMarkerClusterObject(clusterName);
				}
			}
		},
		/**
		 * Delete MarkerClusterer object,
		 * if necessary, also delete cluster information in markerClusterList,
		 * else reset google.maps.Markers in MarkerClusterer objects on map
		 *
		 * @param clusterName
		 * @param {Boolean} deleteMarkerClusterList
		 */
		deleteMarkerClusterObject: function(clusterName, deleteMarkerClusterList=false){
			this.markerClusterObjectList[clusterName].clearMarkers();
			delete this.markerClusterObjectList[clusterName];

			if(deleteMarkerClusterList === true){
				for(let markerId in this.markerClusterList[clusterName].markers){
					this.markerClusterList[clusterName].markers[markerId].setMap(null);
					delete this.markerClusterList[clusterName].markers[markerId];
				}
				delete this.markerClusterList[clusterName];
			}
			else{
				for(let markerId in this.markerClusterList[clusterName].markers){
					this.markerClusterList[clusterName].markers[markerId].setMap(this.map);
				}
			}
		},
		/**
		 * Delete several MarkerClusterer objects
		 *
		 * @param clusterNames
		 * @param {Boolean} clearMarkerClusterList
		 */
		deleteMarkerClusterObjects: function(clusterNames=undefined, clearMarkerClusterList=false){
			if(Array.isArray(clusterNames)){
				// several cluster:
				for(let i = 0; i < clusterNames.length; i++){
					this.deleteMarkerClusterObject(clusterNames[i], clearMarkerClusterList);
				}
			}
			else if(clusterNames === undefined){
				// all clusters in markerClusterList:
				for(let clusterName in this.markerClusterList){
					this.deleteMarkerClusterObject(clusterName, clearMarkerClusterList);
				}
			}
			else{
				// single cluster:
				this.deleteMarkerClusterObject(clusterNames, clearMarkerClusterList);
			}
		}
	},
	
};
