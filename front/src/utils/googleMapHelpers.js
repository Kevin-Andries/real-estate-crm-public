export function addMarker(google, map, position) {
	return new google.maps.Marker({
		position: position,
		map,
	});
}

export function generateInfoWindow(google, content) {
	return new google.maps.InfoWindow({
		content: content,
	});
}

export function addEventToMarker(infowindow, marker, map) {
	marker.addListener("click", () => {
		infowindow.open({
			anchor: marker,
			map,
			shouldFocus: false,
		});
	});
}

// Mapping on existing data to add marker on the map
// mockData.forEach((property) => {
// 	const content = `
// 		<div id="content" class='marker-window' data-id='${property.id}'>
// 			<div class='flex items-center mx-auto' style='width: fit-content;'>
// 				<p class='text-left text-xl font-bold my-4 cursor-pointer text-lightBlue text-lg md:text-xl hover:text-darkerBlue50'>
// 					${property.title}
// 				</p>
// 			</div>

// 			<div class='flex items-center justify-center info-window-image-container mb-2 relative w-100'>
// 				<img class='cursor-pointer absolute top-0 bottom-0 right-0 left-0' src='${property.images[0]}'/>
// 				<a class='font-semibold mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2
// 				-translate-y-1/2 z-50 bg-white bg-lightBlue hover:bg-darkerBlue50 text-white text-md px-6 py-2 rounded-md shadow-sm cursor-pointer'
// 				href='/estate-details/${property.id}' target='_blank'>View property</a>
// 			</div>
// 		</div>
// 		`;

// 	// 1- Generating info window
// 	const infowindow = generateInfoWindow(google, content);

// 	// 2- Adding marker on the map
// 	const marker = addMarker(google, map, property.position);

// 	// 3- Extending boundaries of the map
// 	bounds.extend(marker.position);

// 	// 4- Adding an event listener to the marker
// 	addEventToMarker(infowindow, marker, map);
// });
