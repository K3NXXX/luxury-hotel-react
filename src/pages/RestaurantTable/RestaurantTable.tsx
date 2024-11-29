import LightGallery from 'lightgallery/react'
import React from 'react'
import { Link } from 'react-router-dom'
import ReservationForm from '../../components/ReservationForm/ReservationForm'
import { PAGES } from '../../constants/url.constants'

import restaurantImage1 from '../../assets/home/restaurant/2.webp'
import restaurantImage2 from '../../assets/home/restaurant/3.jpeg'
import restaurantImage3 from '../../assets/home/restaurant/4.webp'

import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'

import 'animate.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lightgallery.css'
import LocationMap from '../../components/LocationMap/LocationMap'
import styles from '../StandartRoom/StandartRoom.module.scss'

const RestaurantTable: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.bgRestaurant}>
				<div className={styles.wrapper}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>Restaurant Table</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>RESTAURANT TABLE</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
					<div className={`${styles.left}`}>
						<div className={styles.title}>
							<h3>Restaurant Table</h3>
						</div>

						<p className={styles.descr}>
							Our Standard Table is designed to offer a perfect blend of comfort
							and sophistication, making it an excellent choice for diners
							seeking an enjoyable experience. Each table features stylish
							seating, modern decor, and carefully selected settings to meet
							your every need. Whether you're visiting for a casual meal or a
							special occasion, the table is arranged with high-quality
							tableware, ambient lighting, and a comfortable layout to ensure
							maximum satisfaction. The elegant design and attention to detail
							create a welcoming atmosphere, providing a delightful setting for
							your dining experience. Enjoy the ideal combination of
							contemporary elegance and timeless hospitality.
						</p>
						<p className={styles.room__images}>Restaurant Images</p>
						<LightGallery
							plugins={[lgZoom, lgVideo]}
							mode='lg-fade'
							thumbnail={true}
							elementClassNames={styles.gallery}
							speed={500}
						>
							<img
								className={styles.restaurantImage}
								src={restaurantImage1}
								alt='Restaurant'
							/>
							<img
								className={styles.restaurantImage}
								src={restaurantImage2}
								alt='Restaurant'
							/>
							<img
								className={styles.restaurantImage}
								src={restaurantImage3}
								alt='Restaurant'
							/>
						</LightGallery>
						<p className={styles.location}>Location</p>
						<LocationMap />
					</div>
					<div className={` ${styles.right}`}>
						<ReservationForm roomType={'restaurant'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default RestaurantTable
