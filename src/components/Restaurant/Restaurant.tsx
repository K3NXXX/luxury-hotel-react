import React from 'react'
import { useInView } from 'react-intersection-observer'
import restaurantImage from '../../assets/home/restaurant/1.jpg'
import styles from './Restaurant.module.scss'
import {Link} from "react-router-dom"
import { PAGES } from '../../constants/url.constants'
const Restaurant: React.FC = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.5,
	})
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div
					ref={ref}
					className={`${
						inView ? 'animate__animated animate__fadeIn' : ''
					} ${styles.left}`}
				>
					<img src={restaurantImage} alt='restaurant' />
				</div>
				<div ref={ref} className={`${
						inView ? 'animate__animated animate__fadeInRight' : ''
					} ${styles.right}`}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>THE BEST LUXURY HOTEL</p>
						<p className={styles.text2}>Relaxing Moments at Our Restaurant.</p>
						<p className={styles.text3}>
							A cozy restaurant offering a wide variety of delicious dishes, a
							warm and inviting atmosphere, and top-notch service. Perfect for
							family gatherings, romantic evenings, or business meetings. Enjoy
							fresh ingredients, expertly crafted meals, and a memorable dining
							experience."
						</p>
						<ul className={styles.list}>
							<li>Interactive Table Ordering</li>
							<li>Personalized Dining Experience</li>
							<li>Augmented Reality (AR) Menus</li>
							<li>Dynamic Atmosphere</li>
							<li>Smart Kitchen Technology</li>
						</ul>
						<Link to={PAGES.TABLES}>
						<button className={styles.btn}>Book now</button>
						
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Restaurant
