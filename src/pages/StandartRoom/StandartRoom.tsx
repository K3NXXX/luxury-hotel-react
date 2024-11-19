import 'animate.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { PAGES } from '../../constants/url.constants'
import styles from './StandartRoom.module.scss'

import { Checkbox, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import marker from '../../assets/global/marker.png'
import roomImage1 from '../../assets/home/rooms/standart-room/1.jpg'
import roomImage2 from '../../assets/home/rooms/standart-room/2.jpg'
import roomImage3 from '../../assets/home/rooms/standart-room/3.jpg'

const StandartRoom: React.FC = () => {
	const MAPBOX_TOKEN =
		'pk.eyJ1IjoiazNueCIsImEiOiJjbTNvcmkwanAwMzNxMmlzamFjaGx5aTFsIn0.4RpR8F9COeMLmj8ZbRzTjA'
	const hotelCoordinates = { latitude: 40.714, longitude: -74.006 }
	const [capacity, setCapacity] = useState<number>(1)

	const handleChangeCapacity = (event: SelectChangeEvent<number>) => {
		setCapacity(event.target.value as number)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className={styles.root}>
			<div className={styles.bg}>
				<div className={styles.wrapper}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>Standart Room</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>STANDART ROOM</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
					<div className={styles.left}>
						<h3>Standart Room</h3>
						<p className={styles.descr}>
							Our Standard Room is designed to provide a harmonious balance of
							comfort and functionality, making it an ideal choice for travelers
							seeking a relaxing stay. Each room features a plush bed,
							contemporary furnishings, and thoughtfully selected amenities to
							cater to your every need. Whether you are visiting for business or
							leisure, the room is equipped with high-speed Wi-Fi, a flat-screen
							TV, a work desk, and climate control to ensure maximum
							convenience. The soothing decor and attention to detail create a
							welcoming atmosphere, offering a peaceful retreat after a busy
							day. Experience the perfect combination of modern style and
							timeless comfort.
						</p>
						<p className={styles.amenities}>Amenities</p>
						<ul className={styles.amenities__list}>
							<li>Area 20-25m²</li>
							<li>Cable TV</li>
							<li>High Speed WIFI</li>
							<li>Mini bar</li>
							<li>Smart room</li>
						</ul>
						<p className={styles.hotel__rules}>Hotel Rules</p>
						<ul className={styles.rules__list}>
							<li>No parties or events</li>
							<li>No smoking</li>
						</ul>
						<p className={styles.smart__room}>Smart room</p>
						<p className={styles.smart__room_descr}>
							Experience the future of comfort and convenience in our Smart
							Room, where cutting-edge technology meets modern design. Control
							every aspect of your stay effortlessly using a remote or our
							intuitive mobile app. Adjust the lighting, temperature, and
							curtains to suit your mood, or manage the entertainment system
							with just a few taps. From personalized settings to seamless
							automation, our Smart Room ensures an unparalleled stay, tailored
							to your preferences. Discover the ultimate blend of innovation and
							luxury designed to enhance your travel experience.
						</p>
						<p className={styles.room__images}>Room Images</p>
						<LightGallery
							plugins={[lgZoom, lgVideo]}
							mode='lg-fade'
							thumbnail={true}
							elementClassNames={styles.gallery}
							speed={500}
						>
							<a href={roomImage1} data-src={roomImage1}>
								<img src={roomImage1} alt='Standart room' />
							</a>
							<a href={roomImage2} data-src={roomImage2}>
								<img src={roomImage2} alt='Standart room' />
							</a>
							<a href={roomImage3} data-src={roomImage3}>
								<img src={roomImage3} alt='Standart room' />
							</a>
						</LightGallery>
						<p className={styles.location}>Location</p>
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
					</div>
					<div
						className={`${styles.right}`}
					>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div className={`${styles.reservation} animate__animated animate__fadeIn`}>
								<form>
									<p className={styles.reservation__text}>Your Reservation</p>
									<div className={styles.formContent}>
										<div className={styles.input__wrapper}>
											<label>Check in</label>
											<DatePicker defaultValue={dayjs('2024-04-17')} />
										</div>
										<div className={styles.input__wrapper}>
											<label>Check out</label>
											<DatePicker defaultValue={dayjs('2024-04-17')} />
										</div>
										
										<div className={styles.input__wrapper}>
											<label>Beds</label>
											<Select value={capacity} onChange={handleChangeCapacity}>
												<MenuItem value='1'>1</MenuItem>
												<MenuItem value='2'>2</MenuItem>
											</Select>
										</div>
										<div className={styles.input__wrapper}>
											<label>Extra services</label>
											<div className={styles.extra}>
												<Checkbox />
												<p>Food delivery</p>
											</div>
											<div className={styles.extra}>
												<Checkbox />
												<p>Romantic package</p>
											</div>
											<div className={styles.extra}>
												<Checkbox />
												<p>Family resort</p>
											</div>
										</div>
									</div>
									<button className={styles.btn}>Check Reservation</button>
								</form>
							</div>
						</LocalizationProvider>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StandartRoom
