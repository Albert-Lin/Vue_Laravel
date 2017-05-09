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
	
	/**
	 *
	 * @param color
	 * @param fontFamily
	 * @param fontSize
	 * @param fontWeight
	 * @param text
	 * @returns {{color: undefined, fontFamily: undefined, fontSize: undefined, fontWeight: undefined, text: undefined}}
	 */
	markerLabel: (text=undefined, color=undefined, fontFamily=undefined, fontSize=undefined, fontWeight=undefined)=>{
		return {
			color: (color)? color : undefined,
			fontFamily: (fontFamily)? fontFamily : undefined,
			fontSize: (fontSize)? fontSize : undefined,
			fontWeight: (fontWeight)? fontWeight : undefined,
			text: (text)? text : undefined,
		};
	},
	
	//https://developers.google.com/maps/documentation/javascript/reference#Marker
	/**
	 *
	 * @param markerData
	 * @param id
	 * @param position
	 * @param icon
	 * @param label
	 * @param shape
	 * @param title
	 * @param zIndex
	 * @returns {{id: undefined, position: *, icon: undefined, label: undefined, shape: undefined, title: undefined, zIndex: undefined}}
	 */
	marker: (markerData=undefined, id=undefined, position=undefined, icon=undefined, label=undefined, shape=undefined, title=undefined, zIndex=undefined)=>{
		return {
			markerData: (markerData)? markerData : {},
			id: (id)? id : undefined,
			position: (position)? {lat:position[0], lng:position[1]} : undefined,
			icon: (icon !== undefined)? icon : undefined,
			label: (label)? label : undefined,
			shape: (shape)? shape : undefined,
			title: (title)? title : undefined,
			zIndex: (zIndex)? zIndex : undefined,
			infowindow: {
				content: '',
			}
		}
	},
	
	
}
