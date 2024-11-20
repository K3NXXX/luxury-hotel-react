import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import Map, { Marker } from 'react-map-gl'
import marker from '../../assets/global/marker.png'
import styles from './LocationMap.module.scss'

const LocationMap: React.FC = () => {
	const MAPBOX_TOKEN =
		process.env.REACT_APP_MAPBOX_KEY
	const hotelCoordinates = { latitude: 40.714, longitude: -74.006 }
	return (
		<Map
			initialViewState={{
				longitude: hotelCoordinates.longitude,
				latitude: hotelCoordinates.latitude,
				zoom: 12,
			}}
			style={{ width: '100%', height: 400 }}
			mapStyle='mapbox://styles/mapbox/outdoors-v11'
			mapboxAccessToken={MAPBOX_TOKEN}
		>
			<Marker
				longitude={hotelCoordinates.longitude}
				latitude={hotelCoordinates.latitude}
				anchor='bottom'
			>
				<div className={styles.marker}>
					<img src={marker} alt='marker' />
				</div>
			</Marker>
		</Map>
	)
}

export default LocationMap
