/**
 * Created by Albert Lin on 2017/5/8.
 */

export default {
	
	//https://developers.google.com/maps/documentation/javascript/reference#Icon
	/**
	 *
	 * @param url
	 * @param scaledSize
	 * @param labelOrigin
	 * @param origin
	 * @param anchor
	 * @param size
	 * @returns {{url: undefined, scaledSize: *, origin: *, anchor: (*|Point), labelOrigin: (*|Point), size: undefined}}
	 */
	markerIcon: (url=undefined, scaledSize=undefined, labelOrigin=undefined, origin=undefined, anchor=undefined, size=undefined,)=>{
		let newScaledSize = (size)? new google.maps.Size(size[0], size[1]): new google.maps.Size(40, 40);
		return {
			url: (url)? url: undefined,
			scaledSize: newScaledSize,
			origin: (origin)? new google.maps.Point(origin[0], origin[1]): undefined,
			anchor: (anchor)? new google.maps.Point(anchor[0], anchor[1]): new google.maps.Point(newScaledSize.width-(newScaledSize.width/2), newScaledSize.height),
			labelOrigin: (labelOrigin)? new google.maps.Point(labelOrigin[0], labelOrigin[1]) : new google.maps.Point(newScaledSize.width-(newScaledSize.width/2), newScaledSize.height),
			size: (size)? new google.maps.Size(size[0], size[1]) : undefined,
			
		};
	},
	
	markerEvent: (eventName, callback)=>{
		return {
			event: eventName,
			callback: callback,
		};
	}
	
}
