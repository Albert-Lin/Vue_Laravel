/**
 * Created by Albert Lin on 2017/5/8.
 */

export default {
	
	//https://developers.google.com/maps/documentation/javascript/reference#Icon
	markerIcon: function(config){
		return {
			url: (config.url)? config.url: undefined,
			size: (config.size)? new google.maps.Size(config.size[0], config.size[1]): undefined,
			origin: (config.origin)? new google.maps.Point(config.origin[0], config.origin[1]): undefined,
			anchor: (config.anchor)? new google.maps.Point(config.anchor[0], config.anchor[1]): undefined
		};
	},
	
	//https://developers.google.com/maps/documentation/javascript/reference#Marker
	marker: function(config){
		return {
			position: (config.position)? config.position : undefined,
			icon: (config.icon)? this.markerIcons[config.icon] : undefined,
			label: (config.label)? config.label : undefined,
			shape: (config.shape)? config.shape : undefined,
			title: (config.title)? config.title : undefined,
			zIndex: (config.zIndex)? config.zIndex : undefined,
		}
	}
}
