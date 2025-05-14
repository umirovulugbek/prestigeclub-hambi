import { MarkerClusterer } from '@googlemaps/markerclusterer';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import { CloseIcon } from '../../homeS3Icon';
import ModalBottomFull from '../../modal/ModalBottomFull';

const MapModal = ({ setMapModal, map_modal, location = '0,0' }) => {
	const [latitude, longitude] = location?.split(',')?.map(coord => coord.trim());

	const center = {
		lat: +latitude,
		lng: +longitude,
	};

	const renderMarkers = (map, maps, items) => {
		const markers = [];

		const marker = new maps.Marker({
			position: {
				lat: +items?.latitude,
				lng: +items?.longitude,
			},
			map,
			// icon: createCustomMarker(hotel?.converted_price_number),
		});
		// marker.addListener('click', () => {
		// 	setItem(hotel);
		// 	setModal(true);
		// });
		markers.push(marker);

		new MarkerClusterer({ markers, map });
	};
	return (
		<ModalBottomFull
			btnShow={false}
			close={() => setMapModal(false)}
			modal={map_modal}
			content={
				<div className='relative'>
					<div className=' absolute top-[25px] left-[25px] z-10 text-black cursor-pointer' onClick={() => setMapModal(false)}>
						<CloseIcon />
					</div>

					<div style={{ height: '100vh', width: '100vw' }}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: 'AIzaSyCSMfF7b-Kc8YtKBU4rj0qo2BBlrOxRKbs' }}
							defaultCenter={center}
							defaultZoom={16}
							options={{ gestureHandling: 'greedy' }}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={({ map, maps }) => {
								renderMarkers(map, maps, {
									latitude: latitude,
									longitude: longitude,
								});
							}}
						/>
					</div>
				</div>
			}
			heightModal={'min-h-screen'}
		/>
	);
};

export default MapModal;
