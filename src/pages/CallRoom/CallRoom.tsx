import LightGallery from 'lightgallery/react'
import React from 'react'
import { Link } from 'react-router-dom'
import ReservationForm from '../../components/ReservationForm/ReservationForm'
import { PAGES } from '../../constants/url.constants'

import callRoomImage1 from '../../assets/home/call-rooms/5.webp'
import callRoomImage2 from '../../assets/home/call-rooms/2.webp'
import callRoomImage3 from '../../assets/home/call-rooms/3.jpg'

import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import 'animate.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import LocationMap from '../../components/LocationMap/LocationMap'
import styles from '../StandartRoom/StandartRoom.module.scss'
import ReservationFormCallRoom from '../../components/ReservationForm/ReservationFormCallRoom'

const CallRoom: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.bgCallRoom}>
				<div className={styles.wrapper}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>Call room</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>CALL ROOM</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
					<div className={`${styles.left}`}>
						<div className={styles.title}>
							<h3>Call room</h3>
						</div>

						<p className={styles.descr}>
							Our CallRoom is thoughtfully crafted to provide an exceptional
							blend of comfort and functionality, making it the perfect choice
							for those seeking a productive and relaxing space. Each room is
							equipped with modern furnishings, sleek decor, and carefully
							selected features to cater to all your needs. Whether you're
							hosting a meeting, attending a conference, or looking for a quiet
							environment for focused work, the room is designed with
							high-quality technology, adaptable lighting, and a comfortable
							layout to enhance your experience. The sophisticated design and
							meticulous attention to detail create a professional yet welcoming
							atmosphere, ensuring a pleasant and efficient setting for your
							activities. Experience the ideal balance of modern convenience and
							classic professionalism in our CallRoom.
						</p>
						<p className={styles.room__images}>Call room Images</p>
						<LightGallery
							plugins={[lgZoom, lgVideo]}
							mode='lg-fade'
							thumbnail={true}
							elementClassNames={styles.gallery}
							speed={500}
						>
							<img
								className={styles.restaurantImage}
								src={callRoomImage1}
								alt='Call room'
							/>
								<img
								className={styles.restaurantImage}
								src={callRoomImage3}
								alt='Call room'
							/>
							<img
								className={styles.restaurantImage}
								src={callRoomImage2}
								alt='Call room'
							/>
						
						</LightGallery>
						<p className={styles.location}>Location</p>
						<LocationMap />
					</div>
					<div className={` ${styles.right}`}>
						<ReservationFormCallRoom/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CallRoom
