import LightGallery from 'lightgallery/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReservationForm from '../../components/ReservationForm/ReservationForm'
import { PAGES } from '../../constants/url.constants'

import roomImage1 from '../../assets/home/rooms/standart-room/1.jpg'
import roomImage2 from '../../assets/home/rooms/standart-room/2.jpg'
import roomImage3 from '../../assets/home/rooms/standart-room/3.jpg'
import LocationMap from '../../components/LocationMap/LocationMap'

import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import { CircularProgress, Rating } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import 'animate.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import { roomService } from '../../services/rooms.service'
import { IBookingFeedbacks } from '../../types/rooms.type'
import styles from './StandartRoom.module.scss'

const StandartRoom: React.FC = () => {
	const { data: roomFeedbacks, isLoading } = useQuery<IBookingFeedbacks>({
		queryKey: ['getFeedbacks', 'standard'],
		queryFn: ({ queryKey }) => {
			const [, type] = queryKey
			return roomService.getRoomFeedbacks(type as string)
		},
	})

	const [showComments, setShowComments] = useState(true)

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<CircularProgress style={{ color: '#dba765' }} />
			</div>
		)
	}

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
					<div className={`${styles.left}`}>
						<div className={styles.title}>
							<h3>Standart Room</h3>
							<Rating
								className={styles.rating__stars}
								name='read-only'
								value={roomFeedbacks?.averageRating}
								readOnly
							/>
						</div>

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
							<img src={roomImage1} alt='Standart room' />
							<img src={roomImage2} alt='Standart room' />
							<img src={roomImage3} alt='Standart room' />
						</LightGallery>
						<p className={styles.location}>Location</p>
						<LocationMap />
						<p
							onClick={() => setShowComments(!showComments)}
							className={styles.comments}
						>
							Comments <span>({roomFeedbacks?.reviews.length})</span>
						</p>
						{showComments && (
							<ul className={styles.feedbacks}>
								{roomFeedbacks?.reviews.map(item => (
									<li key={item.id}>
										<div className={styles.rating}>
											<p className={styles.name}>{item.user.name}</p>
											{/*@ts-ignore */}
											<Rating name='read-only' value={item.rating} readOnly />
										</div>
										<p className={styles.comment}>{item.comment}</p>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className={` ${styles.right}`}>
						<ReservationForm roomType={'standard'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default StandartRoom
