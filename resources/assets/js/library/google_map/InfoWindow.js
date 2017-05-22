/**
 * Created by Albert Lin on 2017/5/18.
 */

export let InfoWindow = {

	data(){
		return {
			infoWindowList: [],
			infoWindowProp: undefined,
		};
	},
	computed:{
		/**
		 * Not necessary, usually used for
		 * initial properties of InfoWindow component,
		 * make sure all the necessary properties not undefined
		 */
		infoWindowProps: function(){
			let result = (this.infoWindowProp)? this.infoWindowProp : {};

						

		}
	},
	methods: {
		/**
		 * Get the CSS style value of InfoWindow component
		 *
		 * @returns {{}}
		 */
		getInfoWindowStyle: function(){
			let result = {};
			let infoWindowDom = document.getElementById('info_window');
			let style = window.getComputedStyle(infoWindowDom.children[0]);
			result.minWidth = parseInt(style.minWidth.replace(/px/gi, ''))+2+'px';
			result.height = '490px';

			return result;
		},
		/**
		 * Create google.maps.InfoWindow and save in this.infoWindowList
		 *
		 * @param markerOptional
		 */
		createInfoWindow: function(markerOptional){
			let style = this.getInfoWindowStyle();
			this.infoWindowList[markerOptional.id] = new google.maps.InfoWindow({
				content: '<div id="info_window_'+markerOptional.id+'" style="min-width:'+style.minWidth+'; height:'+style.height+';"><div></div></div>',
				maxWidth: 600,
				markerOptional: markerOptional,
			});
		},
		/**
		 * Function for open google.maps.InfoWindow
		 * while mapping google.maps.Marker object be clicked
		 *
		 * @param markerItem
		 */
		openInfoWindow: function(markerItem){
			let infoWindow = this.infoWindowList[markerItem.id];
			this.info_window_prop = infoWindow.markerOptional;
			let infoWindowDom = document.getElementById('info_window');
			setTimeout(function(){
				infoWindow.open(this.map, markerItem);
				setTimeout(function(){
					let style = window.getComputedStyle(infoWindowDom.children[0]);
					document.getElementById('info_window_'+markerItem.id).style.height = style.height;
					document.getElementById('info_window_'+markerItem.id).innerHTML = '';
					document.getElementById('info_window_'+markerItem.id).innerHTML = infoWindowDom.innerHTML;
				}, 50);
			}, 200);
		}
	},

};