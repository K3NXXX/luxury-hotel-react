import LightGallery from 'lightgallery/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReservationForm from '../../components/ReservationForm/ReservationForm'
import { PAGES } from '../../constants/url.constants'

import roomImage1 from '../../assets/home/rooms/deluxe-room/1.webp'
import roomImage2 from '../../assets/home/rooms/deluxe-room/2.webp'
import roomImage3 from '../../assets/home/rooms/deluxe-room/3.webp'

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
import styles from '../StandartRoom/StandartRoom.module.scss'

const DeluxeRoom: React.FC = () => {
	const { data: roomFeedbacks, isLoading } = useQuery<IBookingFeedbacks>({
		queryKey: ['getFeedbacks', 'deluxe'],
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
						<p className={styles.text1}>Deluxe Room</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>DELUXRE ROOM</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
					<div className={`${styles.left}`}>
						<div className={styles.title}>
							<h3>Deluxe Room</h3>
							<Rating
								className={styles.rating__stars}
								name='read-only'
								value={roomFeedbacks?.averageRating}
								readOnly
							/>
						</div>
						<p className={styles.descr}>
							Our Deluxe Room elevates your stay with enhanced luxury and
							sophistication, perfect for guests who desire an upgraded
							experience. Featuring a spacious layout and premium furnishings,
							the room is designed to provide unparalleled comfort and elegance.
							Indulge in a plush king-size bed, a stylish seating area, and an
							array of upscale amenities, including high-speed Wi-Fi, a
							flat-screen TV, a fully stocked minibar, and a Nespresso coffee
							machine. The luxurious bathroom boasts a rain shower and high-end
							toiletries for a spa-like experience. With its chic decor,
							enhanced space, and attention to every detail, the Deluxe Room
							offers a serene and refined retreat, perfect for unwinding in
							style.
						</p>
						<p className={styles.amenities}>Amenities</p>
						<ul className={styles.amenities__list}>
							<li>Area 30-35m²</li>
							<li>King-size bed</li>
							<li>Flat-screen TV with streaming services</li>
							<li>High-Speed Wi-Fi</li>
							<li>Fully stocked minibar</li>
							<li>Nespresso coffee machine</li>
							<li>Luxurious bathroom with rain shower</li>
							<li>Complimentary bathrobe and slippers</li>
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
							<img src={roomImage1} alt='Deluxe room' />
							<img src={roomImage2} alt='Deluxe room' />
							<img src={roomImage3} alt='Deluxe room' />
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
						<ReservationForm roomType={'deluxe'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeluxeRoom
