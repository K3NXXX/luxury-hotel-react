import LightGallery from 'lightgallery/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReservationForm from '../../components/ReservationForm/ReservationForm'
import { PAGES } from '../../constants/url.constants'

import roomImage1 from '../../assets/home/rooms/president-room/1.jpg'
import roomImage2 from '../../assets/home/rooms/president-room/2.jpg'
import roomImage3 from '../../assets/home/rooms/president-room/3.jpg'

import LocationMap from '../../components/LocationMap/LocationMap'

import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import 'animate.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import styles from '../StandartRoom/StandartRoom.module.scss'
import { useQuery } from '@tanstack/react-query'
import { IBookingFeedbacks } from '../../types/rooms.type'
import { roomService } from '../../services/rooms.service'
import { CircularProgress, Rating } from '@mui/material'

const PresidentRoom: React.FC = () => {
	const { data: roomFeedbacks, isLoading } = useQuery<IBookingFeedbacks>({
		queryKey: ['getFeedbacks', 'president'], 
		queryFn: ({ queryKey }) => {
		  const [, type] = queryKey; 
		  return roomService.getRoomFeedbacks(type as string);
		},
	  });

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
						<p className={styles.text1}>President Room</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>PRESIDENT ROOM</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
					<div className={`${styles.left}`}>
					<div className={styles.title}>
							<h3>President Room</h3>
							<Rating
								className={styles.rating__stars}
								name='read-only'
								value={roomFeedbacks?.averageRating}
								readOnly
							/>
						</div>
						<p className={styles.descr}>
							Our President Room offers the pinnacle of luxury and exclusivity,
							designed for guests seeking the utmost in sophistication and
							comfort. This spacious suite combines refined elegance with
							cutting-edge technology, making it ideal for those who appreciate
							the finer things in life. Featuring a grand king-size bed, a
							separate living area with a plush sofa, and a dedicated work
							space, the room is a perfect blend of relaxation and
							functionality. Guests can enjoy premium amenities such as
							high-speed Wi-Fi, a large flat-screen TV, a fully stocked minibar,
							and a state-of-the-art sound system. The expansive bathroom
							includes a freestanding bathtub, a rain shower, and luxury
							toiletries, providing a spa-like experience. With stunning
							panoramic views, opulent decor, and meticulous attention to
							detail, the President Room ensures a stay of unmatched luxury and
							tranquility, offering an extraordinary retreat for discerning
							guests.
						</p>
						<p className={styles.amenities}>Amenities</p>
						<ul className={styles.amenities__list}>
							<li>Area 40-45m²</li>
							<li>King-size bed</li>
							<li>Separate living area</li>
							<li>Large flat-screen TV with streaming services</li>
							<li>High-Speed Wi-Fi</li>
							<li>Fully stocked minibar</li>
							<li>State-of-the-art sound system</li>
							<li>Freestanding bathtub and rain shower</li>
							<li>Complimentary bathrobe, slippers, and luxury toiletries</li>
							<li>Panoramic views of the city</li>
							<li>Personalized concierge service</li>
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
						<ReservationForm roomType={'president'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PresidentRoom
